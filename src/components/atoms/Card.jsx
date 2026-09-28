function Card({
    children,
    style = {}
}) {
    return (
        <div
            style={{
                backgroundColor:
                    "var(--theme-surface)",
                border:
                    "1px solid var(--theme-border)",
                borderRadius: "18px",
                padding: "24px",
                boxSizing: "border-box",
                color: "var(--theme-text)",
                boxShadow:
                    "0 2px 8px rgba(15, 23, 42, 0.05)",
                ...style
            }}
        >
            {children}
        </div>
    );
}

export default Card;