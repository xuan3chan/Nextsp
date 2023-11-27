// SearchFunction.jsx
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/main.css";
import PostFilterForm from "./PostFilterForm";
import axios from "axios";
import { Link } from "react-router-dom";

function SearchFunction(props) {
  const imagePlaceHolder = "https://placehold.co/400";
  const [productName, setProductName] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSearchResultVisible, setIsSearchResultVisible] = useState(false);

  const handleFiltersChange = (newFilters) => {};

  useEffect(() => {
    const apiLink = `https://nextsp-server.id.vn/api/products/search/${productName}`;

    if (productName) {
      axios
        .get(apiLink)
        .then((res) => {
          // Check if res.data is an array before setting searchResult
          if (Array.isArray(res.data.product)) {
            setSearchResult(res.data.product);
            setIsSearchResultVisible(true);
          } else {
            setSearchResult(null); // Set searchResult to null or handle the error accordingly
            setIsSearchResultVisible(false);
          }
        })
        .catch((error) => {
          setSearchResult(null); // Set searchResult to null or handle the error accordingly
          setIsSearchResultVisible(false);
        });
    } else {
      // If productName is empty, hide the search result
      setSearchResult(null);
      setIsSearchResultVisible(false);
    }
  }, [productName]);

  const handleSearchTermChange = (newFilters) => {
    setProductName(newFilters.searchTerm);
    if (!onSubmit) return;
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: newFilters.searchTerm,
      };
      onSubmit(formValues);
    }, 300);
  };

  function formatPrice(price) {
    if (price) {
      return `${price.toLocaleString()}đ`;
    }
    return "";
  }
  return (
    <div className="searchingSection relative">
      <div className="header_searching_module">
        <div className="wrap">
          <div className="search">
            <PostFilterForm
              onSubmit={handleFiltersChange}
              setProductName={setProductName}
              onFocus={() => setIsSearchResultVisible(true)} // Set visibility to true on focus
              onBlur={() => setIsSearchResultVisible(false)} // Set visibility to false on blur
            />
            <button
              type="submit"
              className="searchButton"
              onClick={() => setSearchResult(null)}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
        <ul
          className={`searching-result absolute top-10 rounded-sm bg-white w-full flex flex-col gap-42 p-2 overflow-auto ${
            isSearchResultVisible ? "block" : "hidden"
          }`}
        >
          {searchResult &&
            searchResult.map((item) => (
              <Link to={`/products/${item._id}`}>
                <li
                  key={item.id}
                  className="searching-result-item flex gap-4 items-center border-b-2 p-2 "
                >
                  <div className="searching-result-item-img object-fill">
                    <img src={item.images[0]} alt="" />
                  </div>
                  <div className="searching-result-item-info flex flex-col">
                    <div className="searching-result-item-info-name text-left">
                      <p>{item.nameProduct}</p>
                    </div>
                    <div className="searching-result-item-info-price flex gap-4">
                      <p className=" w-16">{formatPrice(item.price)}</p>
                      <p className="oldPrice">{formatPrice(item.oldprice)}</p>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchFunction;
