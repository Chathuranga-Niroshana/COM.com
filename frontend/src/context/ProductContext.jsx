import React, { createContext, useContext, useEffect, useState } from "react";
import allProducts from "../DB/productDB.js";

export const ProductContext = createContext();

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

export const ProductContextProvider = (props) => {
  useEffect(() => {
    // Additional initialization or side effects can be placed here
    // This effect runs only once, simulating componentDidMount
  }, []);

  const [cart, setCart] = useState(getDefaultCart());

  const addToCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: prevCart[productId] + 1,
    }));
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: prevCart[productId] - 1,
    }));
  };

  const clearCart = () => {
    setCart(getDefaultCart());
  };

  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    allProducts,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {props.children}
    </ProductContext.Provider>
  );
};


export default ProductContextProvider;
