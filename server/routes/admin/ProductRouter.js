const multer = require('multer');
const upload = multer({dest:'public/product/uploads/'})
let express = require("express");

const ProductController = require("../../controllers/admin/ProductController");
//const JWT = require("../../util/JWT");
let ProductRouter = express.Router();

//涉及文件上传，需要加上 multer 中间件
ProductRouter.post("/adminapi/product/add",upload.single("file"),ProductController.add)

module.exports = ProductRouter