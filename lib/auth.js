import React, { useContext, useState, useEffect } from 'react';
import Router from 'next/router';
import { auth } from '@/lib/firebase';
import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from 'firebase/auth';
import { createUser } from './db';
import Cookies from 'js-cookie';

// const auth = getAuth(firebaseApp);

const AuthContext = React.createContext();

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      createUser(user.uid, userWithoutToken);
      setCurrentUser(user);
      setLoading(false);

      Cookies.set('fast-feedback-auth', true, {
        expires: 1,
      });

      return user;
    } else {
      setCurrentUser(false);
      setLoading(false);

      Cookies.remove('fast-feedback-auth');

      return false;
    }
  };

  const logOut = () => {
    Router.push('/');
    return signOut(auth).then(handleUser(false));
  };
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const signInWithGithub = () => {
    return signInWithPopup(auth, githubProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleUser);
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    logOut,
    signInWithGoogle,
    signInWithGithub,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    token: user.accessToken,
  };
};
