import Notification from "../models/Notifications.js";

export const createNotification = async (params) => {
  // Create a notification
  const notification = new Notification({ ...params });

  await notification.save();
};
