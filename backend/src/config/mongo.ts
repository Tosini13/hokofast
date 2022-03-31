import mongoose from "mongoose";

export const connectMongoose = () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@portfolio.cwxto.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
  mongoose.Promise = global.Promise;
};
