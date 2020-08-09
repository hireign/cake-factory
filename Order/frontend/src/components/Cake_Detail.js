import React from 'react';
import {useHistory} from "react-router-dom";
import axios from "axios";

const Cake_Detail = (props) => {

    let history = useHistory();
    let cake = props.location.state.cake;

    const purchase = async () => {

        const data = {
            bread_type: cake.bread_type,
            cream_type: cake.cream_type,
            sugar_type: cake.sugar_type,
            bread_qty_ordered: 5,
            cream_qty_ordered: 1,
            sugar_qty_ordered: 1
        }

        const status = await axios.get("https://zl6aa5spv2.execute-api.us-east-1.amazonaws.com/production/payment", { data: data});
        console.log(status);
    }

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
                    <button className="cake__buy" onClick={purchase}>Place Order</button>
                </div>
            </div>
        </div>
    );
};

export default Cake_Detail;
