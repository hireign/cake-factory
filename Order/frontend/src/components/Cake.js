import React from 'react';
import {useHistory, withRouter} from "react-router-dom";

const Cake = (props) => {

    let history = useHistory();

    return (
        <div className="cake">
            <div className="cake__image">
                <img src="" alt={props.cake.cake_name}/>
            </div>
            <div className="cake__container">
                <div className="cake__details">
                    <span className="cake__name">{props.cake.cake_name}</span>
                    <span className="cake__more"
                          onClick={() => history.push('/cake', {
                              cake: props.cake
                          })}
                    >&#8594;</span>
                </div>
                <button className="cake__buy">Place Order</button>
            </div>
        </div>
    );
};

export default withRouter(Cake);
