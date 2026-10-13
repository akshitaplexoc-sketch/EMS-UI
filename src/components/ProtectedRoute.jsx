import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {

    const token = localStorage.getItem("token");

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Admin-only route
    if (role === "Admin" && user.roleId !== 1) {
        return <Navigate to="/dashboard" replace />;
    }

    // Employee-only route (for future use)
    if (role === "Employee" && user.roleId !== 2) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default ProtectedRoute;