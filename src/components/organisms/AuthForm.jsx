import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

function AuthForm({
    type = "login",
    onSubmit,
    loading = false,
    error = ""
}) {
    const isLogin = type === "login";

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [validationError, setValidationError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setValidationError("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isLogin && formData.password !== formData.confirmPassword) {
            setValidationError("Passwords do not match.");
            return;
        }

        setValidationError("");

        onSubmit(formData);
    };

    const passwordEyeButton = {
        position: "absolute",
        right: "12px",
        top: "50%",
        transform: "translateY(-50%)",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4px",
        color: "#64748B"
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px"
            }}
        >
            <div>
                <h2
                    style={{
                        margin: 0,
                        marginBottom: "8px",
                        fontSize: "28px",
                        color: "#0F172A"
                    }}
                >
                    {isLogin ? "Welcome Back" : "Create Account"}
                </h2>

                <p
                    style={{
                        margin: 0,
                        color: "#64748B",
                        fontSize: "14px"
                    }}
                >
                    {isLogin
                        ? "Sign in to your EMS account"
                        : "Create your EMS account"}
                </p>
            </div>

            {!isLogin && (
                <Input
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                />
            )}

            <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
            />

            <div style={{ position: "relative" }}>
                <Input
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    style={{
                        paddingRight: "48px"
                    }}
                />

                <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    style={passwordEyeButton}
                    aria-label={
                        showPassword
                            ? "Hide password"
                            : "Show password"
                    }
                >
                    {showPassword ? (
                        <EyeOff size={19} />
                    ) : (
                        <Eye size={19} />
                    )}
                </button>
            </div>

            {!isLogin && (
                <div style={{ position: "relative" }}>
                    <Input
                        label="Confirm Password"
                        name="confirmPassword"
                        type={
                            showConfirmPassword
                                ? "text"
                                : "password"
                        }
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                        style={{
                            paddingRight: "48px"
                        }}
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowConfirmPassword(
                                (previous) => !previous
                            )
                        }
                        style={passwordEyeButton}
                        aria-label={
                            showConfirmPassword
                                ? "Hide confirm password"
                                : "Show confirm password"
                        }
                    >
                        {showConfirmPassword ? (
                            <EyeOff size={19} />
                        ) : (
                            <Eye size={19} />
                        )}
                    </button>
                </div>
            )}

            {(error || validationError) && (
                <div
                    style={{
                        padding: "12px",
                        borderRadius: "8px",
                        backgroundColor: "#FEF2F2",
                        border: "1px solid #FECACA",
                        color: "#DC2626",
                        fontSize: "14px"
                    }}
                >
                    {error || validationError}
                </div>
            )}

            <Button
                type="submit"
                variant="primary"
                size="large"
                loading={loading}
                disabled={loading}
                style={{
                    width: "100%"
                }}
            >
                {isLogin ? "Login" : "Create Account"}
            </Button>

            <div
                style={{
                    textAlign: "center",
                    fontSize: "14px",
                    color: "#64748B"
                }}
            >
                {isLogin ? (
                    <>
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            style={{
                                color: "#4F46E5",
                                fontWeight: 600,
                                textDecoration: "none"
                            }}
                        >
                            Create account
                        </Link>
                    </>
                ) : (
                    <>
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            style={{
                                color: "#4F46E5",
                                fontWeight: 600,
                                textDecoration: "none"
                            }}
                        >
                            Sign in
                        </Link>
                    </>
                )}
            </div>
        </form>
    );
}

export default AuthForm;