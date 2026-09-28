import { UserRound } from "lucide-react";
import { useTheme } from "../ThemeContext";

function WelcomeBanner({ name }) {
    const { theme } = useTheme();

    const storedUser = localStorage.getItem("user");

    let userName = name;

    if (!userName && storedUser) {
        try {
            const user = JSON.parse(storedUser);
            userName = user?.username || "User";
        } catch {
            userName = "User";
        }
    }

    return (
        <div
            style={{
                marginBottom: "24px",
                padding: "28px",
                borderRadius: "18px",

                backgroundColor:
                    "var(--theme-banner-background)",

                border:
                    "1px solid var(--theme-border)",

                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px"
            }}
        >
            <div>
                <h2
                    style={{
                        margin: 0,
                        marginBottom: "8px",
                        fontSize: "26px",
                        fontWeight: 700,

                        color:
                            "var(--theme-banner-text)"
                    }}
                >
                    Welcome back, {userName}! 👋
                </h2>

                <p
                    style={{
                        margin: 0,
                        fontSize: "15px",

                        color:
                            "var(--theme-banner-muted)"
                    }}
                >
                    Here's what's happening with your
                    organization today.
                </p>
            </div>

            <div
                style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",

                    backgroundColor:
                        "rgba(255,255,255,0.55)",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                }}
            >
                <UserRound
                    size={26}
                    color="var(--theme-banner-text)"
                />
            </div>
        </div>
    );
}

export default WelcomeBanner;