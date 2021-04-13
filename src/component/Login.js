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
    animate={{scale: 1, y:'15vh' }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20
    }} className="container p-3">
    <div className="row p-2">
      <div className="col-sm-9 col-md-7 col-lg-6 mx-auto">
        <div className="card card-signin my-9">
          <div className="card-body">
            <h5 className="card-title text-secondary text-center">Auth<span className="text-primary">entication</span></h5>
            <div className="form-signin">
              <div className="form-label-group m-2">
                <motion.input
                type="text"
                style={{fontSize:'1rem'}}
                whileFocus={{scale:1.05}}
                required
                value = {email}
                onChange = {(e)=>{setEmail(e.target.value);clearErrors();}}
                id="inputEmail" className="rounded-pill form-control" placeholder="Email address"/>
                
                {emailError!==''? <p style={{textAlign:'center'}} className="text-danger">{emailError}</p>: null}
              </div>

              <div className="form-label-group m-2">
                <motion.input
                required
                style={{fontSize:'1rem'}}
                whileFocus={{scale:1.05}}
                value={password}
                onChange = {(e)=> {setPassword(e.target.value);clearErrors();}}
                type="password" id="inputPassword" className="rounded-pill form-control" placeholder="Password"/>
                
                {passwordError!==''? <p style={{textAlign:'center'}} className="text-danger">{passwordError}</p>:null}
              </div>
              <div className="form-label-group m-2">
              {hasAccount? (
                        <>
                        <motion.button initial={{scale:0}} animate={{scale:1}} className="btn rounded-pill m-2 btn-lg btn-outline-primary btn-block" onClick={handleSignUp}>sign up</motion.button> <button className="btn rounded-pill btn-outline-secondary btn-block " onClick={clearInputs}>clear</button>
                        <p>Have an account? <span className="text-warning" style={{cursor:'pointer'}} onClick={toggleHasAccount}>sign in</span></p>
                        </>
                    ):(
                        <>
                        <button className="btn m-2 rounded-pill btn-lg btn-outline-primary btn-block" onClick={handleLogin}>sign in</button> <button className="btn rounded-pill btn-outline-secondary btn-block " onClick={clearInputs}>clear</button>
                        <p>Don't have an account? <span className="text-warning" style={{cursor:'pointer'}} onClick={toggleHasAccount}>sign up</span></p>
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