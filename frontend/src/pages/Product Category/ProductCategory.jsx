import React, { useState } from "react";
import "./ProductCategory.css";
import Item from "../../components/Item/Item";
import products from "../../DB/productDB";
import laptopBanerImg from "../../Images/1380x360.jpg";
import deskTopBanerImg from "../../Images/banner-category-gaming-pc-home-series.png";
import mainBannerImg from "../../Images/2023-3-banner.jpg";

const ProductCategory = (props) => {
  const filteredProducts = products.filter(
    (product) => props.category.toLowerCase() === product.category.toLowerCase()
  );

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
      {filteredProducts.length > 0 && (
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
            {filteredProducts
              .slice(0, 10)
              .sort(compareProducts)
              .map((product) => (
                <Item key={product.id} product={product} />
              ))}
          </div>
          <img src={mainBannerImg} alt="banner" />
          <div className="productData">
            {filteredProducts
              .slice(10)
              .sort(compareProducts)
              .map((product) => (
                <Item key={product.id} product={product} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
