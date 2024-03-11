import React, { useContext, useState } from "react";
import "./ProductCategory.css";
import Item from "../../components/Item/Item";
import laptopBanerImg from "../../Images/1380x360.jpg";
import deskTopBanerImg from "../../Images/banner-category-gaming-pc-home-series.png";
import mainBannerImg from "../../Images/2023-3-banner.jpg";
import { ProductContext } from "../../context/ProductContext";

const ProductCategory = (props) => {
  const { allProducts } = useContext(ProductContext);

  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortBy = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortOrder("asc");
    }
  };

  const compareProducts = (a, b) => {
    const aValue = sortBy === "name" ? String(a.brand) : String(a.price);
    const bValue = sortBy === "name" ? String(b.brand) : String(b.price);

    const orderMultiplier = sortOrder === "asc" ? 1 : -1;
    return aValue.localeCompare(bValue) * orderMultiplier;
  };

  return (
    <div className="productCategory">
      <div className="productContainer">
        {props.category === "desktop" && (
          <img src={deskTopBanerImg} alt="desktopBaner" />
        )}

        {props.category === "laptop" && (
          <img id="laptopBannerImg" src={laptopBanerImg} alt="desktopBaner" />
        )}
        <div className="productCategoryHead">
          <h1>{props.category}</h1>
          <div className="sortByBtn">
            <select
              name="sortBy"
              id="sortBy"
              value={sortBy}
              onChange={(e) => handleSortBy(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>

        <div className="productData">
          {allProducts
            .slice(0, 10)
            .sort(compareProducts)
            .map((product) => {
              if (props.category === product.category) {
                return <Item key={product.id} product={product} />;
              } else {
                return null;
              }
            })}
        </div>

        <img src={mainBannerImg} alt="banner" />

        <div className="productData">
          {allProducts
            .slice(10)
            .sort(compareProducts)
            .map((product) => {
              if (props.category === product.category) {
                return <Item key={product.id} product={product} />;
              } else {
                return null;
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
