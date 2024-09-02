import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const validNotifications = ['follow', 'like', 'comment', 'review', 'watchlist'];

const notificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ref: {
    type: String,
  },
  type: {
    type: String,
    enum: validNotifications,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
