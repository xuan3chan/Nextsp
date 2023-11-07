import React from "react";
import '../../assets/css/collection.css';
function Paginnation(props) {
  return (
    <div className="flex contents-center justify-center mr-auto ml-auto w-full mt-4">

      <div className="pagination ">
        <a href="/login">&laquo;</a>
        <a href="/collection/1">1</a>
        <a href="/collection/1" className="active">
          2
        </a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">6</a>
        <a href="#">&raquo;</a>
      </div>
    </div>
  );
}

export default Paginnation
