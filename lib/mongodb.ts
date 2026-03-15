import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const isMongoConfigured = () => Boolean(MONGODB_URI);

let cached = (global as typeof globalThis & { mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } }).mongoose;

if (!cached) {
  cached = (global as typeof globalThis & { mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } }).mongoose = {
    conn: null,
    promise: null
  };
}

export const connectDB = async () => {
  const mongoUri = MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined");
  }

  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached?.promise) {
    cached!.promise = mongoose.connect(mongoUri, {
      dbName: "portfolio"
    });
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
};
