import '../App.css';
import {motion} from 'framer-motion';

import React from 'react';

const Modal = ({selectedImg, setSelectedImg})=>{

    const handleClick=(e)=>{
        if(e.target.classList.contains('backdrop')) {setSelectedImg(null)}
    }

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className='backdrop' onClick={handleClick}>
        
        <motion.button className="rounded-circle btn btn-danger" onClick={() => setSelectedImg(null)}>x</motion.button>
        <motion.img src={selectedImg} alt="enlarged-pic" />
        
        </motion.div>
        
    )
}

export default Modal;