import Notification from "../models/notification.schema.js";

export const sendNotification = async (req, res, next) => {
  const { type, message } = req.body;
  const userId = req.user._id;
  try {
    const notification = await Notification.create({ type, message, userId });
    return res.status(201).json({
      success: true,
      message: "Notification sent successfully.",
      SentNotification: notification,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "An error occurred while sending the notification.",
      error: error.message,
    });
  }
};

export const getUserNotifications = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const notifications = await Notification.find({ userId });
    return res.status(200).json({
      success: true,
      message: "User notifications retrieved successfully.",
      TotalCount: notifications.length,
      Notifications: notifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving user notifications.",
      error: error.message,
    });
  }
};

export const markNotificationAsRead = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );
    if (!updatedNotification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Notification marked as read successfully.",
      UpdatedNotification: updatedNotification,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "An error occurred while marking the notification as read.",
      error: error.message,
    });
  }
};

export const deleteNotification = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedNotification = await Notification.findByIdAndDelete(id);
    if (!deletedNotification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Notification deleted successfully.",
      DeletedNotification: deletedNotification,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "An error occurred while deleting the notification.",
      error: error.message,
    });
  }
};
