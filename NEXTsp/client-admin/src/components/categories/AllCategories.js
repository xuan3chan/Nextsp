import React, { useState, useEffect, Fragment, useContext } from 'react';
import { getAllCategory } from './FetchApi';
import { CategoryContext } from './index';
import axios from 'axios';

const apiURL = process.env.REACT_APP_CATEGORYIES

const AllCategories = () => {
  const { data, dispatch } = useContext(CategoryContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getAllCategory();
        setCategories(responseData);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  if (error) {
    return (
      <div>ERROR...</div>
    )
  }

  const deleteCategory = (_id) => {
    axios.delete(`${apiURL}/delete/${_id}`)
      .then(res => {
        console.log(res)
        const del = categories.filter(category => _id !== category._id)
        setCategories(del)
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  const editCategory = (_id, nameCategory,type, description, status) => {
    if (type) {
      dispatch({
        type: "editCategoryModalOpen",
        _id: _id,
        nameCategory: nameCategory,
        description: description,
        status: status,
      });
    }
  };

  return (
    <Fragment>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 w-2/4 border">Description</th>
              <th className="px-4 py-2 w-1/6 border">Status</th>
              <th className="px-4 py-2 w-1/6 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories && categories.length > 0 ? (
              categories.map((category, index) => (
                <tr key={category._id}>
                  <td className="px-4 py-2 border">{category.nameCategory}</td>
                  <td className="px-4 py-2 border whitespace-normal break-words break-all">{category.description}</td>
                  <td className="px-4 py-2 text-center border">{category.status}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => deleteCategory(category._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => editCategory(category._id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Update
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
                  No category found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default AllCategories;
