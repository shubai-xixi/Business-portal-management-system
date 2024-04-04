const newsModel = require("../../models/NewsModel")

const NewsService = {
  add: async ({ title, content, category, cover, isPublish, editTime }) => {
    //console.log("数据库的模型处理")
    return newsModel.create({ title, content, category, cover, isPublish, editTime })
  },
  getList: ({ _id }) => {
    //console.log("你好")
    //  const a = _id ? "1hhhhh" : "2xxxxxxxxx"
    //  console.log(a)
    //  return newsModel.find({})
    return _id ? newsModel.find({_id}) : newsModel.find({})//数据多，可以加过滤条件
  },
  publish: ({ _id,isPublish,editTime }) => {
    return newsModel.updateOne({
      _id
    }, {
      isPublish,
      editTime
    })
  },
  delList: async (_id) => {
    return newsModel.deleteOne({_id})
  },
  updateList: async ({ title, content, _id, category, cover, isPublish, editTime }) => {
    //console.log("数据库的模型处理")
    if (cover) {
      return newsModel.updateOne({ _id }, { title, content, category, cover, isPublish, editTime })
    } else {
      return newsModel.updateOne({ _id }, { title, content, category, isPublish, editTime })
    }
  },
}

module.exports = NewsService