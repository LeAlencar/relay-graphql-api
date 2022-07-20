import mongoose from 'mongoose';

export const connectDB = () => {

  mongoose.connect("mongodb+srv://leandro:L34ndro123@cluster0.lozvw.mongodb.net/?retryWrites=true&w=majority");

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => console.log("Database connected ✅"));

}

