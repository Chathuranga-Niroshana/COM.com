import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import remove_icon from "../../assets/cross_icon.png";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:8000/product")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch("http://localhost:8000/product", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };

  return (
    <div className="list-product">
      <h1>All Product List</h1>
      {/* <div className="listproduct-format-main">
        <p>Image</p>
        <p>Brand</p>
        <p>RAM</p>
        <p>Price</p>
        <p>Description</p>
        <p>Category</p>
        <p>Delete</p>
      </div> */}
      <div className="listproduct-allproduct">
        <hr />
        {allproducts.map((product, index) => {
          return (
            <>
              <div
                key={index}
                className="listproduct-format-main listproduct-format"
              >
                <img
                  src={product.imgurl}
                  alt="prdct-img"
                  className="listproduct-product-icon"
                />
                <p>{product.brand}</p>
                <p> ${product.RAM}</p>
                <p> ${product.price} </p>
                <p> {product.category} </p>
                <img
                  className="listproduct-remove-icon"
                  src={remove_icon}
                  alt="remove-icon"
                  onClick={() => {
                    removeProduct(product.id);
                  }}
                />
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
