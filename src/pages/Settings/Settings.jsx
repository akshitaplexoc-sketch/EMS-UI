import { useState } from "react";

import {
    User,
    Palette,
    Bell,
    Shield,
    Info
} from "lucide-react";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import Card from "../../components/atoms/Card";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
function Settings() {

    const [profile, setProfile] = useState({
        name: localStorage.getItem("username") || "",
        email: localStorage.getItem("email") || "",
        role: localStorage.getItem("role") || "Administrator",
        phone: ""
    });

    const [notifications, setNotifications] = useState({
        email: true,
        attendance: true,
        leave: true
    });

    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleProfileChange = (e) => {

        setProfile({

            ...profile,

            [e.target.name]: e.target.value

        });

    };

    const handlePasswordChange = (e) => {

        setPassword({

            ...password,

            [e.target.name]: e.target.value

        });

    };

    const handleNotificationChange = (e) => {

        setNotifications({

            ...notifications,

            [e.target.name]: e.target.checked

        });

    };

    const saveProfile = () => {

        alert("Profile updated successfully.");

    };

    const updatePassword = () => {

        if (password.newPassword !== password.confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        alert("Password updated successfully.");

    };

    return (

        <DashboardLayout
            title="Settings"
            subtitle="Manage your account preferences"
        >

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px"
                }}
            >

                {/* Profile Card */}

                <Card>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "24px"
                        }}
                    >

                        <User size={24} />

                        <div>

                            <h2
                                style={{
                                    margin: 0
                                }}
                            >
                                Profile Information
                            </h2>

                            <p
                                style={{
                                    marginTop: "6px",
                                    color: "#64748B",
                                    fontSize: "14px"
                                }}
                            >
                                Manage your account information.
                            </p>

                        </div>

                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(280px,1fr))",
                            gap: "20px"
                        }}
                    >

                        <Input
                            label="Full Name"
                            name="name"
                            value={profile.name}
                            onChange={handleProfileChange}
                        />

                        <Input
                            label="Email Address"
                            name="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                        />

                        <Input
                            label="Role"
                            value={profile.role}
                            disabled
                        />

                        <Input
                            label="Phone Number"
                            name="phone"
                            placeholder="Enter phone number"
                            value={profile.phone}
                            onChange={handleProfileChange}
                        />

                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginTop: "24px"
                        }}
                    >

                        <Button onClick={saveProfile}>

                            Save Changes

                        </Button>

                    </div>

                </Card>
                                {/* Appearance */}

                <Card>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "24px"
                        }}
                    >

                        <Palette size={24} />

                        <div>

                            <h2
                                style={{
                                    margin: 0
                                }}
                            >
                                Appearance
                            </h2>

                            <p
                                style={{
                                    marginTop: "6px",
                                    color: "#64748B",
                                    fontSize: "14px"
                                }}
                            >
                                Customize your application appearance.
                            </p>

                        </div>

                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(280px,1fr))",
                            gap: "20px"
                        }}
                    >

                        <div>

                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "8px",
                                    fontWeight: "600",
                                    color: "#334155"
                                }}
                            >
                                Theme
                            </label>

                            <div
                                style={{
                                    height: "46px",
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "0 16px",
                                    border: "1px solid #E2E8F0",
                                    borderRadius: "10px",
                                    background: "#F8FAFC",
                                    color: "#64748B"
                                }}
                            >
                                Theme can be changed from the Header.
                            </div>

                        </div>

                        <div>

                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "8px",
                                    fontWeight: "600",
                                    color: "#334155"
                                }}
                            >
                                Dark Mode
                            </label>

                            <div
                                style={{
                                    height: "46px",
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "0 16px",
                                    border: "1px solid #E2E8F0",
                                    borderRadius: "10px",
                                    background: "#F8FAFC",
                                    color: "#64748B"
                                }}
                            >
                                Available through Theme Selector.
                            </div>

                        </div>

                    </div>

                </Card>

                {/* Notifications */}

                <Card>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "24px"
                        }}
                    >

                        <Bell size={24} />

                        <div>

                            <h2
                                style={{
                                    margin: 0
                                }}
                            >
                                Notifications
                            </h2>

                            <p
                                style={{
                                    marginTop: "6px",
                                    color: "#64748B",
                                    fontSize: "14px"
                                }}
                            >
                                Manage notification preferences.
                            </p>

                        </div>

                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "18px"
                        }}
                    >

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "18px",
                                border: "1px solid #E2E8F0",
                                borderRadius: "14px"
                            }}
                        >

                            <div>

                                <div
                                    style={{
                                        fontWeight: "600"
                                    }}
                                >
                                    Email Notifications
                                </div>

                                <div
                                    style={{
                                        fontSize: "13px",
                                        color: "#64748B",
                                        marginTop: "4px"
                                    }}
                                >
                                    Receive updates by email.
                                </div>

                            </div>

                            <input
                                type="checkbox"
                                name="email"
                                checked={notifications.email}
                                onChange={handleNotificationChange}
                                style={{
                                    width: "18px",
                                    height: "18px",
                                    cursor: "pointer"
                                }}
                            />

                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "18px",
                                border: "1px solid #E2E8F0",
                                borderRadius: "14px"
                            }}
                        >

                            <div>

                                <div
                                    style={{
                                        fontWeight: "600"
                                    }}
                                >
                                    Attendance Alerts
                                </div>

                                <div
                                    style={{
                                        fontSize: "13px",
                                        color: "#64748B",
                                        marginTop: "4px"
                                    }}
                                >
                                    Notify when attendance changes.
                                </div>

                            </div>

                            <input
                                type="checkbox"
                                name="attendance"
                                checked={notifications.attendance}
                                onChange={handleNotificationChange}
                                style={{
                                    width: "18px",
                                    height: "18px",
                                    cursor: "pointer"
                                }}
                            />
                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "18px",
                                border: "1px solid #E2E8F0",
                                borderRadius: "14px"
                            }}
                        >

                            <div>

                                <div
                                    style={{
                                        fontWeight: "600"
                                    }}
                                >
                                    Leave Request Alerts
                                </div>

                                <div
                                    style={{
                                        fontSize: "13px",
                                        color: "#64748B",
                                        marginTop: "4px"
                                    }}
                                >
                                    Notify when leave status changes.
                                </div>

                            </div>

                            <input
                                type="checkbox"
                                name="leave"
                                checked={notifications.leave}
                                onChange={handleNotificationChange}
                                style={{
                                    width: "18px",
                                    height: "18px",
                                    cursor: "pointer"
                                }}
                            />

                        </div>

                    </div>

                </Card>
                                {/* Security */}

                <Card>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "24px"
                        }}
                    >

                        <Shield size={24} />

                        <div>

                            <h2
                                style={{
                                    margin: 0
                                }}
                            >
                                Security
                            </h2>

                            <p
                                style={{
                                    marginTop: "6px",
                                    color: "#64748B",
                                    fontSize: "14px"
                                }}
                            >
                                Change your account password.
                            </p>

                        </div>

                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(280px,1fr))",
                            gap: "20px"
                        }}
                    >

                        <Input
                            label="Current Password"
                            type="password"
                            name="currentPassword"
                            value={password.currentPassword}
                            onChange={handlePasswordChange}
                        />

                        <Input
                            label="New Password"
                            type="password"
                            name="newPassword"
                            value={password.newPassword}
                            onChange={handlePasswordChange}
                        />

                        <Input
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={password.confirmPassword}
                            onChange={handlePasswordChange}
                        />

                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginTop: "24px"
                        }}
                    >

                        <Button
                            onClick={updatePassword}
                        >
                            Update Password
                        </Button>

                    </div>

                </Card>

                {/* About */}

                <Card>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "24px"
                        }}
                    >

                        <Info size={24} />

                        <div>

                            <h2
                                style={{
                                    margin: 0
                                }}
                            >
                                About Employee Management System
                            </h2>

                            <p
                                style={{
                                    marginTop: "6px",
                                    color: "#64748B",
                                    fontSize: "14px"
                                }}
                            >
                                Application information.
                            </p>

                        </div>

                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "180px 1fr",
                            rowGap: "16px",
                            columnGap: "20px"
                        }}
                    >

                        <strong>Version</strong>
                        <span>1.0.0</span>

                        <strong>Frontend</strong>
                        <span>React + Vite</span>

                        <strong>Backend</strong>
                        <span>ASP.NET Core Web API</span>

                        <strong>Database</strong>
                        <span>SQL Server</span>

                        <strong>Authentication</strong>
                        <span>JWT</span>

                        <strong>Developed By</strong>
                        <span>Plexoc Technologies</span>

                    </div>

                </Card>

            </div>

        </DashboardLayout>

    );

}

export default Settings;