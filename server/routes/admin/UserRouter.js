const multer = require('multer');
const upload = multer({dest:'public/avatar/uploads/'})
let express = require("express");
const UserController = require("../../controllers/admin/UserController");
const JWT = require("../../util/JWT");
let UserRouter = express.Router();

UserRouter.post("/adminapi/user/login", UserController.login)
UserRouter.post("/adminapi/user/upload", upload.single('file'), UserController.upload)
UserRouter.post("/adminapi/user/add", upload.single('file'), UserController.add)
module.exports = UserRouter