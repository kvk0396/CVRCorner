import { createContext, useEffect, useState } from "react";
import api from '../utils/api'
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser();
    }, []); 

    const getUser = async () => {
        try {
            const response = await api.get("/auth/refetch")
    
            console.log(response.data);
            setUser(response.data); 
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
