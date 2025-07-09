import { StrictMode } from "react";
import { PrivyProvider } from "@privy-io/react-auth";
import { createRoot } from "react-dom/client";
import "./globals.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      // clientId={import.meta.env.VITE_PRIVY_CLIENT_ID}
      config={{
        // 1. MUST ADD TWITTER TO LOGIN METHODS
        loginMethods: ["email", "wallet", "twitter"],
      }}
      // clientId={import.meta.env.VITE_PRIVY_APP_SECRET}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PrivyProvider>
  </StrictMode>
);
