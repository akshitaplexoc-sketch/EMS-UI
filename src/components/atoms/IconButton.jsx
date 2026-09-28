function IconButton({
    children,
    onClick,
    title,
    variant = "default",
    size = 38,
    style = {},
    ...props
}) {
    const variants = {
        default: {
            backgroundColor: "#F8FAFC",
            color: "#475569",
            border: "1px solid #E2E8F0"
        },

        primary: {
            backgroundColor: "#EEF2FF",
            color: "#6366F1",
            border: "1px solid #E0E7FF"
        },

        danger: {
            backgroundColor: "#FEF2F2",
            color: "#DC2626",
            border: "1px solid #FECACA"
        }
    };

    return (
        <button
            type="button"
            onClick={onClick}
            title={title}
            {...props}
            style={{
                width: size,
                height: size,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                borderRadius: "9px",

                cursor: "pointer",

                ...variants[variant],

                ...style
            }}
        >
            {children}
        </button>
    );
}

export default IconButton;