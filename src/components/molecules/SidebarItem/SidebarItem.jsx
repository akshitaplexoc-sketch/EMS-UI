import { NavLink } from "react-router-dom";

import "./SidebarItem.css";

function SidebarItem({

    icon: Icon,

    title,

    to

}) {

    return (

        <NavLink

            to={to}

            className={({ isActive }) =>

                isActive

                    ? "sidebar-item active"

                    : "sidebar-item"

            }

        >

            <Icon size={20} />

            <span>{title}</span>

        </NavLink>

    );

}

export default SidebarItem;