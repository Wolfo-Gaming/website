import type { Db } from "mongodb";
import { MongoClient } from "mongodb";

let cachedClient: MongoClient;
let cachedDb: Db;

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }

    let client = new MongoClient(process.env.DB_URI as string);
    await client.connect();
    let db = client.db();

    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb,
    };
}