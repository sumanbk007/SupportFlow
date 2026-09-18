# SupportFlow API

A role-based customer support ticketing system. Customers create categorized tickets, the system
auto-assigns them to the least-loaded qualified agent, customers and agents communicate through
append-only ticket messages, and admins manage users, categories, agent expertise, and the ticket
lifecycle. Built with Node.js, TypeScript, Express, and Prisma (PostgreSQL).

## Architecture

Every module (`auth`, `users`, `categories`, `tickets`) follows the same four layers, each
depending only on the *interface* of the layer below it:

```
routes  →  controller  →  service  →  repository  →  Prisma / DB
```

- **`*.routes.ts`** exports a `createXRouter(controller)` factory. Knows Express routing only.
- **`*.controller.ts`** exports a `createXController(service)` factory. Only knows `req`/`res`.
- **`*.service.ts`** exports a `createXService(repository)` factory. All business rules live
  here — status transitions, authorization checks, the auto-assignment algorithm.
- **`*.repository.ts`** exports a `createXRepository(prisma)` factory. The only layer that
  imports Prisma.

**`src/container.ts`** is the composition root — the one file that wires concrete implementations
together. This is manual factory-based dependency injection: no container library, no decorators,
just functions receiving what they need as arguments. Cross-module dependencies go through
interfaces too — `ticket.service.ts` depends on `ICategoryRepository` and `IUserRepository` (not
their concrete Prisma-backed implementations) to validate categories and agents.

No comments anywhere in the source — the code is written to be self-explanatory through naming
and structure; this README carries the "why" instead.

## Project structure

```
src/
├── app.ts
├── server.ts
├── container.ts
├── config/
│   ├── env.ts
│   ├── database.ts
│   └── logger.ts
├── modules/
│   ├── auth/                    register, login
│   ├── users/                   user CRUD, agent creation + expertise management
│   ├── categories/               category CRUD, soft-deactivation
│   └── tickets/
│       ├── ticket.*              ticket CRUD, status/priority/assignment, auto-assignment
│       ├── ticket.access.ts      shared role-based visibility check
│       └── message.*             nested /tickets/:id/messages sub-resource
├── middleware/
├── utils/
├── constants/
├── types/
├── docs/swagger.ts               hand-written OpenAPI spec, served at /docs
└── generated/prisma/             generated client (gitignored)
```

## Setup

```bash
npm install
cp .env.example .env       # fill in real values, especially JWT_SECRET and DATABASE_URL
npm run db:generate
npm run db:migrate         # applies both migrations, including the ticket-number sequence
npm run db:seed            # creates the admin account + 5 default categories
npm run dev
```

Production: `npm run build && npm start`. API docs: `http://localhost:5000/docs`.

## Business rules implemented

**Auto-assignment** (`ticket.service.ts`): on ticket creation, finds active agents whose
`AgentCategory` expertise matches the ticket's category, counts each one's active
(`OPEN`/`IN_PROGRESS`) assigned tickets, and assigns to the lowest. If no agent qualifies, the
ticket stays unassigned (`agentId = null`) rather than failing.

**Status transitions** (`ticket.service.ts`): enforced as a lookup table, not scattered `if`
chains —

```
OPEN         → IN_PROGRESS
IN_PROGRESS  → OPEN, RESOLVED
RESOLVED     → OPEN, CLOSED
CLOSED       → OPEN
```

On top of *which* transitions exist, *who* can make them is enforced separately: only the
assigned agent or an admin can move `OPEN ↔ IN_PROGRESS ↔ RESOLVED`; only a customer (their own
ticket) or admin can reopen a resolved ticket; **only admin** can close a resolved ticket or
reopen a closed one. This matches the PRD's authorization matrix exactly, including the asymmetry
where an agent can resolve but not close.

**Visibility** (`ticket.access.ts`, shared between tickets and messages): customers see their own
tickets, agents see tickets assigned to them, admins see everything. The same function gates
message read/write access, so a ticket and its messages always share one definition of "can this
person see this ticket" — no risk of the two drifting apart.

