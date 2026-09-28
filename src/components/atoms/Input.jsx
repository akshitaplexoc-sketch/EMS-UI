function Input({
    label,
    error,
    style = {},
    ...props
}) {
    return (
        <div style={{ width: "100%" }}>
            {label && (
                <label
                    style={{
                        display: "block",
                        marginBottom: "7px",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#334155"
                    }}
                >
                    {label}
                </label>
            )}

            <input
                {...props}
                style={{
                    width: "100%",
                    height: "46px",
                    padding: "0 14px",

                    border: `1px solid ${
                        error ? "#EF4444" : "#E2E8F0"
                    }`,

                    borderRadius: "10px",

                    backgroundColor: "#FFFFFF",

                    color: "#1E293B",

                    fontSize: "14px",

                    outline: "none",

                    boxSizing: "border-box",

                    fontFamily: "inherit",

                    ...style
                }}
            />

            {error && (
                <p
                    style={{
                        margin: "5px 0 0",
                        fontSize: "12px",
                        color: "#EF4444"
                    }}
                >
                    {error}
                </p>
            )}
        </div>
    );
}

export default Input;