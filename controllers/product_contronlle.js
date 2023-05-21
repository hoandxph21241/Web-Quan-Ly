var fs=require('fs');
var myMD=require('../model/san_pham_models');
// var myTL=require('../model/the_loai');


  exports.getinfo = (req, res, next) => {
    res.render("products/info");
  };

  exports.list= async(req,res,next)=>{



    let list=await(myMD.spModel.find().populate('the_loai'));
    console.log(list);
  
    res.render('products/product',{listSP:list});
  }

  exports.addSanPham =  async(req,res,next)=>{
    //khai báo biến thông tin
    let msg = '';
    //lấy ds thể loại đưa lên form
    let listTL = await myMD.theloaiModel.find();
    if(req.method =='POST'){
        // kiểm tra hợp lệ dữ liệu nếu có....
        // tạo model để gán dữ liệu
        let objSP = new myMD.spModel();
        objSP.name = req.body.name;
        objSP.price = req.body.price;
        objSP.the_loai = req.body.the_loai;
        objSP.image=req.body.image;
        // ghi vào CSDL
        try {
            let new_sp = await (objSP.save());
            console.log(new_sp);
            msg = 'Thêm mới thành công';
            res.redirect('/product');
        } catch (error) {
            msg = 'Lỗi '+ error.message;
            console.log(error);
        }
    }
  
    res.render('products/them_san_pham', {msg: msg, listTL:listTL });
  }




  exports.editSanPham = async (req,res,next)=>{
    let msg = '';
    let idsp = req.params.idsp;
    // lấy thông tin sản phẩm để sửa, tự thêm khối truy catch để bắt lỗi. 
    let objSP = await (myMD.spModel.findById(idsp));
    let listTL = await (myMD.theloaiModel.find());
    if(req.method =='POST'){
        // kiểm tra hợp lệ dữ liệu nếu có....
        // tạo model để gán dữ liệu
        let objSP = new myMD.spModel();
        objSP.name = req.body.name;
        objSP.price = req.body.price;
        objSP.description = req.body.description;
        objSP.the_loai = req.body.the_loai;
        objSP.image=req.body.image;
        objSP._id = idsp;// thêm cho chức năng sửa
        // ghi vào CSDL
        try {
            // let new_sp = await objSP.save();
            // console.log(new_sp);
            // msg = 'Thêm mới thành công';

            await (myMD.spModel.findByIdAndUpdate(idsp, objSP));
            msg = 'Đã cập nhật thành công';
            res.redirect('/product');
        } catch (error) {
            msg = 'Lỗi '+ error.message;
            console.log(error);
        }
    }
    
    res.render('products/sua_san_pham',{msg: msg, objSP: objSP, listTL:listTL});
}


exports.delete=async (req,res,next)=>{
  let msg = '';
  let idsp = req.params.idsp;
  let objSP = await (myMD.spModel.findById(idsp));
  let listTL = await (myMD.theloaiModel.find());
  if(req.method=='POST'){
    let objSP= new myMD.spModel();
    objSP.name = req.body.name;
    objSP.price = req.body.price;
    objSP.description = req.body.description;
    objSP.the_loai = req.body.the_loai;
    objSP.image=req.body.image;
    objSP._id=idsp;
    try{
      await (myMD.spModel.findByIdAndDelete(idsp, objSP));
      msg = 'Đã xóa thành công';
      res.redirect('/product');
    }catch (error) {
      msg = 'Lỗi '+ error.message;
      console.log(error);
  }
  }
  
  res.render('products/xoa_san_pham',{msg:msg,objSP:objSP,listTL:listTL})
}

// exports.delete = async (req, res, next) => {
//   let msg = '';
//   let idsp = req.params.idsp;
//   let objSP = await myMD.spModel.findById(idsp);
//   if (req.method == 'POST') {
//       try {
//           await myMD.spModel.deleteOne({_id: idsp}, function(err) {
//               if (err) {
//                   msg = 'Lỗi ' + err.message;
//                   console.log(err);
//               } else {
//                   msg = 'Đã xóa thành công';
//               }
//           });
//           res.redirect('/products');
//       } catch (error) {
//           msg = 'Lỗi ' + error.message;
//           console.log(error);
//       }
//   }
//   res.render( {msg: msg, objSP: objSP});
// };

