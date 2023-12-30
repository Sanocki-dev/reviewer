import { Schema, model } from "mongoose";

const NotificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    referenceId: {
      type: Schema.Types.ObjectId,
    },
    type: {
      type: String,
      enum: [
        "rating",
        "ratingUpdate",
        "friendRequest",
        "friendAccept",
        "watchlistCreated",
        "watchlistAdded",
        "watchlistRemoved",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const Notification = model("Notifications", NotificationSchema);

export default Notification;
