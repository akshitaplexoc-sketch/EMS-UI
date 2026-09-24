import {

    LayoutDashboard,

    Users,

    CalendarDays,

    ClipboardCheck,

    Settings,

    LogOut

} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";

import SidebarItem from "../../molecules/SidebarItem";

import "./Sidebar.css";

function Sidebar(){

    const navigate = useNavigate();

    const {

        user,

        logout

    } = useAuth();

    const handleLogout=()=>{

        logout();

        navigate("/");

    }

    return(

        <aside className="sidebar">

            <div>

                <div className="sidebar-logo">

                    <h2>EMS</h2>

                    <p>Employee Management</p>

                </div>

                <nav className="sidebar-menu">

                    <SidebarItem

                        icon={LayoutDashboard}

                        title="Dashboard"

                        to="/dashboard"

                    />

                    <SidebarItem

                        icon={Users}

                        title="Employees"

                        to="/employees"

                    />

                    <SidebarItem

                        icon={CalendarDays}

                        title="Attendance"

                        to="/attendance"

                    />

                    <SidebarItem

                        icon={ClipboardCheck}

                        title="Leave Requests"

                        to="/leave"

                    />

                    <SidebarItem

                        icon={Settings}

                        title="Settings"

                        to="/settings"

                    />

                </nav>

            </div>

            <div className="sidebar-footer">

                <div className="sidebar-user">

                    <div className="avatar">

                        {

                            user?.username?.charAt(0).toUpperCase()

                        }

                    </div>

                    <div>

                        <h4>

                            {user?.username}

                        </h4>

                        <p>

                            {user?.role}

                        </p>

                    </div>

                </div>

                <button

                    className="logout-btn"

                    onClick={handleLogout}

                >

                    <LogOut size={18}/>

                    Logout

                </button>

            </div>

        </aside>

    )

}

export default Sidebar;