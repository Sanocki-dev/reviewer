import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to Mongo`))
  .catch((error) => {
    console.log(`${error} did not connect`);
  });
