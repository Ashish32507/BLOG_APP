import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = async () => {
  try {
    mongoose
      .connect("mongodb+srv://Ashish1262:Ashish12@cluster0.cpt9r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/BlogApp")
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
