import {Box,Toolbar} from "@material-ui/core"
import Contacts from "./Contacts"

function Chat(){

    return(
        <Box display='flex' flexDirection="column"
            style={{
                width:'30vw',
                height:'100vh',
            }}>

            <Toolbar
            style={{
                background: '#e7e7e7'
            }}></Toolbar>
            <Toolbar
            style={{
                background: 'white'
            }}></Toolbar>

            <Contacts /> 

        </Box>
    )
}


export default Chat;