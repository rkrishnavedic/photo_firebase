import React from 'react';
import usePublicFirestore from '../hooks/usePublicFirestore';
import '../App.css';
import {motion} from 'framer-motion';
import penIcon from 'bootstrap-icons/icons/pencil-square.svg';
import trash from 'bootstrap-icons/icons/trash.svg';
import publicIcon from 'bootstrap-icons/icons/eye-fill.svg';



const PublicGrid = ({setUnAuth})=>{
    const {docs} = usePublicFirestore('images');
    //console.log(docs);

    return (

        <div className="App">
            <nav className="navbar justify-content-between">
            <h1 className="title-h1">photos<span className="text-warning">Fire</span></h1>
            <div className="form-inline">
                <button onClick={()=>setUnAuth(true)} className="btn btn-outline-primary mr-4 my-2 mr-sm-0 my-sm-0" >Login</button>
            </div>
            </nav>
        
        <div className="img-grid">
            {docs && docs.map(doc=>{
                
                return(
                <motion.div 
                style={{borderRadius: 20}}
                whileHover={{scale:1.1}} 
                className="card" 
                key={doc.id}
                >
                    <div style={{fontSize:'0.7rem'}} className="d-flex card-text text-secondary justify-content-around">Post by: {doc.userEmail}</div>
                    <img className="card-img-top" src={doc.url} alt={doc.url}/>
                    <div className="card-body">
                        <motion.div className="d-flex justify-content-around card-text">
                        <motion.img title={doc.publicStatus? "undo public":"public"} initial={{scale:1}} src={publicIcon} onClick={()=>setUnAuth(true)} />
                        {/* <motion.img title={doc.favorite? "undo favorite":"favorite"} initial={{scale:1}} onClick={()=>setUnAuth(true)} /> */}
                        <motion.img title="delete post" initial={{scale:1}} src={trash} onClick={()=>setUnAuth(true)} />
                        
                        </motion.div>
                        <hr/>
                        <motion.div style={{fontSize:'0.7rem'}} className="card-text">
                        <img src={penIcon} onClick={()=>setUnAuth(true)}alt="edit icon"/>
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
    </div>
    )
}

// const hearticon=(heartfillenable)=>{

//     if(!heartfillenable){
//         return heart;
//     }
//     return heartFill;

// }

export default PublicGrid;