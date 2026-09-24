import "./StatCard.css";

function StatCard({
    title,
    value,
    icon: Icon,
    color = "blue"
}) {

    return (

        <div className="stat-card">

            <div className="stat-card-left">

                <p>{title}</p>

                <h2>{value}</h2>

            </div>

            <div className={`stat-icon ${color}`}>

                <Icon size={26} />

            </div>

        </div>

    );

}

export default StatCard;