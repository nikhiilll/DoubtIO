import express from "express";
// import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/routes.js";

// dotenv.config();
const app = express();

//Middlewares for Express Server
app.use(cors({ exposedHeaders: "Authorization" }));
app.use(express.json());
app.use("/api", router);

//Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

//Connect to the MongoDB Atlas Cloud DB
const conn = mongoose
  .connect(process.env.MONGODB_URI)
  .then(console.log(`Connected to the MongoDB database.`))
  .catch((err) => {
    console.log("Error while connecting to the MongoDB database.");
    console.log(err);
  });

//Generic message for non-api root paths
app.all("/", (req, res) => {
  res.send("Welcome to the Doubt.io API.");
});
