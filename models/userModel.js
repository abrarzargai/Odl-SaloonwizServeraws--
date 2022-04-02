const mongoose = require("mongoose");
const argon2 = require('argon2');
const userSchema = new mongoose.Schema({

  InitLogin: {
    type: Boolean,
    default: false,
  },
  SocialMedia: [{
    Title: { type: String, default: null },
    URL: { type: String, default: null },
  }],
  FirstName: {
    type: String,
    default: null,
  },
  DOB: {
    type: String,
    default: null,
  },
   SupplierName: {
    type: String,
    default: null,
  },
   City: {
    type: String,
    default: null,
  },
  LastName: {
    type: String,
    default: null,
  },
  Email: {
    type: String,
    lowercase: true,
  },
  Password: {
    type: String,
    default: null,
  },
  ContactNumber: {
    type: String,
    default: null,
  },
  BusinessName: {
    type: String,
    default: null,
  },
   Base: {
    type: String,
    default: "form",
  },
  BusinessAddress: {
    type: String,
    default: null,
  },
  PostCode: {
    type: String,
    default: null,
  },
  Role: {
    type: String,
    default: 'user',
    enum:['admin','user']
  },
  Image: {
    type: String,
    default: null,
  },
  Filling: [{
    Id: { type: String, default: null },
    Title: { type: String, default: null },
    Type: { type: String, default: null },
    URL: { type: String,default: null },
    Date: { type: Date, default: null}
  }],
 
},
  {
    timestamps: true,
  });

userSchema.pre('save', async function(next) {
  console.log("model hit")
  if(this.Password){
  this.Password = await argon2.hash(this.Password);
}
  console.log("model hit")
  next();
})
userSchema.pre('updateOne', async function (next) {
  this.getUpdate().Password = await argon2.hash(this.getUpdate().Password); 
  next();
})

const User = mongoose.model("User", userSchema);
module.exports = User;
