import '../App.css';
import {motion} from 'framer-motion';

import React from 'react';

const Modal = ({selectedImg, setSelectedImg})=>{

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className='backdrop' onClick={(e)=>{if(e.target.classList.contains('backdrop')) {setSelectedImg(null)}}}>

        <motion.img initial={{y:'50%'}} animate={{y:0}} src={selectedImg} alt="enlarged-pic" />
        
        </motion.div>
    )
}

export default Modal;