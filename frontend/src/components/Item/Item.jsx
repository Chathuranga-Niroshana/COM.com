import cartBtnAudio from "../../Images/Audio/cartBtn.wav";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import "./Item.css";
import { ProductContext } from "../../context/ProductContext.jsx";

const Item = (props) => {
  const { addToCart } = useContext(ProductContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleAddToCart = () => {
    enqueueSnackbar("Product added to the cart", { variant: "success" });
    addToCart(props.product.id);
    new Audio(cartBtnAudio).play();
  };

  return (
    <div className="itemContainer">
      <div key={props.product.id} className="item">
        <div className="itemInfo">
          <h3 className="itemName">
            {props.product.brand} {props.product.category}
          </h3>
          <h4 className="itemRam">{props.product.RAM} RAM</h4>
          <Link to={`/product/${props.product.id}`}>
            <img
              src={props.product.imgurl}
              alt={props.product.category}
              className="itemImage"
              onClick={() => window.scrollTo(0, 0)}
            />
          </Link>
          <p className="itemPrice">${props.product.price}</p>
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
