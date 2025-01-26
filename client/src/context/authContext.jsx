/*import { createContext, useState } from "react";

export const AuthContext = createContext()
export const AuthContextProvider = ({children})=>{
    const[currentUser, setCurrentUser]= useState()
}*/
import { children, createContext, useEffect } from "react";
import axios from 'axios';

import React, { useState } from 'react';
export const AuthContext =createContext()

export const AuthContextProvider =({children})=>{
    const [currentUser, setCurrentUser]= useState(JSON.parse(localStorage.getItem("user"))|| null)

    const login = async(inputs)=>{
        const res = await axios.post("http://localhost:8800/api/auth/login",inputs ,{withCredentials: true});//
        setCurrentUser(res.data)
    }

    const logout = async(inputs)=>{
        await axios.post("http://localhost:8800/api/auth/logout",{},{withCredentials: true});//
        setCurrentUser(null);
        //localStorage.removeItem("user");
    }

    /*const logout = async () => {
        try {
            await axios.post("http://localhost:8800/api/auth/logout", {}, { withCredentials: true });
            setCurrentUser(null);
            localStorage.removeItem("user"); // Ensure local storage is also cleared
        } catch (err) {
            console.error(err);
        }
    };  */  
    useEffect(() =>{
        localStorage.setItem("user",JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{currentUser,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
}