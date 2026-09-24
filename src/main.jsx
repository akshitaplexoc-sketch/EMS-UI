import React from "react";
import ReactDOM from  "react-dom/client";
import "@fontsource/inter";
import App from "./App";

import "./styles/reset.css";
import "./styles/variables.css";
import "./styles/global.css";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);