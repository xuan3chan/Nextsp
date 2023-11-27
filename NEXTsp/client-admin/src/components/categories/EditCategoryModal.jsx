import React, { Fragment, useContext, useState, useEffect } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { CategoryContext } from "./index";
import { editCategory, getAllCategory } from "./FetchApi";

const EditCategoryModal = () => {
  const { data, dispatch } = useContext(CategoryContext);
  const { darkMode , setDM } = useContext(ThemeContext)
  const darkModal = darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
  const darkbtn = darkMode ? 'bg-[#2D9596] text-white' : 'bg-[#303031] text-gray-100'
  const darkfield = darkMode ? 'focus:border-[#2D9596] focus:border-2 bg-gray-700' : 'focus:border-black focus:border-2 bg-white border'

  const [_id, set_id] = useState("");
  const [nameCategory, setNameCategory] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    set_id(data.editCategoryModal._id);
    setNameCategory(data.editCategoryModal.nameCategory);
    setDescription(data.editCategoryModal.description);
    setStatus(data.editCategoryModal.status);
  }, [data.editCategoryModal.modal]);

  const handleClose = () => {
    dispatch({ type: "editCategoryModalClose" });
  };

  const fetchData = async () => {
    let responseData = await getAllCategory();
    if (responseData.Categories) {
      dispatch({
        type: "fetchCategoryAndChangeState",
        payload: responseData.Categories,
      });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    let responseData = await editCategory(_id, nameCategory, description, status);
    if (responseData && responseData.error) {
      console.log(responseData.error);
    } else {
      dispatch({ type: "editCategoryModalClose" });
      fetchData();
      window.location.reload();
    }
  }

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={handleClose}
        className={`${data.editCategoryModal.modal ? "" : "hidden"} fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${data.editCategoryModal.modal ? "" : "hidden"} fixed inset-0 m-4 flex items-center justify-center z-40`}
      >
        {/* Modal Inner */}
        <div className={`relative w-11/12 md:max-w-md mx-auto rounded shadow-lg ${darkModal} z-50 overflow-y-auto`}>
          {/* Modal Header */}
          <div className="flex items-center justify-between w-full pt-4 px-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Add Category
            </span>
            {/* Close Modal */}
            <span
              onClick={(e) =>
                dispatch({ type: "editCategoryModalClose" })
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
          {/* End Modal Header */}

          {/* Modal Body */}
          <div className="p-4">
            <form>
              <div className="mb-4">
                <label className="text-xl ">Name Category</label>
                <input
                  value={nameCategory}
                  onChange={(e) => setNameCategory(e.target.value)}
                  className={`${darkfield} focus:outline-none  p-2 w-full`}
                  type="text"
                  placeholder="Name Category"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="text-xl ">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`${darkfield} focus:outline-none  p-2 w-full`}
                  type="text"
                  placeholder="Description"
                />
              </div>
              <div className="mb-4">
                <label className="text-xl ">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={`${darkfield} focus:outline-none  p-2 w-full`}
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className={`${darkbtn} px-4 py-3 rounded font-medium w-full`}
                  onClick={submitForm}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
          {/* End Modal Body */}
        </div>
        {/* End Modal Inner */}
      </div>
      {/* End Modal */}
    </Fragment>
  );
};

export default EditCategoryModal;
