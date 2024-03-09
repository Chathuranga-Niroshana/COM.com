import React from "react";
import { Link } from "react-router-dom";
import "./Item.css";
import { useCart } from "../../context/ProductContext";

const Item = (props) => {
  const { id, brand, RAM, price, imgurl, category } = props.product;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(props.product);
  };

  return (
    <div className="itemContainer">
      <div key={id} className="item">
        <div className="itemInfo">
          <h3 className="itemName">
            {brand} {category}
          </h3>
          <h4 className="itemRam">{RAM} RAM</h4>
          <Link to={`/product/${id}`}>
            <img
              src={imgurl}
              alt={category}
              className="itemImage"
              onClick={() => window.scrollTo(0, 0)}
            />
          </Link>
          <p className="itemPrice">${price.toFixed(2)}</p>
        </div>
        <div className="cartBtn">
          <button className="addCartBtn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
