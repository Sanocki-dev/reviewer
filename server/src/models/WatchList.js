import { Schema, model } from "mongoose";

const WatchListSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: Array,
    default: [],
  },
  userId: {
    type: String,
    required: true,
  },
  movies: {
    type: Array,
    default: [],
  },
  partners: {
    type: Array,
    default: [],
  },
});

WatchListSchema.index({ name: 1, userId: 1 }, { unique: true });

const WatchList = model("WatchList", WatchListSchema);

export default WatchList;
