import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = {
		conn: null,
		promise: null,
	};
}

export const connectDB = async () => {
	if (cached.conn) return cached.conn;
  console.log("MONGODB_URI =", process.env.MONGODB_URI);
	if (!cached.promise) {
		cached.promise = mongoose.connect(MONGODB_URL, {
			dbName: "next-ecommerce",
			bufferCommands: false,
		});
	}
	cached.conn = await cached.promise;
	return cached.conn;

};
