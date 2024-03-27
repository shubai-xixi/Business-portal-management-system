const multer = require('multer');
const upload = multer({dest:'public/news/uploads/'})
let express = require("express");

const NewsController = require("../../controllers/admin/NewsController");
//const JWT = require("../../util/JWT");
let NewsRouter = express.Router();

//涉及文件上传，需要加上 multer 中间件
NewsRouter.post("/adminapi/news/add",upload.single("file"),NewsController.add)

module.exports = NewsRouter