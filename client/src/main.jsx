import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App.jsx";

import { GoogleOAuthProvider } from "@react-oauth/google";

// Handle Vite chunk load errors and strict MIME type errors gracefully (e.g. when Vercel deploys a new version and old chunks are deleted)
const reloadPage = () => {
  const lastReload = sessionStorage.getItem("last_chunk_reload");
  const now = Date.now();
  if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
    sessionStorage.setItem("last_chunk_reload", now.toString());
    window.location.reload();
  }
};

window.addEventListener("vite:preloadError", reloadPage);

window.addEventListener("error", (e) => {
  const message = e.message || "";
  if (
    message.includes("Failed to fetch dynamically imported module") ||
    message.includes("Failed to load module script") ||
    message.includes("Expected a JavaScript-or-Wasm module script")
  ) {
    reloadPage();
  }
});

// Catch resource load errors (e.g. script/link load failures) which don't bubble
window.addEventListener(
  "error",
  (e) => {
    const target = e.target;
    if (target && (target.tagName === "SCRIPT" || target.tagName === "LINK")) {
      const url = target.src || target.href || "";
      if (url.includes("/assets/") || url.endsWith(".js")) {
        reloadPage();
      }
    }
  },
  { capture: true }
);

// Catch unhandled promise rejections (how dynamic import failures present in some browsers)
window.addEventListener("unhandledrejection", (e) => {
  const reason = e.reason;
  const message = reason && typeof reason === "object" ? reason.message || "" : String(reason || "");
  if (
    message.includes("Failed to fetch dynamically imported module") ||
    message.includes("Failed to load module script") ||
    message.includes("Expected a JavaScript-or-Wasm module script")
  ) {
    reloadPage();
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
