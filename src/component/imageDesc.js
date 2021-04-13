import {auth, firestore} from '../config/fire';
import {motion} from 'framer-motion';
import { useState } from 'react';


function DeletePop({id,publicId,setPublicId, setDeleteId}){

    const imageRef = firestore.collection(`users/${auth.currentUser.uid}/images`);
    const imagePublicRef = firestore.collection(`public/public/images`);
    
    const handleDeletion=(e)=>{
        //console.log('delte confirm')
        if(publicId){
    imagePublicRef.doc(publicId).delete().catch(err=>console.log(err));
    setPublicId(null);
        }
    imageRef.doc(id).delete()
    setDeleteId(null);
    }
    //console.log(id);
    return (
        <div style={{textAlign:'center'}} className="p-3 backdrop">
            <motion.div initial={{scale:0}} animate={{scale:1}} className="good card">
           Are you sure you want delete the image?
           <span> 
            <button onClick={handleDeletion}  className="btn m-2  btn-danger rounded-pill">Yes! Delete</button>
           <button className="btn m-2 btn-secondary rounded-pill" onClick={()=>setDeleteId(null)}>Cancel</button>
           </span>
            </motion.div>
        </div>
    )
}

function FavClick(id, favorite){
    const imageRef = firestore.collection(`users/${auth.currentUser.uid}/images`);
    imageRef.doc(id).set({favorite: !favorite}, {merge: true})
}

function ImageStory({setTextId,setText, id, text}){
    const [editText, setEditText] = useState(text);
    const imageRef = firestore.collection(`users/${auth.currentUser.uid}/images`);

    const handleSaveText=()=>{
    imageRef.doc(id).set({text: editText}, {merge:true})
    setText(null);
    setTextId(null);
    }

    const handleCancel=()=>{
        setTextId(null);
        setText(null);
    }

    return(
        <div style={{textAlign:'center'}} className="p-3 backdrop">
            <motion.div initial={{scale:0}} animate={{scale:1}} className="good1 card">
           <input onChange={(e)=>setEditText(e.target.value)} value={editText} style={{fontSize:'0.7rem'}} className="input m-2 p-3"></input>
           <span> 
            <button onClick={handleSaveText}  className="btn m-2  btn-warning rounded-pill">Save</button>
            <button onClick={handleCancel} on className="btn m-2  btn-secondary rounded-pill">Cancel</button>
           </span>
            </motion.div>
        </div>
    )

}

function PublicClick(id,publicId, text, createdAt, url){
    const imageIDRef = firestore.collection(`users/${auth.currentUser.uid}/images`).doc(id);
    const imagePublicRef = firestore.collection(`public/public/images`);
    
    // console.log(publicId);
    // console.log(id);
    // console.log(text);
    // console.log(createdAt);
    // console.log(url);
    //console.log(imagePublicRef);
    // console.log(id)
    //console.log(imagedetails);

    //imageRef.doc(id).set({publicId: null or --- }, {merge: true})

    if(!publicId){
    //     //If I wish to make it public

    //     //add to public collection
    //console.log('here adding data')

    const data = {userEmail: auth.currentUser.email, text:text, createdAt:createdAt, url:url}
        //console.log(data);
    imagePublicRef.add(data)
            .then((docref)=>{
                //console.log(docref.id);
                imageIDRef.set({publicId: docref.id}, {merge:true});
                
            })
            .catch(err=>console.log(err));
    }else{
        imagePublicRef.doc(publicId).delete().catch(err=>console.log(err));
        imageIDRef.set({publicId:null}, {merge:true});
    //     //setPublicID(null);
    //console.log('nullify here')
    }
    //setPublicID(null);
}

export {DeletePop, FavClick, ImageStory, PublicClick};