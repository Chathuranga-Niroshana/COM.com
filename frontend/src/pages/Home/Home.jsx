import React from "react";
import products from "../../DB/productDB";
import Item from "../../components/Item/Item";
import "./Home.css";
import bannerImg from "../../Images/34e85832ea9502395f3a5ab138596457.png";


const Home = () => {
  const latestProducts = products.slice(0, 5);
  const populerProducts = products.slice(18, 23);

  return (
    <div className="home contentContainer">
      <div className="homeBanner"></div>
      <div className="latestProduct">
        <h1>Latest Products</h1>
        <div className="productData">
          {latestProducts.map((product) => (
            <Item key={product.id} product={product} />
          ))}
        </div>
        <div className="imageContainer">
          <img src={bannerImg} alt="" />
        </div>
      </div>
      <div className="populerProduct">
        <h1>Popular Products</h1>
        <div className="productData">
          {populerProducts.map((product) => (
            <Item key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
