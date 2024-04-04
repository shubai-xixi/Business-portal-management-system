const multer = require('multer');
const upload = multer({dest:'public/product/uploads/'})
let express = require("express");

const ProductController = require("../../controllers/admin/ProductController");
//const JWT = require("../../util/JWT");
let ProductRouter = express.Router();

//涉及文件上传，需要加上 multer 中间件
ProductRouter.post("/adminapi/product/add",upload.single("file"),ProductController.add)
ProductRouter.get("/adminapi/product/list", ProductController.getList)
ProductRouter.get("/adminapi/product/list/:id",ProductController.getList)
ProductRouter.delete("/adminapi/product/list/:id",ProductController.delList)
ProductRouter.post("/adminapi/product/list",upload.single("file"),ProductController.updateList)

module.exports = ProductRouter