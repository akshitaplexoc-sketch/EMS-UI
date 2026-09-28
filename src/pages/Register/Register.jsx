import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/atoms/Card";
import AuthForm from "../../components/organisms/AuthForm";
import AuthLayout from "../../components/layouts/AuthLayout";
import { register as registerService } from "../../services/authService";

function Register() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async (formData) => {
        try {
            setLoading(true);
            setError("");

            await registerService(formData);

            navigate("/login");
        } catch (error) {
            console.error("Registration failed:", error);

            setError(
                error?.response?.data?.message ||
                "Registration failed. Please try again."
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
                    type="register"
                    onSubmit={handleRegister}
                    loading={loading}
                    error={error}
                />
            </Card>
        </AuthLayout>
    );
}

export default Register;