**Ticket numbers**: generated via a dedicated Postgres sequence
(`prisma/migrations/20260905000001_ticket_number_sequence`), read with
`SELECT nextval('ticket_number_seq')`. This is atomic under concurrent ticket creation — a
count-based approach (`SELECT COUNT(*) + 1`) would race and could hand out duplicate numbers
under load.

**Category deactivation**: `DELETE /categories/:id` sets `isActive = false`, never removes the
row. Existing tickets keep their `categoryId` and keep displaying the category; only *new* tickets
are blocked from selecting an inactive category (`ticket.service.ts` checks
`categoryRepository.findActiveById` on creation).

**Immutable ticket ownership**: `customerId` is set once at creation from the authenticated user
and never appears in any update schema — there is no code path that can change it.

## Verification

I don't have a Postgres server in the environment I built this in, so type-checking alone
wouldn't prove the business logic actually works. Instead I stood up an embedded
Postgres-wire-protocol database (PGlite), ran the real migrations and seed script against it,
booted the compiled server, and ran a 38-assertion end-to-end script over real HTTP calls. All 38
passed, covering:

- registration, login, agent creation with expertise, admin/agent/customer role boundaries
- auto-assignment picking the correct least-loaded eligible agent
- every valid and invalid status transition, and who is/isn't allowed to make each one
- ticket visibility isolation (a second customer cannot see or message someone else's ticket)
- messages blocked on a closed ticket
- category deactivation blocking new tickets while leaving existing ones intact
- manual reassignment and agent-expertise updates by admin

`npx tsc --noEmit` passes with zero errors and `npm run build` produces a working
`dist/server.js`.

## API

| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | /api/auth/register | — | always creates a `CUSTOMER` |
| POST | /api/auth/login | — | |
| GET | /api/users | Bearer | |
| GET/PATCH/DELETE | /api/users/:id | Bearer (self or admin) | DELETE soft-deletes |
| POST | /api/users/agents | Admin | accepts `categoryIds` |
| PUT | /api/users/agents/:id/categories | Admin | replaces expertise |
| GET | /api/categories | Bearer | active only, unless admin passes `?includeInactive=true` |
| GET | /api/categories/:id | Bearer | |
| POST/PATCH | /api/categories(/:id) | Admin | |
| DELETE | /api/categories/:id | Admin | deactivates, not a real delete |
| POST | /api/tickets | Customer | auto-assigned on creation |
| GET | /api/tickets | Bearer | filtered by role |
| GET | /api/tickets/:id | Bearer | 403 if not visible to requester |
| PATCH | /api/tickets/:id/status | Bearer | role + transition rules enforced in the service |
| PATCH | /api/tickets/:id/priority | Agent (assigned) or Admin | blocked once closed |
| PATCH | /api/tickets/:id/assignment | Admin | manual assign/reassign |
| GET/POST | /api/tickets/:id/messages | Bearer | POST blocked once closed |

## Deliberate scope decisions

- **No generic `PATCH /tickets/:id`.** The PRD itself suggests separating controlled fields; since
  subject/description are immutable after creation anyway, a single catch-all PATCH would need to
  silently ignore most of its own body. The three specific endpoints (`status`, `priority`,
  `assignment`) are the entire mutable surface of a ticket.
- **`UserRole`/`TicketStatus`/`TicketPriority` flow through the service layer** even though
  they're generated by Prisma. These are domain concepts (not query-builder types), so I didn't
  create parallel "domain enums" just to keep `generated/` imports confined to the repository
  layer. A stricter reading of clean architecture would draw that line differently — flag it if
  you want it changed.
- **Manual assignment doesn't require expertise match.** Admin can reassign a ticket to any active
  agent regardless of category expertise, matching the PRD's "Admin can override" language. Only
  the *automatic* assignment path filters by expertise.
