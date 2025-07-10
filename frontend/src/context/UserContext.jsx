import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [userRole, setUserRole] = useState(() => {
        return localStorage.getItem('userRole') || '';
    });
    const [name, setName] = useState('');

    useEffect(() => {
        if (userRole) {
            localStorage.setItem('userRole', userRole);
        } else {
            localStorage.removeItem('userRole');
        }
    }, [userRole]);

    useEffect(() => {
        async function fetchUserProfile() {
            try {
                const res = await fetch('/api/user/profile', {
                    credentials: 'include',
                });
                if (res.ok) {
                    const data = await res.json();
                    setName(data.name || '');
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchUserProfile();
    }, []);

    const logout = () => {
        setUserRole('');
        setName('');
        localStorage.removeItem('userRole');
    };

    const value = {
        userRole,
        setUserRole,
        name,
        setName,
        logout
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}