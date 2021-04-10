import React, {useState, useEffect} from 'react';
import {auth, firestore, timestamp} from '../config/fire';
import {storage} from '../config/fire';

const useStorage = (file)=>{
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(()=>{

        //references
        const storageRef = storage.ref(file.name)
        const collectionRef = firestore.collection(`users/${auth.currentUser.uid}/images/`);
        storageRef.put(file).on('state_changed', (snap)=>{
            let precentage = (snap.bytesTransferred/snap.totalBytes)*100;
            setProgress(precentage);
        }, (err)=>{
            setError(err);
        }, async ()=>{
            const url = await storageRef.getDownloadURL();
            const createdAt = timestamp();
            collectionRef.add({url, createdAt})
            setUrl(url);
        });

    },[file])

    return {progress, url, error};

}

export default useStorage;