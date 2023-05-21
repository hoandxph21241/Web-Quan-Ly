var express = require("express");
var router = express.Router();
var dkController = require("../controllers/dangky_controller");

//Lấy danh sách;
router.get("/", dkController.getdangky);
router.get("/dang_ky", dkController.getdangky);





module.exports = router;