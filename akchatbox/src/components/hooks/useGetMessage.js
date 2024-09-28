
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/MessageSlice";


const useGetMessage=()=> {

    const socket=useSelector(state=>state.socket.socket);
    const messages=useSelector(state=>state.message.messages);
    const dispatch=useDispatch();
    useEffect(()=>{
        if(socket){
            socket.on("newMessage",(message)=>{
              
              
                dispatch(setMessages([...messages,message]));

            });
        }
        return ()=>{
            if(socket){
                socket.off("newMessage");
            }
        }
    },[socket,messages,dispatch]);
  
}

export {useGetMessage};