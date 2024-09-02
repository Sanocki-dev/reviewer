import Notification from "../models/Notifications.js";

export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const readNotification = async (req, res) => {
  try {
    const { notificationId } = req.body;

    // Find the notification and update the read field to true
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true } // Return the updated document
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found." });
    }

    res
      .status(200)
      .json({ message: "Notification marked as read.", notification });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
