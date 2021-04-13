import React, { useState } from 'react';
import useFirestore from '../hooks/useFirestore';
import '../App.css';
import {motion} from 'framer-motion';
import heartFill from 'bootstrap-icons/icons/heart-fill.svg';
import heart from 'bootstrap-icons/icons/heart.svg';
import penIcon from 'bootstrap-icons/icons/pencil-square.svg';
import trash from 'bootstrap-icons/icons/trash.svg';
import publicIcon from 'bootstrap-icons/icons/eye-fill.svg';
import privateIcon from 'bootstrap-icons/icons/eye-slash-fill.svg';
import {DeletePop, FavClick, ImageStory, PublicClick} from './imageDesc';


const ImageGrid = ({setSelectedImg})=>{
    const [deleteId, setDeleteId] = useState(null);
    const [textId,setTextId] = useState(null);
    const [text, setText] = useState(null);
    const [publicID, setPublicID] = useState(null);
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
                        <motion.div className="d-flex justify-content-around card-text">
                        <motion.img title={doc.publicStatus? "undo public":"public"} initial={{scale:1}} onClick={()=>PublicClick(doc.id, doc.publicId, doc.text, doc.createdAt, doc.url, publicID,setPublicID)} src={publicPost(doc.publicId)} />
                        <motion.img title={doc.favorite? "undo favorite":"favorite"} initial={{scale:1}} onClick={()=>FavClick(doc.id, doc.favorite)} src={hearticon(doc.favorite)} />
                        <motion.img title="delete post" initial={{scale:1}} src={trash} onClick={()=>setDeleteId(doc.id)} />
                        
                        </motion.div>
                        <hr/>
                        <motion.div style={{fontSize:'0.7rem'}} className="card-text">
                        <img src={penIcon} onClick={()=>{setTextId(doc.id); setText(doc.text)}} alt="edit icon"/>
                          &nbsp; 
                          {(doc.text && doc.text!=='')? doc.text:<span>
                          Want to add some story?
                              </span>}
                        </motion.div>
                    </div>
                    
                </motion.div>
                )
            })}
        </div>
        {deleteId && <DeletePop setDeleteId={setDeleteId} id={deleteId}/>}
        {textId && <ImageStory setTextId={setTextId} setText={setText} id={textId} text={text}/>}
</>
    )
}

const hearticon=(heartfillenable)=>{

    if(!heartfillenable){
        return heart;
    }
    return heartFill;

}

const publicPost=(publicenable)=>{
    
    if(publicenable){
        return publicIcon;
    }
    return privateIcon;

}

export default ImageGrid;