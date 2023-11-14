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
      console.log(responseData);
    } else {
      console.log(responseData);
    }
  };

  useEffect(() => {
    setEditformdata({
      ...editformData,
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

  const handleChange = (e) => {
    setEditformdata({
      ...editformData,
      error: false,
      success: false,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if nameBrand has changed
    const hasNameBrandChanged = editformData.nameBrand !== data.editBrandModal.nameBrand;

    // Prepare data to send to editBrand
    const dataToSend = hasNameBrandChanged 
      ? { ...editformData } 
      : { 
          id: editformData.id, 
          description: editformData.description, 
          status: editformData.status, 
          category: editformData.category 
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
        getAllBrand();
      },1000)
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
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-3xl font-semibold">Edit Brand</h3>
            </div>
            {/* Edit Form */}
            <form onSubmit={handleSubmit}>
              <div className="relative p-6 flex-auto">
                {editformData.error && alert(editformData.error, "red")}
                {editformData.success && alert(editformData.success, "green")}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="nameBrand"
                  >
                    Name Brand
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={editformData.nameBrand}
                    onChange={handleChange}
                    name="nameBrand"
                    type="text"
                    placeholder="Name Brand"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    className="resize-none border rounded focus:outline-none focus:shadow-outline w-full h-24 px-3 py-2 text-gray-700"
                    value={editformData.description}
                    onChange={handleChange}
                    name="description"
                    type="text"
                    placeholder="Description"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="status"
                  >
                    Status
                  </label>
                  <select
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="category"
                  >
                    Category
                  </label>
                  <select
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={editformData.category}
                    onChange={handleChange}
                    name="category"
                    placeholder="Category"
                  >
                    {categories && categories.length > 0 ? (
                      categories.map((elem) => (
                        <option
                          key={elem._id}
                          value={elem._id}
                        >
                          {elem.nameCategory}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        No Category Found
                      </option>
                    )}
                  </select>
                </div>
              </div>
              {/*Footer */}
              <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                <button
                  onClick={(e) =>
                    dispatch({ type: "editBrandModalClose", payload: false })
                  }
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  style={{ transition: "all .15s ease" }}
                >
                  Close
                </button>
                <button
                  className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
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
