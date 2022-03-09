const mongoose = require("mongoose");
const argon2 = require('argon2');
const userSchema = new mongoose.Schema({

  InitLogin: {
    type: Boolean,
    default: false,
  },
  SocialMedia: [{
    Title: { type: String },
    URL: { type: String },
  }],
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  Email: {
    type: String,
    lowercase: true,
  },
  Password: {
    type: String,
  },
  ContactNumber: {
    type: String,
  },
  BusinessName: {
    type: String,
  },
  BusinessAddress: {
    type: String,
  },
  PostCode: {
    type: String,
  },
  Role: {
    type: String,
    default: 'user',
    enum:['admin','user']
  },
  Image: {
    type: String,
  },
  Filling: [{
    Id: { type: String },
    Title: { type: String },
    Type: { type: String },
    URL: { type: String },
    Date: { type: Date}
  }],
 
},
  {
    timestamps: true,
  });

userSchema.pre('save', async function(next) {
  this.Password = await argon2.hash(this.Password);
  next();
})
userSchema.pre('updateOne', async function (next) {
  this.getUpdate().Password = await argon2.hash(this.getUpdate().Password); 
  next();
})

const User = mongoose.model("User", userSchema);
module.exports = User;
