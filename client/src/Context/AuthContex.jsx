import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { API_URL } from "../App.jsx";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    axios.defaults.withCredentials = true;

    const login = async (inputs) => {
        const res = await axios.post(`${API_URL}/auth/login`, inputs);
        setCurrentUser(res.data);
    };

    const logout = async (inputs) => {
        await axios.post(`${API_URL}/auth/logout`);
        setCurrentUser(null);
    };

    const isAdmin = async ()=>{
        const isAdmin = await axios.get(`${API_URL}/users/isAdmin`);
        return isAdmin.data.isAdmin;
    }

    const isEmploye = async ()=>{
        const isEmploye = await axios.get(`${API_URL}/users/isEmploye`);
        return isEmploye.data.isEmploye;
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, isAdmin, isEmploye }}>
            {children}
        </AuthContext.Provider>
    );
};
