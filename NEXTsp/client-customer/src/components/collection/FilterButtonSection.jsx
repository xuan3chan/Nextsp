import React, { useEffect } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";
import { useState } from "react";
import { BsSortDown } from "react-icons/bs";

function FilterButtonSection(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = React.useState(props.products);

  useEffect(() => {
    setProducts(props.products);
    console.log(products);
  }, [props.products]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const sortIncreasing = () => {
    const sortedProducts = [...products].sort((a, b) =>
      a.price > b.price ? 1 : -1
    );
    setProducts(sortedProducts);
  };

  const sortDecreasing = () => {
    const sortProducts = [...products].sort((a, b) =>
      a.price < b.price ? 1 : -1
    );
    setProducts(sortProducts);
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
        <button className="btnFilter btnSort" onClick={toggleDropdown}>
          <BsSortDown></BsSortDown>Sắp Xếp Theo
        </button>

        {isOpen && (
          <div className="sort-dropdown flex flex-col">
            <button onClick={sortIncreasing}>Giá: Thấp đến Cao</button>
            <button onClick={sortDecreasing}>Giá: Cao đên Thấp</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterButtonSection;
