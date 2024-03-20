const UserService = require("../../services/admin/UserService")
const JWT = require("../../util/JWT")
const multer = require('multer')

const UserController = {
  login: async (req, res) => {
    let result = await UserService.login(req.body)
    if (result.length === 0) {
      res.send({
        code: "-1",
        error: "用户名密码不匹配"
      })
    } else {

      const token = JWT.generate({
        _id: result[0]._id,
        username: result[0].username
      }, '1d')
      res.header("authorization", token)

      //undefine不会返回
      res.send({
        ActionType: "OK",
        data: {
          username: result[0].username,
          gender: result[0].gender ? result[0].gender : 0,  //0保密，1男性，2女性
          introduction: result[0].introduction,//简介
          avatar: result[0].avatar, //头像
          role: result[0].role, //角色，管理员1，编辑2
        }

      })
    }
  },
  upload: async (req, res) => {
    //console.log(req.body, req.file)
    const token = req.headers["authorization"].split(" ")[1]
    const payload = JWT.verify(token)
    const avatar = req.file ? '/avatar/uploads/' + req.file.filename : ''
    const { username, introduction, gender } = req.body
    //console.log(payload._id)
    //更新数据库
    await UserService.upload({ _id: payload._id, username: username, gender: Number(gender), introduction: introduction, avatar: avatar })
    if (!avatar) {
      res.send({
        ActionType: 'ok',
        data: {
          username, introduction,
          gender: Number(gender),
        }
      })
    } else {
      res.send({
        ActionType: 'ok',
        data: {
          username, introduction,
          gender: Number(gender),
          avatar: avatar
        }
      })
    }
  },
  add: async (req, res) => {
    //console.log(req.body, req.file)
    //const token = req.headers["authorization"].split(" ")[1]
    //const payload = JWT.verify(token)
    const avatar = req.file ? '/avatar/uploads/' + req.file.filename : ''
    const { username, introduction, gender, role, password } = req.body
    console.log(username)
    //更新数据库
    await UserService.add({ username: username, gender: Number(gender), introduction: introduction, role: role, password: password, avatar: avatar })
    if (!avatar) {
      res.send({
        ActionType: 'ok',
        // data: {
        //   username, introduction,
        //   gender: Number(gender),
        // }
      })
    } else {
      res.send({
        ActionType: 'ok',
        // data: {
        //   username, introduction,
        //   gender: Number(gender),
        //   avatar: avatar
        // }
      })
    }
  },
  getList: async (req, res) => {
    const result = await UserService.getList(req.params)
    res.send({
      ActionType: 'OK',
      data: result
    })
  },
  putList: async (req, res) => {
    const result = await UserService.putList(req.body)
    res.send({
      ActionType:"OK"
    })
  },
  delList: async (req, res) => {
    //console.log(req.params.id)
    const result = await UserService.delList({_id:req.params.id})
    res.send({
      ActionType:"OK"
    })
  }
}

module.exports = UserController