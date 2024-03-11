import express from "express";
import { Product } from "../Models/productModel.js";
import { PORT } from "../Config.js";
import { upload } from "../multerConfig.js";

const router = express.Router();

// Add product
router.post("/", async (req, res) => {
  try {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
      let lastProductArray = products.slice(-1);
      let lastProduct = lastProductArray[0];
      id = lastProduct.id + 1;
    } else {
      id = 1;
    }
    const product = new Product({
      id: id,
      brand: req.body.brand,
      RAM: req.body.RAM,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
      imgurl: req.body.imgurl,
    });
    const savedProduct = await Product.create(product);
    res.status(201).send(savedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});
// upload image
router.post("/upload",upload("Product").single("product"), (req,res)=>{
    try {
        if(req.file){
            res.json({
                success:1,
                imgurl_url:`http://localhost:${PORT}/images/Product/${req.file.filename}`
            })
        } else {
            res.status(400).send({ message: "Image did not uploaded!" });
        }
    } catch (error) {
        console.log(error);
    res.status(500).send({ message: error.message });
    }
})

// delete






export default router;