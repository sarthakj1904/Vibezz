import { Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import Chats from "../components/Chats"
import ChatDetails from "../components/ChatDetails";
import { useEffect } from "react";
import { setSocket } from "../actions/userActions";

let ioClient = require("socket.io-client");




function Home() {

    let user = useSelector(state => state.user);
    let contact = useSelector(state => state.contact);
    let dispatch = useDispatch();

    let history = useHistory();


    useEffect(()=>{
        if(!user){
            history.push("/login");
        }

        user.getIdToken().then(function(token){
            console.log(token);
            let socket = ioClient("http://localhost:8000",{
                extraHeaders: {
                  Authorization: `Bearer ${token}`
                }});

            socket.on("connect",function(){
                dispatch(setSocket(socket));
                
                socket.on("message",function(content){
                    console.log(content);
                });
            });

        })
    },[]);


    return <Box display='flex' 
    style = {{
        height:'100vh',
        width:'100vw'
    }}>
        <Chats/>
        {contact? <ChatDetails/>: undefined}
        
    </Box>
}

export default Home;