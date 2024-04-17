import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./redux/store.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <HelmetProvider>
      <CssBaseline />
      {/* <div onContextMenu={(e) => e.preventDefault()}> */}
      <App />
      {/* </div> */}
    </HelmetProvider>
  </Provider>
);
