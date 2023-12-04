import React, { useState, useEffect, Fragment, useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { getAllBrand } from "./FetchAPI";
import { BrandContext } from "./index";
import axios from "axios";

const apiURL = process.env.REACT_APP_BRANDS;

const AllBrands = () => {
  const { data, dispatch } = useContext(BrandContext);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { darkMode, setDarkMode } = useContext(ThemeContext)

  const darkModeText = darkMode ? 'text-white' : 'text-gray-800'
  const statusDAM = darkMode ? 'text-black bg-[#37AA9C]' : 'text-black bg-green-200'
  const statusDA1 = darkMode ? 'text-black bg-[#BB2525]' : 'text-black bg-red-200'
  const tablebg = darkMode ? 'bg-slate-700' : 'bg-white'

  const brandsPerPage = 10;
  // Fetch all brands when component mounts
  const fetchData = async () => {
    try {
      const responseData = await getAllBrand();
      setBrands(responseData);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 10000); // Fetch data every 10 seconds
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);


  const indexOfLastBrand = currentPage * brandsPerPage;
  const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;
  const currentBrands = brands.slice(indexOfFirstBrand, indexOfLastBrand);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Loading state
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
  // Error state
  if (error) {
    return <div>ERROR...</div>;
  }
  // Delete brand
  const deleteBrand = (_id) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete(`${apiURL}/delete/${_id}`)
        .then((res) => {
          const del = brands.filter((brand) => _id !== brand._id);
          setBrands(del);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //Edit Brand
  const editBrand = (_id, nameBrand, description, status, category) => {
    console.log(_id)
    console.log(category); // This will log the category array
    dispatch({
      type: "editBrandModalOpen",
      _id: _id,
      nameBrand: nameBrand,
      description: description,
      status: status,
      category: category,
    });
  };

  return (
    <Fragment>
      <div className="flex items-center justify-center">
        <h1 className={`text-2xl font-semibold ${darkModeText}`}>All Brands</h1>
      </div>
      <div className="flex flex-col items-center justify-start">
        <div className="w-full mt-4">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="py-2 align-middle inline-block min-w-full">
                <div className={`overflow-hidden shadow-lg p-5 ${tablebg}`}>
                  <table className={`min-w-full divide-y divide-gray-200 border ${darkModeText}`}>
                    <thead>
                      <tr className={`text-xs tracking-wider text-left uppercase ${darkModeText} text-center`}>
                        <th className="px-4 py-2 border w-2">No.</th>
                        <th className="px-6 py-3 border">Name</th>
                        <th className="px-6 py-3 border">Description</th>
                        <th className="px-6 py-3 border">Status</th>
                        <th className="px-6 py-3 border">Category</th>
                        <th className="px-6 py-3 border">Action</th>
                      </tr>
                    </thead>
                    <tbody className=" divide-y divide-gray-200">
                      {currentBrands && currentBrands.length > 0 ? (
                        currentBrands.map((brand, index) => (
                          <tr key={brand._id} className={`${darkModeText}`}>
                            <td className="px-4 py-4 border whitespace-nowrap text-center">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 border whitespace-nowrap">
                              <div className="text-sm">
                                {brand.nameBrand}
                              </div>
                            </td>
                            <td className="px-6 py-4 border text-sm whitespace-nowrap">
                              {brand.description}
                            </td>
                            <td className="px-6 py-4 border text-sm whitespace-nowrap text-center">
                              {brand.status === "Active" ? (
                                <span className={`inline-flex px-2 text-xs font-semibold leading-5 ${statusDAM} rounded-full`}>
                                  {brand.status}
                                </span>
                              ) : (
                                <span className={`inline-flex px-2 text-xs font-semibold leading-5 ${statusDA1} rounded-full`}>
                                  {brand.status}
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 border text-sm whitespace-nowrap">
                              {brand.category && brand.category.length > 0
                                ? brand.category
                                    .map((elem) => elem.nameCategory)
                                    .join("; ")
                                : "N/A"}
                            </td>
                            <td className="px-6 py-4 border text-sm font-medium whitespace-nowrap text-center">
                              <button
                                onClick={() =>
                                  editBrand(
                                    brand._id,
                                    brand.nameBrand,
                                    brand.description,
                                    brand.status,
                                    brand.category
                                  )
                                }
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteBrand(brand._id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="7"
                            className="text-center font-semibold text-gray-700"
                          >
                            No data found...
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  {/* Pagination */}
                  <div className="pagination flex justify-end space-x-2 mt-3">
                    {[...Array(Math.ceil(brands.length / brandsPerPage)).keys()].map(number => (
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AllBrands;
