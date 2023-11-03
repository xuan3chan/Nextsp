import React, { Fragment, useContext, useState, useEffect } from "react";
import { ProductContext } from "./index";
import { getAllProduct, editProduct } from "./FetchApi";
import { getAllBrand } from "../brands/FetchAPI";

const EditProductModal = (props) => {
  const { data, dispatch } = useContext(ProductContext);

  const [brands, setBrands] = useState(null);

  const removeImage = (index) => {
    const updatedImages = [...fData.images];
    updatedImages.splice(index, 1);
    setFdata({ ...fData, images: updatedImages });
  };

  const message = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );
  const [fData, setFdata] = useState({
    id: "",
    nameProduct: "",
    description: "",
    images: null,
    status: "Active",
    brand: "",
    price: "",
    success: false,
    error: false,
  });

  const fetchData = async () => {
    let responseData = await getAllProduct();
    setTimeout(() => {
      if (responseData && responseData.Products) {
        dispatch({
          type: "fetchProductsAndChangeState",
          payload: responseData.Products,
        });
      }
    }, 1000);
  };

  useEffect(() => {
    fetchBrandData();
  }, []);

  const fetchBrandData = async () => {
    let responseData = await getAllBrand();
    if (responseData) {
      setBrands(responseData);
    } else {
      console.log(responseData);
    }
  };

  useEffect(() => {
    setFdata({
      id: data.editProductModal.id,
      nameProduct: data.editProductModal.nameProduct,
      description: data.editProductModal.description,
      images: data.editProductModal.images,
      status: data.editProductModal.status,
      brand: data.editProductModal.brand,
      price: data.editProductModal.price,
    });
  }, [data.editProductModal]);

  const submitForm = async (e) => {
    e.preventDefault();
    e.target.reset();

    if (!fData.nameProduct) {
      setFdata({ ...fData, error: "Please give the name!" });
      setFdata({ ...fData, error: false });
    }

    try {
      let responseData = await editProduct(fData);
      if (responseData.success) {
        setTimeout(() => {
          setFdata({
            ...fData,
            id: "",
            nameProduct: "",
            description: "",
            images: null,
            status: "Active",
            brand: "",
            price: "",
            success: "Edit product complete !",
            error: false,
          });
        }, 2500);
        setFdata({
          ...fData,
          id: "",
          nameProduct: "",
          description: "",
          images: null,
          status: "Active",
          brand: "",
          price: "",
          success: "Edit product complete !",
          error: false,
        });
        dispatch({ type: "editProductModalClose" });
        fetchData();
      } else {
        setFdata({
          ...fData,
          error: "Edit product failed !",
          success: false,
        });
        setFdata({
          ...fData,
          error: "Edit product failed !",
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <div
        className={`${
          data.editProductModal.modal ? "" : "hidden"
        } fixed z-10 inset-0 overflow-y-auto`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            {fData.success && message(fData.success, "green")}
            {fData.error && message(fData.error, "red")}
            <form onSubmit={submitForm}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Edit Product
                    </h3>
                    <div className="mt-2">
                      <div className="flex flex-col">
                        <label className="leading-loose">Name Product</label>
                        <input
                          type="text"
                          name="nameProduct"
                          value={fData.nameProduct}
                          onChange={(e) =>
                            setFdata({
                              ...fData,
                              nameProduct: e.target.value,
                            })
                          }
                          placeholder="Name Product"
                          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="leading-loose">Description</label>
                        <textarea
                          type="text"
                          name="description"
                          value={fData.description}
                          onChange={(e) =>
                            setFdata({
                              ...fData,
                              description: e.target.value,
                            })
                          }
                          placeholder="Description"
                          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col mt-4">
                        <label htmlFor="image">Product Images *</label>
                        {fData.images && fData.images.length > 0 ? (
                          <div className="flex space-x-1">
                            {fData.images.map((image, index) => (
                              <div key={index} className="relative overflow-hidden">
                                <img
                                  className="h-16 w-16 object-fill"
                                  src={image}
                                  alt={`productImage-${index}`}
                                />
                                <button
                                  onClick={() => removeImage(index)}
                                  className="absolute top-[-10px] right-0 text-lg"
                                >x</button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          ''
                        )}
                        <span className="text-gray-600 text-xs">Must need 2 images</span>
                        <input
                          onChange={(e) =>
                            setFdata({
                              ...fData,
                              error: false,
                              success: false,
                              images: [...e.target.files],
                            })
                          }
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          className="px-4 py-2 border focus:outline-none"
                          id="image"
                          multiple
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="leading-loose">Status</label>
                        <select
                          name="status"
                          value={fData.status}
                          onChange={(e) =>
                            setFdata({
                              ...fData,
                              status: e.target.value,
                            })
                          }
                          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                      <div className="flex flex-col">
                        <label className="leading-loose">Brand</label>
                        <select
                          name="brand"
                          onChange={(e) =>
                            setFdata({
                              ...fData,
                              brand: e.target.value,
                            })
                          }
                          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="">Select Brand</option>
                          {brands && brands.length > 0
                            ? brands.map((elem) => {
                                return (
                                  <Fragment key={elem.id}>
                                    {fData.brand.id &&
                                      fData.brand.id === elem.id ? (
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
                      <div className="flex flex-col">
                        <label className="leading-loose">Price</label>
                        <input
                          type="number"
                          name="price"
                          value={fData.price}
                          onChange={(e) =>
                            setFdata({
                              ...fData,
                              price: e.target.value,
                            })
                          }
                          placeholder="Price"
                          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => dispatch({ type: "editProductModalClose" })}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditProductModal;
