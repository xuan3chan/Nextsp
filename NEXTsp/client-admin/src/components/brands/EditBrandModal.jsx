import React, { Fragment, useContext, useState, useEffect } from "react";
import { BrandContext } from "./index";
import { editBrand, getAllBrand } from "./FetchAPI";
import { getAllCategory } from "../categories/FetchApi";

const EditBrandModal = () => {
  const { data, dispatch } = useContext(BrandContext);

  const [categories, setCategories] = useState(null);

  const alert = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );

  const [editformData, setEditformdata] = useState({
    id: "",
    nameBrand: "",
    description: "",
    status: "",
    category: "",
    error: false,
    success: false,
  });

  useEffect(() => {
    fetchCategoryData();
  }, []);

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
      id: data.editBrandModal.id,
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

  const submitForm = async () => {
    dispatch({ type: "loading", payload: true });
    let edit = await editBrand(
      editformData.id,
      editformData.nameBrand,
      editformData.description,
      editformData.status,
      editformData.category
    );
    if (edit.error) {
      console.log(edit.error);
      dispatch({ type: "loading", payload: false });
    } else if (edit.success) {
      console.log(edit.success);
      dispatch({ type: "editBrandModalClose" });
      setTimeout(() => {
        dispatch({ type: "loading", payload: false });
        fetchData();
      }, 3000);
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
      {/* Modal Start */}
      <div
        className={`${
          data.editBrandModal.modal ? "" : "hidden"
        } fixed inset-0 flex items-center z-30 justify-center overflow-auto`}
      >
        <div className="mt-32 md:mt-0 relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Edit Brand
            </span>
            {/* Close Modal */}
            <span
              style={{ background: "#303031" }}
              onClick={(e) =>
                dispatch({ type: "editBrandModalClose", payload: false })
              }
              className="cursor-pointer text-gray-100 py-2 px-2 rounded-full"
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
          {editformData.error ? alert(editformData.error, "red") : ""}
          {editformData.success ? alert(editformData.success, "green") : ""}
          <form className="w-full" onSubmit={(e) => submitForm(e)}>
            <div className="flex space-x-1 py-4">
              <div className="w-full flex flex-col space-y-1 space-x-1">
                <label htmlFor="name">Product Name *</label>
                <input
                  value={editformData.nameBrand}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      nameBrand: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="description">Product Description *</label>
              <textarea
                value={editformData.description}
                onChange={(e) =>
                  setEditformdata({
                    ...editformData,
                    error: false,
                    success: false,
                    description: e.target.value,
                  })
                }
                className="px-4 py-2 border focus:outline-none"
                name="description"
                id="description"
                cols={5}
                rows={2}
              />
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="status">Product Status *</label>
                <select
                  value={editformData.status}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      status: e.target.value,
                    })
                  }
                  name="status"
                  className="px-4 py-2 border focus:outline-none"
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
                <label htmlFor="status">Product Category *</label>
                <select
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      category: e.target.value,
                    })
                  }
                  name="status"
                  className="px-4 py-2 border focus:outline-none"
                  id="status"
                >
                  <option disabled value="">
                    Select a category
                  </option>
                  {categories && categories.length > 0
                    ? categories.map((elem) => {
                        return (
                          <Fragment key={elem._id}>
                            {editformData.category._id &&
                            editformData.category._id === elem._id ? (
                              <option
                                name="status"
                                value={elem._id}
                                key={elem._id}
                                selected
                              >
                                {elem.nameCategory}
                              </option>
                            ) : (
                              <option
                                name="status"
                                value={elem._id}
                                key={elem._id}
                              >
                                {elem.nameCategory}
                              </option>
                            )}
                          </Fragment>
                        );
                      })
                    : ""}
                </select>
              </div>
            </div>
            <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
              <button
                style={{ background: "#303031" }}
                type="submit"
                className="rounded-full bg-gray-800 text-gray-100 text-lg font-medium py-2"
              >
                Update product
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditBrandModal;
