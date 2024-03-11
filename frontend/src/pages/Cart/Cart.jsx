import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import { ProductContext } from "../../context/ProductContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart, allProducts } =
    useContext(ProductContext);

  const clearAll = () => {
    clearCart();
  };

  return (
    <div className="cartContainer">
      <h1>CART</h1>
      <div className="cartItems">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Brand</th>
              <th>QTY</th>
              <th>Price of 1</th>
              <th>Price</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(cart).map(([productId, quantity]) => {
              const product = allProducts.find(
                (item) => item.id === Number(productId)
              );

              if (quantity > 0 && product) {
                return (
                  <tr key={productId}>
                    <td>
                      <Link to={`/product/${product.id}`}>
                        <img src={product.imgurl} alt={product.category} />
                      </Link>
                    </td>
                    <td>
                      {product.brand} {product.category}
                    </td>
                    <td>{quantity}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>${(quantity * product.price).toFixed(2)}</td>
                    <td>
                      <button onClick={() => removeFromCart(product.id)}>
                        ❌
                      </button>
                    </td>
                  </tr>
                );
              }

              return null;
            })}
          </tbody>
        </table>
        <button id="clearAllBtn" onClick={clearAll}>
          Clear Cart
        </button>
      </div>
      <div className="paymentContainer">
        <div className="totalPriceContainer">
          <h1>TOTAL :</h1>
          <h1>
            $
            {Object.entries(cart)
              .reduce((total, [productId, quantity]) => {
                const product = allProducts.find(
                  (item) => item.id === Number(productId)
                );
                return total + quantity * (product ? product.price : 0);
              }, 0)
              .toFixed(2)}
          </h1>
        </div>
        <button className="paymentBtn">Payment</button>
      </div>
    </div>
  );
};

export default Cart;
