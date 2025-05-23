import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { UserProvider } from "./context/UserContext.jsx";
import { ToastProvider } from "./components/shared/toast/ToastProvider.jsx";

import "./assets/sass/index.scss";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <ToastProvider>
          <App />
        </ToastProvider>
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
);
