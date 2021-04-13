import {auth, firestore} from '../config/fire';
import {motion} from 'framer-motion';
import { useState } from 'react';


function DeletePop({id, setDeleteId}){

    const imageRef = firestore.collection(`users/${auth.currentUser.uid}/images`);
    
    const handleDeletion=(e)=>{
        //console.log('delte confirm')
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

async function PublicClick(id,publicId, text, createdAt, url, publicID,setPublicID){
    const imageIDRef = firestore.collection(`public/${auth.currentUser.uid}/images`).doc(id);
    const imagePublicRef = firestore.collection(`public/public/images`);
    
    console.log(imagePublicRef);
    // console.log(id)
    //console.log(imagedetails);

    //imageRef.doc(id).set({publicId: null or --- }, {merge: true})

    if(!publicId){
        //If I wish to make it public

        //add to public collection
        
        await imagePublicRef.add({userEmail: auth.currentUser.email, text: text, createdAt: createdAt, url: url})
            .then((docref)=>{
                setPublicID(docref.id);
            })
            .catch(err=>console.log(err));
    }else{

        
        await imagePublicRef.doc(publicId).delete();
        //imageIDRef.set({publicId:null}, {merge:true});
        setPublicID(null);
    }

    imageIDRef.set({publicId: publicID}, {merge:true});
}

export {DeletePop, FavClick, ImageStory, PublicClick};