import React, {useState, useEffect} from "react";
import {withRouter, useHistory} from "react-router-dom";
import axios from "axios";

const Customize = (props) => {

    let history = useHistory();
    const [bread, setBread] = useState();

    useEffect(() => {
        const getBreadType = async () => {
            const data = await axios.get("https://dlm008cgo1.execute-api.us-east-1.amazonaws.com/prod/bread/allbreads");
            setBread(data.data.result);
        };
        getBreadType();
    }, []);

    return (
        <div className="customize">
            <div className="customize__back" onClick={() => history.push('/')}>
                <span>&#8592;</span>
            </div>
            <div>Customize</div>
            <select>
                <option> -</option>
                {
                    bread?.map((item, index) => (<option key={index}>{item.bread_type}</option>))
                }
            </select>
        </div>
    );
};

export default withRouter(Customize);
