import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { UserProvider } from "./context/UserProvider.jsx";
import { ToastProvider } from "./components/shared/toast/ToastProvider.jsx";
import { PrimeReactProvider } from "primereact/api";
import { LoadingProvider } from "./context/loading/LoadingProvider.jsx";
import "tailwindcss/index";
import "./assets/sass/index.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <LoadingProvider>
        <BrowserRouter>
          <ToastProvider>
            <PrimeReactProvider>
              <App />
            </PrimeReactProvider>
          </ToastProvider>
        </BrowserRouter>
      </LoadingProvider>
    </UserProvider>
  </StrictMode>
);