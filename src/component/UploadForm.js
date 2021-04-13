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
        'image/tiff',
        'image/bmp'
    ]

    const changeHandler = (e)=>{
        let selected = e.target.files[0];
        if(selected && types.includes(selected.type)){
            setFile(selected);
            setError('');
        }else{
            setFile(null);
            setError('Please select an image file (png, jpg, jpeg, tiff or bmp)');
        }
    }

    return(
        <form className="mt-0">
            <label>
            <input type="file" onChange={changeHandler}/>
            <motion.span
            whileHover={{scale:1.1, originY:-1}}
            transition={{type:'spring', stiffness:300}}
            className="rounded-pill btn btn-outline-success"
             >
                 Add</motion.span>
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