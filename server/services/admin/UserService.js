const UserModel = require("../../models/UserModel")

const UserService = {
  login: async ({ username, password }) => {
    return UserModel.find({
      username,
      password
    })
  },
  upload: async ({ _id, username, introduction, gender, avatar }) => {
    if (!avatar) {
      return UserModel.updateOne({ _id },
        {
          username, introduction, gender
        })
    } else {
      return UserModel.updateOne({ _id },
        {
          username, introduction, gender, avatar
        })
    }
  },
  //传值问题未解决，file要回前面按视频方法处理会更好，不然顺序会产生bug
  add: async ({username, introduction, gender, avatar, password, role }) => {
    return await UserModel.create(
        {
          username, introduction, gender, avatar, password, role
        })
    // if (avatar) {
    //   return UserModel.create({ _id },
    //     {
    //       username, introduction, gender, avatar
    //     })
    // } else {
    //   return UserModel.updateOne({ _id },
    //     {
    //       username, introduction, gender
    //     })
    // }
  },
  getList: async({ id })=>{
    return id ? UserModel.find({_id:id},["username","role","password","introduction",]):UserModel.find({},["username","role","avatar","introduction","gender"])
    
  },
  putList: async ( body ) => {
    return UserModel.updateOne({_id:body._id},body)
  },
  delList: async ({ _id }) => {
    return UserModel.deleteOne({_id})
  }
}

module.exports = UserService