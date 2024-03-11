import express from "express";
import { DB_URL, PORT } from "./Config.js";
import ConnectDB from "./ConnectDB.js";

const app = express();
ConnectDB(DB_URL);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
