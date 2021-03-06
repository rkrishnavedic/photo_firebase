import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage';
import '../App.css';
import {motion} from 'framer-motion';


const ProgressBar = ({file, setFile})=>{
    const {url, progress} = useStorage(file);

    useEffect(()=>{
        if(url){
            setFile(null);
        }
    },[url, setFile])
    

    return (
        <motion.div
        initial={{width:0}}
        animate={{width: progress+'%'}}
        className="bg-primary progress-bar p-3">{Math.round(progress)}%</motion.div>
    )
}

export default ProgressBar;