import mongoose from 'mongoose';

const DB = async () =>
  mongoose.connect(
    'mongodb+srv://andriandev:Adikdancok1@andriandb.1fgncmh.mongodb.net/?retryWrites=true&w=majority'
  );

export default DB;
