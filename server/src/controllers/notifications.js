import Notification from "../models/Notifications.js";

export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    const data = await getList(userId);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getList = async (user) => {
  try {
    const list = await Notification.find({ user }).sort({
      createdAt: -1,
    });

    if (!list) return;

    const unreadCount = await Notification.countDocuments({
      user,
      read: false,
    });

    return { list, unreadCount };
  } catch (error) {
    console.log(error);
  }
};

export const readNotification = async (req, res) => {
  try {
    const { notificationId } = req.body;

    // Find the notification and update the read field to true
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { $set: { read: true } },
      { new: true } // Return the updated document
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found." });
    }

    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const readAllNotification = async (req, res) => {
  try {
    const { user } = req.body;

    // Find the notification and update the read field to true
    const notification = await Notification.updateMany(
      { user },
      { $set: { read: true } }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notifications not found." });
    }

    const list = await getList(user);

    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
