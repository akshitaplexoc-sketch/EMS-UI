import { Navigate } from "react-router-dom";

function RoleProtectedRoute({ allowedRoles, children }) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const roleId = user?.roleId;

    if (!roleId) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(roleId)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default RoleProtectedRoute;