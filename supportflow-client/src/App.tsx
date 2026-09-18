import { RouterProvider } from "react-router";
import { useTheme } from "./context/theme/useTheme";
import "./index.css";
import { router } from "./router/Router";

function App() {
  const { theme, toggleTheme } = useTheme();

  return <RouterProvider router={router} />;
}

export default App;
