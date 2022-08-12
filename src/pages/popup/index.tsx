import React from "react";
import { createRoot } from "react-dom/client";
import "@pages/popup/index.css";
import "@src/assets/style/app.scss";
import Popup from "@pages/popup/Popup";

function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find AppContainer");
  }
  const root = createRoot(appContainer);
  root.render(<Popup />);
}

init();
