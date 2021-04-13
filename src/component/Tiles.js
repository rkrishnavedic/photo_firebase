import { useState } from "react";
import UploadForm from "./UploadForm";
import ImageGrid from "./imageGrid";
import Modal from '../component/modal';
import '../App.css';
import {auth} from '../config/fire';
import {motion} from 'framer-motion';


function Tiles(props) {

    const [selectedImg, setSelectedImg] = useState(null);
    const {handleLogout} = props;
    return (
       
        <div className="App">
            <nav className="navbar justify-content-between">
            <motion.h1 whileHover={{
                        scale:1.1,
                        originY:-1,
                    }}
                    transition={{type:'spring', stiffness:400}}
                     className="title-h1" onClick={()=>{props.setUnAuth(false)}} style={{cursor:"pointer"}}>photos<span className="text-warning">Fire</span></motion.h1>
            <div className="form-inline">
                <motion.button onClick={handleLogout}
                whileHover={{scale:1.1, rotate:[0,-2,4], color:'brown'}}
                transition={{type:'spring', duration:0.8}}
                className="btn rounded-pill border-danger mr-4 my-2 mr-sm-0 my-sm-0" >Logout</motion.button>
            </div>
            </nav>

            <div style={{width:'80%', margin:'auto'}}>

            <div style={{textAlign:'center'}} className="card-body">
                <div className="card-text" style={{fontSize:'0.6rem'}}>logged in as <span className="text-success">{auth.currentUser.email} </span> </div>
                <div>Add your wonderful memories!</div>
            </div>

                <UploadForm/>
                <ImageGrid setSelectedImg={setSelectedImg}/>
                {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg}/>}
            </div>
        </div>
       
    )
}


export default Tiles;