import Card from "../atoms/Card";

function StatCard({
    title,
    value,
    subtitle,
    icon,
    iconBackground,
    iconColor
}) {
    return (
        <Card
            style={{
                padding: "22px"
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "16px"
                }}
            >
                <div>
                    <div
                        style={{
                            fontSize: "13px",
                            color: "var(--theme-muted)",
                            marginBottom: "8px"
                        }}
                    >
                        {title}
                    </div>

                    <div
                        style={{
                            fontSize: "28px",
                            fontWeight: 700,
                            color: "var(--theme-text)",
                            lineHeight: 1.1
                        }}
                    >
                        {value}
                    </div>

                    <div
                        style={{
                            marginTop: "8px",
                            fontSize: "12px",
                            color: "var(--theme-muted)"
                        }}
                    >
                        {subtitle}
                    </div>
                </div>

                <div
                    style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "11px",
                        backgroundColor:
                            iconBackground ||
                            "var(--theme-active)",
                        color:
                            iconColor ||
                            "var(--theme-primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                    }}
                >
                    {icon}
                </div>
            </div>
        </Card>
    );
}

export default StatCard;