import React, { Fragment, useContext, useState, useEffect } from "react";
import { ProductContext } from "./index";
import { editProduct, getAllProduct } from "./FetchApi";
import { getAllBrand } from "../brands/FetchAPI";
const EditProductModal = (props) => {
  const { data, dispatch } = useContext(ProductContext);

  const [brands, setBrands] = useState(null);
  const [newImages, setNewImages] = useState([]);

  const alert = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );

  const [editformData, setEditformdata] = useState({
    id: "",
    nameProduct: "",
    description: "",
    images: [],
    status: "",
    brand: "",
    price: "",
    error: false,
    success: false,
  });

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    let responseData = await getAllBrand();
    if (responseData) {
      setBrands(responseData);
    }
  };

  useEffect(() => {
    setEditformdata({
      id: data.editProductModal.id,
      nameProduct: data.editProductModal.nameProduct,
      description: data.editProductModal.description,
      images: data.editProductModal.images || [],
      status: data.editProductModal.status,
      brand: data.editProductModal.brand || { id: "", nameBrand: "" },
      price: data.editProductModal.price,
    });
  }, [data.editProductModal]);

  const fetchData = async () => {
    let responseData = await getAllProduct();
    if (responseData && responseData.Products) {
      dispatch({
        type: "fetchProductsAndChangeState",
        payload: responseData.Products,
      });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    dispatch({ type: "loading", payload: true });
    try {
      let edit = await editProduct(
        { ...editformData, newImages },
        data.editProductModal
      );
      if (edit && edit.error) {
        setEditformdata({
          ...editformData,
          error: edit.error,
          success: false,
        });
      } else if (edit && edit.success) {
        setEditformdata({
          ...editformData,
          error: false,
          success: edit.success,
        });
        fetchData();
        dispatch({ type: "editProductModalClose", payload: true });
      } else {
        setEditformdata({
          ...editformData,
          error: "something went wrong",
          success: false,
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  };
  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={(e) =>
          dispatch({ type: "editProductModalClose", payload: false })
        }
        className={`${
          data.editProductModal.modal ? "" : "hidden"
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          data.editProductModal.modal ? "" : "hidden"
        } fixed inset-0 flex items-center z-30 justify-center overflow-auto`}
      >
        <div className="mt-32 md:mt-0 relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Edit Product
            </span>
            {/* Close Modal */}
            <span
              style={{ background: "#303031" }}
              onClick={(e) =>
                dispatch({ type: "editProductModalClose", payload: false })
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
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="name">Product Name *</label>
                <input
                  value={editformData.nameProduct}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      nameProduct: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  type="text"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="price">Product Price *</label>
                <input
                  value={editformData.price}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      price: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-2 border focus:outline-none"
                  id="price"
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
            {/* Most Important part for uploading multiple image */}
            <div className="flex flex-col mt-4">
              <label htmlFor="image">Product Images *</label>
              {/* Update the way images are displayed to include both current and
              new images */}
              <div className="flex space-x-1">
                {/* Add a delete button next to each image */}
                {editformData.images.map((image, index) => (
                  <div key={index} className="relative h-16 w-16">
                    <img
                      className="object-cover"
                      src={image}
                      alt={`productImage-${index}`}
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-0 bg-red-500 text-white"
                      onClick={() => {
                        const newImages = [...editformData.images];
                        newImages.splice(index, 1);
                        setEditformdata({ ...editformData, images: newImages });
                      }}
                    >
                      X
                    </button>
                  </div>
                ))}

                {newImages.map((image, index) => (
                  <div key={index} className="relative h-16 w-16">
                    <img
                      className="object-cover"
                      src={URL.createObjectURL(image)}
                      alt={`newImage-${index}`}
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-0 bg-red-500 text-white"
                      onClick={() => {
                        const newImagesArray = [...newImages];
                        newImagesArray.splice(index, 1);
                        setNewImages(newImagesArray);
                      }}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              <span className="text-gray-600 text-xs">Must need 2 images</span>
              <input
                onChange={(e) => {
                  setNewImages([...e.target.files]);
                }}
                type="file"
                accept=".jpg, .jpeg, .png"
                className="px-4 py-2 border focus:outline-none"
                id="image"
                multiple
              />
            </div>
            {/* Most Important part for uploading multiple image */}
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
                      brand: e.target.value,
                    })
                  }
                  name="status"
                  className="px-4 py-2 border focus:outline-none"
                  id="status"
                >
                  <option disabled value="">
                    Select a Brand
                  </option>
                  {brands && brands.length > 0
                    ? brands.map((elem) => {
                        return (
                          <Fragment key={elem.id}>
                            {editformData.brand.id &&
                            editformData.brand.id === elem.id ? (
                              <option
                                name="status"
                                value={elem.id}
                                key={elem.id}
                                selected
                              >
                                {elem.nameBrand}
                              </option>
                            ) : (
                              <option
                                name="status"
                                value={elem.id}
                                key={elem.id}
                              >
                                {elem.nameBrand}
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

export default EditProductModal;
