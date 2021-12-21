import {Box,Toolbar,TextField,IconButton} from "@material-ui/core"
import { useSelector } from "react-redux";
import bgImg from "../images/ChatBackground.png";
import SendIcon from '@material-ui/icons/Send';
import { useState } from "react";

function ChatDetails(){

    let contact = useSelector(state => state.contact);

    let [message,setMessage] = useState("");

    let socket = useSelector(state => state.socket);

    return(
        <Box display='flex' flexDirection="column"
            style={{
                width:'70vw',
                height:'100vh',
            }}>

            <Toolbar 
            style={{
                background: '#e7e7e7'
            }}>
                <h2>{contact.name}</h2>
            </Toolbar>

            <Box display='flex' flexGrow = {1}
                style={{
                    width:'100',
                    backgroundImage:`url(${bgImg})`
                }}>
                
            </Box>

            <Box display='flex'>

                <TextField fullWidth id="outlined" value={message} onChange = {function(event){
                    setMessage(event.target.value);
                }} />
                <IconButton aria-label="delete" onClick = {function(){

                    if(socket){
                        socket.emit("message",{
                            reciever : contact.firebaseId,
                            message : message,
                        })
                    }
                }}>
                    <SendIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default ChatDetails;