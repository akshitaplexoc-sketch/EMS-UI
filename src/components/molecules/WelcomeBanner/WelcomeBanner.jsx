import { CalendarDays } from "lucide-react";
import "./WelcomeBanner.css";

function WelcomeBanner() {

    const username =
        localStorage.getItem("username") ||
        sessionStorage.getItem("username") ||
        "Akshita";

    const today = new Date();

    const formattedDate = today.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    return (

        <section className="welcome-banner">

            <div className="welcome-left">

                <h1>
                    Good Morning, {username}! 👋
                </h1>

                <p>
                    Here's what's happening in your organization today.
                </p>

            </div>

            <div className="date-card">

                <CalendarDays size={18} />

                <span>{formattedDate}</span>

            </div>

        </section>

    );

}

export default WelcomeBanner;