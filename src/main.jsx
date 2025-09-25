import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import "tailwindcss/index";
import "./assets/sass/index.css";
import 'primeicons/primeicons.css';

import App from "./App.jsx";
import Provider from "./context/Provider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
