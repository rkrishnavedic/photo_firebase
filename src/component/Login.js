import React from 'react';
import '../App.css';
import {motion} from 'framer-motion';


function Login(props) {

  const {
    email ,
  setEmail ,
  password ,
  setPassword ,
  emailError ,
  
  passwordError ,
  handleLogin ,
  handleSignUp ,
  hasAccount ,
  setHasAccount ,
  clearInputs,
  clearErrors
} = props;

function toggleHasAccount(){
  setHasAccount(!hasAccount);
}

    return (

    <motion.div initial={{ scale: 0 }}
    animate={{scale: 1, y:'10vh' }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20
    }} className="container p-3">
    <div className="row p-2">
      <div className="col-sm-9 col-md-7 col-lg-6 mx-auto">
        <div className="card card-signin my-9">
          <div className="card-body">
            <h5 className="card-title text-center">Authentication</h5>
            <div className="form-signin">
              <div className="form-label-group">
                <input
                type="text"
                autoFocus
                required
                value = {email}
                onChange = {(e)=>{setEmail(e.target.value);clearErrors();}}
                id="inputEmail" className="form-control" placeholder="Email address"/>
                
                {emailError!==''? <p style={{textAlign:'center'}} className="text-danger">{emailError}</p>: null}
              </div>

              <div className="form-label-group m-2">
                <input
                required
                value={password}
                onChange = {(e)=> {setPassword(e.target.value);clearErrors();}}
                type="password" id="inputPassword" className="form-control" placeholder="Password"/>
                
                {passwordError!==''? <p style={{textAlign:'center'}} className="text-danger">{passwordError}</p>:null}
              </div>
              <div className="form-label-group m-2">
              {hasAccount? (
                        <>
                        <button className="btn m-2 btn-lg btn-primary btn-block text-uppercase" onClick={handleSignUp}>Sign Up</button> <button className="btn btn-lg btn-secondary btn-block text-uppercase" onClick={clearInputs}>Clear</button>
                        <p>Have an account? <span className="text-warning" style={{cursor:'pointer'}} onClick={toggleHasAccount}>Sign In</span></p>
                        </>
                    ):(
                        <>
                        <button className="btn m-2 btn-lg btn-primary btn-block text-uppercase" onClick={handleLogin}>Sign In</button> <button className="btn btn-lg btn-secondary btn-block text-uppercase" onClick={clearInputs}>Clear</button>
                        <p>Don't have an account? <span className="text-warning" style={{cursor:'pointer'}} onClick={toggleHasAccount}>Sign Up</span></p>
                        </>
                    )}
              </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
      
    )
}

export default Login;