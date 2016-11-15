import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AccessSchema = new Schema({
  username: String,
  key: String,
});

export default mongoose.model('Access', AccessSchema);

/*var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

var AccessSchema = new Schema({
  accessname: String,
  key: String,
});

AccessSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Access', AccessSchema);*/

