import React, { Fragment, useContext, useEffect, useState } from 'react'
import { getAllProduct, deleteProduct } from './FetchApi'
import moment from 'moment';
import { ProductContext } from './index';


const AllProducts = () => {
  const { data, dispatch } = useContext(ProductContext);
  const { products } = data;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const fetchData = async () => {
    setLoading(true);
    let responseData = await getAllProduct();
    setTimeout(() => {
      if (responseData && responseData) {
        dispatch({
          type: "fetchProductsAndChangeState",
          payload: responseData,
        });
        setLoading(false);
      }
    }, 1000);
  }

  const deleteProductReq = async (_id) => {
    let deleteC = await deleteProduct(_id);
    if (deleteC.error) {
      console.log(deleteC.error);
    } else if (deleteC.success) {
      console.log(deleteC.success);
      fetchData();
    }
  }


  if(loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="#fff"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12z"
          ></path>
        </svg>
      </div>
    )
  }

  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">All Products</h1>
        <button
          onClick={(e) => dispatch({ type: "addProductModalOpen" })}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
        >
          Add Product
        </button>
      </div>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Product</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Brand</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Created At</th>
              <th className="px-4 py-2 border">Updated At</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product, index) => (
                <ProductTable
                  key={index}
                  product={product}
                  deleteProduct={deleteProductReq}
                />
              ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  )
}


const ProductTable = ({ product, deleteProduct }) => {
  return (
    <Fragment>
      <tr>
        <td className="p-2 text-left">
          {product.nameProduct.length > 15
            ? product.nameProduct.substring(1, 15) + "..."
            : product.nameProduct}
        </td>
        <td className="p-2 text-left">
          {product.description.slice(0, 15)}...
        </td>
        <td className="p-2 text-center">
          <img
            className="w-12 h-12 object-cover object-center"
            src="../../../../server/uploads/1698257578682-chandung.jpg"
            alt="pic"
          />
        </td>
        <td className="p-2 text-center">
          {product.status === "Active" ? (
            <span className="bg-green-200 rounded-full text-center text-xs px-2 font-semibold">
              {product.status}
            </span>
          ) : (
            <span className="bg-red-200 rounded-full text-center text-xs px-2 font-semibold">
              {product.status}
            </span>
          )}
        </td>
        <td className="p-2 text-center">{product.brand}</td>
        <td className="p-2 text-center">{product.category}</td>
        <td className="p-2 text-center">
          {moment(product.createdAt).format("lll")}
        </td>
        <td className="p-2 text-center">
          {moment(product.updatedAt).format("lll")}
        </td>
        <td className="p-2 flex items-center justify-center">
          <span
            // onClick={(e) => editProduct(product._id, product, true
            // )}
            className="cursor-pointer bg-green-500 hover:bg-green-600 px-2 py-1 text-white rounded mr-2"
          >
            Edit
          </span>
          <span
            onClick={(e) => deleteProduct(product._id)}
            className="cursor-pointer bg-red-500 hover:bg-red-600 px-2 py-1 text-white rounded"
          >
            Delete
          </span>
        </td>
      </tr>
    </Fragment>
  )
}

export default AllProducts