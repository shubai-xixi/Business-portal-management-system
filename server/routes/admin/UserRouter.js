const multer = require('multer');
const upload = multer({dest:'public/avatar/uploads/'})
let express = require("express");
const UserController = require("../../controllers/admin/UserController");
const JWT = require("../../util/JWT");
let UserRouter = express.Router();

UserRouter.post("/adminapi/user/login", UserController.login)
UserRouter.post("/adminapi/user/upload", upload.single('file'), UserController.upload)
//用户列表的增删改查
UserRouter.post("/adminapi/user/add", upload.single('file'), UserController.add)
UserRouter.get("/adminapi/user/list", UserController.getList)
UserRouter.get("/adminapi/user/list/:id", UserController.getList)
UserRouter.put("/adminapi/user/list/:id", UserController.putList)
UserRouter.delete("/adminapi/user/list/:id",UserController.delList)
module.exports = UserRouter