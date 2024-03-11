import mongoose from "mongoose";
const ConnectDB = async (DB_URL) => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Database connected!");
  } catch (error) {
    console.log(error);
  }
};
export default ConnectDB;