// exports.delete = async (req, res, next) => {
//   try {
//     const idsp = req.params.idsp;
//     const result = await myMD.spModel.findByIdAndDelete(idsp);
//     if (result) {
//       res.redirect('/products');
//     } else {
//       res.status(404).send('Sản phẩm không tồn tại!');
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send('Lỗi server: ' + error.message);
//   }
// };

exports.thongtin=async (req,res,next)=>{
  let msg = '';
  let idsp = req.params.idsp;
  let objSP = await (myMD.spModel.findById(idsp).populate('the_loai'));
  let listTL = await (myMD.theloaiModel.find());
  if(req.method=='POST'){
    let objSP= new myMD.spModel();
    objSP.name = req.body.name;
    objSP.price = req.body.price;
    objSP.description = req.body.description;
    objSP.the_loai = req.body.the_loai;
    objSP.image=req.body.image;
    objSP._id=idsp;
  }
  
  res.render('products/thong_tin_san_pham',{msg:msg,objSP:objSP,listTL:listTL})
}


// Thể Loại
exports.tladd =  async(req,res,next)=>{
  //khai báo biến thông tin
  let msg = '';
  if(req.method =='POST'){
      // kiểm tra hợp lệ dữ liệu nếu có....
      // tạo model để gán dữ liệu
      let objSP = new myMD.theloaiModel();
      objSP.name = req.body.name;
      // ghi vào CSDL
      try {
          let new_sp = await (objSP.save());
          console.log(new_sp);
          msg = 'Thêm mới thành công';
          res.redirect('/tladd');
      } catch (error) {
          msg = 'Lỗi '+ error.message;
          console.log(error);
      }
  }

  res.render('products/them_the_loai', {msg: msg});
}
exports.listtl = async (req, res, next) => {
  try {
    let list = await myMD.theloaiModel.find();
    console.log(list);
    res.render('products/them_the_loai', { listSP: list });
    
  } catch (error) {
    let msg = 'Lỗi ' + error.message;
    console.log(error);
    // Xử lý lỗi ở đây (ví dụ: ghi log, gửi email thông báo lỗi, trả về trang lỗi...)
    res.status(500).send(msg);
  }
}
exports.deletetl=async (req,res,next)=>{
  let msg = '';
  let idsp = req.params.idsp;
  let objSP = await (myMD.theloaiModel.findById(idsp));
  if(req.method=='POST'){
    let objSP= new myMD.theloaiModel();
    objSP.name = req.body.name;
    objSP._id=idsp;
    try{
      await (myMD.theloaiModel.findByIdAndDelete(idsp, objSP));
      msg = 'Đã xóa thành công';
      res.redirect('/tladd');
    }catch (error) {
      msg = 'Lỗi '+ error.message;
      console.log(error);
  }
  }
  res.render('products/xoa_the_loai',{msg:msg,objSP:objSP})
}
exports.edittl = async (req,res,next)=>{
  let msg = '';
  let idsp = req.params.idsp;
  // lấy thông tin sản phẩm để sửa, tự thêm khối truy catch để bắt lỗi. 
  let objSP = await (myMD.theloaiModel.findById(idsp));
  if(req.method =='POST'){
      // kiểm tra hợp lệ dữ liệu nếu có....
      // tạo model để gán dữ liệu
      let objSP = new myMD.theloaiModel();
      objSP.name = req.body.name;;
      objSP._id = idsp;// thêm cho chức năng sửa
      // ghi vào CSDL
      try {
          // let new_sp = await objSP.save();
          // console.log(new_sp);
          // msg = 'Thêm mới thành công';
          await (myMD.theloaiModel.findByIdAndUpdate(idsp, objSP));
          msg = 'Đã cập nhật thành công';
          res.redirect('/tladd');
      } catch (error) {
          msg = 'Lỗi '+ error.message;
          console.log(error);
      }
  } 
  res.render('products/sua_the_loai',{msg: msg, objSP: objSP});
}