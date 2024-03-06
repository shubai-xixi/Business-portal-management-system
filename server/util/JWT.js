const jsonwebtoken = require("jsonwebtoken")
const secret = "kerwin"

const JWT = {
  generate(value,expires) {
    //生成token
    return jsonwebtoken.sign(value, secret, { expiresIn: expires })
  },
  verify(token) {
    //验证token
    try {
      return jsonwebtoken.verify(token, secret)
    } catch (e) {
      return false
    }
  }
}

// const token = JWT.generate({ name: "kerwin" }, "10s")
// console.log(token)
// console.log(JWT.verify(token))

// setTimeout(() => {
//   console.log(JWT.verify(token))
// },11000)
module.exports = JWT