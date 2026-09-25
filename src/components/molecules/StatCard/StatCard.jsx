import "./StatCard.css";

function StatCard({
    title,
    value,
    icon,
    color,
    percent,
    positive = true,
    variant = "blue"
}) {
    return (
        <div className={`stat-card ${variant}`}>

            <div className="stat-top">

                <div>
                    <span className="stat-title">
                        {title}
                    </span>

                    <h2>{value}</h2>
                </div>

                <div
                    className="stat-icon"
                    style={{ background: color }}
                >
                    {icon}
                </div>

            </div>

            <div className="stat-bottom">

                <span
                    className={
                        positive
                            ? "positive"
                            : "negative"
                    }
                >
                    {positive ? "↑" : "↓"} {percent}
                </span>

                <small>
                    vs last month
                </small>

            </div>

        </div>
    );
}

export default StatCard;