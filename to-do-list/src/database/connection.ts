import mongoose from "mongoose";

export default async function connectMongo() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    return mongoose.connect(process.env.MONGODB_URI as string);
  }
}
