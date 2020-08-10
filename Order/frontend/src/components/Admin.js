import React, {useEffect, useState} from 'react';
import {useHistory, withRouter} from "react-router-dom";
import axios from "axios";

const Admin = () => {

    let history = useHistory();

    const [order, setOrder] = useState();

    useEffect(() => {
        const getOrder = async () => {
            const data = await axios.get("https://zl6aa5spv2.execute-api.us-east-1.amazonaws.com/production/order/getorder");
            setOrder(data.data.result);
        };
        getOrder();
    }, []);

    return (
        <div className="admin">
            <div className="back" onClick={() => history.go(-1)}>
                <span>&#8592;</span>
            </div>
            <table className="admin__container">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Timestamp</th>
                        <th>Bread Type</th>
                        <th>Bread Quantity</th>
                        <th>Cream Type</th>
                        <th>Cream Quantity</th>
                        <th>Sugar Type</th>
                        <th>Sugar Quantity</th>
                    </tr>
                </thead>
                <tbody>
                {
                    order?.map((order, index) => {
                        return(
                            <tr key={index}>
                                <td>{order.order_id}</td>
                                <td>{order.timestamp}</td>
                                <td>{order.bread_type}</td>
                                <td>{order.bread_qty}</td>
                                <td>{order.cream_type}</td>
                                <td>{order.cream_qty}</td>
                                <td>{order.sugar_type}</td>
                                <td>{order.sugar_qty}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
    );
};

export default withRouter(Admin);
