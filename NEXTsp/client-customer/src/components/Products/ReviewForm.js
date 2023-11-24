import React, { useState } from "react";
import Rating from "./Rating";
import "../../assets/css/main.css";
import "../../assets/css/Products.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const ReviewForm = ({ onSubmit }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const { id } = useParams();

  const ApiAddFeedBack = "http://localhost:3101/api/ratings/add";
  const [userId, setUserID] = useState("");
  const AccessToken = localStorage.getItem("AccessToken");
  const [error, setError] = useState(null); // Added error state

  const handleCommentChange = (event) => {
    setReview(event.target.value);
    setError(null); // Clear error when the user starts typing again
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      userId: localStorage.getItem("userId"),
      productId: id,
      review: review,
      rating: 4,
    };

    try {
      const response = await axios.post(ApiAddFeedBack, data);
      onSubmit(response.data);
      setRating(0);
      setReview("");
    } catch (error) {
      console.error(error);
      setError(
        error.response ? error.response.data.message : "An error occurred"
      );
    }
  };

  return (
    <div className="w-96 ReviewForm">
      <div className="TitleForm">
        <h1>Nêu Đánh Giá Của Bạn : </h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Rating onRatingChange={handleRatingChange} />
        <textarea
          placeholder="Nhập đánh giá của bạn..."
          value={review}
          onChange={handleCommentChange}
          className="border-2 border-gray-300 rounded-md p-2"
        />
        <button type="submit" className="btn">
          Gửi Đánh Giá
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default ReviewForm;
