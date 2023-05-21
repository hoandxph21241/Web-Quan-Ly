var fs=require('fs');
var myUs=require('../model/dang_nhap_model');


exports.getAdmin = (req, res, next) => {
  res.render("nguoidungs/admin");
};


exports.getUser = (req, res, next) => {
  let fullname = "";
  let username = "";
  let password = "";
  let email = "";
  let group = "";
  let statuss = "";

  if (req.method == "POST") {
    fullname = req.body.fullname;
    username = req.body.username;
    password = req.body.password;
    email = req.body.email;
    group = req.body.group;
    statuss = req.body.statuss;
 
    console.log('Các giá trị: ' +
'Fullname: '   +  fullname      +  " / "+               
'Username: '   +  username      +  " / "+  
'Email: '      +  email         +  " / "+  
'Password: '   +  password      +  " / "+  
'Group: '      +  group         +  " / "+  
'Status: '     +  statuss 
  )

}


  res.render('nguoidungs/nguoidung',{
    fullname: fullname,
    username: username,
  //  password: password,
    email: email,
    group: group,
    statuss: statuss,
  })

};

exports.list= async(req,res,next)=>{



  let list=await(myUs.UsModel.find().populate('action'));
  console.log(list);

  res.render('nguoidungs/nguoidung',{listSP:list});
}









