import React, { useState } from 'react';
import usePublicFirestore from '../hooks/usePublicFirestore';
import '../App.css';
import {motion} from 'framer-motion';
import penIcon from 'bootstrap-icons/icons/pencil-square.svg';
import trash from 'bootstrap-icons/icons/trash.svg';
import publicIcon from 'bootstrap-icons/icons/eye-fill.svg';
import Foot from './Foot';
import Modal from './modal';

const PublicGrid = ({setUnAuth})=>{
    const {docs} = usePublicFirestore('images');
    const [selectedImg, setSelectedImg] = useState(null);
    //console.log(docs);

    return (
    
        <div className="App mx-4">
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
                <motion.button onClick={()=>setUnAuth(true)} className="btn rounded-pill border-primary mr-4 my-2 mr-sm-0 my-sm-0" 
                whileHover={{scale:1.1, color:'navy',rotate:[0,-2,4]}}
                transition={{type:'spring', duration:0.8}}
                >
                    Enter your Gallery</motion.button>
            </div>

            </nav>
        
        <div style={{textAlign:'center'}} className=" text-secondary card-body">
                <span style={{fontSize:'0.5rem'}}>public dashboard</span>
                <br/>
                ShowCase your <span style={{fontWeight:'bold'}} className="text-primary"> wonderful memories!</span>
        </div>
        <div className="container">
        
        <div className="row d-flex justify-content-around text-center">

            {docs && docs.map((doc, index)=>{
                
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
                    <div style={{fontSize:'0.7rem'}} className="d-flex card-text text-secondary justify-content-around">Post by: {doc.userEmail}</div>
                    <img onClick={()=>setSelectedImg(doc.url)} loading="lazy" className="card-img-top" src={doc.url} alt={doc.url}/>
                    <div className="card-body">
                        <motion.div className="d-flex justify-content-around card-text">
                        <motion.img whileHover={{scale:0.9}} title={doc.publicStatus? "public":"undo public"} src={publicIcon} onClick={()=>setUnAuth(true)} />
                        {/* <motion.img title={doc.favorite? "undo favorite":"favorite"} initial={{scale:1}} onClick={()=>setUnAuth(true)} /> */}
                        <motion.img whileHover={{scale:0.9}} title="delete post" src={trash} onClick={()=>setUnAuth(true)} />
                        
                        </motion.div>
                        {/* <div style={{textAlign:'center',fontSize:'0.5rem'}} className="card-text mt-1 text-secondary">{Date(doc.createdAt.seconds*1000)}</div> */}
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
                {index%3===2? <div className="w-100"></div>:null}
              </>
                )
            })}
            </div>
            </div>
        {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg}/>}
        <Foot/>
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