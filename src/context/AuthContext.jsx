import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {

        const storage =
            localStorage.getItem("token")
                ? localStorage
                : sessionStorage;

        const token = storage.getItem("token");

        if (token) {

            setUser({

                token,

                username: storage.getItem("username"),

                email: storage.getItem("email"),

                role: storage.getItem("role")

            });

            setIsAuthenticated(true);

        }

    }, []);

    const login = (authData, rememberMe) => {

        const storage = rememberMe
            ? localStorage
            : sessionStorage;

        storage.setItem("token", authData.token);

        storage.setItem("username", authData.username);

        storage.setItem("email", authData.email);

        storage.setItem("role", authData.role);

        setUser(authData);

        setIsAuthenticated(true);

    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("role");

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("role");

        setUser(null);

        setIsAuthenticated(false);

    };

    return (

        <AuthContext.Provider

            value={{

                user,

                login,

                logout,

                isAuthenticated

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}