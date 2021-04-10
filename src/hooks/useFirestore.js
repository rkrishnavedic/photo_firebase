import {useState, useEffect} from 'react';
import {firestore} from '../config/fire';
import {auth} from '../config/fire';

const useFirestore = (collectionName)=>{
    const [docs, setDocs] = useState([]);

    useEffect(()=>{

        const unsub = firestore.collection(`users/${auth.currentUser.uid}/${collectionName}`)
                .orderBy('createdAt', 'desc')
                .onSnapshot((snap)=>{
                    let documents = [];
                    snap.forEach(doc =>{
                        documents.push({...doc.data(), id: doc.id})
                    });
                    setDocs(documents);
                });

            return ()=> unsub();

    }, [collectionName]);

    return {docs};

}

export default useFirestore;