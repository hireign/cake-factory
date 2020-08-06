import React from 'react';

const Cake = (props) => {
    return (
        <div className="cake">
            <div className="cake__image">
                <img src="" alt={props.cake.cake_name}/>
            </div>
            <div className="cake__details">
                <p>{props.cake.cake_name}</p>
                <p>{props.cake.sugar_type}</p>
                <p>{props.cake.bread_type}</p>
                <p>{props.cake.cream_type}</p>
            </div>
        </div>
    );
};

export default Cake;
