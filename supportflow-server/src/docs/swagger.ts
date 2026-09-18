import type { Express } from "express";
import swaggerUi from "swagger-ui-express";

const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Support Flow API",
    version: "1.0.0",
    description: "REST API for the Support Flow customer support ticketing application.",
  },
  servers: [{ url: "/api" }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          firstName: { type: "string" },
          lastName: { type: "string" },
          email: { type: "string", format: "email" },
          role: { type: "string", enum: ["CUSTOMER", "AGENT", "ADMIN"] },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Category: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string" },
          description: { type: "string" },
          isActive: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Ticket: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          ticketNumber: { type: "string" },
          subject: { type: "string" },
          description: { type: "string" },
          status: {
            type: "string",
            enum: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"],
          },
          priority: {
            type: "string",
            enum: ["LOW", "MEDIUM", "HIGH", "URGENT"],
          },
          customerId: { type: "string", format: "uuid" },
          agentId: { type: "string", format: "uuid", nullable: true },
          categoryId: { type: "string", format: "uuid" },
          resolvedAt: { type: "string", format: "date-time", nullable: true },
          closedAt: { type: "string", format: "date-time", nullable: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      TicketMessage: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          ticketId: { type: "string", format: "uuid" },
          authorId: { type: "string", format: "uuid" },
          content: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
  },
  paths: {
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new customer account",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["firstName", "lastName", "email", "password"],
                properties: {
                  firstName: { type: "string" },
                  lastName: { type: "string" },
                  email: { type: "string", format: "email" },
                  password: { type: "string", minLength: 8 },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "Customer registered successfully" },
          "409": { description: "Email already in use" },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Log in and receive a JWT",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", format: "email" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Login successful" },
          "401": { description: "Invalid email or password" },
        },
      },
    },
    "/users": {
      get: {
        tags: ["Users"],
        summary: "List all users",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Users retrieved successfully" } },
      },
    },
    "/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Get a user by id",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        responses: {
          "200": { description: "User retrieved successfully" },
          "404": { description: "User not found" },
        },
      },
      patch: {
        tags: ["Users"],
        summary: "Update a user (self or admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        responses: {
          "200": { description: "User updated successfully" },
          "403": { description: "Not authorized" },
          "404": { description: "User not found" },
        },
      },
      delete: {
        tags: ["Users"],
        summary: "Soft-delete a user (admin only)",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        responses: {
          "200": { description: "User deleted successfully" },
          "403": { description: "Not authorized" },
          "404": { description: "User not found" },
        },
      },
    },
    "/users/agents": {
      post: {
        tags: ["Users"],
        summary: "Create an agent account with expertise categories (admin only)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["firstName", "lastName", "email", "password"],
                properties: {
                  firstName: { type: "string" },
                  lastName: { type: "string" },
                  email: { type: "string", format: "email" },
                  password: { type: "string", minLength: 8 },
                  categoryIds: {
                    type: "array",
                    items: { type: "string", format: "uuid" },
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "Agent created successfully" },
          "403": { description: "Not authorized" },
        },
      },
    },
    "/users/agents/{id}/categories": {
      put: {
        tags: ["Users"],
        summary: "Replace an agent's expertise categories (admin only)",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        responses: {
          "200": { description: "Agent expertise updated successfully" },
          "403": { description: "Not authorized" },
          "404": { description: "Agent not found" },
        },
      },
    },
    "/categories": {
      get: {
        tags: ["Categories"],
        summary: "List categories (active only, unless admin requests includeInactive=true)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Categories retrieved successfully" } },
      },
      post: {
        tags: ["Categories"],
        summary: "Create a category (admin only)",
        security: [{ bearerAuth: [] }],
        responses: {
          "201": { description: "Category created successfully" },
          "403": { description: "Not authorized" },
          "409": { description: "Category name already in use" },
        },
      },
    },
    "/categories/{id}": {
      get: {
        tags: ["Categories"],
        summary: "Get a category by id",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        responses: {
          "200": { description: "Category retrieved successfully" },
          "404": { description: "Category not found" },
        },
      },
      patch: {
        tags: ["Categories"],
        summary: "Update a category (admin only)",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        responses: {
          "200": { description: "Category updated successfully" },
          "403": { description: "Not authorized" },
          "404": { description: "Category not found" },
        },
      },
      delete: {
        tags: ["Categories"],
        summary: "Deactivate a category (admin only)",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        responses: {
          "200": { description: "Category deactivated successfully" },
          "403": { description: "Not authorized" },
          "404": { description: "Category not found" },
        },
      },
    },
    "/tickets": {
      post: {
        tags: ["Tickets"],
        summary: "Create a ticket (customer only) — auto-assigned to the least-loaded eligible agent",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["subject", "description", "categoryId"],
                properties: {
                  subject: { type: "string" },
                  description: { type: "string" },
                  categoryId: { type: "string", format: "uuid" },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "Ticket created successfully" },
          "400": { description: "Category not found or inactive" },
          "403": { description: "Only customers can create tickets" },
        },
      },
      get: {
        tags: ["Tickets"],
        summary: "List tickets visible to the requester (own/assigned/all by role)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Tickets retrieved successfully" } },
      },
    },
    "/tickets/{id}": {
      get: {
        tags: ["Tickets"],
        summary: "Get a ticket by id (subject to role-based visibility)",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        responses: {
          "200": { description: "Ticket retrieved successfully" },
          "403": { description: "Not authorized to view this ticket" },
          "404": { description: "Ticket not found" },
        },
      },
    },
    "/tickets/{id}/status": {
      patch: {
        tags: ["Tickets"],
        summary: "Change ticket status following the allowed lifecycle transitions",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        responses: {
          "200": { description: "Ticket status updated successfully" },
          "400": { description: "Invalid status transition" },
          "403": { description: "Not authorized to make this transition" },
        },
      },
    },
    "/tickets/{id}/priority": {
      patch: {
        tags: ["Tickets"],
        summary: "Change ticket priority (assigned agent or admin only)",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        responses: {
          "200": { description: "Ticket priority updated successfully" },
          "403": { description: "Not authorized, or ticket is closed" },
        },
      },
    },
    "/tickets/{id}/assignment": {
      patch: {
        tags: ["Tickets"],
        summary: "Manually assign or reassign a ticket to an agent (admin only)",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        responses: {
          "200": { description: "Ticket assignment updated successfully" },
          "400": { description: "Invalid agent" },
          "403": { description: "Not authorized" },
        },
      },
    },
    "/tickets/{id}/messages": {
      get: {
        tags: ["Messages"],
        summary: "List messages on a ticket (subject to role-based visibility)",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        responses: { "200": { description: "Messages retrieved successfully" } },
      },
      post: {
        tags: ["Messages"],
        summary: "Add a message to a ticket (blocked once the ticket is closed)",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["content"],
                properties: { content: { type: "string" } },
              },
            },
          },
        },
        responses: {
          "201": { description: "Message added successfully" },
          "403": { description: "Not authorized, or ticket is closed" },
        },
      },
    },
  },
};

export const mountSwagger = (app: Express) => {
  app.get("/docs.json", (_req, res) => {
    res.json(openApiSpec);
  });

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));
};
