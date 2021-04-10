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
                    <img className="card-img-top" src={doc.url} alt={doc.url}/>
                    <div className="card-body">
                        <p className="card-text" style={{fontSize:'0.7rem'}}>Some Text here for reference and available! I can add like icons and many more! :)</p>
                    </div>

                </motion.div>
                )
            })}
        </div>
    )
}

export default ImageGrid;