import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import axios from "axios";

const Cake_Detail = (props) => {

    let history = useHistory();
    let cake = props.location.state.cake;
    let data;

    const [status, setStatus] = useState();

    useEffect(() => {
        const getStatus = async () => {

            data = {
                bread_type: cake.bread_type,
                cream_type: cake.cream_type,
                sugar_type: cake.sugar_type,
                bread_qty_ordered: 5,
                cream_qty_ordered: 1,
                sugar_qty_ordered: 1
            }

            const response = await axios.get("https://zl6aa5spv2.execute-api.us-east-1.amazonaws.com/production/check/quantity", { params: data});
            setStatus(response.data.status);
        };
        getStatus();
    }, []);

    const purchase = async () => {

        data = {
            bread_type: cake.bread_type,
            cream_type: cake.cream_type,
            sugar_type: cake.sugar_type,
            bread_qty_ordered: 5,
            cream_qty_ordered: 1,
            sugar_qty_ordered: 1
        }

        const response = await axios.get("https://zl6aa5spv2.execute-api.us-east-1.amazonaws.com/production/payment", { params: data});

        if(response.data.status){
            alert("Order placed sucessfully :)");
        }else{
            alert("Order failed :(");
        }
        history.push('/');
    }

    return (
        <div className="cakeDetail">
            <div className="back" onClick={() => history.go(-1)}>
                <span>&#8592;</span>
            </div>
            <div className="cakeDetail__container">
                <div className="cakeDetail__image">
                    <img src={cake.cake_url} alt={cake.cake_name}/>
                </div>
                <div className="cakeDetail__description">
                    <p className="cakeDetail__name">{cake.cake_name}</p>
                    <p className="cakeDetail__type">Bread Type : {cake.bread_type}</p>
                    <p className="cakeDetail__type">Sugar Type : {cake.sugar_type}</p>
                    <p className="cakeDetail__type">Cream Type : {cake.cream_type}</p>
                    {
                        status === undefined ? null : status ? <button className="cakeDetail__purchase" onClick={purchase}>Place Order</button>
                            : <button className="cakeDetail__purchase">Out of Stock</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Cake_Detail;
