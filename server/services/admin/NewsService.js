const newsModel = require("../../models/NewsModel")

const NewsService = {
  add: async ({title,content,category,cover,isPublish,editTime}) => {
    //console.log("数据库的模型处理")
    
    return newsModel.create({ title, content, category, cover, isPublish, editTime })
  }
}

module.exports = NewsService