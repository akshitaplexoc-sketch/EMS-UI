function Button({
    children,
    type = "button",
    variant = "primary",
    size = "medium",
    loading = false,
    disabled = false,
    icon,
    onClick,
    style = {},
    ...props
}) {
    const variants = {
        primary: {
            backgroundColor: "#000000",
            color: "#FFFFFF",
            border: "1px solid #f6f6fc"
        },

        secondary: {
            backgroundColor: "#F8FAFC",
            color: "#334155",
            border: "1px solid #E2E8F0"
        },

        danger: {
            backgroundColor: "#FEF2F2",
            color: "#DC2626",
            border: "1px solid #FECACA"
        },

        success: {
            backgroundColor: "#F0FDF4",
            color: "#16A34A",
            border: "1px solid #BBF7D0"
        },

        outline: {
            backgroundColor: "#FFFFFF",
            color: "#6366F1",
            border: "1px solid #6366F1"
        },

        ghost: {
            backgroundColor: "transparent",
            color: "#64748B",
            border: "1px solid transparent"
        }
    };

    const sizes = {
        small: {
            padding: "8px 12px",
            fontSize: "13px"
        },

        medium: {
            padding: "11px 18px",
            fontSize: "14px"
        },

        large: {
            padding: "13px 22px",
            fontSize: "15px"
        }
    };

    const buttonStyle = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",

        borderRadius: "10px",

        fontFamily: "inherit",
        fontWeight: 600,

        cursor: disabled || loading ? "not-allowed" : "pointer",

        transition: "all 0.2s ease",

        opacity: disabled || loading ? 0.6 : 1,

        boxSizing: "border-box",

        ...variants[variant],
        ...sizes[size],
        ...style
    };

    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            style={buttonStyle}
            {...props}
        >
            {loading ? "Loading..." : icon}
            {children}
        </button>
    );
}

export default Button;