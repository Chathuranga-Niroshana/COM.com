import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ProductContext = createContext();

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

export const ProductContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [cart, setCart] = useState(getDefaultCart());

  useEffect(() => {
    axios
      .get("http://localhost:8000/product")
      .then((res) => {
        setAllProducts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });

    const authToken = localStorage.getItem("auth-token");
    if (authToken) {
      axios
        .post(
          "http://localhost:8000/user/getcart",
          {},
          {
            headers: {
              Accept: "application/json",
              "auth-token": authToken,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => setCart(res.data))
        .catch((error) => console.error("Error fetching cart items:", error));
    }
  }, []);

  const addToCart = (productId) => {
    setCart((prev) => ({ ...prev, [productId]: prev[productId] + 1 }));

    if (localStorage.getItem("auth-token")) {
      const authToken = localStorage.getItem("auth-token");

      axios
        .post(
          "http://localhost:8000/user/addtocart",
          { productId },
          {
            headers: {
              Accept: "application/json",
              "auth-token": authToken,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => console.log(res.data))
        .catch((error) => console.error("Error adding to cart:", error));
    }
  };
  const removeFromCart = (itemId) => {
    setCart((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (localStorage.getItem("auth-token")) {
      const authToken = localStorage.getItem("auth-token");

      axios
        .post(
          "http://localhost:8000/user/removefromcart",
          { itemId }, // Update to itemId
          {
            headers: {
              Accept: "application/json",
              "auth-token": authToken,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => console.log(res.data))
        .catch((error) => console.error("Error removing from cart:", error));
    }
  };

  const clearCart = () => {
    setCart(getDefaultCart());
  };

  const totalPrice = () => {
    let total = 0;
    for (const i in cart) {
      if (cart[i] > 0) {
        let productInfo = allProducts.find(
          (product) => product.id === Number(i)
        );
        total += productInfo.price * cart[i];
      }
    }
    return total.toFixed(2);
  };

  const totalCartItems = () => {
    let totalItems = 0;
    for (const i in cart) {
      if (cart[i] > 0) {
        totalItems += cart[i];
      }
    }
    return totalItems;
  };

  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    allProducts,
    totalPrice,
    totalCartItems,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
