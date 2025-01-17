import express from "express";
import {
  createPayment,
  getPaymentStatus,
  getUserPaymentHistory,
  processPayment,
  refundPayment,
} from "../controllers/payment.controller.js";
import authUser from "../middlewares/authUser.middleware.js";
import checkAdmin from "../middlewares/isAdmin.middleware.js";

const paymentRouter = express.Router();

paymentRouter.post("/create", authUser, createPayment);
paymentRouter.put("/process/:paymentId", authUser, processPayment);
paymentRouter.get("/status/:paymentId", authUser, getPaymentStatus);
paymentRouter.post("/refund/:paymentId", authUser, checkAdmin, refundPayment);
paymentRouter.get("/history", authUser, getUserPaymentHistory);

export default paymentRouter;
