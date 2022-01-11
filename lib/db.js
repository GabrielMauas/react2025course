import { db } from '@/lib/firebase';
import { setDoc, doc, collection, addDoc, deleteDoc } from 'firebase/firestore';

// export const db = getFirestore(firebaseApp);

export function createUser(uid, data) {
  const docRef = doc(db, 'users', uid);
  try {
    setDoc(docRef, { uid, ...data }, { merge: true });
  } catch (error) {
    console.log(error);
  }
}
export function createSite(data) {
  const sitesRef = collection(db, 'sites');
  try {
    addDoc(sitesRef, data);
  } catch (error) {
    console.log(error);
  }
}

export function createFeedback(data) {
  const feedbackRef = collection(db, 'feedback');
  try {
    addDoc(feedbackRef, data);
  } catch (error) {
    console.log(error);
  }
}

export function deleteFeedback(id) {
  const feedbackRef = doc(db, 'feedback', id);
  try {
    deleteDoc(feedbackRef);
  } catch (error) {
    console.log(error);
  }
}
