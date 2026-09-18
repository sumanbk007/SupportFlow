import { env } from "./env.js";

type LogLevel = "debug" | "info" | "warn" | "error";

const levelOrder: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const minLevel: LogLevel = env.NODE_ENV === "production" ? "info" : "debug";

const write = (level: LogLevel, message: string, meta?: unknown) => {
  if (levelOrder[level] < levelOrder[minLevel]) {
    return;
  }

  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

  if (meta !== undefined) {
    console[level === "debug" ? "log" : level](prefix, message, meta);
    return;
  }

  console[level === "debug" ? "log" : level](prefix, message);
};

export const logger = {
  debug: (message: string, meta?: unknown) => write("debug", message, meta),
  info: (message: string, meta?: unknown) => write("info", message, meta),
  warn: (message: string, meta?: unknown) => write("warn", message, meta),
  error: (message: string, meta?: unknown) => write("error", message, meta),
};
