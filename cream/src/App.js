import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";

import Creams from "./pages/All";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route path="/" component={Creams} />
        </div>
      </Router>
    </div>
  );
}

export default App;
