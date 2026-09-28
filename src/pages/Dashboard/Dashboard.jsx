import { useEffect, useState } from "react";
import {
    Users,
    UserCheck,
    UserX,
    ChartColumnIncreasing
} from "lucide-react";

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

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            setLoading(true);

            const employeeData = await getEmployees();
            const attendanceData = await getAttendance();

            setEmployees(
                Array.isArray(employeeData)
                    ? employeeData
                    : []
            );

            setAttendance(
                Array.isArray(attendanceData)
                    ? attendanceData
                    : []
            );
        } catch (error) {
            console.error(
                "Failed to load dashboard:",
                error
            );

            setEmployees([]);
            setAttendance([]);
        } finally {
            setLoading(false);
        }
    };

    const totalEmployees = employees.length;

    const presentToday = attendance.filter(
        (item) => item?.status === "Present"
    ).length;

    const absentToday = attendance.filter(
        (item) => item?.status === "Absent"
    ).length;

    const attendanceRate =
        totalEmployees === 0
            ? 0
            : Math.round(
                  (presentToday / totalEmployees) * 100
              );

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
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(4, minmax(0, 1fr))",
                            gap: "20px"
                        }}
                    >
                        <StatCard
                            title="Total Employees"
                            value={totalEmployees}
                            subtitle="Current employees"
                            icon={<Users size={24} />}
                        />

                        <StatCard
                            title="Present Today"
                            value={presentToday}
                            subtitle="Employees present"
                            icon={<UserCheck size={24} />}
                        />

                        <StatCard
                            title="Absent Today"
                            value={absentToday}
                            subtitle="Employees absent"
                            icon={<UserX size={24} />}
                        />

                        <StatCard
                            title="Attendance Rate"
                            value={`${attendanceRate}%`}
                            subtitle="Today's rate"
                            icon={<ChartColumnIncreasing size={24} />}
                        />
                    </div>

                    <DashboardCharts
                        employees={employees}
                        attendance={attendance}
                    />
                </>
            )}
        </DashboardLayout>
    );
}

export default Dashboard;