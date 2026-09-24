import { useState } from "react";

import Button from "../../atoms/Button";
import FormField from "../../molecules/FormField";
import PasswordField from "../../molecules/PasswordField";
import Checkbox from "../../atoms/Checkbox";

import "./AuthForm.css";

function AuthForm({

    mode = "login",
    onSubmit,
    loading,
    error

}) {

    const [formData, setFormData] = useState({

        username: "",
        email: "",
        password: "",
        rememberMe: false

    });

    const handleChange = (e) => {

        const { name, value, checked, type } = e.target;

        setFormData(prev => ({

            ...prev,

            [name]: type === "checkbox"
                ? checked
                : value

        }));

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit(formData);

    };

    return (

        <form
            className="auth-form"
            onSubmit={handleSubmit}
        >

            {

                mode === "register" && (

                    <FormField

                        label="Full Name"

                        name="username"

                        value={formData.username}

                        onChange={handleChange}

                        placeholder="Enter your full name"

                    />

                )

            }

            <FormField

                label="Email Address"

                type="email"

                name="email"

                value={formData.email}

                onChange={handleChange}

                placeholder="Enter your email"

            />

            <PasswordField

                label="Password"

                name="password"

                value={formData.password}

                onChange={handleChange}

                placeholder="Enter your password"

            />

            {

                mode === "login" && (

                    <div className="auth-options">

                        <Checkbox

                            name="rememberMe"

                            checked={formData.rememberMe}

                            onChange={handleChange}

                            label="Remember me"

                        />

                        <button

                            type="button"

                            className="forgot-password"

                        >

                            Forgot Password?

                        </button>

                    </div>

                )

            }

            {

                error &&

                <div className="auth-error">

                    {error}

                </div>

            }

            <Button
                type="submit"
            >

                {

                    loading

                        ? "Please wait..."

                        : mode === "login"

                            ? "Sign In"

                            : "Create Account"

                }

            </Button>

            <div className="divider">

                <span>OR</span>

            </div>

            <Button
                type="button"
                variant="outline"
                className="google-btn"
            >
                <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google"
                    className="google-icon"
                />

                Continue with Google
            </Button>

        </form>

    );

}

export default AuthForm;