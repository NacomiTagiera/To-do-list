import {
  Db,
  Collection as MongoCollection,
  ObjectId,
  MongoClient,
} from "mongodb";
import clientPromise from "./client";
import {
  Collection,
  CollectionFormValues,
  Todo,
  TodoFormValues,
} from "@/types";

let client: MongoClient;
let mongoCollection: MongoCollection<Document>;
let db: Db;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db();
    mongoCollection = db.collection("tasks");
  } catch (error) {
    throw new Error("Failed to connect to the database.");
  }
}

(async () => {
  await init();
})();

/////TODOS

export async function getAllCollections() {}

export async function createCollection() {}
