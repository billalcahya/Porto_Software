import mongoose from "mongoose";
import dns from "dns";

if (typeof dns.setDefaultResultOrder === "function") {
  dns.setDefaultResultOrder("ipv4first");
}

try {
  dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
} catch {
  // fallback if environment doesn't allow setting custom DNS
}

const RAW_URI = process.env.DATABASE_URL || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/software_house";

function formatMongoURI(uri: string): string {
  if (uri.includes("mongodb.net") && !uri.includes("mongodb.net/software_house")) {
    if (uri.includes("mongodb.net/?")) {
      return uri.replace("mongodb.net/?", "mongodb.net/software_house?");
    }
    if (uri.endsWith("mongodb.net") || uri.endsWith("mongodb.net/")) {
      return uri.replace(/\/$/, "") + "/software_house";
    }
  }
  return uri;
}

const DATABASE_URL = formatMongoURI(RAW_URI);

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

async function resolveSrvUri(srvUri: string): Promise<string> {
  if (!srvUri.startsWith("mongodb+srv://")) return srvUri;

  try {
    const match = srvUri.match(/^mongodb\+srv:\/\/([^:]+):([^@]+)@([^/?]+)(\/[^?]+)?(\?.*)?$/);
    if (!match) return srvUri;

    const [, user, pass, host, dbPath = "/software_house", queryParams = ""] = match;
    const srvRecord = `_mongodb._tcp.${host}`;

    try {
      dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
    } catch {}

    const records = await dns.promises.resolveSrv(srvRecord);
    if (records && records.length > 0) {
      const hostList = records.map((r) => `${r.name}:${r.port}`).join(",");
      const delimiter = queryParams ? "&" : "?";
      return `mongodb://${user}:${pass}@${hostList}${dbPath}${queryParams}${delimiter}ssl=true&authSource=admin`;
    }
  } catch (err) {
    console.warn("SRV resolution fallback active, proceeding with standard URI:", err);
  }
  return srvUri;
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
    };

    try {
      if (typeof dns.setDefaultResultOrder === "function") {
        dns.setDefaultResultOrder("ipv4first");
      }
      dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
    } catch {
      // Ignore if DNS custom servers cannot be set
    }

    cached!.promise = resolveSrvUri(DATABASE_URL).then((resolvedUrl) => {
      return mongoose.connect(resolvedUrl, opts);
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}

export default connectDB;
