import { useState } from "react";
import {auth, firestore} from '../config/fire';
import UploadForm from "./UploadForm";
import ImageGrid from "./imageGrid";
import Modal from '../component/modal';
import '../App.css';
import {motion} from 'framer-motion';


function Tiles(props) {
    const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`)

    const [selectedImg, setSelectedImg] = useState(null);
    const {handleLogout} = props;
    return (
        <div className="body">
        <div className="App">
            <nav className="navbar navbar-light bg-light justify-content-between">
            <h1 className="title-h1">firePulse</h1>
            <div className="form-inline">
                <button onClick={handleLogout} className="btn btn-outline-danger mr-4 my-2 mr-sm-0 my-sm-0" >Logout</button>
            </div>
            </nav>

            <h2>
                Add your wonderful memories!
            </h2>

            <div style={{width:'80%', margin:'auto'}}>

                <UploadForm/>
                <ImageGrid setSelectedImg={setSelectedImg}/>
                {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg}/>}
            </div>
        </div>
        </div>
    )
}


export default Tiles;