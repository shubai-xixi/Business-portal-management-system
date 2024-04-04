const mongoose = require("mongoose")
const Schema = mongoose.Schema

//user模型===>users集合
const newsType = {
  title: String,
  content: String,
  category: Number,  //类别，1
  cover: String , //背景图
  isPublish: Number, // 1未发布，2已发布
  editTime: Date
}

//根据模型建表
const newsModel = mongoose.model("news", new Schema(newsType))

module.exports = newsModel