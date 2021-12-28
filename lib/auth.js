import React, { useContext, useState, useEffect } from 'react'
import { firebaseApp } from '@/lib/firebase';
import { 
    getAuth, 
    onAuthStateChanged, 
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    GithubAuthProvider
} from 'firebase/auth';
import { createUser } from './db';

const auth = getAuth(firebaseApp);

const AuthContext = React.createContext();

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const useAuth = () => {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const handleUser = (rawUser) => {
        if(rawUser){
            const user = formatUser(rawUser);
            createUser(user.uid, user);
            setCurrentUser(user);
            setLoading(false);
            return user;
        } else {
            setCurrentUser(false);
            setLoading(false);
            return false;
        }
    }

    const logOut = () => {
        return signOut(auth).then(handleUser(false));
    }
    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }
    const signInWithGithub = () => {
        return signInWithPopup(auth, githubProvider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, handleUser);
        return () => unsubscribe();
    }, []);

    const value = {
        currentUser,
        logOut,
        signInWithGoogle,
        signInWithGithub
    }

    return (
        <AuthContext.Provider value={value} >
            { !loading && children }
        </AuthContext.Provider>
    )
}

const formatUser = (user) => {
    return {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      provider: user.providerData[0].providerId,
      photoUrl: user.photoURL,
    }
}