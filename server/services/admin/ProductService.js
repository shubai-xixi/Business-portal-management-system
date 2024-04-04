const ProductModel = require("../../models/ProductModel")

const ProductService = {
  add: async ({ title, introduction, detail, cover, editTime }) => {
    //console.log("数据库的模型处理")
    return ProductModel.create({ title, introduction, detail, cover, editTime })
  },
  getList: ({ _id }) => {
    return _id ? ProductModel.find({_id}) : ProductModel.find({})//数据多，可以加过滤条件
  },
//   publish: ({ _id,isPublish,editTime }) => {
//     return newsModel.updateOne({
//       _id
//     }, {
//       isPublish,
//       editTime
//     })
//   },
  delList: async (_id) => {
    return ProductModel.deleteOne({_id})
  },
  updateList: async ({ title, introduction, _id, detail, cover, editTime }) => {
    //console.log("数据库的模型处理")
    if (cover) {
      return ProductModel.updateOne({ _id }, { title, introduction, detail, cover, editTime })
    } else {
      return ProductModel.updateOne({ _id }, { title, introduction, detail, editTime })
    }
  },
}

module.exports = ProductService