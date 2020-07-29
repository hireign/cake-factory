import React from 'react';
import {Route, Switch} from "react-router-dom";
import Home from "./Home";
import Speciality from "./Speciality";
import Customize from "./Customize";

const Routes = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/speciality' component={Speciality}/>
            <Route exact path='/customize' component={Customize}/>
        </Switch>
    );
};

export default Routes;
