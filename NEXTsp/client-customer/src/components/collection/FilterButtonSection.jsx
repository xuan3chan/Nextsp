import React from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";
import {useState} from "react";
import {BsSortDown} from "react-icons/bs";

function FilterButtonSection(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex gap-6 ml-20 mt-6">
      <button className="btnFilter btnSort">
        Lọc <CiFilter></CiFilter>
      </button>
      <button className="btnFilter btnPrice">
        Giá<BiSolidDownArrow></BiSolidDownArrow>
      </button>
      <button className="btnFilter btnBrand">
        Thương Hiệu<BiSolidDownArrow></BiSolidDownArrow>
      </button>
      <button className="btnFilter btnCategory">
        Danh Mục<BiSolidDownArrow></BiSolidDownArrow>
      </button>
      <div>
      <button className ="btnFilter btnSort" onClick={toggleDropdown}><BsSortDown></BsSortDown>Sắp Xếp Theo</button>

      {isOpen && (
        <div className="sort-dropdown">
          <a href="/#">Giá: Thấp đến Cao</a>
          <a href="/#">Giá: Cao đên Thấp</a>
          <a href="/#">Bán Chạy</a>
        </div>
      )}
      </div>
    </div>
  );
}

export default FilterButtonSection;
