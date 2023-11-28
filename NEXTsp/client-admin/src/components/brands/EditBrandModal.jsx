import React, { Fragment, useContext, useState, useEffect } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import Select from "react-select";
import { BrandContext } from "./index";
import { editBrand, getAllBrand } from "./FetchAPI";
import { getAllCategory } from "../categories/FetchApi";

const EditBrandModal = () => {
  const { data, dispatch } = useContext(BrandContext);
  const [categories, setCategories] = useState(null);
  const { darkMode } = useContext(ThemeContext);
  const darkModal = darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
  const darkbtn = darkMode ? 'bg-[#2D9596] text-white' : 'bg-[#303031] text-gray-100'
  const darkfield = darkMode ? 'focus:border-[#2D9596] focus:border-2 bg-gray-700' : 'focus:border-black focus:border-2 bg-white border'

  const selectStyles = (darkMode) => ({
    option: (provided, state) => ({
      ...provided,
      backgroundColor: darkMode
        ? state.isFocused
          ? '#1A202C' // bg-gray-600 when focused in dark mode
          : '#2D3748' // bg-gray-700 in dark mode
        : state.isFocused
        ? '#F7FAFC' // bg-gray-100 when focused in light mode
        : 'white', // white in light mode
      color: darkMode ? 'white' : 'black',
    }),
  });

  const alert = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );

  const [editformData, setEditformdata] = useState({
    _id: "",
    nameBrand: "",
    description: "",
    status: "",
    category: [],
    error: false,
    success: false,
  });

  useEffect(() => {
    fetchCategoryData();
  }, [
    data.editBrandModal.modal
  ]);

  const fetchCategoryData = async () => {
    let responseData = await getAllCategory();
    if (responseData) {
      setCategories(responseData);
    } else {
      console.log(responseData);
    }
  };

  useEffect(() => {
    setEditformdata({
      ...editformData,
      _id: data.editBrandModal._id,
      nameBrand: data.editBrandModal.nameBrand,
      description: data.editBrandModal.description,
      status: data.editBrandModal.status,
      category: data.editBrandModal.category,
    });
  }, [data.editBrandModal]);

  const fetchData = async () => {
    let responseData = await getAllBrand();
    if (responseData && responseData.Brands) {
      dispatch({
        type: "fetchBrandAndChangeState",
        payload: responseData.Brands,
      });
    }
  };

  const getUnselectedCategories = () => {
    if (!categories) return [];
    const selectedCategoryIds = Array.isArray(editformData.category) ? editformData.category.map(c => c._id) : [];
    return categories.filter((c, index, self) => 
      index === self.findIndex((t) => (
        t._id === c._id && t.nameCategory === c.nameCategory
      )) && !selectedCategoryIds.includes(c._id)
    );
  };

  const handleChange = (e) => {
    if (e.target.name === "category") {
      const selectedCategoryIds = Array.isArray(editformData.category) ? editformData.category.map(c => c._id) : [];
      const newCategories = e.target.value
        .filter(_id => !selectedCategoryIds.includes(_id))
        .map(_id => categories.find(c => c._id === _id));
      const removedCategories = selectedCategoryIds.filter(_id => !e.target.value.includes(_id));
      setEditformdata(prevState => ({
        ...prevState,
        error: false,
        success: false,
        category: Array.isArray(prevState.category) 
          ? [...prevState.category.filter(c => !removedCategories.includes(c._id)), ...newCategories]
          : [...newCategories],
      }));
      console.log('Category added: ', newCategories);
      console.log('Category removed: ', removedCategories);
    } else {
      setEditformdata({
        ...editformData,
        error: false,
        success: false,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if nameBrand has changed
    const hasNameBrandChanged =
      editformData.nameBrand !== data.editBrandModal.nameBrand;

    // Prepare data to send to editBrand
    const dataToSend = hasNameBrandChanged
      ? { ...editformData }
      : {
          _id: editformData._id,
          description: editformData.description,
          status: editformData.status,
          category: editformData.category,
        };

    let response = await editBrand(dataToSend);

    if (response && response.error) {
      setEditformdata({
        ...editformData,
        error: response.error,
        success: false,
      });
      setTimeout(() => {
        setEditformdata({
          ...editformData,
          error: "Fail to update !",
          success: false,
        });
      }, 100);
    } else if (response && response.success) {
      setEditformdata({
        ...editformData,
        error: false,
        success: response.success,
      });
      fetchData();
      setTimeout(() => {
        setEditformdata({
          ...editformData,
          error: false,
          success: "Update complete !",
        });
      }, 100);
      setTimeout(() => {
        dispatch({ type: "editBrandModalClose", payload: false });
        window.location.reload();
      }, 1000);
    } else {
      console.error("Unknown error");
    }
  };
  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={(e) =>
          dispatch({ type: "editBrandModalOpen", payload: false })
        }
        className={`${
          data.editBrandModal.modal ? "" : "hidden"
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* End Black Overlay */}
      {/* Modal */}
      <div
        className={`${
          data.editBrandModal.modal ? "" : "hidden"
        } fixed inset-0 flex items-center z-30 justify-center overflow-auto`}
      >
        {/* Modal Content */}
        <div className="relative mx-auto w-11/12 md:w-3/5 lg:w-1/3 my-6">
          {/*Exit btn */}
          <button
            onClick={(e) =>
              dispatch({ type: "editBrandModalOpen", payload: false })
            }
            className="absolute right-0 top-0 m-6 text-3xl font-bold outline-none focus:outline-none"
          >
            <span className="text-white">&times;</span>
          </button>
          {/* End Exit btn */}
          {/*body */}
          <div className="relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className={`flex items-start justify-between p-5  ${darkModal}`}>
              <h3 className="text-3xl font-semibold">Edit Brand</h3>
              <span
              onClick={(e) =>
                dispatch({ type: "editBrandModalClose", payload: false })
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
            {/* Edit Form */}
            <form onSubmit={handleSubmit}>
              <div className={`relative p-6 flex-auto ${darkModal}`}>
                {editformData.error && alert(editformData.error, "red")}
                {editformData.success && alert(editformData.success, "green")}
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="nameBrand"
                  >
                    Name Brand
                  </label>
                  <input
                    className={`shadow appearance-none rounded w-full py-2 px-3 ${darkfield} leading-tight focus:outline-none focus:shadow-outline`}
                    value={editformData.nameBrand}
                    onChange={handleChange}
                    name="nameBrand"
                    type="text"
                    placeholder="Name Brand"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    className={`resize-none border rounded focus:outline-none focus:shadow-outline w-full h-24 px-3 py-2 ${darkfield}`}
                    value={editformData.description}
                    onChange={handleChange}
                    name="description"
                    type="text"
                    placeholder="Description"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="status"
                  >
                    Status
                  </label>
                  <select
                    className={`border rounded w-full py-2 px-3 ${darkfield} leading-tight focus:outline-none focus:shadow-outline`}
                    value={editformData.status}
                    onChange={handleChange}
                    name="status"
                    type="text"
                    placeholder="Status"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="category"
                  >
                    Category
                  </label>
                  <Select
                    isMulti
                    name="category"
                    options={
                      getUnselectedCategories().map((category, index) => ({
                        value: category._id,
                        label: category.nameCategory,
                        key: `${category.nameCategory}-${category._id}-${index}`,
                      }))
                    }
                    value={
                      Array.isArray(editformData.category) && editformData.category.length > 0
                        ? editformData.category.map((elem) => elem ? {
                            value: elem._id,
                            label: elem.nameCategory,
                          } : {})
                        : []
                    }
                    className="basic-multi-select"
                    classNamePrefix="select"
                    styles={selectStyles(darkMode)}
                    onChange={(selectedOptions) =>
                      handleChange({
                        target: {
                          name: "category",
                          value: selectedOptions ? selectedOptions.map((option) => option.value) : [],
                        },
                      })
                    }
                  />
                </div>
              </div>
              {/*Footer */}
              <div className={`flex items-center justify-center p-6 border-solid ${darkModal}`}>
                <button
                  className={`${darkbtn} font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full`}
                  type="submit"
                  style={{ transition: "all .15s ease" }}
                >
                  Save Changes
                </button>
              </div>
            </form>
            {/* End Edit Form */}
          </div>
          {/* End body */}
        </div>
        {/* End Modal Content */}
      </div>
    </Fragment>
  );
};

export default EditBrandModal;
