import React from 'react';
import useFirestore from '../hooks/useFirestore';
import '../App.css';
import {motion} from 'framer-motion';
import heart from 'bootstrap-icons/icons/heart.svg';
import trash from 'bootstrap-icons/icons/trash.svg';

const ImageGrid = ({setSelectedImg})=>{

    const {docs} = useFirestore('images');
    //console.log(docs);

    return (
        <div className="img-grid">
            {docs && docs.map(doc=>{
                
                return(
                <motion.div 
                style={{borderRadius: 20}}
                whileHover={{scale:1.1}} 
                className="card" 
                key={doc.id}
                >
                    <img onClick={()=>setSelectedImg(doc.url)} style={{borderTopLeftRadius:20, borderTopRightRadius:20}} className="card-img-top" src={doc.url} alt={doc.url}/>
                    <div className="card-body">
                        <motion.div className="justify-content-around card-text">
                        <motion.img initial={{scale:1}} src={heart} />
                        <motion.img style={{float:'right'}} initial={{scale:1.2}} src={trash} />
                        </motion.div>
                    </div>

                </motion.div>
                )
            })}
        </div>

    )
}

export default ImageGrid;