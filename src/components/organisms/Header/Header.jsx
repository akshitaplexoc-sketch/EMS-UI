import { Bell } from "lucide-react";

import ThemePicker from "../../molecules/ThemePicker";

import { useAuth } from "../../../context/AuthContext";

import "./Header.css";

function Header() {

    const { user } = useAuth();

    return (

        <header className="header">

            <div className="header-left">

                <h1>Dashboard</h1>

            </div>

            <div className="header-right">

                <ThemePicker />

                <button className="notification-btn">

                    <Bell size={20} />

                    <span className="notification-badge">

                        2

                    </span>

                </button>

                <div className="profile">

                    <div className="profile-avatar">

                        {user?.username?.charAt(0).toUpperCase()}

                    </div>

                    <div>

                        <h4>{user?.username}</h4>

                        <p>{user?.role}</p>

                    </div>

                </div>

            </div>

        </header>

    );

}

export default Header;