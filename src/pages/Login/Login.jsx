import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/layouts/AuthLayout";
import Card from "../../components/atoms/Card";
import AuthForm from "../../components/organisms/AuthForm";

import { login as loginService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleLogin = async (formData) => {

        setLoading(true);
        setError("");

        try {

            const loginData = {
                email: formData.email,
                password: formData.password
            };

            const response = await loginService(loginData);

            if (response.status === 200 && response.data) {

                const authData = response.data;

                login(
                    authData,
                    formData.rememberMe
                );

                navigate("/dashboard");

            }
            else {

                setError(
                    response.message ||
                    "Invalid email or password."
                );

            }

        }
        catch (error) {

            console.error(
                "Login Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to login. Please check your email and password."
            );

        }
        finally {

            setLoading(false);

        }

    };


    const goToRegister = () => {
        navigate("/register");
    };


    return (

        <AuthLayout>

            <Card className="login-card">

                <div className="login-heading">

                    <span className="login-eyebrow">
                        Welcome back
                    </span>

                    <h2>
                        Sign in to your account
                    </h2>

                    <p>
                        Enter your credentials to continue to EMS.
                    </p>

                </div>


                <AuthForm
                    mode="login"
                    onSubmit={handleLogin}
                    loading={loading}
                    error={error}
                />


                <p className="login-register-text">

                    Don't have an account?

                    <button
                        type="button"
                        className="login-register-link"
                        onClick={goToRegister}
                    >
                        Register
                    </button>

                </p>

            </Card>

        </AuthLayout>

    );

}

export default Login;