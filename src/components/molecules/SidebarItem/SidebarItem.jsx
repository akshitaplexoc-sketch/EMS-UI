import { NavLink } from "react-router-dom";

import "./SidebarItem.css";

function SidebarItem({
    icon,
    label,
    path,
    collapsed
}) {
    return (
        <NavLink
            to={path}
            className={({ isActive }) =>
                `sidebar-item ${isActive ? "active" : ""}`
            }
            title={collapsed ? label : ""}
        >
            <span className="sidebar-item-icon">
                {icon}
            </span>

            {!collapsed && (
                <span className="sidebar-item-label">
                    {label}
                </span>
            )}
        </NavLink>
    );
}

export default SidebarItem;