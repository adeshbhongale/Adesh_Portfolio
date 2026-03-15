import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const isMongoConfigured = () => Boolean(MONGODB_URI);

const normalizeMongoUri = (uri: string) => {
  try {
    const parsed = new URL(uri);
    parsed.searchParams.delete("portfolio");
    if (!parsed.searchParams.has("retryWrites")) {
      parsed.searchParams.set("retryWrites", "true");
    }
    if (!parsed.searchParams.has("w")) {
      parsed.searchParams.set("w", "majority");
    }
    return parsed.toString();
  } catch {
    return uri;
  }
};

let cached = (global as typeof globalThis & { mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } }).mongoose;

if (!cached) {
  cached = (global as typeof globalThis & { mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } }).mongoose = {
    conn: null,
    promise: null
  };
}

export const connectDB = async () => {
  const mongoUri = MONGODB_URI ? normalizeMongoUri(MONGODB_URI) : MONGODB_URI;
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
