function Badge({
    children,
    variant = "default",
    style = {}
}) {
    const variants = {
        default: {
            backgroundColor: "#F1F5F9",
            color: "#475569"
        },

        success: {
            backgroundColor: "#DCFCE7",
            color: "#15803D"
        },

        danger: {
            backgroundColor: "#FEE2E2",
            color: "#B91C1C"
        },

        warning: {
            backgroundColor: "#FEF3C7",
            color: "#B45309"
        },

        info: {
            backgroundColor: "#DBEAFE",
            color: "#1D4ED8"
        }
    };

    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",

                padding: "5px 10px",

                borderRadius: "999px",

                fontSize: "12px",
                fontWeight: 600,

                whiteSpace: "nowrap",

                ...variants[variant],

                ...style
            }}
        >
            {children}
        </span>
    );
}

export default Badge;