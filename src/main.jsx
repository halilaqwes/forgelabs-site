import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import "./pages.css";
import App from "./App.jsx";

const element = document.getElementById("root");
const app = (
  <StrictMode>
    <App
      initialPath={
        window.location.pathname + window.location.search + window.location.hash
      }
    />
  </StrictMode>
);
if (element.dataset.prerendered) hydrateRoot(element, app);
else createRoot(element).render(app);
