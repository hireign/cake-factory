import React, {useState, useEffect} from "react";
import {withRouter, useHistory} from "react-router-dom";
import axios from "axios";

const Customize = (props) => {

    let history = useHistory();
    const [bread, setBread] = useState();
    const [sugar, setSugar] = useState();
    const [cream, setCream] = useState();

    useEffect(() => {
        const getType = async () => {
            const bType = await axios.get("http://localhost:5000/ingredient/bread");
            setBread(bType.data.breadType);

            const sType = await axios.get("http://localhost:5000/ingredient/sugar");
            setSugar(sType.data.sugarType);

            const cType = await axios.get("http://localhost:5000/ingredient/cream");
            setCream(cType.data.creamType);
        };
        getType();
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
            <select>
                <option> -</option>
                {
                    sugar?.map((item, index) => (<option key={index}>{item.sugar_type}</option>))
                }
            </select>
            <select>
                <option> -</option>
                {
                    cream?.map((item, index) => (<option key={index}>{item.cream_type}</option>))
                }
            </select>
        </div>
    );
};

export default withRouter(Customize);
