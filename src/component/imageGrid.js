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
    const [deleteIdP, setDeleteIdP]= useState(null);
    const [textId,setTextId] = useState(null);
    const [text, setText] = useState(null);

    const {docs} = useFirestore('images');
    //console.log(docs);

    return (
      <>
        <div className="container">
        
        <div className="row d-flex justify-content-around text-center">
            {docs && docs.map((doc,index)=>{
                
                return(
                    <>
                <motion.div 
                style={{borderRadius: 20}}
                whileHover={{
                    scale:1.05,
                    originY: -0.2,
                }}
                transition={{type:'spring', stiffness:750}}
                className="col-md-3 m-3 card" 
                key={doc.id}
                >
                    <img onClick={()=>setSelectedImg(doc.url)} className="mt-3 card-img-top" src={doc.url} alt={doc.url}/>
                    <div className="card-body">
                        <motion.div className="d-flex justify-content-around card-text">
                        <motion.img title={doc.publicId? "undo public":"public"} whileHover={{scale:0.9}} id={"publicButton"+doc.id} onClick={()=>{PublicClick(doc.id, doc.publicId, doc.text, doc.createdAt, doc.url)}} src={publicPost(doc.publicId)} />
                        <motion.img title={doc.favorite? "undo favorite":"favorite"} whileHover={{scale:0.9}} onClick={()=>FavClick(doc.id, doc.favorite)} src={hearticon(doc.favorite)} />
                        <motion.img title="delete post" src={trash} whileHover={{scale:0.9}} onClick={()=>{setDeleteId(doc.id);setDeleteIdP(doc.publicId);}} />
                        
                        </motion.div>
                        
                        {/* <div style={{textAlign:'center',fontSize:'0.5rem'}} className="card-text mt-1 text-secondary">{Date(doc.createdAt)}</div> */}
                        <hr/>
                        <motion.div style={{fontSize:'0.7rem'}} className="card-text">
                        <img src={penIcon} onClick={()=>{setTextId(doc.id); setText(doc.text);}} alt="edit icon"/>
                          &nbsp; 
                          {(doc.text && doc.text!=='')? doc.text:<span>
                          Want to add some story?
                              </span>}
                              
                        </motion.div>
                    </div>
                    
                </motion.div>
               {index%3===2? <div className="w-100"></div>:null}
               </>
                )
            })}
        </div>
        </div>
        {deleteId && <DeletePop setDeleteId={setDeleteId} publicId={deleteIdP} setPublicId={setDeleteIdP} id={deleteId}/>}
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