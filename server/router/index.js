const express=require('express');
const router=express.Router();
const UserController=require('../controller/AuthController');
const auth=require('../middleware/auth');
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

const upload = multer({storage})

router.post('/register',UserController.register);
router.post('/login',UserController.login);
router.post('/uploadphoto',auth,upload.single('photo'),UserController.upload);
router.post('/changepassword',auth,UserController.changepassword);

module.exports=router;