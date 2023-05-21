var express = require("express");
var router = express.Router();
var stController = require("../controllers/setting_controller");

//Lấy danh sách;
router.get("/", stController.getsetting);
router.get("/setting", stController.getsetting);

router.get('/Account',stController.getAcc);



module.exports = router;