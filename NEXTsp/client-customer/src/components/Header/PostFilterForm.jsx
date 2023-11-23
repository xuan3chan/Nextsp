// PostFilterForm.jsx
import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

PostFilterForm.propTypes = {
  onSubmit: PropTypes.func,
  setProductName: PropTypes.func, // Thêm prop setProductName
};

PostFilterForm.defaultProps = {
  onSubmit: null,
  setProductName: null,
};

function PostFilterForm(props) {
  const { onSubmit, setProductName } = props;
  const [searchTerm, setSearchTerm] = useState("");

  const typingTimeoutRef = useRef(null);

  function handleSearchTermChange(e) {
    setSearchTerm(e.target.value);
    if (setProductName) {
      setProductName(e.target.value); // Gọi hàm setProductName khi giá trị searchTerm thay đổi
    }
    if (!onSubmit) return;
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: e.target.value,
      };
      onSubmit(formValues);
      console.log(formValues);
    }, 300);
  }
  return (
    <div className="w-full">
      <input
        type="text"
        className="searchTerm text-black"
        placeholder="Nhập Thứ Cần Tìm Kiếm"
        value={searchTerm}
        onChange={handleSearchTermChange}
      ></input>
    </div>
  );
}

export default PostFilterForm;
