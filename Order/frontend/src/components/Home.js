import React from 'react';
import {withRouter, useHistory} from "react-router-dom";

const Home = () => {

    let history = useHistory();

    return (
        <div className="home">
            <div className="home__choice"
                onClick={() => history.push('/speciality', {data: 1})}>
                <p>Our Speciality</p>
            </div>
            <div className="home__choice"
                onClick={() => history.push('/customize', {data: 2})}>
                <p>Customize Cake</p>
            </div>
        </div>
    );
};

export default withRouter(Home);
