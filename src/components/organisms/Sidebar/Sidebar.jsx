import { useState } from "react";
import {
    Menu,
    LayoutDashboard,
    Users,
    CalendarCheck,
    ClipboardList,
    Building2,
    WalletCards,
    BarChart3,
    Settings,
    X
} from "lucide-react";

import SidebarItem from "../../molecules/SidebarItem";
import "./Sidebar.css";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        {
            label: "Dashboard",
            path: "/dashboard",
            icon: <LayoutDashboard size={19} />
        },
        {
            label: "Employees",
            path: "/employees",
            icon: <Users size={19} />
        },
        {
            label: "Attendance",
            path: "/attendance",
            icon: <CalendarCheck size={19} />
        },
        {
            label: "Leave",
            path: "/leave",
            icon: <ClipboardList size={19} />
        },
        {
            label: "Departments",
            path: "/departments",
            icon: <Building2 size={19} />
        },
        {
            label: "Payroll",
            path: "/payroll",
            icon: <WalletCards size={19} />
        },
        {
            label: "Reports",
            path: "/reports",
            icon: <BarChart3 size={19} />
        },
        {
            label: "Settings",
            path: "/settings",
            icon: <Settings size={19} />
        }
    ];

    return (
        <aside className={`sidebar ${isOpen ? "open" : "collapsed"}`}>

            <div className="sidebar-top">

                <button
                    className="sidebar-menu-btn"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? (
                        <X size={22} />
                    ) : (
                        <Menu size={22} />
                    )}
                </button>

                {isOpen && (
                    <div className="sidebar-title">
                        <span>EMS</span>
                        <small>Employee Management</small>
                    </div>
                )}

            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <SidebarItem
                        key={item.path}
                        icon={item.icon}
                        label={item.label}
                        path={item.path}
                        collapsed={!isOpen}
                    />
                ))}
            </nav>

        </aside>
    );
}

export default Sidebar;