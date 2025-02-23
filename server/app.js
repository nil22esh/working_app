import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnection from "./db/dbConnect.js";
import userRouter from "./routes/user.routes.js";
import jobRouter from "./routes/job.routes.js";
import applicationRouter from "./routes/application.routes.js";
import skillVerificationRouter from "./routes/skillVerification.routes.js";
import notificationRouter from "./routes/notification.routes.js";
import searchMatchRouter from "./routes/searchMatch.routes.js";
import paymentRouter from "./routes/payment.routes.js";

// configuring .env file in application
dotenv.config();

// creating express instance and variables
const port = process.env.PORT || 3000;
const app = express();

// setting appication level middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// creating express dummy request
app.get("/health", (req, res) => {
  res.send("Welcome To Our Apllication!");
});

// creating routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/applications", applicationRouter);
app.use("/api/v1/skillVerfications", skillVerificationRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/searchMatchJobs", searchMatchRouter);
app.use("/api/v1/payments", paymentRouter);

// creating node server to run server
app.listen(port, () => {
  console.log(`${process.env.ENVIRONMENT} server running on port ${port}`);
  //   connect to mongodb database
  dbConnection();
});
