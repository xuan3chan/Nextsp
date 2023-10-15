import React from 'react';
import imageSlogan from "../../assets/img/Vector.png";

function SloganItem(props) {
    return (
        <div className='w-1/4 h-24'>
            <div className="SloganItem flex justify-items-center	">
            <img src={imageSlogan} alt="" className="image_slogan w-6 h-6 mr-0.5"></img>
            <div className="flex flex-col w-96">
            <h1 className="tilte_slogan">{props.title}</h1>
            <p className="desc_slogan">{props.desc}</p>
            </div>
            </div>
        </div>
    );
}

export default SloganItem;