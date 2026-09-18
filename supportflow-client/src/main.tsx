import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./design-system/styles/index.scss";
import "./design-system/styles/reset.scss";

import { ThemeProvider } from "./context/theme/ThemeProvider.tsx";
import { QueryProvider } from "./providers/index.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>,
);
