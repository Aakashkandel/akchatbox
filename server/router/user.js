const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth');

const UserController=require('../controller/UserController');

router.get('/',auth,UserController.getUsersForSideBar);

module.exports=router;