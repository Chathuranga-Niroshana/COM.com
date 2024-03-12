import express from "express";
import { DB_URL, PORT } from "./Config.js";
import ConnectDB from "./ConnectDB.js";
import productRouter from "./Routes/productRoute.js";
import userRouter from "./Routes/userRoute.js";
import cors from "cors";

const app = express();
ConnectDB(DB_URL);
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.use("/images", express.static("upload/images"));
app.use("/product", productRouter);
app.use("/user", userRouter);
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
