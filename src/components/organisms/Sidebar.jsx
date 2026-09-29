import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    CalendarCheck,
    CalendarDays,
    Settings,
    UserCircle
} from "lucide-react";

function Sidebar() {

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
            icon: <CalendarDays size={19} />
        },
        {
            label: "Settings",
            path: "/settings",
            icon: <Settings size={19} />
        }
    ];

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const username = user?.username || "Administrator";
    const role = user?.role || "Admin";

    return (
        <aside
            style={{
                width: "250px",
                minHeight: "100vh",
                backgroundColor: "var(--theme-sidebar)",
                borderRight: "1px solid #E2E8F0",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                flexShrink: 0
            }}
        >
            {/* Logo */}

            <div
                style={{
                    height: "76px",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 24px",
                    borderBottom: "1px solid #E2E8F0",
                    boxSizing: "border-box"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                    }}
                >
                    <div
                        style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "10px",
                            backgroundColor:
                                "var(--theme-primary)",
                            color: "#FFFFFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: "17px"
                        }}
                    >
                        E
                    </div>

                    <div>
                        <div
                            style={{
                                fontSize: "17px",
                                fontWeight: 700,
                                color: "#0F172A"
                            }}
                        >
                            EMS
                        </div>

                        <div
                            style={{
                                fontSize: "11px",
                                color: "#64748B"
                            }}
                        >
                            Employee Management
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}

            <nav
                style={{
                    flex: 1,
                    padding: "24px 14px"
                }}
            >
                <div
                    style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#94A3B8",
                        textTransform: "uppercase",
                        padding: "0 12px",
                        marginBottom: "10px"
                    }}
                >
                    Menu
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px"
                    }}
                >
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            style={({ isActive }) => ({
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "11px 12px",
                                borderRadius: "9px",
                                textDecoration: "none",
                                fontSize: "14px",
                                fontWeight: 600,
                                color: isActive
                                    ? "var(--theme-primary)"
                                    : "#475569",
                                backgroundColor: isActive
                                    ? "color-mix(in srgb, var(--theme-primary) 10%, white)"
                                    : "transparent",
                                transition: "all .2s ease"
                            })}
                        >
                            {item.icon}

                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </div>
            </nav>

            {/* User */}

            <div
                style={{
                    padding: "14px",
                    borderTop: "1px solid #E2E8F0"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "12px",
                        borderRadius: "10px",
                        backgroundColor: "#F8FAFC"
                    }}
                >
                    <div
                        style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "50%",
                            backgroundColor:
                                "color-mix(in srgb, var(--theme-primary) 10%, white)",
                            color: "var(--theme-primary)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0
                        }}
                    >
                        <UserCircle size={21} />
                    </div>

                    <div
                        style={{
                            minWidth: 0
                        }}
                    >
                        <div
                            style={{
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#0F172A",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}
                        >
                            {username}
                        </div>

                        <div
                            style={{
                                fontSize: "11px",
                                color: "#64748B",
                                marginTop: "2px"
                            }}
                        >
                            {role}
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;