import { useState } from "react";
import UploadForm from "./UploadForm";
import ImageGrid from "./imageGrid";
import Modal from '../component/modal';
import '../App.css';
import {auth} from '../config/fire';


function Tiles(props) {

    const [selectedImg, setSelectedImg] = useState(null);
    const {handleLogout} = props;
    return (
        <div className="body">
        <div className="App">
            <nav className="navbar justify-content-between">
            <h1 className="title-h1">photos<span className="text-warning">Fire</span></h1>
            <div className="form-inline">
                <button onClick={handleLogout} className="btn btn-outline-danger mr-4 my-2 mr-sm-0 my-sm-0" >Logout</button>
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
        </div>
    )
}


export default Tiles;