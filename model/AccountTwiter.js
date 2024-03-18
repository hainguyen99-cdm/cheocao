let mongoose = require("mongoose");
const role = require("./enum/role");

let AccountTwiterSchema = new mongoose.Schema({
  idUser:  {type:  String, required:false},
  idProfile:{type: Number, required: false},
  userNameX:{type: String, required:false},
  passWord:{type: String, required:false},
  twoFa:{type: String, required:false},
  cookie:{type: String, required:false},
  typeProxy: {type: Number, required: false},
  proxy: {type: String, required: false},
  keyGpt: {type: String, required: false},
  status: {type: String, required: false},
  action:{type: String, required: false},

}, {timestamps: true})

var AccountTwiter = mongoose.model("AccountTwiter", AccountTwiterSchema)
module.exports = { AccountTwiter }