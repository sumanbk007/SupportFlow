import cors from "cors";
import express from "express";

import { authRouter, categoryRouter, ticketRouter, userRouter } from "./container.js";
import { env } from "./config/env.js";
import { mountSwagger } from "./docs/swagger.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { notFoundMiddleware } from "./middleware/not-found.middleware.js";

const app = express();

app.use(cors({ origin: env.FRONTEND_URL }));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Support Flow API",
  });
});

mountSwagger(app);

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/tickets", ticketRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
