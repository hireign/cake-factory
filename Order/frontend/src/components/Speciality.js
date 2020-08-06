import React from 'react';
import {withRouter, useHistory } from "react-router-dom";

const Speciality = (props) => {

    console.log(props.location.state.data);

    let history = useHistory();

    return (
        <div className="speciality">
            <div className="speciality__back" onClick={() => history.push('/')}>Back</div>
            <div>Speciality</div>
        </div>
    );
};

export default withRouter(Speciality);
