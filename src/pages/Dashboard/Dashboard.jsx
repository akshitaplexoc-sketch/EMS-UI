import {
    Users,
    Building2,
    CalendarCheck,
    Plane
} from "lucide-react";

import StatCard from "../../components/molecules/StatCard";
import DashboardCharts from "../../components/organisms/DashboardCharts";

import "./Dashboard.css";

function Dashboard() {
    const username =
        localStorage.getItem("username") ||
        sessionStorage.getItem("username") ||
        "Employee";

    const displayName =
        username.charAt(0).toUpperCase() + username.slice(1);

    const today = new Date();

    const formattedDate = today.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    return (
        <div className="dashboard">

            {/* Welcome */}
            <div className="dashboard-header">
                <div>
                    <h1>
                        Good Morning, {displayName}! 👋
                    </h1>

                    <p>
                        Here's what's happening in your organization today.
                    </p>
                </div>

                <div className="dashboard-date">
                    📅 {formattedDate}
                </div>
            </div>

            {/* Statistics */}
            <div className="stats-grid">

                <StatCard
                    title="Total Employees"
                    value="248"
                    percent="12%"
                    positive={true}
                    variant="blue"
                    color="linear-gradient(135deg, #bfdbfe, #60a5fa)"
                    icon={<Users size={22} />}
                />

                <StatCard
                    title="Departments"
                    value="08"
                    percent="4%"
                    positive={true}
                    variant="purple"
                    color="linear-gradient(135deg, #ddd6fe, #a78bfa)"
                    icon={<Building2 size={22} />}
                />

                <StatCard
                    title="Present Today"
                    value="221"
                    percent="96%"
                    positive={true}
                    variant="green"
                    color="linear-gradient(135deg, #bbf7d0, #4ade80)"
                    icon={<CalendarCheck size={22} />}
                />

                <StatCard
                    title="On Leave"
                    value="12"
                    percent="2%"
                    positive={false}
                    variant="orange"
                    color="linear-gradient(135deg, #fed7aa, #fb923c)"
                    icon={<Plane size={22} />}
                />

            </div>

            {/* Charts */}
            <DashboardCharts />

            

        </div>
    );
}

export default Dashboard;