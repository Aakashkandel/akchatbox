const User = require("../model/UserModel");

const getUsersForSideBar=async(req,res)=>{
    try{
        const loggedInUserId=req.user.id;
    const filteruser={_id:{$ne:loggedInUserId}};
    const users = await User.find(filteruser).select("-password");
    res.status(200).json(users);
   
    }
    catch(err){
        console.log(err.message);
        console.log(err);
    }
}

module.exports={
    getUsersForSideBar
}