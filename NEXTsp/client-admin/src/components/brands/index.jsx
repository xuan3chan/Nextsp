import React, { Fragment, createContext, useReducer } from "react";
import AdminLayout from "../layout/AdminLayout";
import BrandMenu from './BrandMenu'
import AllBrand from './AllBrands'
import { brandState, brandReducer } from "./BrandContext";

export const BrandContext = createContext();


const BrandComponent = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      <BrandMenu/>
      <AllBrand/>
    </div>
  )
}

const Brands = (props) => {
  const [data, dispatch] = useReducer(brandState, brandReducer);
  return (
    <Fragment>
      <BrandContext.Provider value={{ data, dispatch }}>
        <AdminLayout children={<BrandComponent />} />
      </BrandContext.Provider>
    </Fragment>
  );
}

export default Brands
