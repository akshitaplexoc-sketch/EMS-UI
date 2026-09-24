import {

    Users,

    CalendarCheck,

    Briefcase,

    UserCheck

} from "lucide-react";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import DashboardWelcome from "../../components/organisms/DashboardWelcome";

import StatCard from "../../components/molecules/StatCard";

import "./Dashboard.css";

function Dashboard(){

    return(

        <DashboardLayout>

            <DashboardWelcome/>

            <div className="stats-grid">

                <StatCard

                    title="Employees"

                    value="48"

                    icon={Users}

                    color="blue"

                />

                <StatCard

                    title="Attendance"

                    value="42"

                    icon={CalendarCheck}

                    color="green"

                />

                <StatCard

                    title="Departments"

                    value="6"

                    icon={Briefcase}

                    color="orange"

                />

                <StatCard

                    title="On Leave"

                    value="3"

                    icon={UserCheck}

                    color="purple"

                />

            </div>

        </DashboardLayout>

    )

}

export default Dashboard;