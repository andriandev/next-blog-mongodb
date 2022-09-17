import mongoose from 'mongoose';

const DB = async () =>
  mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/?retryWrites=true&w=majority`
  );

export default DB;
