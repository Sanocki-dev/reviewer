import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const WatchListSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
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
