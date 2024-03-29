import { MongoClient, MongoClientOptions } from "mongodb";

const { MONGODB_URI } = process.env;

export default async function connect() {
  if (!MONGODB_URI) {
    throw new Error("Please add your MongoDB uri in the .env file");
  }

  const client = await MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as MongoClientOptions & { useNewUrlParser: boolean });
  return client.db("tasks").collection("tasks");
}
