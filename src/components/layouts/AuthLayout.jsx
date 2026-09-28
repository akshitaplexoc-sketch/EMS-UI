function AuthLayout({ children }) {
    return (
        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 100%)",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                padding: "30px",

                boxSizing: "border-box"
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "480px"
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "20px"
                    }}
                >
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",

                            width: "42px",
                            height: "42px",

                            borderRadius: "12px",

                            backgroundColor: "#6366F1",
                            color: "#FFFFFF",

                            fontSize: "18px",
                            fontWeight: 700
                        }}
                    >
                        E
                    </div>

                    <h2
                        style={{
                            margin: "8px 0 0",
                            fontSize: "18px",
                            color: "#1E293B"
                        }}
                    >
                        Employee Management System
                    </h2>
                </div>

                {children}
            </div>
        </div>
    );
}

export default AuthLayout;