import {auth, firestore} from '../config/fire';

function FavClick(id, favorite){
    const imageRef = firestore.collection(`users/${auth.currentUser.uid}/images`);
    imageRef.doc(id).set({favorite: !favorite}, {merge: true})
}

export default FavClick;