import React, { Fragment, createContext, useReducer, useContext } from "react";
import AdminLayout from "../layout/AdminLayout";
import AllProducts from "./AllProducts";
import { ThemeContext } from "../theme/ThemeContext";
import ProductsMenu from "./ProductsMenu";
import { productState, productReducer } from "./ProductContext";

export const ProductContext = createContext();

const ProductComponent = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext)
  const darkBg = darkMode ? 'bg-gray-800' : ''

  return (
    <div className= {`grid grid-cols-1 space-y-4 p-4 ${darkBg}`}>
      <ProductsMenu/>
      <AllProducts />
    </div>
  );
};

const Products = (props) => {
  const [data, dispatch] = useReducer(productReducer, productState);
  
  return (
    <Fragment>
      <ProductContext.Provider value={{ data, dispatch }}>
        <AdminLayout children={<ProductComponent />} />
      </ProductContext.Provider>
    </Fragment>
  );
};

export default Products;
