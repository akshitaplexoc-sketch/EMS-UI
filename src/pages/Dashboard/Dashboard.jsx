import { useEffect, useState } from "react";

import {
    Users,
    UserCheck,
    UserX,
    ChartColumnIncreasing
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import WelcomeBanner from "../../components/molecules/WelcomeBanner";
import StatCard from "../../components/molecules/StatCard";
import DashboardCharts from "../../components/organisms/DashboardCharts";

import { getEmployees } from "../../services/employeeService";
import { getAttendance } from "../../services/attendanceService";


function Dashboard() {

    const [employees, setEmployees] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    useEffect(() => {

        loadDashboard();

    }, []);


    const loadDashboard = async () => {

    try {

        setLoading(true);

        const employeeResponse = await getEmployees(1,10);
        const attendanceResponse = await getAttendance();

        console.log("Employee Response:", employeeResponse);
        console.log("Attendance Response:", attendanceResponse);

        /*
            employeeResponse now contains:
            {
                items: [],
                pageNumber: 1,
                pageSize: 5,
                totalRecords: 8,
                totalPages: 2
            }
        */

        setEmployees(employeeResponse?.items || []);

        setAttendance(
            Array.isArray(attendanceResponse)
                ? attendanceResponse
                : attendanceResponse?.data || []
        );

    }
    catch (error) {

        console.error("Failed to load dashboard:", error);

        setEmployees([]);
        setAttendance([]);

    }
    finally {

        setLoading(false);

    }

};


    /*
        TOTAL EMPLOYEES
    */

    const totalEmployees = employees.length;


    /*
        FIND LATEST ATTENDANCE DATE

        Your API contains attendance for multiple dates.

        We use the latest date available from
        the actual database data.
    */

    let latestAttendanceDate = "";

    if (attendance.length > 0) {

        latestAttendanceDate = attendance
            .filter(item => item.date)
            .map(item =>
                item.date.split("T")[0]
            )
            .sort()
            .pop() || "";

    }


    /*
        ATTENDANCE FOR LATEST DATE
    */

    const todayAttendance = attendance.filter(
        item =>
            item.date?.split("T")[0] ===
            latestAttendanceDate
    );


    /*
        PRESENT
    */

    const presentToday = todayAttendance.filter(
        item =>
            item.status === "Present"
    ).length;


    /*
        ABSENT
    */

    const absentToday = todayAttendance.filter(
        item =>
            item.status === "Absent"
    ).length;


    /*
        ATTENDANCE RATE

        Based on total employees.
    */

    const attendanceRate =
        totalEmployees > 0
            ? Math.round(
                (presentToday / totalEmployees) * 100
            )
            : 0;


    return (

        <DashboardLayout
            title="Dashboard"
            subtitle="Overview of your organization"
        >

            <WelcomeBanner />


            {loading ? (

                <div
                    style={{
                        padding: "40px",
                        textAlign: "center",
                        color: "#64748B",
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E2E8F0",
                        borderRadius: "18px"
                    }}
                >
                    Loading dashboard...
                </div>

            ) : (

                <>

                    {/* STAT CARDS */}

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(4, minmax(0, 1fr))",
                            gap: "20px",
                            marginBottom: "24px"
                        }}
                    >

                        {/* TOTAL EMPLOYEES */}

                        <StatCard
                            title="Total Employees"
                            value={totalEmployees}
                            subtitle="Current employees"
                            icon={
                                <Users size={24} />
                            }
                            onClick={() =>
                                navigate("/employees")
                            }
                        />


                        {/* PRESENT */}

                        <StatCard
                            title="Present Today"
                            value={presentToday}
                            subtitle="Employees present"
                            icon={
                                <UserCheck size={24} />
                            }
                            onClick={() =>
                                navigate("/attendance")
                            }
                        />


                        {/* ABSENT */}

                        <StatCard
                            title="Absent Today"
                            value={absentToday}
                            subtitle="Employees absent"
                            icon={
                                <UserX size={24} />
                            }
                            onClick={() =>
                                navigate("/attendance")
                            }
                        />


                        {/* ATTENDANCE RATE */}

                        <StatCard
                            title="Attendance Rate"
                            value={`${attendanceRate}%`}
                            subtitle="Latest attendance"
                            icon={
                                <ChartColumnIncreasing
                                    size={24}
                                />
                            }
                            onClick={() =>
                                navigate("/attendance")
                            }
                        />

                    </div>


                    {/* CHARTS */}

                    <DashboardCharts
                        employees={employees}
                        attendance={todayAttendance}
                    />

                </>

            )}

        </DashboardLayout>

    );

}


export default Dashboard;