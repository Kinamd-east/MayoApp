const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  linkedAccounts: {
    type: Array,
    required: true,
  },
  twitterName: {
    type: String,
    required: true,
  },
  twitterUsername: {
    type: String,
    required: true,
  },
  twitterId: {
    type: String,
    required: true,
  },
  twitterPfp: {
    type: String,
    required: true,
  },
  nese: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
