import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from '../Firebase/firebase.config';
import { BloodAppContext } from './BloodAppContext';

const BloodAppProvider = ({ children }) => {

    const [authLoading, setAuthLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(false);
    const [theme, setTheme] = useState('light');

    //theme toggle function is inspired by online resourses
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'synthwave' : 'light';
            return newTheme;
        });
    };


    const signupUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }


    const signOutUser = () => {
        return signOut(auth);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoader(false)
            setAuthLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, [])


    const info = {
        signInUser,
        signupUser,
        signOutUser,
        loader,
        user,
        setUser,
        authLoading,
        setLoader,
        theme,
        toggleTheme


    }





    return (

        <BloodAppContext.Provider value={info}>{children}</BloodAppContext.Provider>

    );
};

export default BloodAppProvider;

