import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Cart.css";
import { useCart } from "../../context/ProductContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
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
            {cart.map((item) => (
              <tr key={item.id}>
                <td>
                  <Link to={`/product/${item.id}`}>
                    <img src={item.imgurl} alt={item.category} />
                  </Link>
                </td>
                <td>
                  {item.brand} {item.category}
                </td>
                <td>1</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <button onClick={() => removeFromCart(item.id)}>❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="paymentContainer">
        <div className="totalPriceContainer">
          <h1>TOTAL :</h1>{" "}
          <h1>
            ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
          </h1>
        </div>
        <button className="paymentBtn">Payment</button>
      </div>
    </div>
  );
};

export default Cart;
