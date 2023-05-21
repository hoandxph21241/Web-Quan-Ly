var express = require("express");
var router = express.Router();
var ndController = require("../controllers/nguoidung_controller");

//Lấy danh sách;
router.get("/", ndController.getAdmin);
router.get('/nguoidung',ndController.list);







module.exports = router;
