import React, {useState } from 'react';
import './App.css';
import Login from './component/Login';
import Tiles from './component/Tiles';
import fire, { auth } from './config/fire'
import {useAuthState} from 'react-firebase-hooks/auth';
import PublicGrid from './component/publicGrid';

function App() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasAccount, setHasAccount] = useState(false);

    //unauthorised try to access!
    const [unAuth, setUnAuth] = useState(false);

    const clearInputs = ()=>{
      setEmail('');
      setPassword('');
      setEmailError('');
      setPasswordError('');
    }
    const clearErrors = ()=>{
      setEmailError('');
      setPasswordError('');
    }
    
    const [user] = useAuthState(auth);

    const handleSignUp = ()=>{
      clearErrors();
      fire
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(res=>console.log(res))
          .catch(err =>{
            switch(err.code){
              case "auth/email-already-in-use":
              case "auth/invalid-email":
                setEmailError(err.message);
                break;
              
                case "auth/weak-password":
                  setPasswordError(err.message);
                  break;
                default: break;
            }
          })
    }
  

    const handleLogin = ()=>{
      clearErrors();
      fire
          .auth()
          .signInWithEmailAndPassword(email, password)
          .catch(err =>{
            switch(err.code){
              case "auth/invalid-email":
              case "auth/user-disabled":
              case "auth/user-not-found":
                setEmailError(err.message);
                break;
              
                case "auth/wrong-password":
                  setPasswordError(err.message);
                  break;
                default: break;
            }
          })
    }
  
    const handleLogout = () =>{
      fire.auth().signOut();
    };
  
    //if unauthorised access! make it to login!
  if(!unAuth){
    return (
      <div className="App">
        <PublicGrid setUnAuth={setUnAuth}/>
      </div>
    )
  }

  return (
    <div className="App">
      {
      ((!user)?
      <Login
      email = {email}
      setEmail = {setEmail}
      password = {password}
      setPassword = {setPassword}
      emailError = {emailError}
      passwordError = {passwordError}
      handleLogin = {handleLogin}
      handleSignUp = {handleSignUp}
      hasAccount = {hasAccount}
      setHasAccount = {setHasAccount}
      clearInputs = {clearInputs}
      clearErrors = {clearErrors}
      setUnAuth = {setUnAuth}
      />
      :
      <Tiles setUnAuth={setUnAuth} handleLogout={handleLogout}/>
      )}

    </div>
    
  );
}

export default App;
