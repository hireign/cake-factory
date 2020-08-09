import React from 'react';
import {withRouter, useHistory} from "react-router-dom";

const Home = () => {

    let history = useHistory();

    return (
        <div className="home">
            <div className="home__choice"
                onClick={() => history.push('/speciality')}>
                <p>Our Speciality</p>
            </div>
            <div className="home__choice"
                onClick={() => history.push('/customize')}>
                <p>Customize Cake</p>
            </div>
        </div>
    );
};

export default withRouter(Home);
