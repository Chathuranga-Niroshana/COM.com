import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(false);

  const imagehandler = (e) => {
    setImage(e.target.files[0]);
  };

  const [productDetails, setProductDetails] = useState({
    brand: "",
    imgurl: "",
    category: "laptop",
    price: "",
    RAM: "",
    description: "",
  });

  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  const Add_Product = async () => {
    try {
      let responseData;
      let product = productDetails;

      // Create FormData and append the image
      const formData = new FormData();
      formData.append("product", image);

      // Upload image
      const uploadResponse = await fetch("http://localhost:8000/product/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      responseData = await uploadResponse.json();

      if (uploadResponse.ok) {
        // If image upload is successful, update the product's image URL
        product.imgurl = responseData.imgurl;

        // Add the product
        const addProductResponse = await fetch(
          "http://localhost:8000/product",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          }
        );

        const addProductData = await addProductResponse.json();

        if (addProductResponse.ok) {
          // alert("Product Added");
        } else {
          console.log("Failed to add product:", addProductData.message);
          alert("Failed to add product");
        }
      } else {
        console.log("Failed to upload image:", responseData.message);
        alert("Failed to upload image");
      }
    } catch (error) {
      console.error("Error in Add_Product:", error);
      alert("An error occurred. Please check the console for details.");
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product Brand</p>
        <input
          value={productDetails.brand}
          onChange={changeHandler}
          type="text"
          name="brand"
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-itemfield">
        <p>Product Description</p>
        <input
          value={productDetails.description}
          onChange={changeHandler}
          type="text"
          name="description"
          placeholder="Type here"
        />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.price}
            onChange={changeHandler}
            type="number"
            name="price"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>RAM</p>
          <input
            value={productDetails.RAM}
            onChange={changeHandler}
            type="text"
            name="RAM"
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          name="category"
          className="addproduct-selector"
          value={productDetails.category}
          onChange={changeHandler}
        >
          <option value="laptop">Laptop</option>
          <option value="desktop">Desktop</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            value={productDetails.imgurl}
            onChange={changeHandler}
            src={image ? URL.createObjectURL(image) : upload_area}
            alt="upload area"
            className="addproduct-thumnail-img"
          />
        </label>
        <input
          onChange={imagehandler}
          type="file"
          name="imgurl"
          id="file-input"
          hidden
        />
      </div>
      <button
        onClick={() => {
          Add_Product();
        }}
        className="addproduct-btn"
      >
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
