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
                <motion.h1 
                    className="title-h1"
                    style={{cursor:'pointer'}}
                    whileHover={{
                        scale:1.1,
                        originY:-1,
                    }}
                    transition={{type:'spring', stiffness:400}}
                    >
                        photos<span className="text-warning">Fire</span>
                </motion.h1>
            <div className="form-inline">
                <button onClick={()=>setUnAuth(true)} className="btn btn-outline-primary mr-4 my-2 mr-sm-0 my-sm-0" >Enter your Gallery</button>
            </div>

            </nav>
        
        <div style={{textAlign:'center'}} className=" text-secondary card-body">
                <span style={{fontSize:'0.5rem'}}>public dashboard</span>
                <br/>
                ShowCase your <span style={{fontWeight:'bold'}} className="text-primary"> wonderful memories!</span>
        </div>
        <div className="img-grid">
        

            {docs && docs.map(doc=>{
                
                return(
                <motion.div 
                style={{borderRadius: 20}}
                whileHover={{
                    scale:1.05,
                    originY: -0.2,
                }}
                transition={{type:'spring', stiffness:750}}
                className="card" 
                key={doc.id}
                >
                    <div style={{fontSize:'0.7rem'}} className="d-flex card-text text-secondary justify-content-around">Post by: {doc.userEmail}</div>
                    <img loading="lazy" className="card-img-top" src={doc.url} alt={doc.url}/>
                    <div className="card-body">
                        <motion.div className="d-flex justify-content-around card-text">
                        <motion.img whileHover={{scale:0.9}} title={doc.publicStatus? "public":"undo public"} src={publicIcon} onClick={()=>setUnAuth(true)} />
                        {/* <motion.img title={doc.favorite? "undo favorite":"favorite"} initial={{scale:1}} onClick={()=>setUnAuth(true)} /> */}
                        <motion.img whileHover={{scale:0.9}} title="delete post" src={trash} onClick={()=>setUnAuth(true)} />
                        
                        </motion.div>
                        <div style={{textAlign:'center',fontSize:'0.5rem'}} className="card-text mt-1 text-secondary">{Date(doc.createdAt.seconds*1000)}</div>
                        <hr/>
                        <motion.div style={{fontSize:'0.7rem'}} className="card-text">
                        <motion.img whileHover={{scale:0.9}} src={penIcon} onClick={()=>setUnAuth(true)}alt="edit icon"/>
                          &nbsp; 
                          {(doc.text && doc.text!=='')? doc.text:<span>
                          Want to add some story? (only creator can edit)
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