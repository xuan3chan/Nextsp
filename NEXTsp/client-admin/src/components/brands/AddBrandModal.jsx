import React, { Fragment, useContext, useState, useEffect } from "react";
import Select from "react-select";
import { BrandContext } from "./index";
import { ThemeContext } from "../theme/ThemeContext";
import { createBrand, getAllBrand } from "./FetchAPI";
import { getAllCategory } from "../categories/FetchApi";

const AddBrandDetail = ({ categories, isDarkMode }) => {
  const { data, dispatch } = useContext(BrandContext);
  const { darkMode , setDM } = useContext(ThemeContext)

  const selectStyles = (isDarkMode) => ({
    option: (provided, state) => ({
      ...provided,
      backgroundColor: isDarkMode
        ? state.isFocused
          ? '#1A202C' // bg-gray-600 when focused in dark mode
          : '#2D3748' // bg-gray-700 in dark mode
        : state.isFocused
        ? '#F7FAFC' // bg-gray-100 when focused in light mode
        : 'white', // white in light mode
      color: isDarkMode ? 'white' : 'black',
    }),
  });
  const darkfield = darkMode ? 'focus:border-[#2D9596] focus:border-2 bg-gray-700' : 'focus:border-black focus:border-2 bg-white border'
  const darkbtn = darkMode ? 'bg-[#2D9596] text-white' : 'bg-[#303031] text-gray-100'
  const darkModal = darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'

  const alert = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );

  const [fData, setFdata] = useState({
    nameBrand: "",
    description: "",
    status: "Active",
    category: [],
    success: false,
    error: false,
  });

  const fetchData = async () => {
    let responseData = await getAllBrand();
    setTimeout(() => {
      if (responseData && responseData.Brands) {
        dispatch({
          type: "fetchBrandAndChangeState",
          payload: responseData.Brands,
        });
      }
    }, 1000);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    e.target.reset();

    if (!fData.nameBrand || !fData.category || fData.category.length === 0) {
      setFdata({ ...fData, error: "Please give the name and select at least one category!" });
      setTimeout(() => {
        setFdata({ ...fData, error: false });
      }, 100);
    }

    try {
      let responseData = await createBrand(fData);
      if (responseData.success) {
        fetchData();
        setFdata({
          ...fData,
          nameBrand: "",
          description: "",
          status: "Active",
          category: "",
          success: responseData.success,
          error: false,
        });
        setFdata({
          ...fData,
          nameBrand: "",
          description: "",
          status: "Active",
          category: "",
          success: "Add brand complete",
          error: false,
        });
        setTimeout(() => {
          window.location.reload();
        },1000)
      } else if (responseData.error) {
        setFdata({ ...fData, success: false, error: responseData.error });
        setTimeout(() => {
          return setFdata({ ...fData, error: false, success: false });
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={(e) => dispatch({ type: "addBrandModal", payload: false })}
        className={`${
          data.addBrandModal ? "" : "hidden"
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          data.addBrandModal ? "" : "hidden"
        } fixed inset-0 flex items-center z-30 justify-center overflow-auto`}
      >
        <div className={`mt-32 md:mt-0 relative ${darkModal} w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8`}>
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Add Brand
            </span>
            {/* Close Modal */}
            <span
              onClick={(e) =>
                dispatch({ type: "addBrandModal", payload: false })
              }
              className={`cursor-pointer ${darkbtn} py-2 px-2 rounded-full`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
          {fData.error ? alert(fData.error, "red") : ""}
          {fData.success ? alert(fData.success, "green") : ""}
          <form className="w-full" onSubmit={(e) => submitForm(e)}>
            <div className="flex space-x-1 py-4">
              <div className="w-full flex flex-col space-y-1 space-x-1">
                <label htmlFor="name">Brand Name *</label>
                <input
                  value={fData.nameBrand}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      nameBrand: e.target.value,
                    })
                  }
                  className={`px-4 py-2 focus:outline-none ${darkfield}`}
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="description">Brand Description *</label>
              <textarea
                value={fData.description}
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    error: false,
                    success: false,
                    description: e.target.value,
                  })
                }
                className={`px-4 py-2 focus:outline-none ${darkfield}`}
                name="description"
                id="description"
                cols={5}
                rows={2}
              />
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="status">Brand Status *</label>
                <select
                  value={fData.status}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      status: e.target.value,
                    })
                  }
                  name="status"
                  className={`px-4 py-2 focus:outline-none ${darkfield}`}
                  id="status"
                >
                  <option name="status" value="Active">
                    Active
                  </option>
                  <option name="status" value="Inactive">
                    Inactive
                  </option>
                </select>
              </div>
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="status">Brand Category *</label>
                  <Select
                  isMulti
                  name="category"
                  options={categories.map((category, index) => ({
                    value: category._id,
                    label: category.nameCategory,
                    key: `${category.nameCategory}-${category._id}-${index}`,
                  }))}
                  className={`select ${darkfield}`}
                  classNamePrefix="select"
                  styles={selectStyles(isDarkMode)}
                  onChange={(selectedOptions) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      category: selectedOptions ? selectedOptions.map((option) => option.value) : [],
                    })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
              <button
                type="submit"
                className={`rounded-full ${darkbtn} text-lg font-medium py-2`}
              >
                Create Brand
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};


const AddBrandModal = (props) => {
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const [allCat, setAllCat] = useState([]); // Initialize allCat as an empty array

  const fetchCategoryData = async () => {
    let responseData = await getAllCategory();
    if (responseData && Array.isArray(responseData)) { // Check if responseData is an array
      setAllCat(responseData);
    }
  };

  return (
    <Fragment>
      <AddBrandDetail categories={allCat} isDarkMode={darkMode} />
    </Fragment>
  );
};


export default AddBrandModal;
