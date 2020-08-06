import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";

import Creams from "./pages/All";

function App() {
  return (
    <div className="App">
      <Router>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            <h2>Cream Company</h2>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to={"/"}>
                  All Creams<span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/add"}>
                  Add Cream
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/update"}>
                  Update Cream
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div>
          <Route exact path="/" component={Creams} />
        </div>
      </Router>
    </div>
  );
}

export default App;
