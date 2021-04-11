import {auth, firestore} from '../config/fire';
import {motion} from 'framer-motion';

const DeletePop=({id, setDeleteId})=>{

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

export default DeletePop;