import React, { useState } from 'react';
import useFirestore from '../hooks/useFirestore';
import '../App.css';
import {motion} from 'framer-motion';
import heartFill from 'bootstrap-icons/icons/heart-fill.svg';
import heart from 'bootstrap-icons/icons/heart.svg';
import penIcon from 'bootstrap-icons/icons/pencil-square.svg';
import trash from 'bootstrap-icons/icons/trash.svg';
import DeletePop from './delete';
import FavClick from './favclick';

const ImageGrid = ({setSelectedImg})=>{
    const [deleteId, setDeleteId] = useState(null);
    const {docs} = useFirestore('images');
    //console.log(docs);

    return (
      <>
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
                        <motion.img initial={{scale:1}} onClick={()=>FavClick(doc.id, doc.favorite)} src={hearticon(doc.favorite)} />
                        <motion.img style={{float:'right'}} initial={{scale:0.8}} animate={{scale:1}} src={trash} onClick={()=>setDeleteId(doc.id)} />
                        
                        </motion.div>
                        <hr/>
                        <motion.div style={{fontSize:'0.7rem'}} className="card-text">
                        <img src={penIcon} alt="edit icon"/>
                          &nbsp;  
                            Want to add some story?
                            (working over this feature!)
                        </motion.div>
                    </div>
                    
                </motion.div>
                )
            })}
        </div>
        {deleteId && <DeletePop setDeleteId={setDeleteId} id={deleteId}></DeletePop>}
</>
    )
}

const hearticon=(heartfillenable)=>{

    if(!heartfillenable){
        return heart;
    }
    return heartFill;

}

export default ImageGrid;