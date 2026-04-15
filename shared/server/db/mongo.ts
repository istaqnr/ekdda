import mongoose from "mongoose";

declare global {
  var __mongooseConn:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const globalMongoose = globalThis.__mongooseConn ?? {
  conn: null,
  promise: null,
};

globalThis.__mongooseConn = globalMongoose;

export async function connectToDatabase() {
  if (globalMongoose.conn) {
    return globalMongoose.conn;
  }

  const mongoUrl = process.env.MONGODB_URI;
  if (!mongoUrl) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  if (!globalMongoose.promise) {
    globalMongoose.promise = mongoose.connect(mongoUrl, {
      dbName: process.env.MONGODB_DB,
    });
  }

  globalMongoose.conn = await globalMongoose.promise;
  return globalMongoose.conn;
}
