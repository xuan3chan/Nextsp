import React, { Fragment, useContext, useState, useEffect } from "react";
import { ProductContext } from "./index";
import { getAllProduct, editProduct } from "./FetchApi";
import { getAllBrand } from "../brands/FetchAPI";

const EditProductModal = (props) => {
  const { data, dispatch } = useContext(ProductContext);

  const [brands, setBrands] = useState(null);

  const message = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );

  const [fData, setFdata] = useState({
    id: "",
    nameProduct: "",
    description: "",
    images: null,
    newImages: null,
    status: "Active",
    brand: "",
    price: "",
    error: false,
    success: false,
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

    if (!fData.nameProduct) {
      setFdata({ ...fData, error: "Please give the name!" });
      setFdata({ ...fData, error: false });
    }


    try {
      let responseData = await editProduct(fData);
      if (responseData.success) {
        fetchData();
        setFdata({
          ...fData,
          success: "Edit product successfully !",
          error: false,
        });
        setTimeout(() => {
          return setFdata({
            ...fData,
            success: responseData.success,
          });
        }, 2000);
      } else if (responseData.error) {
        setFdata({ ...setFdata, error: responseData.error });
        setTimeout(() => {
          return setFdata({
            ...fData,
            error: responseData.error,
          });
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
        onClick={(e) =>
          dispatch({ type: "editProductModalClose", payload: false })
        }
        className={`${
          data.editProductModal.modal ? "" : "hidden"
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* End black Overlay */}
      {/* Modal Start */}
      <div
        className={`${
          data.editProductModal.modal ? "" : "hidden"
        } fixed inset-0 flex items-center justify-center z-40 overflow-auto`}
      >
        <div className="mt-32 md:mt-0 relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Edit Product
            </span>
            <button
              onClick={(e) =>
                dispatch({ type: "editProductModalClose", payload: false })
              }
              className="text-black close-modal"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>
          <form
            onSubmit={submitForm}
            className="w-full flex flex-col space-y-4"
          >
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="nameProduct"
                className="text-sm font-semibold text-gray-500"
              >
                Name Product
              </label>
              <input
                type="text"
                name="nameProduct"
                id="nameProduct"
                value={fData.nameProduct}
                onChange={(e) =>
                  setFdata({ 
                    ...fData, 
                    error: false,
                    success: false,
                    nameProduct: e.target.value 
                  })
                }
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="description"
                className="text-sm font-semibold text-gray-500"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={fData.description}
                onChange={(e) =>
                  setFdata({ ...fData, description: e.target.value })
                }
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="status"
                className="text-sm font-semibold text-gray-500"
              >
                Status
              </label>
              <select
                name="status"
                id="status"
                value={fData.status}
                onChange={(e) => setFdata({ ...fData, status: e.target.value })}
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option
                  value="
                  Active"
                >
                  Active
                </option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="brand"
                className="text-sm font-semibold text-gray-500"
              >
                Brand
              </label>
              <select
                name="brand"
                id="brand"
                onChange={(e) => setFdata({ ...fData, brand: e.target.value })}
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option disabled value="">
                  Select a category
                </option>
                {brands && brands.length > 0
                  ? brands.map((elem) => {
                      return (
                        <Fragment key={elem.id}>
                          {fData.brand.id && fData.brand.id === elem.id ? (
                            <option
                              name="status"
                              value={elem.id}
                              key={elem.id}
                              selected
                            >
                              {elem.nameBrand}
                            </option>
                          ) : (
                            <option name="status" value={elem.id} key={elem.id}>
                              {elem.nameBrand}
                            </option>
                          )}
                        </Fragment>
                      );
                    })
                  : ""}
              </select>
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="price"
                className="text-sm font-semibold text-gray-500"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={fData.price}
                onChange={(e) => setFdata({ ...fData, price: e.target.value })}
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="images"
                className="text-sm font-semibold text-gray-500"
              >
                Images
              </label>
              {fData.images && fData.images.length > 0 ? (
                <div className="flex space-x-1">
                  {fData.images.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image}
                        alt="product"
                        className="w-20 h-20 object-cover object-center"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
              <input
                type="file"
                name="images"
                id="image"
                multiple
                onChange={(e) =>
                  setFdata({ 
                    ...fData, 
                    error: false,
                    success: false,
                    newImages: [...e.target.files] })
                }
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div className="flex items-center justify-between w-full space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                Edit Product
              </button>
            </div>
            {fData.success && message(fData.success, "green")}
            {fData.error && message(fData.error, "red")}
          </form>
        </div>
      </div>
      {/* Modal end */}
    </Fragment>
  );
};

export default EditProductModal;
