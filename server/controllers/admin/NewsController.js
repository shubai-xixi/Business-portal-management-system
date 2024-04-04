const NewsService = require("../../services/admin/NewsService")

const NewsController = {
  add: async (req, res) => {
    //console.log(req.body)
    const cover = req.file ? '/news/uploads/'+ req.file.filename : ""
    const { title,content,category,isPublish } = req.body
    await NewsService.add({
      title,content,
      category: Number(category),
      isPublish: Number(isPublish),
      cover: cover,
      editTime: new Date()
    })

    res.send({
      ActionType: "OK",
    })
  },
  getList: async (req, res) => {
    //console.log(req.params.id)
    const result = await NewsService.getList({_id:req.params.id})
     res.send({
       ActionType: "OK",
       data: result
    })
  },
  publish: async (req, res) => {
    //.log(req.body)
    await NewsService.publish({
      ...req.body,
      editTime: new Date()
    })
    res.send({
      ActionType: "OK"
    })
  },
  delList: async (req, res) => {
    await NewsService.delList({ _id: req.params.id })
    
    res.send({
      ActionType: "OK"
    })
  },
  updateList: async (req, res) => {
    //console.log(req.body)
    const cover = req.file ? '/news/uploads/'+ req.file.filename : ""
    const { title,content,category,isPublish,_id } = req.body
    await NewsService.updateList({
      title,content,_id,
      category: Number(category),
      isPublish: Number(isPublish),
      cover: cover,
      editTime: new Date()
    })

    res.send({
      ActionType: "OK",
    })
  },
}

module.exports = NewsController