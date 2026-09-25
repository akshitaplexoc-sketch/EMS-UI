import { useEffect, useState } from "react";

import {
    Plus,
    Search
} from "lucide-react";

import MarkAttendanceModal from "../../components/organisms/MarkAttendanceModal";

import {
    getAttendance,
    markAttendance
} from "../../services/attendanceService";

import { getEmployees } from "../../services/employeeService";

import "./Attendance.css";

function Attendance() {
    const [attendance, setAttendance] = useState([]);
    const [employees, setEmployees] = useState([]);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadAttendance = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getAttendance();

            console.log(
                "Attendance API response:",
                response
            );

            setAttendance(response?.data || []);
        } catch (err) {
            console.error(
                "Failed to load attendance:",
                err
            );

            setError(
                err?.response?.data?.message ||
                "Failed to load attendance."
            );
        } finally {
            setLoading(false);
        }
    };

    const loadEmployees = async () => {
        try {
            const response = await getEmployees();

            setEmployees(response?.data || []);
        } catch (err) {
            console.error(
                "Failed to load employees:",
                err
            );
        }
    };

    useEffect(() => {
        loadAttendance();
        loadEmployees();
    }, []);

    const handleMarkAttendance = async (attendanceData) => {
        try {
            setError("");

            await markAttendance(attendanceData);

            setIsModalOpen(false);

            await loadAttendance();
        } catch (err) {
            console.error(
                "Failed to mark attendance:",
                err
            );

            setError(
                err?.response?.data?.message ||
                "Failed to mark attendance."
            );
        }
    };

    const filteredAttendance = attendance.filter(
        (record) => {
            const searchValue =
                search.toLowerCase();

            const employee = employees.find(
    (emp) => emp.id === record.employeeId
    );

    const employeeName =
        record.employeeName ||
        employee?.name ||
        "";

    const matchesSearch =
        employeeName.toLowerCase().includes(searchValue) ||
        record.employeeId?.toString().includes(searchValue) ||
        record.date?.toLowerCase().includes(searchValue);
                const matchesStatus =
                    statusFilter === "All" ||
                    record.status === statusFilter;

                return (
                    matchesSearch &&
                    matchesStatus
                );
            }
        );

    const formatDate = (date) => {
        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    };

    return (
        <div className="attendance-page">

            <div className="attendance-header">
                <div>
                    <h1>Attendance</h1>

                    <p>
                        Manage employee attendance records.
                    </p>
                </div>

                <button
                    className="add-attendance-btn"
                    type="button"
                    onClick={() =>
                        setIsModalOpen(true)
                    }
                >
                    <Plus size={18} />

                    Mark Attendance
                </button>
            </div>

            {error && (
                <div className="attendance-error">
                    {error}
                </div>
            )}

            <div className="attendance-card">

                <div className="attendance-toolbar">

                    <div className="attendance-search">

                        <Search size={17} />

                        <input
                            type="text"
                            placeholder="Search employee or date..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>

                    <select
                        className="attendance-status-filter"
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(
                                e.target.value
                            )
                        }
                    >
                        <option value="All">
                            All Status
                        </option>

                        <option value="Present">
                            Present
                        </option>

                        <option value="Absent">
                            Absent
                        </option>

                        <option value="On Leave">
                            On Leave
                        </option>
                    </select>

                </div>

                <div className="attendance-table-wrapper">

                    <table className="attendance-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Employee ID</th>
                                <th>Employee</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            {loading ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="attendance-empty"
                                    >
                                        Loading attendance...
                                    </td>
                                </tr>
                            ) : filteredAttendance.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="attendance-empty"
                                    >
                                        No attendance records found.
                                    </td>
                                </tr>
                            ) : (
                                filteredAttendance.map(
                                    (record) => (
                                        <tr
                                            key={record.id}
                                        >
                                            <td>
                                                {record.id}
                                            </td>

                                            <td>
                                                {record.employeeId}
                                            </td>

                                            <td>
                                        <div className="attendance-employee">
                                            {(() => {
                                                const employee = employees.find(
                                                    (emp) => emp.id === record.employeeId
                                                );

                                                const employeeName =
                                                    record.employeeName ||
                                                    employee?.name ||
                                                    "Unknown";

                                                return (
                                                    <>
                                                        <div className="attendance-avatar">
                                                            {employeeName.charAt(0).toUpperCase()}
                                                        </div>

                                                        <span>{employeeName}</span>
                                                    </>
                                                );
                                            })()}
                                        </div>
                                            </td>

                                            <td>
                                                {formatDate(
                                                    record.date
                                                )}
                                            </td>

                                            <td>
                                                <span
                                                    className={`attendance-status ${record.status
                                                        ?.toLowerCase()
                                                        .replace(
                                                            " ",
                                                            "-"
                                                        )}`}
                                                >
                                                    {record.status}
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                )
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            <MarkAttendanceModal
                isOpen={isModalOpen}
                onClose={() =>
                    setIsModalOpen(false)
                }
                onSubmit={
                    handleMarkAttendance
                }
                employees={employees}
            />

        </div>
    );
}

export default Attendance;