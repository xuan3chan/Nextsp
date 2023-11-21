import React from "react";
import imageSlogan from "../../assets/img/Vector.png";

function SloganItem(props) {
  return (
    <div className="h-24 flex content-center justify-center">
      <div className="SloganItem flex justify-center items-center border-black border-2 p-4 rounded-xl">
        <div className="flex flex-col">
          <h1 className="tilte_slogan flex items-center gap-1">
            {props.icon}
            {props.title}
          </h1>
          <p className="desc_slogan">{props.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default SloganItem;
