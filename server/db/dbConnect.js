import mongoose from "mongoose";

// Connect to MongoDB
const dbConnection = async () => {
  await mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("Connected to MongoDB Database!");
    })
    .catch((error) => {
      console.error(`Error connecting to MongoDB: ${error}`);
      process.exit(1);
    });
};

export default dbConnection;
