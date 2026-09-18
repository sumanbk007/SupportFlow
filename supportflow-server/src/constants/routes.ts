const ROUTES = {
  AUTH_REGISTER: "/register",
  AUTH_LOGIN: "/login",

  USERS: "/",
  USER_BY_ID: "/:id",
  USER_AGENTS: "/agents",
  AGENT_EXPERTISE: "/agents/:id/categories",

  CATEGORIES: "/",
  CATEGORY_BY_ID: "/:id",

  TICKETS: "/",
  TICKET_BY_ID: "/:id",
  TICKET_STATUS: "/:id/status",
  TICKET_PRIORITY: "/:id/priority",
  TICKET_ASSIGNMENT: "/:id/assignment",
  TICKET_MESSAGES: "/:id/messages",
} as const;

export default ROUTES;
