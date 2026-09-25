import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

import Dashboard from "../pages/Dashboard/Dashboard";
import Employees from "../pages/Employees/Employees";
import Attendance from "../pages/Attendance/Attendance";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../components/layouts/DashboardLayout";

function ComingSoon({ title }) {
    return (
        <div
            style={{
                padding: "40px",
                color: "var(--text-primary)"
            }}
        >
            <h1>{title}</h1>
            <p style={{ color: "var(--text-secondary)" }}>
                This page will be added soon.
            </p>
        </div>
    );
}

function AppRoutes() {
    return (
        <BrowserRouter>

            <Routes>

                {/* Public */}
                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Protected Application */}
                <Route
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                   <Route
                        path="/employees"
                        element={<Employees />}
                    />

                    <Route
                        path="/attendance"
                        element={<Attendance />}
                    />

                    <Route
                        path="/leave"
                        element={
                            <ComingSoon title="Leave Management" />
                        }
                    />

                    <Route
                        path="/departments"
                        element={
                            <ComingSoon title="Departments" />
                        }
                    />

                    <Route
                        path="/payroll"
                        element={
                            <ComingSoon title="Payroll" />
                        }
                    />

                    <Route
                        path="/reports"
                        element={
                            <ComingSoon title="Reports" />
                        }
                    />

                    <Route
                        path="/settings"
                        element={
                            <ComingSoon title="Settings" />
                        }
                    />
                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;