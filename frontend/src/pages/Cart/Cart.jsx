import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import { ProductContext } from "../../context/ProductContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart, allProducts, totalPrice } =
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
            {allProducts.map((e) => {
              if (cart[e.id] > 0) {
                return (
                  <tr key={e.id}>
                    <td>
                      <Link to={`/product/${e.id}`}>
                        <img src={e.imgurl} alt={e.category} />
                      </Link>
                    </td>
                    <td>
                      {e.brand} {e.category}
                    </td>
                    <td>{cart[e.id]}</td>
                    <td>${e.price.toFixed(2)}</td>
                    <td>${(cart[e.id] * e.price).toFixed(2)}</td>
                    <td>
                      <button onClick={() => removeFromCart(e.id)}>❌</button>
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
          <h1>${totalPrice()}</h1>
        </div>
        <button className="paymentBtn">Payment</button>
      </div>
    </div>
  );
};

export default Cart;
