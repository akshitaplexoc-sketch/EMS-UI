import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Employees from "./pages/Employees/Employees";
import Attendance from "./pages/Attendance/Attendance";
import Leave from "./pages/Leave/Leave";
import Settings from "./pages/Settings/Settings";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/employees"
                    element={
                        <ProtectedRoute>
                            <Employees />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/attendance"
                    element={
                        <ProtectedRoute>
                            <Attendance />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/leave"
                    element={
                        <ProtectedRoute>
                            <Leave />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/settings"
                    element={
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>}
                />

                {/* Default */}
                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                {/* Unknown route */}
                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;