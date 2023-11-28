import axios from "axios";
import React, { useState, useEffect } from "react";
import TotalSection from "./TotalSection";
import { useNavigate } from "react-router-dom";
function ProductAdded(props) {
  const [cart, setCart] = useState([]);
  const placeHolderImg =
    "https://cdn3.vectorstock.com/i/1000x1000/35/52/placeholder-rgb-color-icon-vector-32173552.jpg";

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const parsedCart = JSON.parse(storedCart) || [];
    const cartWithCount = parsedCart.map((item) => ({ ...item, count: 1 }));
    setCart(cartWithCount);
    localStorage.setItem("FullCart", JSON.stringify(cartWithCount));
    const uniqueItemsById = cartWithCount.reduce((accumulator, currentItem) => {
      if (!accumulator[currentItem.id]) {
        accumulator[currentItem.id] = { ...currentItem };
      } else {
        accumulator[currentItem.id].count += currentItem.count;
      }
      return accumulator;
    }, {});
    const uniqueCart = Object.values(uniqueItemsById);
    setCart(uniqueCart);
  }, []);

  const handleCheckLogin = () => {
    const token = localStorage.getItem("accessToken");
    token == null
      ? alert("Vui Lòng Đăng Nhập Để Tiếp Tục!")(
          (window.location.href = "/LoginUser")
        )
      : (window.location.href = "/Customer");
  };

  function formatPrice(price) {
    if (price) {
      return `${price.toLocaleString()}đ`;
    }
    return "";
  }
  const updateLocalStorage = (updatedCart) => {
    // Update local storage with the new cart data
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increment = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId ? { ...item, count: item.count + 1 } : item
      );
      updateLocalStorage(updatedCart);
      console.log(updatedCart);
      return updatedCart;
    });
  };

  const decrement = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId && item.count > 0
          ? { ...item, count: item.count - 1 }
          : item
      );
      if (updatedCart.find((item) => item.id === productId && item.count === 0))
        removeItem(productId);
      if (localStorage.getItem("cart") === "[]") {
        localStorage.removeItem("cart");
      }

      updateLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const calculateTotalQuantity = () => {
    const totalQuantity = cart.reduce((total, item) => total + item.count, 0);
    localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
    return totalQuantity;
  };

  const calculateTotalPrice = () => {
    const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    return totalPrice;
  };

  const uniqueProducts = Array.from(new Set(cart.map((item) => item.id))).map(
    (id) => {
      return cart.find((item) => item.id === id);
    }
  );
  const removeItem = (itemId) => {
    // Remove the item from the state
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    // Get the current cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Remove the item from the cart
    cart = cart.filter((item) => item.id !== itemId);
    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className="pb-8 ">
      {cart.length === 0 ? (
        <div className="flex justify-center items-center h-96">
          <h1 className="text-xl">Hiện tại bạn chưa chọn sản phẩm nào.</h1>
        </div>
      ) : (
        <div className="pb-8 ">
          {uniqueProducts.map((item, index) => (
            <div className="" key={index}>
              <div className="flex w-full h-40 items-center content-center gap-4 border-b-2">
                <div className="ImageSection-cart flex flex-col w-1/5 h-28 ">
                  <img
                    className="object-fill w-full h-full"
                    src={
                      item.images[0] == null ? placeHolderImg : item.images[0]
                    }
                    alt=""
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="deleteBtn"
                  >
                    Xóa
                  </button>
                </div>
                <div className="productInfo w-4/5 flex gap-20">
                  <h2 className="productTitle">{item.nameProduct}</h2>
                  <div className="flex flex-col">
                    <div className="flex flex-col items-end">
                      <p className="productPrice">{formatPrice(item.price)}</p>
                      <p className="productOldPrice">
                        {formatPrice(item.oldprice)}
                      </p>
                    </div>
                    <div className="productQuantity flex">
                      <button
                        className="btnCart"
                        onClick={() => decrement(item.id)}
                      >
                        -
                      </button>
                      <div className="quality-counter">{item.count}</div>
                      <button
                        className="btnCart"
                        onClick={() => increment(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="SummarySection">
        <p className="totalQuanlity flex relative mt-8">
          <p className="mainText w-30">Tổng Số Lượng Sản Phẩm:</p>
          <p className="subText absolute right-4 ">
            {calculateTotalQuantity()} SP
          </p>
        </p>
        <p className="totalShip w-full flex relative ">
          <p className="mainText w-30">Phí Vận Chuyển:</p>
          <p className="subText absolute right-4 ">Miễn Phí</p>
        </p>
        <p className="totalOrder flex relative">
          <p className="mainText w-30">Tổng Tiền:</p>
          <p className="subText absolute right-4 ">
            {formatPrice(calculateTotalPrice())}
          </p>
        </p>
      </div>
      <div className="buttonSection flex gap-10 justify-center mt-16">
        <div className="max-w-xs">
          <a href="/Homepage">
            <button className="btn btnContinueShopping">
              Tiếp Tục Mua Sắm
            </button>
          </a>
        </div>
        <a className=" max-w-xs">
          <button onClick={handleCheckLogin} className="btn btnOrderNow">
            Đặt Hàng Ngay
          </button>
        </a>
      </div>
    </div>
  );
}

export default ProductAdded;
