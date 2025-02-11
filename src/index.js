import React from "react";
import ReactDOM from "react-dom/client"; // Updated import
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Create a root element
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

// Call reportWebVitals
reportWebVitals();