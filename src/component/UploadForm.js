import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import '../App.css';
import {motion} from 'framer-motion';


const UploadForm = () =>{

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const types = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/svg',
    ]

    const changeHandler = (e)=>{
        let selected = e.target.files[0];
        if(selected && types.includes(selected.type)){
            setFile(selected);
            setError('');
        }else{
            setFile(null);
            setError('Please select an image file (png, jpg, jpeg or svg)');
        }
    }

    return(
        <form>
            <label>
            <input type="file" onChange={changeHandler}/>
            <span className="rounded-pill btn btn-warning">Add</span>
            </label>
            <div className="output">
                {error && <div className="error">{error}</div>}
                {file && <div className="file">{file.name}</div>}
                {file && <ProgressBar file={file} setFile={setFile} />}
                </div>
        </form>
    )
}

export default UploadForm;