import { prisma } from "./config/database.js";
import { createAuthController } from "./modules/auth/auth.controller.js";
import { createAuthRouter } from "./modules/auth/auth.routes.js";
import { createAuthService } from "./modules/auth/auth.service.js";
import { createCategoryController } from "./modules/categories/category.controller.js";
import { createCategoryRepository } from "./modules/categories/category.repository.js";
import { createCategoryRouter } from "./modules/categories/category.routes.js";
import { createCategoryService } from "./modules/categories/category.service.js";
import { createMessageController } from "./modules/tickets/message.controller.js";
import { createMessageRepository } from "./modules/tickets/message.repository.js";
import { createMessageService } from "./modules/tickets/message.service.js";
import { createTicketController } from "./modules/tickets/ticket.controller.js";
import { createTicketRepository } from "./modules/tickets/ticket.repository.js";
import { createTicketRouter } from "./modules/tickets/ticket.routes.js";
import { createTicketService } from "./modules/tickets/ticket.service.js";
import { createUserController } from "./modules/users/user.controller.js";
import { createUserRepository } from "./modules/users/user.repository.js";
import { createUserRouter } from "./modules/users/user.routes.js";
import { createUserService } from "./modules/users/user.service.js";

const userRepository = createUserRepository(prisma);
const categoryRepository = createCategoryRepository(prisma);
const ticketRepository = createTicketRepository(prisma);
const messageRepository = createMessageRepository(prisma);

const authService = createAuthService(userRepository);
const userService = createUserService(userRepository, categoryRepository);
const categoryService = createCategoryService(categoryRepository);
const ticketService = createTicketService(
  ticketRepository,
  categoryRepository,
  userRepository,
);
const messageService = createMessageService(messageRepository, ticketRepository);

const authController = createAuthController(authService);
const userController = createUserController(userService);
const categoryController = createCategoryController(categoryService);
const ticketController = createTicketController(ticketService);
const messageController = createMessageController(messageService);

export const authRouter = createAuthRouter(authController);
export const userRouter = createUserRouter(userController);
export const categoryRouter = createCategoryRouter(categoryController);
export const ticketRouter = createTicketRouter(ticketController, messageController);
