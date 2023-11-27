import React, { Fragment, createContext, useContext, useReducer } from "react";
import AdminLayout from "../layout/AdminLayout";
import AllCategories from "./AllCategories";
import CategoryMenu from "./CategoryMenu";
import { ThemeContext } from "../theme/ThemeContext";
import { categoryState, categoryReducer } from "./CategoryContext";

/* This context manage all of the caregories component's data */
export const CategoryContext = createContext();

const CategoryComponent = () => {

  const { darkMode, setDarkMode } = useContext(ThemeContext)
  const darkBg = darkMode ? 'bg-gray-800' : ''

  return (
    <div className= {`grid grid-cols-1 space-y-4 p-4 ${darkBg}`}>
      <CategoryMenu />
      <AllCategories />
    </div>
  );
};

const Categories = (props) => {
  const [data, dispatch] = useReducer(categoryReducer, categoryState);
  return (
    <Fragment>
      <CategoryContext.Provider value={{ data, dispatch }}>
        <AdminLayout children={<CategoryComponent />} />
      </CategoryContext.Provider>
    </Fragment>
  );
};

export default Categories;
