import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/atoms/Card";
import AuthForm from "../../components/organisms/AuthForm";
import AuthLayout from "../../components/layouts/AuthLayout";
import { login as loginService } from "../../services/authService";

function Login() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (formData) => {
        try {
            setLoading(true);
            setError("");

            await loginService(formData);

            navigate("/dashboard", { replace: true });
        } catch (error) {
            console.error("Login failed:", error);

            setError(
                error?.response?.data?.message ||
                error?.message ||
                "Invalid email or password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <Card
                style={{
                    maxWidth: "480px",
                    margin: "0 auto"
                }}
            >
                <AuthForm
                    type="login"
                    onSubmit={handleLogin}
                    loading={loading}
                    error={error}
                />
            </Card>
        </AuthLayout>
    );
}

export default Login;