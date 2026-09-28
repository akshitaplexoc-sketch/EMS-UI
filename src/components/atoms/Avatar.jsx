function Avatar({
    src,
    name = "",
    size = 42,
    style = {}
}) {
    const initials = name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div
            style={{
                width: size,
                height: size,
                minWidth: size,

                borderRadius: "50%",

                overflow: "hidden",

                backgroundColor: "#EEF2FF",

                color: "#6366F1",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                fontSize: size * 0.35,

                fontWeight: 700,

                ...style
            }}
        >
            {src ? (
                <img
                    src={src}
                    alt={name}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                    }}
                />
            ) : (
                initials || "U"
            )}
        </div>
    );
}

export default Avatar;