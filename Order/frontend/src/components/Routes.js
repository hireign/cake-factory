import React from 'react';
import {Route, Switch} from "react-router-dom";
import Home from "./Home";
import Speciality from "./Speciality";
import Customize from "./Customize";
import Cake_Detail from "./Cake_Detail";
import Admin from "./Admin";

const Routes = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/speciality' component={Speciality}/>
            <Route exact path='/customize' component={Customize}/>
            <Route exact path='/cake' component={Cake_Detail}/>
            <Route exact path='/admin' component={Admin}/>
        </Switch>
    );
};

export default Routes;
