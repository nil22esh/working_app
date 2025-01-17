import Payment from "../models/payment.schema.js";
import Job from "../models/job.schema.js";

export const createPayment = async (req, res, next) => {
  const { amount, paymentMethod, jobId } = req.body;
  const userId = req.user._id;
  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }
    const newPayment = await Payment.create({
      amount,
      paymentMethod,
      jobId,
      userId,
    });
    return res.status(200).json({
      success: true,
      message: "Payment created successfully.",
      payment: newPayment,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "An error occurred while creating the payment.",
      error: error.message,
    });
  }
};

export const processPayment = async (req, res, next) => {
  const { paymentId } = req.params;
  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }
    payment.status = "completed";
    await payment.save();
    return res.status(200).json({
      success: true,
      message: "Payment processed successfully",
      Payment: payment,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error processing payment",
      error: error.message,
    });
  }
};

export const getPaymentStatus = async (req, res, next) => {
  const { paymentId } = req.params;
  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }
    return res.status(200).json({
      success: true,
      message: "payment status received successfully!",
      status: payment.status,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching payment status",
      error: error.message,
    });
  }
};

export const refundPayment = async (req, res, next) => {
  const { paymentId } = req.params;
  const { refundReason } = req.body;
  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }
    payment.status = "refunded";
    payment.refundReason = refundReason;
    await payment.save();
    return res.status(200).json({
      success: true,
      message: "payment refund processed successfully",
      Payment: payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error processing refund",
      error: error.message,
    });
  }
};

export const getUserPaymentHistory = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const payments = await Payment.find({ userId });
    return res.status(200).json({
      success: true,
      message: "payments received successfully!",
      Total: payments.length,
      paymentHistory: payments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching payment history",
      error: error.message,
    });
  }
};
