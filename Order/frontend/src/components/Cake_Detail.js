import React from 'react';
import {useHistory} from "react-router-dom";

const Cake_Detail = (props) => {

    let history = useHistory();
    let cake = props.location.state.cake;

    return (
        <div className="cakeDetail">
            <div className="back" onClick={() => history.go(-1)}>
                <span>&#8592;</span>
            </div>
            <div className="cakeDetail__container">
                <div className="cakeDetail__image">
                    <img src={cake.cake_image} alt={cake.cake_name}/>
                </div>
                <div className="cakeDetail__description">
                    <p>{cake.cake_name}</p>
                    <p>Bread Type : {cake.bread_type}</p>
                    <p>Sugar Type : {cake.sugar_type}</p>
                    <p>Cream Type : {cake.cream_type}</p>
                    <button className="cake__buy">Place Order</button>
                </div>
            </div>
        </div>
    );
};

export default Cake_Detail;
