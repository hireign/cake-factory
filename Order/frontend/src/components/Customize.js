import React, {useState, useEffect} from "react";
import {withRouter, useHistory} from "react-router-dom";
import axios from "axios";

const Customize = (props) => {

    let history = useHistory();
    const [bread, setBread] = useState();
    const [sugar, setSugar] = useState();
    const [cream, setCream] = useState();
    const [breadType, setBType] = useState();
    const [creamType, setCType] = useState();
    const [sugarType, setSType] = useState();

    const getType = async () => {
        const bType = await axios.get("http://localhost:5000/ingredient/bread");
        setBread(bType.data.breadType);

        const sType = await axios.get("http://localhost:5000/ingredient/sugar");
        console.log(sType);
        setSugar(sType.data.sugarType);

        const cType = await axios.get("http://localhost:5000/ingredient/cream");
        setCream(cType.data.creamType);
    };

    const fetchBread = (e) => {
        setBType(e.target.value);
    }

    const fetchCream = (e) => {
        setCType(e.target.value);
    }

    const fetchSugar = (e) => {
        setSType(e.target.value);
    }

    const createCake = () => {

        if(breadType === undefined || creamType === undefined || sugarType === undefined){
            alert("Please select the type");
        }else{
            const cake = {
                cake_image: "",
                cake_name: "Customized Cake",
                bread_type: breadType,
                sugar_type: sugarType,
                cream_type: creamType
            }
            history.push('/cake', {
                cake: cake
            })
        }
    }

    useEffect(() => {
        getType();
    }, []);

    return (
        <div className="customize">
            <div className="back" onClick={() => history.go(-1)}>
                <span>&#8592;</span>
            </div>
            <div className="customize__container">
                <button className="customize__create" onClick={createCake}>Create your cake</button>
                <div className="customize__filter">
                    <select className="customize__select" onChange={fetchBread} defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled>Bread Type</option>
                        {
                            bread?.map((item, index) => (<option key={index}>{item}</option>))
                        }
                    </select>
                    <select className="customize__select" onChange={fetchSugar} defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled>Sugar Type</option>
                        {
                            sugar?.map((item, index) => (<option key={index}>{item}</option>))
                        }
                    </select>
                    <select className="customize__select" onChange={fetchCream} defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled>Cream Type</option>
                        {
                            cream?.map((item, index) => (<option key={index}>{item}</option>))
                        }
                    </select>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Customize);
