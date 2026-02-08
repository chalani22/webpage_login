import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import TokenPage from "../pages/TokenPage";

export const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/token", element: <TokenPage /> },
]);
