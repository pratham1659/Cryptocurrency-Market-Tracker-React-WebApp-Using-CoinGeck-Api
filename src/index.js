import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AppContext from "./AppContext";
import "react-alice-carousel/lib/alice-carousel.css";
import { BrowserRouter as Router } from "react-router-dom";

// Add bootstrap
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AppContext>
        <App />
      </AppContext>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
