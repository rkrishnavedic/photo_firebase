import { useState } from "react";
import UploadForm from "./UploadForm";
import ImageGrid from "./imageGrid";
import Modal from '../component/modal';
import '../App.css';


function Tiles(props) {

    const [selectedImg, setSelectedImg] = useState(null);
    const {handleLogout} = props;
    return (
        <div className="body">
        <div className="App">
            <nav className="navbar justify-content-between">
            <h1 className="title-h1">photos<span className="text-danger">Fire</span></h1>
            <div className="form-inline">
                <button onClick={handleLogout} className="btn btn-outline-danger mr-4 my-2 mr-sm-0 my-sm-0" >Logout</button>
            </div>
            </nav>

            <h2>
                Add your wonderful memories!
            </h2>

            <p className="text-sm"></p>

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