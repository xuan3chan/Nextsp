import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiURL = "http://localhost:3101/api/categorys/getall";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(apiURL)
      .then((res) => {
        setCategories(res.data.categories); // Lấy mảng categories từ dữ liệu trả về
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setError(true);
      });
  }, []);

  return (
    <div>
      <h1>All Categories</h1>
      {loading && <p>Loading...</p>}
      {error && <p>There was an error loading the categories</p>}
      {categories && categories.length > 0 ? (
        categories.map((category) => (
          <div key={category._id}>
            <h2>{category.nameCategory}</h2>
            <p>{category.description}</p>
          </div>
        ))
      ) : (
        !loading && !error && <p>No categories found</p>
      )}
    </div>
  );
}

export default AllCategories;
