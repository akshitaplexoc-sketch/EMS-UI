import { createContext, useContext, useEffect, useState } from "react";

const themes = {
    red: {
        name: "Red",
        primary: "#DC2626",
        primaryHover: "#B91C1C",
        background: "#FEF2F2",
        sidebar: "#FFFFFF",
        surface: "#FFFFFF",
        surfaceSecondary: "#FFF7F7",
        text: "#1F2937",
        muted: "#6B7280",
        border: "#FECACA",
        activeBackground: "#FEE2E2",

        bannerBackground: "#FEE2E2",
        bannerText: "#991B1B",
        bannerMuted: "#B91C1C"
    },

    blue: {
        name: "Blue",
        primary: "#2563EB",
        primaryHover: "#1D4ED8",
        background: "#EFF6FF",
        sidebar: "#FFFFFF",
        surface: "#FFFFFF",
        surfaceSecondary: "#F8FAFC",
        text: "#1E293B",
        muted: "#64748B",
        border: "#BFDBFE",
        activeBackground: "#DBEAFE",

        bannerBackground: "#DBEAFE",
        bannerText: "#1E3A8A",
        bannerMuted: "#1D4ED8"
    },

    green: {
        name: "Green",
        primary: "#16A34A",
        primaryHover: "#15803D",
        background: "#F0FDF4",
        sidebar: "#FFFFFF",
        surface: "#FFFFFF",
        surfaceSecondary: "#F7FEF8",
        text: "#14532D",
        muted: "#64748B",
        border: "#BBF7D0",
        activeBackground: "#DCFCE7",

        bannerBackground: "#DCFCE7",
        bannerText: "#166534",
        bannerMuted: "#15803D"
    },

    yellow: {
        name: "Yellow",
        primary: "#CA8A04",
        primaryHover: "#A16207",
        background: "#FEFCE8",
        sidebar: "#FFFFFF",
        surface: "#FFFFFF",
        surfaceSecondary: "#FFFDF5",
        text: "#422006",
        muted: "#78716C",
        border: "#FDE68A",
        activeBackground: "#FEF3C7",

        bannerBackground: "#FEF3C7",
        bannerText: "#713F12",
        bannerMuted: "#A16207"
    },

    seaGreen: {
        name: "Sea Green",
        primary: "#0F766E",
        primaryHover: "#115E59",
        background: "#F0FDFA",
        sidebar: "#FFFFFF",
        surface: "#FFFFFF",
        surfaceSecondary: "#F5FFFD",
        text: "#134E4A",
        muted: "#64748B",
        border: "#99F6E4",
        activeBackground: "#CCFBF1",

        bannerBackground: "#CCFBF1",
        bannerText: "#134E4A",
        bannerMuted: "#0F766E"
    },
};

const ThemeContext = createContext(null);

function getInitialTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme && themes[savedTheme]) {
        return savedTheme;
    }

    return "blue";
}

export function ThemeProvider({ children }) {
    const [themeName, setThemeName] = useState(
        getInitialTheme
    );

    const theme = themes[themeName] || themes.blue;

    useEffect(() => {
        localStorage.setItem("theme", themeName);

        const root = document.documentElement;

        root.style.setProperty(
            "--theme-primary",
            theme.primary
        );

        root.style.setProperty(
            "--theme-primary-dark",
            theme.primaryDark
        );

        root.style.setProperty(
            "--theme-background",
            theme.background
        );

        root.style.setProperty(
            "--theme-sidebar",
            theme.sidebar
        );

        root.style.setProperty(
            "--theme-card",
            theme.card
        );

        root.style.setProperty(
            "--theme-text",
            theme.text
        );

        root.style.setProperty(
            "--theme-muted-text",
            theme.mutedText
        );

        root.style.setProperty(
            "--theme-border",
            theme.border
        );
                root.style.setProperty(
            "--theme-banner-background",
            theme.bannerBackground
        );

        root.style.setProperty(
            "--theme-banner-text",
            theme.bannerText
        );

        root.style.setProperty(
            "--theme-banner-muted",
            theme.bannerMuted
        );
    }, [themeName, theme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                themeName,
                setThemeName,
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