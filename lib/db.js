import { firebaseApp } from '@/lib/firebase';
import { 
    getFirestore,
    setDoc,
    doc
} from 'firebase/firestore';

const db = getFirestore(firebaseApp);

export const createUser = (uid, data) => {
    const docRef = doc(db, 'users', uid);
    setDoc(docRef, {uid, ...data}, { merge: true });
} 