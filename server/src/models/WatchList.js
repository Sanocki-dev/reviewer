import { Schema, model } from "mongoose";

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

const WatchList = model("WatchList", WatchListSchema);

export default WatchList;
