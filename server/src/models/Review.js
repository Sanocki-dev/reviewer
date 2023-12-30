import { Schema, model } from "mongoose";

const ReviewSchema = new Schema(
  {
    movieId: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    review: {
      type: String,
      maxlength: 250,
    },
    medals: {
      type: Array,
      default: []
    },
  },
  { timestamps: true }
);

const Review = model("Review", ReviewSchema);

export default Review;
