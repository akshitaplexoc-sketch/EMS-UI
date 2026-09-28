import { Bell, ChevronDown, LogOut, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import { logout } from "../../services/authService";
import Avatar from "../atoms/Avatar";

function Header({
    title = "Dashboard",
    subtitle = "Manage your organization"
}) {
    const navigate = useNavigate();
    const { themeName, setThemeName, themes } = useTheme();

    const storedUser = localStorage.getItem("user");

    let user = {};

    try {
        user = storedUser ? JSON.parse(storedUser) : {};
    } catch {
        user = {};
    }

    const username = user?.username || "User";
    const role = user?.role || "Admin";

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <header
            style={{
                height: "84px",
                padding: "0 28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
                backgroundColor:
                    "var(--theme-surface)",
                borderBottom:
                    "1px solid var(--theme-border)",
                boxSizing: "border-box"
            }}
        >
            {/* Page title */}
            <div>
                <h1
                    style={{
                        margin: 0,
                        fontSize: "24px",
                        fontWeight: 700,
                        color: "var(--theme-text)"
                    }}
                >
                    {title}
                </h1>

                <p
                    style={{
                        margin: "4px 0 0",
                        fontSize: "13px",
                        color: "var(--theme-muted)"
                    }}
                >
                    {subtitle}
                </p>
            </div>

            {/* Right side */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px"
                }}
            >
                {/* Theme */}
                <div
                    style={{
                        position: "relative"
                    }}
                >
                    <details
                        style={{
                            position: "relative"
                        }}
                    >
                        <summary
                            style={{
                                listStyle: "none",
                                height: "40px",
                                padding: "0 12px",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                border: "1px solid var(--theme-border)",
                                borderRadius: "10px",
                                backgroundColor: "var(--theme-surface)",
                                color: "var(--theme-text)",
                                cursor: "pointer",
                                fontSize: "13px",
                                fontWeight: 600,
                                boxSizing: "border-box"
                            }}
                        >
                            <Palette
                                size={17}
                                color="var(--theme-primary)"
                            />

                            <span>
                                {themes[themeName]?.name || "Theme"}
                            </span>

                            <ChevronDown size={15} />
                        </summary>

                        <div
                            style={{
                                position: "absolute",
                                top: "46px",
                                right: 0,
                                width: "160px",
                                padding: "6px",
                                backgroundColor:
                                    "var(--theme-surface)",
                                border:
                                    "1px solid var(--theme-border)",
                                borderRadius: "10px",
                                boxShadow:
                                    "0 8px 24px rgba(15, 23, 42, 0.12)",
                                zIndex: 1000,
                                boxSizing: "border-box"
                            }}
                        >
                            {Object.entries(themes).map(
                                ([key, theme]) => (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={(event) => {
                                            setThemeName(key);

                                            event.currentTarget
                                                .closest("details")
                                                ?.removeAttribute(
                                                    "open"
                                                );
                                        }}
                                        style={{
                                            width: "100%",
                                            height: "36px",
                                            padding: "0 10px",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "9px",
                                            border: "none",
                                            borderRadius: "7px",
                                            backgroundColor:
                                                themeName === key
                                                    ? "var(--theme-active)"
                                                    : "transparent",
                                            color:
                                                themeName === key
                                                    ? "var(--theme-primary)"
                                                    : "var(--theme-text)",
                                            cursor: "pointer",
                                            textAlign: "left",
                                            fontSize: "13px",
                                            fontWeight:
                                                themeName === key
                                                    ? 700
                                                    : 500
                                        }}
                                    >
                                        <span
                                            style={{
                                                width: "12px",
                                                height: "12px",
                                                borderRadius: "50%",
                                                backgroundColor:
                                                    theme.primary,
                                                flexShrink: 0
                                            }}
                                        />

                                        {theme.name}
                                    </button>
                                )
                            )}
                        </div>
                    </details>
                </div>
                {/* Notification */}
                <button
                    type="button"
                    aria-label="Notifications"
                    style={{
                        width: "40px",
                        height: "40px",
                        border:
                            "1px solid var(--theme-border)",
                        borderRadius: "10px",
                        backgroundColor:
                            "var(--theme-surface)",
                        color: "var(--theme-muted)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        position: "relative"
                    }}
                >
                    <Bell size={18} />

                    <span
                        style={{
                            position: "absolute",
                            top: "8px",
                            right: "8px",
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor:
                                "var(--theme-primary)"
                        }}
                    />
                </button>

                {/* User */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        paddingLeft: "4px"
                    }}
                >
                    <Avatar
                        name={username}
                        size={40}
                    />

                    <div
                        style={{
                            minWidth: "70px"
                        }}
                    >
                        <div
                            style={{
                                fontSize: "13px",
                                fontWeight: 700,
                                color:
                                    "var(--theme-text)"
                            }}
                        >
                            {username}
                        </div>

                        <div
                            style={{
                                marginTop: "2px",
                                fontSize: "11px",
                                color:
                                    "var(--theme-muted)"
                            }}
                        >
                            {role}
                        </div>
                    </div>
                </div>

                {/* Logout */}
                <button
                    type="button"
                    onClick={handleLogout}
                    title="Logout"
                    style={{
                        height: "40px",
                        padding: "0 12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        border:
                            "1px solid var(--theme-border)",
                        borderRadius: "10px",
                        backgroundColor:
                            "var(--theme-surface)",
                        color:
                            "var(--theme-text)",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: 600
                    }}
                >
                    <LogOut size={17} />
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Header;