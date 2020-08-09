import React from 'react';
import {useHistory, withRouter} from "react-router-dom";

const Cake = (props) => {

    let history = useHistory();

    return (
        <div className="cake" onClick={() => history.push('/cake', {
            cake: props.cake
        })}>
            <div className="cake__image">
                <img src="" alt={props.cake.cake_name}/>
            </div>
            <div className="cake__container">
                <div className="cake__name">{props.cake.cake_name}</div>
                <button className="cake__more" >See More</button>
            </div>
        </div>
    );
};

export default withRouter(Cake);
