var express = require("express");
var router = express.Router();
var prController = require("../controllers/product_contronlle");

//Lấy danh sách;

router.get('/info',prController.getinfo);
router.get('/product',prController.list);

router.get('/them_san_pham',prController.addSanPham);
router.post('/them_san_pham',prController.addSanPham);


router.get('/sua', prController.editSanPham);
router.get('/sua/:idsp', prController.editSanPham);
router.post('/sua/:idsp', prController.editSanPham);


// router.get('/xoa',prController.delete);
// router.get('/xoa',prController.delete);
// router.post('/xoa',prController.delete);
// router.post('/products/:idsp', prController.delete);
router.get('/xoa',prController.delete);
router.get('/xoa/:idsp', prController.delete);
router.post('/xoa/:idsp', prController.delete);

router.get('/thongtin',prController.thongtin);
router.get('/thongtin/:idsp', prController.thongtin);

//Thể loại
router.get('/tladd',prController.listtl);
router.get('/tladd',prController.tladd);
router.post('/tladd',prController.tladd);

router.get('/edit_tl/:idsp',prController.edittl);
router.post('/edit_tl/:idsp',prController.edittl);

router.get('/xoa_tl/:idsp',prController.deletetl);
router.post('/xoa_tl/:idsp',prController.deletetl);

module.exports = router;