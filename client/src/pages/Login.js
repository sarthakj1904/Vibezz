import React, { useEffect, useState } from 'react'
import {Box,TextField,Button} from '@material-ui/core'
import firebase from '../utils/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { login, LOGIN } from '../actions/userActions';
import {useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'

function Login(){


    const uiConfig = {
      // Popup signin flow rather than redirect flow.
      signInFlow: 'popup',
      // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
      signInSuccessUrl: '/signedIn',
      // We will display Google and Facebook as auth providers.
      signInOptions: [
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      ],
    };

    let dispatch = useDispatch();

    let history = useHistory();

    let user = useSelector((state) => state.user)

    useEffect(()=>{
      firebase.auth().onAuthStateChanged((user) => {
        dispatch(login(user));
        if(user){
          if(!user.displayName) {
            var displayName = prompt("Please Enter your Name","Unnamed");
            user.updateProfile({
              displayName,
            }).then(function(User){
              console.log(user);
              dispatch(login(user));
              history.push("/");
            });
          } else {
          history.push("/");
          }
        }
      });
    }, []);
    

    return (
    <Box style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }} >

      {user ? ( 
        <Button 
          onClick = {()=>{
            firebase.auth().signOut();
          }}
        >
          Log Out
        </Button>
      ) : (
        <StyledFirebaseAuth 
          uiConfig={uiConfig} 
          firebaseAuth={firebase.auth()} 
        /> 
      )}            
    </Box>
  );
}

export default Login;