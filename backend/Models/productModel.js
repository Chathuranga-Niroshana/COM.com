import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  id: { type: Number },
  category:{type:String,required:true},
  brand: { type: String, required: true },
  RAM: { type: String, required: true },
  price: { type: Number, require: true },
  description: { type: String },
  imgurl: { type: String },
  date: { type: Date, default: Date.now },
});
export const Product = mongoose.model("Product", productSchema);
