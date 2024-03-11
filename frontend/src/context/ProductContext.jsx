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
