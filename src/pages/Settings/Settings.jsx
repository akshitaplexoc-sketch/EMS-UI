import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Card from "../../components/atoms/Card";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import { Palette , Bell , Shield , User , Info} from "lucide-react";
import {
    getProfile,
    updateProfile,
    changePassword
} from "../../services/authService";
function Settings() {

    const [profile, setProfile] = useState({
        username: "",
        email: "",
        role: ""
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [notifications, setNotifications] = useState({
        email: true,
        attendance: true,
        leave: true
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {

            setLoading(true);

            const response = await getProfile();

            const data = response.data ?? response;

            setProfile({
                username: data.username ?? "",
                email: data.email ?? "",
                role: data.role ?? ""
            });

        }
        catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to load profile."
            );

        }
        finally {

            setLoading(false);

        }
    };

    const handleProfileChange = (e) => {

        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });

    };

    const handlePasswordChange = (e) => {

        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        });

    };

    const handleNotificationChange = (e) => {

        setNotifications({
            ...notifications,
            [e.target.name]: e.target.checked
        });

    };

    const saveProfile = async () => {

        try {

            setLoading(true);

            const response = await updateProfile({
                username: profile.username,
                email: profile.email
            });

            const existingUser = JSON.parse(
                localStorage.getItem("user") || "{}"
            );

            existingUser.username = profile.username;
            existingUser.email = profile.email;

            localStorage.setItem(
                "user",
                JSON.stringify(existingUser)
            );
            window.dispatchEvent(new Event("storage"));
            alert(
                response.message ||
                "Profile updated successfully."
            );

        }
        catch (error) {

            alert(
                error.response?.data?.message ||
                "Profile update failed."
            );

        }
        finally {

            setLoading(false);

        }

    };

    const updatePassword = async () => {

        if (!passwordData.currentPassword) {

            alert("Please enter current password.");

            return;

        }

        if (!passwordData.newPassword) {

            alert("Please enter new password.");

            return;

        }

        if (
            passwordData.newPassword !==
            passwordData.confirmPassword
        ) {

            alert(
                "New Password and Confirm Password do not match."
            );

            return;

        }

        try {

            setLoading(true);

            const response = await changePassword({

                currentPassword:
                    passwordData.currentPassword,

                newPassword:
                    passwordData.newPassword

            });

            alert(
                response.message ||
                "Password updated successfully."
            );

            setPasswordData({

                currentPassword: "",
                newPassword: "",
                confirmPassword: ""

            });

        }
        catch (error) {

            alert(
                error.response?.data?.message ||
                "Password update failed."
            );

        }
        finally {

            setLoading(false);

        }

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
                                Update your account information.
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
                            label="Username"
                            name="username"
                            value={profile.username}
                            onChange={handleProfileChange}
                        />

                        <Input
                            label="Email"
                            name="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                        />

                        <Input
                            label="Role"
                            value={profile.role}
                            disabled
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
                            onClick={saveProfile}
                            disabled={loading}
                        >
                            {
                                loading
                                    ? "Saving..."
                                    : "Save Changes"
                            }
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
                                Change Password
                            </h2>

                            <p
                                style={{
                                    marginTop: "6px",
                                    color: "#64748B",
                                    fontSize: "14px"
                                }}
                            >
                                Keep your account secure by updating your password.
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
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            placeholder="Enter current password"
                        />

                        <Input
                            label="New Password"
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            placeholder="Enter new password"
                        />

                        <Input
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            placeholder="Confirm new password"
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
                            disabled={loading}
                        >
                            {
                                loading
                                    ? "Updating..."
                                    : "Update Password"
                            }
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