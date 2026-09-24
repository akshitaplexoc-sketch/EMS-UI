import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const themes = [
    "white",
    "blue",
    "green",
    "orange",
    "red",
    "purple",
    "slate",
    "dark"
];

export function ThemeProvider({ children }) {

    const [theme, setTheme] = useState(

        localStorage.getItem("theme") || "white"

    );

    useEffect(() => {

        document.documentElement.setAttribute(

            "data-theme",

            theme

        );

        localStorage.setItem(

            "theme",

            theme

        );

    }, [theme]);

    return (

        <ThemeContext.Provider

            value={{

                theme,

                setTheme,

                themes

            }}

        >

            {children}

        </ThemeContext.Provider>

    );

}

export function useTheme() {

    return useContext(ThemeContext);

}