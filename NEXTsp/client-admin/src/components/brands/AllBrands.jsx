import React, { useState, useEffect, Fragment, useContext } from "react";
import { getAllBrand } from "./FetchAPI";
import { BrandContext } from "./index";
import axios from "axios";

const apiURL = process.env.REACT_APP_BRANDS;

const AllBrands = () => {
  const { data, dispatch } = useContext(BrandContext);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // Fetch all brands when component mounts
  useEffect(() => {
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
    fetchData();
  }, []);
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
  const deleteBrand = (id) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete(`${apiURL}/delete/${id}`)
        .then((res) => {
          const del = brands.filter((brand) => id !== brand.id);
          setBrands(del);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };


  return (
    <Fragment>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-800">All Brands</h1>
        <div className="w-full mt-4">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="py-2 align-middle inline-block min-w-full">
                <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Description</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {brands && brands.length > 0 ? (
                        brands.map((brand) => (
                          <tr key={brand._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {brand.nameBrand}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              {brand.description}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              {brand.status}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {brand.category ? brand.category.nameCategory : "N/A"}
                            </td> 
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                              <button
                                onClick={() =>
                                  dispatch({
                                    type: "editBrandModalOpen",
                                    _id: brand._id,
                                    nameBrand: brand.nameBrand,
                                    description: brand.description,
                                    status: brand.status,
                                  })
                                }
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteBrand(brand._id)}
                                className="ml-4 text-red-600 hover:text-red-900"
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
