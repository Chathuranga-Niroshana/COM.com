import mongoose from "mongoose";
const userShema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  cartData: { type: Object },
  date: { type: Date, default: Date.now },
  image: { type: String },
});

export const User = mongoose.model("User", userShema);
