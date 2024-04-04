const ProductService = require("../../services/admin/ProductService")

const ProductController = {
  add: async (req, res) => {
    //console.log(req.body)
    const cover = req.file ? '/product/uploads/'+ req.file.filename : ""
    const { title,introduction,detail } = req.body
    await ProductService.add({
      title,introduction,detail,
      cover: cover,
      editTime: new Date()
    })

    res.send({
      ActionType: "OK",
    })
  },
  getList: async (req, res) => {
    //console.log(req.params.id)
    const result = await ProductService.getList({_id:req.params.id})
     res.send({
       ActionType: "OK",
       data: result
    })
  },
//   publish: async (req, res) => {
//     //.log(req.body)
//     await NewsService.publish({
//       ...req.body,
//       editTime: new Date()
//     })
//     res.send({
//       ActionType: "OK"
//     })
//   },
  delList: async (req, res) => {
    await ProductService.delList({ _id: req.params.id })
    res.send({
      ActionType: "OK"
    })
  },
  updateList: async (req, res) => {
    //console.log(req.body)
    const cover = req.file ? '/product/uploads/'+ req.file.filename : ""
    const { title,introduction,detail,_id } = req.body
    await ProductService.updateList({
      title,introduction,detail,_id,
      cover: cover,
      editTime: new Date()
    })

    res.send({
      ActionType: "OK",
    })
  },
}

module.exports = ProductController