import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Add this line

import "./instrument";

import { App } from "./app/root";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
