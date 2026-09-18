const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL,
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || "EduConsult CRM",
    env: import.meta.env.MODE,
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
  },
  auth: {
    tokenKey: import.meta.env.VITE_TOKEN_KEY || "access_token",
    refreshTokenKey: import.meta.env.VITE_REFRESH_TOKEN_KEY || "refresh_token",
  },
} as const;

export { config };
