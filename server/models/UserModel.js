const mongoose = require("mongoose")
const Schema = mongoose.Schema

//user模型===>users集合
const UserType = {
  username: String,
  password: String,
  gender: Number,  //0保密，1男性，2女性
  introduction: String ,//简介
  avatar: String, //头像
  role: Number, //角色，管理员1，编辑2
}

//根据模型建表
const UserModel = mongoose.model("user", new Schema(UserType))

module.exports = UserModel