import Notification from "../models/Updates.js";
import User from "../models/User.js";

export const userNotifications = async (type, id, referenceId) => {
  const { friends } = await User.findById(id).select({ friends: 1 });

  switch (type) {
    case "review":
      break;
    case "reviewUpdate":
      break;
    case "watchlistCreated":
      break;
    case "watchlistAdded":
      break;
    case "watchlistRemoved":
      break;
    case "friendRequest":
      break;
    case "friendAccept":
      break;
    default:
      break;
  }
  // Get all user friends to send out notifications

  const createNotification = await Notification.create({
    userId: id,
    referenceId: referenceId || null,
    type,
  });

  createNotification.save();

  console.log(friends);
};
