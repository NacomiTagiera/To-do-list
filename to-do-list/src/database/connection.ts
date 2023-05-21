import { MongoClient, MongoClientOptions } from "mongodb";

const { MONGODB_URI = "" } = process.env;

export default async function connectToDatabase() {
  const client = await MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as MongoClientOptions & { useNewUrlParser: boolean });
  return client.db("tasks").collection("tasks");
}
