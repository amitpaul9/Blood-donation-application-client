import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from '../Firebase/firebase.config';
import { BloodAppContext } from './BloodAppContext';
import axios from 'axios';

const BloodAppProvider = ({ children }) => {

    const [authLoading, setAuthLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(false);
    const [theme, setTheme] = useState('light');

    const [role, setRole] = useState('');
    const [roleLoading, setRoleLoading] = useState(true);



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
            if (currentUser) {
                setUser(currentUser);
                setAuthLoading(false);
                setLoader(false);
            } else {
                setUser(null);
                setRole('');
                setRoleLoading(false);
                setAuthLoading(false);
                setLoader(false);
            }
        });

        return () => unsubscribe();
    }, []);


    useEffect(() => {
        if (!user) return;


        axios.get(`http://localhost:5000/users/role/${user.email}`)
            .then(res => {
                setRole(res.data.role);
                setRoleLoading(false);
                console.log('the role is', res)
            })
            .catch(err => {
                console.error("Error fetching role:", err);
                setRole('');
                setRoleLoading(false);
            });
    }, [user]);

    const info = {
        signInUser,
        signupUser,
        signOutUser,
        loader,
        user,
        setUser,
        authLoading,
        setLoader,
        toggleTheme,
        role,
        roleLoading



    }





    return (

        <BloodAppContext.Provider value={info}>{children}</BloodAppContext.Provider>

    );
};

export default BloodAppProvider;

