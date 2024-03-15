let mongoose = require("mongoose");
const role = require("./enum/role");

let UserSchema = new mongoose.Schema({
  keyPc: {type: String, required:false},
  refreshToken:{type: String, required:false},
  active: {type: Boolean, required: false,default:false},
  role: {type: String, required: false,default:role.USER},
  point: {type: Number, required: false},

}, {timestamps: true})

var Users = mongoose.model("users", UserSchema)
module.exports = { Users }