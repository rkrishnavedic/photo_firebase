import React from 'react';
import useFirestore from '../hooks/useFirestore';
import '../App.css';
import {motion} from 'framer-motion';

const ImageGrid = ({setSelectedImg})=>{

    const {docs} = useFirestore('images');
    //console.log(docs);

    return (
        <div className="img-grid">
            {docs && docs.map(doc=>{

                return(
                
                <motion.div whileHover={{scale:1.2}} className="card" key={doc.id}
                onClick={()=>setSelectedImg(doc.url)}
                >
                    <img src={doc.url} alt={doc.url}/>
                </motion.div>
                )
            })}
        </div>
    )
}

export default ImageGrid;