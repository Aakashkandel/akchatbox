const mongoose = require('mongoose');
const schema=mongoose.Schema;

const messageSchema=new schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    message:{
        type:String,
        required:true
    },
},
{
    timestamps:true
}
)

const Message=mongoose.model('message',messageSchema);
module.exports=Message;