import { db } from '@/lib/firebase';
import { 
    setDoc,
    doc,
    collection,
    addDoc
} from 'firebase/firestore';

// export const db = getFirestore(firebaseApp);

export const createUser = (uid, data) => {
    const docRef = doc(db, 'users', uid);
    try {
        setDoc(docRef, {uid, ...data}, { merge: true });
    } catch(error) {
        console.log(error);
    }
} 
export const createSite = (data, toast) => {
    const sitesRef = collection(db, 'sites');
    try {
        addDoc(sitesRef, data);
        toast({
            title: 'Success!',
            description: "We've added your site.",
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    } catch(error) {
        console.log(error);
    }
} 