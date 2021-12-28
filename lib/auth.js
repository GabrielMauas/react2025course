import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../lib/firebase';
import {  
    onAuthStateChanged, 
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    GithubAuthProvider
} from 'firebase/auth';

const AuthContext = React.createContext();

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const useAuth = () => {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const logOut = () => {
        return signOut(auth);
    }
    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }
    const signInWithGithub = () => {
        return signInWithPopup(auth, githubProvider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;
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