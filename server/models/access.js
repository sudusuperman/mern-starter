import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AccessSchema = new Schema({
  username: String,
  token: String,
});

export default mongoose.model('Access', AccessSchema);
