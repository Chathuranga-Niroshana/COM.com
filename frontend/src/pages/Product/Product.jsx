import React from "react";
import "./Product.css";
import productDB from "../../DB/productDB";
import { Link, useParams } from "react-router-dom";
import arrowImg from "../../Images/arrow1.png";

const Product = () => {
  const { id } = useParams();
  const product = productDB.find((e) => e.id === Number(id));

  return (
    <div className="product">
      <div className="breadcrum">
        <Link to="/" style={{ textDecoration: "none" }}>
          <p>Home</p>
        </Link>
        <img src={arrowImg} alt="===>" />
        <Link to={`/${product.category}`} style={{ textDecoration: "none" }}>
          <p>{product.category}</p>
        </Link>
        <img src={arrowImg} alt="===>" />
        <p>
          {product.brand}
          {product.category}/{product.RAM}
        </p>
      </div>
      <div className="productItem">
        <div className="productImageContainer">
          <img src={product.imgurl} alt={product.brand} />
        </div>
        <div className="productInfoContainer">
          <h2>
            {product.brand} {product.category}{" "}
          </h2>
          <h4>{product.RAM} RAM </h4>
          <h4>$ {product.price} </h4>
          {/* <p>{product.description} </p> */}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            adipisci modi, ipsa dolore earum asperiores numquam quaerat odio
            expedita excepturi in porro nisi. Tempora impedit sit voluptate
            recusandae, modi unde.
          </p>
        </div>
      </div>
      <div className="cartInfo">
        <div className="counter">
          <div className="counterOperation">+</div>
          <div className="cartCount">
            {" "}
            <span id="count">0</span>{" "}
          </div>
          <div className="counterOperation">-</div>
        </div>
        <div className="cartBtninProduct">
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;