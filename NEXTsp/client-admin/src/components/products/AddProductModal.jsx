import React, { Fragment, useContext, useState, useEffect } from 'react'
import { ProductContext } from './index'
import { getAllProduct, createProduct } from './FetchApi'
import { getAllBrand } from '../brands/FetchAPI'

const AddProductDetail = ({brands}) => {
  const { data, dispatch } = useContext(ProductContext);

  const message = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );
  const [fData, setFdata] = useState({
    nameProduct: "",
    description: "",
    image: null,
    status: "Active",
    brand: "",
    price: "",
    oldprice: "",
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
    },1000);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    e.target.reset();

    if (!fData.nameProduct) {
      setFdata({ ...fData, error: "Please give the name!" });
      setFdata({ ...fData, error: false });
    }

    try {
      let responseData = await createProduct(fData);
      if (responseData.success) {
        setTimeout(() => {
          setFdata({
            ...fData,
            nameProduct: "",
            description: "",
            image: null,
            status: "Active",
            brand: "",
            price: "",
            oldprice: "",
            success: "Add product complete !",
            error: false,
          });
        },1000)
        setFdata({
          ...fData,
          nameProduct: "",
          description: "",
          image: null,
          status: "Active",
          brand: "",
          price: "",
          oldprice: "",
          success: "Add product complete !",
          error: false,
        });
        dispatch({ type: "addProductModal", payload: true });
        fetchData();
        window.location.reload()
      }
    } catch (error) {
      alert(`Product with name ${fData.nameProduct} already exists`)
    }
  };

  
  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={(e) => dispatch({ type: "addProductModal", payload: true })}
        className={`${
          data.addProductModal ? "" : "hidden"
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          data.addProductModal ? "" : "hidden"
        } fixed inset-0 flex items-center z-30 justify-center overflow-auto`}
      >
        <div className="mt-32 md:mt-0 relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Add Product
            </span>
            {/* Close Modal */}
            <span
              style={{ background: "#303031" }}
              onClick={(e) =>
                dispatch({ type: "addProductModal", payload: false })
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
          {fData.error ? message(fData.error, "red") : ""}
          {fData.success ? message(fData.success, "green") : ""}
          <form className="w-full" onSubmit={(e) => submitForm(e)}>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="name">Product Name *</label>
                <input
                  onChange={(e) =>
                    setFdata({ ...fData, nameProduct: e.target.value })
                  }
                  type="text"
                  id="name"
                  placeholder="Product Name"
                  className="px-4 py-2 border focus:outline-none"
                  required
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="price">Price *</label>
                <input
                  onChange={(e) =>
                    setFdata({ ...fData, price: e.target.value })
                  }
                  type="number"
                  id="price"
                  placeholder="Price"
                  className="px-4 py-2 border focus:outline-none"
                  required
                />
              </div>
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="brand">Brand *</label>
                <select
                  onChange={(e) =>
                    setFdata({ ...fData, brand: e.target.value })
                  }
                  id="brand"
                  className="px-4 py-2 border focus:outline-none"
                  required
                >
                  <option value="">Select Brand</option>
                  {brands && brands.length > 0
                    ? brands.map((brand) => {
                        return (
                          <option name="status" value={brand.id} key={brand.id}>
                            {brand.nameBrand}
                          </option>
                        );
                      })
                    : "No brands found"}
                </select>
              </div>
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="status">Status *</label>
                <select
                  onChange={(e) =>
                    setFdata({ ...fData, status: e.target.value })
                  }
                  id="status"
                  className="px-4 py-2 border focus:outline-none"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-full flex flex-col space-y-1 space-x-1">
                <label htmlFor="description">Description *</label>
                <textarea
                  onChange={(e) =>
                    setFdata({ ...fData, description: e.target.value })
                  }
                  id="description"
                  placeholder="Description"
                  className="px-4 py-2 border focus:outline-none"
                  required
                />
              </div>
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-full flex flex-col space-y-1 space-x-1">
                <label htmlFor="image">Image *</label>
                <input
                  onChange={(e) => {
                    const selectedFiles = e.target.files;
                    if (selectedFiles.length <= 10) {
                      setFdata({ ...fData, image: [...selectedFiles] });
                    } else {
                      // Hiển thị thông báo hoặc xử lý khác ở đây nếu số lượng tệp vượt quá 10.
                      alert("Tối đa 10 tệp được chấp nhận.");
                      e.target.value = null; // Đặt lại giá trị của trường file input
                    }
                  }}
                  type="file"
                  id="image"
                  placeholder="Image"
                  className="px-4 py-2 border focus:outline-none"
                  multiple
                  required
                />
              </div>
            </div>
            <div className="flex justify-center items-center w-full mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* End Modal */}
    </Fragment>
  );
};

const AddProductModal = (props) => {
  useEffect(() => {
    fetchBrandData();
  }, []);

  const [allBrand, setAllBrand] = useState({});

  const fetchBrandData = async () => {
    let responseData = await getAllBrand();
    if (responseData) {
      setAllBrand(responseData);
    }
  };

  return (
    <Fragment>
      <AddProductDetail brands={allBrand} />
    </Fragment>
  );
};


export default AddProductModal