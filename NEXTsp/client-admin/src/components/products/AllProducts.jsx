import React, { Fragment, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { getAllProduct } from "./FetchApi";
import { ProductContext } from "./index";
import axios from "axios";
const apiURL = process.env.REACT_APP_PRODUCTS

const AllProducts = () => {
  const { data, dispatch } = useContext(ProductContext);
  const [ products, setProducts ] = useState([])
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { darkMode } = useContext(ThemeContext)
  const productsPerPage = 10;

  const darkModeText = darkMode ? 'text-white' : 'text-gray-800'
  const statusDAM = darkMode ? 'text-black bg-[#37AA9C]' : 'text-black bg-green-200'
  const statusDA1 = darkMode ? 'text-black bg-[#BB2525]' : 'text-black bg-red-200'
  const tablebg = darkMode ? 'bg-slate-700 text-white' : 'bg-white text-gray-800'

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const fetchData = async () => {
    setLoading(true);
    try {
      const responseData = await getAllProduct();
      // Reverse the array before setting it
      const reversedData = [...responseData].reverse();
      setProducts(reversedData);
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
        // Filter out the deleted product from the local state
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
    }
  };

  const editProduct = (id, nameProduct, description, price, oldprice, images, brand, category, status) => {
    dispatch({
      type: "editProductModalOpen",
      product: {
        id,
        nameProduct,
        description,
        price,
        oldprice,
        images,
        brand,
        category,
        status
      }
    })
  }

  function formatPrice(price) {
    if (price) {
      return `${price.toLocaleString()}đ`;
    }
    return "Not Available "; // You can change this message to your preferred text
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


  return (
    <Fragment>
      <div className="flex items-center justify-center">
        <h1 className={`text-2xl font-semibold ${darkModeText}`}>All Products</h1>
      </div>
      <div className={`col-span-1 overflow-auto ${tablebg} shadow-lg p-4`}>
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">No.</th>
              <th className="px-4 py-2 border">Product</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border w-5 h-2">Images</th>
              <th className="px-4 py-2 border">Brand</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Old Price</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 w-1/6 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts && currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
                <tr className="border border-spacing-1" key={product.id}>
                  <td className="p-2 border text-center">
                    {indexOfFirstProduct + index + 1}
                  </td>
                  <td className="p-2 text-left border">
                    {product.nameProduct.length > 15
                      ? product.nameProduct.substring(0, 25) + "..."
                      : product.nameProduct}
                  </td>
                  <td className="p-2 text-left border">
                    {product.description ? product.description.slice(0, 15) + "..." : "N/A"}
                  </td>
                  <td className="p-2 text-center relative border">
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
                  <td className="p-2 text-center border">{product.brand?.name}</td>
                  <td className="p-2 text-center border">{product.category?.name}</td>
                  <td className="p-2 text-center border">{formatPrice(product.price)}</td>
                  <td className="p-2 text-center border">{product.oldprice ? formatPrice(product.oldprice) : "No discount"}
                  </td>
                  <td className="p-2 text-center border">
                    {product.status === "Active" ? (
                      <span className={`${statusDAM} rounded-full text-center text-xs px-2 font-semibold`}>
                        {product.status}
                      </span>
                    ) : (
                      <span className={`${statusDA1} rounded-full text-center text-xs px-2 font-semibold`}>
                        {product.status}
                      </span>
                    )}
                  </td>
                  <td className="p-2 text-center">
                    <span
                      onClick={(e) => editProduct(
                        product.id,
                        product.nameProduct,
                        product.description,
                        product.price,
                        product.oldprice,
                        product.images,
                        product.brand,
                        product.category,
                        product.status
                      )}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1 hover:cursor-pointer"
                    >
                      Edit
                    </span>
                    <span
                      onClick={(e) => deleteProduct(product.id)}
                      className="bg-red-500 hover:bg-red-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))) : (
                <tr>
                  <td colSpan="9" className="text-center p-4">
                    No Product Found
                  </td>
                </tr>
              )}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="pagination flex justify-end space-x-2">
          {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map(number => (
            <button 
              key={number + 1} 
              onClick={() => paginate(number + 1)}
              className={`px-4 py-2 border rounded ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </Fragment>
  );
};



export default AllProducts;
