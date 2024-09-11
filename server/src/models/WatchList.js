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
    type: Schema.Types.ObjectId,
    required: true,
  },
  movies: {
    type: Array,
    default: [],
  },
  partners: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
});

WatchListSchema.index({ userId: 1, name: 1 }, { unique: true });

const WatchList = model("WatchList", WatchListSchema);

export default WatchList;
