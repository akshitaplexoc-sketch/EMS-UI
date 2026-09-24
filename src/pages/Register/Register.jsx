import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/atoms/Card";
import AuthForm from "../../components/organisms/AuthForm";
import AuthLayout from "../../components/layouts/AuthLayout";

import { register } from "../../services/authService";

import "../Login/Login.css";

function Register() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleRegister = async (formData) => {

        setError("");

        if (formData.password !== formData.confirmPassword) {

            setError("Password and confirm password do not match.");

            return;

        }

        setLoading(true);

        try {

            const registerData = {
                username: formData.username,
                email: formData.email,
                password: formData.password
            };

            const response = await register(registerData);

            if (response.status === 200) {

                navigate("/");

            }
            else {

                setError(
                    response.message ||
                    "Registration failed."
                );

            }

        }
        catch (error) {

            console.error("Register Error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to create account."
            );

        }
        finally {

            setLoading(false);

        }

    };

    const goToLogin = () => {

        navigate("/");

    };

    return (

        <AuthLayout>

            <Card className="login-card">

                <div className="auth-heading">

                    <h2>
                        Create Account
                    </h2>

                    <p>
                        Create your Employee Management System account.
                    </p>

                </div>

                <AuthForm
                    mode="register"
                    onSubmit={handleRegister}
                    loading={loading}
                    error={error}
                />

                <p className="auth-switch-text">

                    Already have an account?

                    <button
                        type="button"
                        className="auth-switch-link"
                        onClick={goToLogin}
                    >
                        Login
                    </button>

                </p>

            </Card>

        </AuthLayout>

    );

}

export default Register;