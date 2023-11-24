// Rating.js
import React, { useState } from "react";
import { Rating as MuiRating } from "@mui/material";

const Rating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
    onRatingChange(newRating);
  };

  return (
    <div>
      <MuiRating
        name="product-rating"
        value={rating}
        precision={0.5}
        onChange={handleRatingChange}
      />
    </div>
  );
};

export default Rating;
