import React, { Fragment, useContext, useState, useEffect } from "react";
import { CategoryContext } from "./index";
import { editCategory, getAllCategory } from "./FetchApi";

const EditCategoryModal = () => {
  const { data, dispatch } = useContext(CategoryContext);

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
        <div className="relative bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg text-gray-900 z-50 overflow-y-auto">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <p className="text-2xl font-bold">Edit Category</p>
            <button onClick={handleClose} className="text-black close-modal">
              <svg
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 18 18"
              >
                <path
                  className="heroicon-ui"
                  d="M6.83 6L12 11.17 17.17 6 18 6.83 12.83 12 18 17.17 17.17 18 12 12.83 6.83 18 6 17.17 11.17 12 6.83 6 6 6.83z"
                />
              </svg>
            </button>
          </div>
          {/* End Modal Header */}

          {/* Modal Body */}
          <div className="p-4">
            <form>
              <div className="mb-4">
                <label className="text-xl text-gray-600">Name Category</label>
                <input
                  value={nameCategory}
                  onChange={(e) => setNameCategory(e.target.value)}
                  className="border-2 border-gray-300 p-2 w-full"
                  type="text"
                  placeholder="Name Category"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="text-xl text-gray-600">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border-2 border-gray-300 p-2 w-full"
                  type="text"
                  placeholder="Description"
                />
              </div>
              <div className="mb-4">
                <label className="text-xl text-gray-600">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="border-2 border-gray-300 p-2 w-full"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-3 rounded font-medium w-full"
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
