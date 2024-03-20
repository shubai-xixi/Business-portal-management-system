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
  add: async ({ _id, username, introduction, gender, avatar, password, role }) => {
    return UserModel.create({ _id },
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
  }
}

module.exports = UserService