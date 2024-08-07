/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api'
const Menu = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
            localStorage.removeItem('token'); 
            setUser(null);
            navigate("/login");
            console.log("User logged out successfully");
        } catch (err) {
            console.log("Error occurred while logging out: " + err);
        }
    };
    
    

    return (
        <div className="bg-black w-[200px] flex flex-col items-start absolute top-12 right-6 rounded-md p-4 space-y-4 cursor-pointer md:right-12">
            <h3 className="text-white text-sm hover:text-gray-500">Home</h3>
            <h3 className="text-white text-sm hover:text-gray-500">Profile</h3>
            <h3 className="text-white text-sm hover:text-gray-500">Write</h3>
            <h3 className="text-white text-sm hover:text-gray-500">My Blogs</h3>
            <h3 onClick={handleLogout} className="text-white text-sm hover:text-gray-500">Logout</h3>
        </div>
    );
};

export default Menu;
