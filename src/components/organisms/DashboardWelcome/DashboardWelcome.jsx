import "./DashboardWelcome.css";

function DashboardWelcome() {

    const today = new Date();

    return (

        <div className="dashboard-welcome">

            <div>

                <h1>

                    Good Morning 👋

                </h1>

                <p>

                    Welcome back to Employee Management System.

                </p>

            </div>

            <div className="today">

                {today.toDateString()}

            </div>

        </div>

    );

}

export default DashboardWelcome;