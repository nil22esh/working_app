import express from "express";
import authUser from "../middlewares/authUser.middleware.js";
import {
  deleteNotification,
  getUserNotifications,
  markNotificationAsRead,
  sendNotification,
} from "../controllers/notification.controller.js";

const notificationRouter = express.Router();

notificationRouter.post("/send-notifications", authUser, sendNotification);

notificationRouter.get("/user-notifications", authUser, getUserNotifications);

notificationRouter.put(
  "/update/user-notifications/:id",
  authUser,
  markNotificationAsRead
);

notificationRouter.delete(
  "/delete-user-notifications/:id",
  authUser,
  deleteNotification
);

export default notificationRouter;
