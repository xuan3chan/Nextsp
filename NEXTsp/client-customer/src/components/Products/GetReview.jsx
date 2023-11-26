import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { FaRegUserCircle } from "react-icons/fa";
import "../../assets/css/Products.css";
const GetReview = () => {
  const [reviews, setReviews] = useState([]);
  const productId = useParams().id;
  const ApiGetFB = `http://localhost:3101/api/ratings/getrating/${productId}`; // Đặt URL API của bạn ở đây
  const [countRating, setCountRating] = useState(0);

  useEffect(() => {
    axios.get(ApiGetFB).then((response) => {
      setReviews(response.data.data);
      setCountRating(response.data.data.length);
    });
  }, []);

  const formatRatingStar = (ratingStart) => {
    let ratingStar = "";
    for (let i = 0; i < ratingStart; i++) {
      ratingStar += "⭐";
    }
    return ratingStar;
  };
  return (
    <div className="getReviewSection ">
      <div className="textSection mb-8">
        <h1 className="getReview_title">Danh sách đánh giá</h1>
        <h2>( Hiện có {countRating} lượt đánh giá )</h2>
      </div>
      {reviews && reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li className="flex gap-3 reviewItem" key={review._id}>
              <div className="avatarSection ">
                <FaRegUserCircle className="w-10 h-10" />
              </div>
              <div className="userSection flex flex-col gap-4">
                <p>{review.userId.fullName}</p>
                <p>
                  Đánh giá: <span>{formatRatingStar(review.ratingStart)}</span>
                </p>
                <p>
                  Bình luận: <span>{review.review}</span>
                </p>
                <p>
                  Ngày đánh giá:{" "}
                  <span>
                    {format(new Date(review.createdAt), "dd/MM/yyyy")}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Hiện không có đánh giá nào.</p>
      )}
    </div>
  );
};

export default GetReview;
