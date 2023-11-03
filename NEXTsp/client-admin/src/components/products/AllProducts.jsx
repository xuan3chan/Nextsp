import React, { Fragment, useContext, useEffect, useState } from "react";
import { getAllProduct } from "./FetchApi";
import moment from "moment";
import { ProductContext } from "./index";
import axios from "axios";
const apiURL = process.env.REACT_APP_PRODUCTS

const AllProducts = () => {
  const { data, dispatch } = useContext(ProductContext);
  const [ products, setProducts ] = useState([])
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const responseData = await getAllProduct();
      setProducts(responseData);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure?")) {
      axios.delete(`${apiURL}/delete/${id}`)
      .then(res => {
        const del = products.filter(product => id !== product.id)
        setProducts(del)
        fetchData();
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  const editProduct = (id, product, type) => {
    if (type) {
      dispatch({
        type: "editProductModalOpen",
        product: { ...product, id: id },
      });
    }
  }

  if (loading) {
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
    );
  }
  if (!products || error) {
    return (
      <div>ERROR...</div>
    )
  }

  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">All Products</h1>
      </div>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Product</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border w-5 h-2">Image</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Brand</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Created At</th>
              <th className="px-4 py-2 border">Updated At</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
              {products && products.map((product) => (
                <tr className="border border-spacing-1" key={product.id}>
                  <td className="p-2 text-left">
                    {product.nameProduct.length > 15
                      ? product.nameProduct.substring(1, 15) + "..."
                      : product.nameProduct}
                  </td>
                  <td className="p-2 text-left">
                    {product.description.slice(0, 15)}...
                  </td>
                  <td className="p-2 text-center relative">
                    {product.images.length > 0 ? (
                      <Fragment>
                        <img
                          className="w-auto h-auto object-fill object-center "
                          src={product.images[0]}
                          alt="pic"
                        />
                        <div className="image-count absolute top-1 right-1 left-1 bottom-1 flex items-center justify-center text-white bg-black/30">{`${product.images.length} images`}</div>
                      </Fragment>
                    ) : (
                      "N/A"
                    )}
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
                  <td className="p-2 text-center">{product.brand.name}</td>
                  <td className="p-2 text-center">{product.price}</td>
                  <td className="p-2 text-center">
                    {moment(product.createdAt).format("lll")}
                  </td>
                  <td className="p-2 text-center">
                    {moment(product.updatedAt).format("lll")}
                  </td>
                  <td className="p-2">
                    <span
                      onClick={(e) => editProduct(product.id, product, true
                      )}
                      className="cursor-pointer bg-green-500 hover:bg-green-600 px-2 py-1 text-white rounded mr-2"
                    >
                      Edit
                    </span>
                    <span
                      onClick={(e) => deleteProduct(product.id)}
                      className="cursor-pointer bg-red-500 hover:bg-red-600 px-2 py-1 text-white rounded"
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};



export default AllProducts;
