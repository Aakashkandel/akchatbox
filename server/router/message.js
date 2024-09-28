const express = require("express");
const MessageController = require("../controller/MessageController")
const auth=require('../middleware/auth');
const router = express.Router();

router.post("/send/:id",auth, MessageController.sendmessage) ;
router.get("/get/:id",auth, MessageController.getMessage) ;
    

module.exports = router;