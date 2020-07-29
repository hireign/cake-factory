import React from 'react';
import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import './App.css';
import Breads from './components/Breads';
import CreateBread from './components/CreateBread';
import UpdateBread from './components/UpdateBread';
 

function App() {
  return (
    <div className="App">
      <Router>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <a className="navbar-brand" href="/" ><h2>Bread Company|</h2></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <Link className="nav-link" to={"/AllBreads"}>All Breads<span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={"/Createbread"}>Add Bread</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={"/Updatebread"}>Update Bread</Link>
                </li>
                </ul>
            </div>
        </nav>
            <div>    
              <Route exact path="/" component={Breads}/>
              <Route path="/Allbreads" component={Breads}/>
              <Route path="/Createbread" component={CreateBread}/> 
              <Route path="/Updatebread" component={UpdateBread}/>
            </div>
      </Router>
    </div>
  );
}

export default App;
