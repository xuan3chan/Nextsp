import React, { Fragment, createContext, useReducer, useContext } from "react";
import AdminLayout from "../layout/AdminLayout";
import BrandMenu from './BrandMenu'
import { ThemeContext } from "../theme/ThemeContext";
import AllBrand from './AllBrands'
import { brandState, brandReducer } from "./BrandContext";


export const BrandContext = createContext();

const BrandComponent = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext)
  const darkBg = darkMode ? 'bg-gray-800' : ''

  return (
    <div className= {`grid grid-cols-1 space-y-4 p-4 ${darkBg}`}>
      <BrandMenu/>
      <AllBrand/>
    </div>
  )
}

const Brands = (props) => {
  const [data, dispatch] = useReducer(brandReducer,brandState);
  return (
    <Fragment>
      <BrandContext.Provider value={{ data, dispatch }}>
        <AdminLayout children={<BrandComponent />} />
      </BrandContext.Provider>
    </Fragment>
  );
}

export default Brands
