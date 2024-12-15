import mongoose from "mongoose";

const db_uri: any = process.env.DB_URI;

const connection = async () => {
  try {
    const conn = await mongoose.connect(db_uri);
    console.log(`Connected To MongoDB database ${conn.connection.host}`);
  } catch (err: any) {
    console.log(`connection error: ${err.message}`);
  }
};

export default connection;
