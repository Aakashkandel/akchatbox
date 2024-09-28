const Conversation = require("../model/CoversationModel");
const Message = require("../model/MessageModel");
const {io}=require("../socket/socket");
const  {getReceiverSocketId}=require("../socket/socket");



const sendmessage=async(req,res)=>{
   console.log("Message Controller");

   const {message}=req.body;
   const{id}=req.params;

   const senderId=req.user.id;
   const receiverId=id;
   try{

   let conversation=await Conversation.findOne({participants:{$all:[senderId,receiverId]}});
    if(!conversation){
        conversation= await new Conversation({
            participants:[senderId,receiverId]
        });
    }
   
    const newMessage=await new Message({
        senderId,
        receiverId,
        message
    });
   if(newMessage){
    conversation.messages.push(newMessage._id);
   }

   //Socket.io
   const receiverSocketId=getReceiverSocketId(receiverId);
    if(receiverSocketId){
         io.to(receiverSocketId).emit("newMessage",newMessage);
    }
    await newMessage.save();
    await conversation.save();
    res.status(200).json(newMessage);
    console.log("Message Sent");
    

   }catch(err){
    console.log(err.message);

         console.log(err);
    }

   console.log(message,id,senderId);
}

const getMessage = async (req, res) => {
    console.log("Get Message Controller");
    
    const { id: receiverId } = req.params; 
    const senderId = req.user.id; 
    
    try {
        
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        
        if (!conversation) {
            return res.status(404).json({
                message: "No conversation found between these users.",
                messages: []
            });
        }

        // Respond with the conversation messages
        res.status(200).json(conversation.messages);

    } catch (err) {
        console.error(err.message);
        // Send error response
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};


module.exports={sendmessage,getMessage};