import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = async () => {
  try {
    mongoose
      .connect("mongodb://127.0.0.1/BlogApp")
      .then(() => {
        console.log("Data Base Connected Successfully");
      })
      .catch((err) => {
        console.log("Error Occured ", err);
      });
  } catch (err) {
    console.log("Database Connection Fail ", err);
  }
};

export default dbConnection;
