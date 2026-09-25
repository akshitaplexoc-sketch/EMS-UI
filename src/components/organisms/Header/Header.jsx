import { useState, useRef, useEffect } from "react";
import {
    Bell,
    ChevronDown,
    User,
    LogOut
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import ThemePicker from "../../molecules/ThemePicker";

import "./Header.css";

function Header() {
    const [profileOpen, setProfileOpen] = useState(false);

    const profileRef = useRef(null);

    const navigate = useNavigate();

    const username =
        localStorage.getItem("username") ||
        sessionStorage.getItem("username") ||
        "Akshita";

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setProfileOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");

        navigate("/", { replace: true });
    };

    return (
        <header className="header">

            <div className="header-left">
                <span className="header-page-title">
                    Employee Management System
                </span>
            </div>

            <div className="header-right">

                <button className="header-icon">
                    <Bell size={20} />
                    <span className="notification-badge">
                        3
                    </span>
                </button>

                <ThemePicker />

                <div
                    className="profile-wrapper"
                    ref={profileRef}
                >
                    <button
                        className="profile"
                        onClick={() =>
                            setProfileOpen(!profileOpen)
                        }
                    >
                        <div className="profile-avatar">
                            {username
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        <div className="profile-info">
                            <h4>{username}</h4>
                            <span>Admin</span>
                        </div>

                        <ChevronDown
                            size={17}
                            className={
                                profileOpen
                                    ? "profile-chevron rotate"
                                    : "profile-chevron"
                            }
                        />
                    </button>

                    {profileOpen && (
                        <div className="profile-dropdown">

                            <div className="dropdown-user">
                                <div className="dropdown-avatar">
                                    {username
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>

                                <div>
                                    <strong>
                                        {username}
                                    </strong>
                                    <span>
                                        Administrator
                                    </span>
                                </div>
                            </div>

                            <div className="dropdown-divider" />

                            <button className="dropdown-item">
                                <User size={17} />
                                My Profile
                            </button>

                            <button
                                className="dropdown-item logout"
                                onClick={handleLogout}
                            >
                                <LogOut size={17} />
                                Logout
                            </button>

                        </div>
                    )}
                </div>

            </div>
        </header>
    );
}

export default Header;