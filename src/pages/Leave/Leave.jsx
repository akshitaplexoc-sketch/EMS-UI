import { useEffect, useState } from "react";
import { Plus, Check, X } from "lucide-react";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import Card from "../../components/atoms/Card";
import Button from "../../components/atoms/Button";

import {
    getLeaves,
    createLeave,
    updateLeaveStatus
} from "../../services/leaveService";

import { getEmployees } from "../../services/employeeService";


function Leave() {
    const [leaves, setLeaves] = useState([]);
    const [employees, setEmployees] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        employeeId: "",
        fromDate: "",
        toDate: "",
        reason: ""
    });


    // =========================================================
    // LOAD DATA
    // =========================================================

    const loadData = async () => {
        try {
            setLoading(true);

            console.log("Loading leave data...");

            const [leaveResult, employeeResult] =
                await Promise.all([
                    getLeaves(),
                    getEmployees()
                ]);

            console.log("Leave data:", leaveResult);
            console.log("Employee data:", employeeResult);

            setLeaves(
                Array.isArray(leaveResult)
                    ? leaveResult
                    : []
            );

            setEmployees(
                Array.isArray(employeeResult)
                    ? employeeResult
                    : []
            );

        } catch (error) {
            console.error(
                "Failed to load leave data:",
                error
            );

            console.error(
                "Leave API error response:",
                error?.response?.data
            );

            setLeaves([]);
            setEmployees([]);
        } finally {
            setLoading(false);
        }
    };


    // =========================================================
    // INITIAL LOAD
    // =========================================================

    useEffect(() => {
        loadData();
    }, []);


    // =========================================================
    // FORM CHANGE
    // =========================================================

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };


    // =========================================================
    // OPEN MODAL
    // =========================================================

    const handleAddLeave = () => {
        setFormData({
            employeeId: "",
            fromDate: "",
            toDate: "",
            reason: ""
        });

        setModalOpen(true);
    };


    // =========================================================
    // CLOSE MODAL
    // =========================================================

    const handleCloseModal = () => {
        if (saving) {
            return;
        }

        setModalOpen(false);
    };


    // =========================================================
    // CREATE LEAVE
    // =========================================================

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (
            !formData.employeeId ||
            !formData.fromDate ||
            !formData.toDate ||
            !formData.reason.trim()
        ) {
            alert(
                "Employee, From Date, To Date and Reason are required."
            );

            return;
        }


        if (
            new Date(formData.fromDate) >
            new Date(formData.toDate)
        ) {
            alert(
                "From Date cannot be after To Date."
            );

            return;
        }


        try {
            setSaving(true);

            const payload = {
                employeeId: Number(
                    formData.employeeId
                ),

                fromDate: formData.fromDate,

                toDate: formData.toDate,

                reason: formData.reason.trim()
            };

            console.log(
                "Creating leave:",
                payload
            );

            await createLeave(payload);

            setModalOpen(false);

            setFormData({
                employeeId: "",
                fromDate: "",
                toDate: "",
                reason: ""
            });

            await loadData();

        } catch (error) {
            console.error(
                "Failed to create leave:",
                error
            );

            alert(
                error?.response?.data?.message ||
                "Failed to create leave request."
            );
        } finally {
            setSaving(false);
        }
    };


    // =========================================================
    // APPROVE / REJECT
    // =========================================================

    const handleStatusChange = async (
        id,
        status
    ) => {
        const message =
            status === "Approved"
                ? "Are you sure you want to approve this leave request?"
                : "Are you sure you want to reject this leave request?";


        const confirmed =
            window.confirm(message);

        if (!confirmed) {
            return;
        }


        try {
            await updateLeaveStatus(
                id,
                status
            );

            // Immediately update UI
            setLeaves((previous) =>
                previous.map((leave) =>
                    leave.id === id
                        ? {
                              ...leave,
                              status: status
                          }
                        : leave
                )
            );

        } catch (error) {
            console.error(
                "Failed to update leave status:",
                error
            );

            alert(
                error?.response?.data?.message ||
                `Failed to ${status.toLowerCase()} leave request.`
            );
        }
    };


    // =========================================================
    // STATUS STYLE
    // =========================================================

    const getStatusStyle = (status) => {
        const normalizedStatus =
            status?.toLowerCase();


        if (normalizedStatus === "approved") {
            return {
                background: "#DCFCE7",
                color: "#166534"
            };
        }


        if (normalizedStatus === "rejected") {
            return {
                background: "#FEE2E2",
                color: "#991B1B"
            };
        }


        return {
            background: "#FEF3C7",
            color: "#92400E"
        };
    };


    // =========================================================
    // FORMAT DATE
    // =========================================================

    const formatDate = (date) => {
        if (!date) {
            return "-";
        }

        const parsedDate =
            new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "-";
        }

        return parsedDate.toLocaleDateString(
            "en-GB"
        );
    };


    return (
        <DashboardLayout
            title="Leave Management"
            subtitle="Manage employee leave requests"
        >

            <Card
                style={{
                    width: "100%",
                    boxSizing: "border-box"
                }}
            >

                {/* ================================================= */}
                {/* HEADER */}
                {/* ================================================= */}

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "20px",
                        marginBottom: "28px"
                    }}
                >

                    <div>
                        <h2
                            style={{
                                margin: 0,
                                color: "#0F172A",
                                fontSize: "24px",
                                fontWeight: 700
                            }}
                        >
                            Leave Requests
                        </h2>

                        <p
                            style={{
                                margin:
                                    "6px 0 0",
                                color: "#64748B",
                                fontSize: "14px"
                            }}
                        >
                            Manage employee leave
                            requests
                        </p>
                    </div>


                    <Button
                        variant="primary"
                        icon={
                            <Plus size={18} />
                        }
                        onClick={
                            handleAddLeave
                        }
                    >
                        Add Leave
                    </Button>

                </div>


                {/* ================================================= */}
                {/* LOADING */}
                {/* ================================================= */}

                {loading ? (

                    <div
                        style={{
                            padding: "50px",
                            textAlign: "center",
                            color: "#64748B"
                        }}
                    >
                        Loading leave requests...
                    </div>

                ) : (

                    /* ================================================= */
                    /* TABLE */
                    /* ================================================= */

                    <div
                        style={{
                            width: "100%",
                            overflowX: "auto"
                        }}
                    >

                        <table
                            style={{
                                width: "100%",
                                minWidth:
                                    "950px",
                                borderCollapse:
                                    "collapse"
                            }}
                        >

                            <thead>

                                <tr>

                                    <th
                                        style={headerStyle}
                                    >
                                        Employee
                                    </th>

                                    <th
                                        style={headerStyle}
                                    >
                                        From Date
                                    </th>

                                    <th
                                        style={headerStyle}
                                    >
                                        To Date
                                    </th>

                                    <th
                                        style={headerStyle}
                                    >
                                        Reason
                                    </th>

                                    <th
                                        style={{
                                            ...headerStyle,
                                            textAlign:
                                                "center"
                                        }}
                                    >
                                        Status
                                    </th>

                                    <th
                                        style={{
                                            ...headerStyle,
                                            textAlign:
                                                "center"
                                        }}
                                    >
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {leaves.length ===
                                0 ? (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            style={{
                                                padding:
                                                    "50px",
                                                textAlign:
                                                    "center",
                                                color:
                                                    "#64748B"
                                            }}
                                        >
                                            No leave
                                            requests
                                            found.
                                        </td>

                                    </tr>

                                ) : (

                                    leaves.map(
                                        (leave) => {

                                            const
                                                statusStyle =
                                                    getStatusStyle(
                                                        leave.status
                                                    );


                                            return (

                                                <tr
                                                    key={
                                                        leave.id
                                                    }
                                                >

                                                    <td
                                                        style={
                                                            cellStyle
                                                        }
                                                    >
                                                        <div
                                                            style={{
                                                                fontWeight:
                                                                    600,
                                                                color:
                                                                    "#0F172A"
                                                            }}
                                                        >
                                                            {
                                                                leave.employeeName ||
                                                                `Employee #${leave.employeeId}`
                                                            }
                                                        </div>
                                                    </td>


                                                    <td
                                                        style={
                                                            cellStyle
                                                        }
                                                    >
                                                        {
                                                            formatDate(
                                                                leave.fromDate
                                                            )
                                                        }
                                                    </td>


                                                    <td
                                                        style={
                                                            cellStyle
                                                        }
                                                    >
                                                        {
                                                            formatDate(
                                                                leave.toDate
                                                            )
                                                        }
                                                    </td>


                                                    <td
                                                        style={{
                                                            ...cellStyle,
                                                            maxWidth:
                                                                "250px"
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                overflow:
                                                                    "hidden",
                                                                textOverflow:
                                                                    "ellipsis",
                                                                whiteSpace:
                                                                    "nowrap"
                                                            }}
                                                            title={
                                                                leave.reason
                                                            }
                                                        >
                                                            {
                                                                leave.reason
                                                            }
                                                        </div>
                                                    </td>


                                                    <td
                                                        style={{
                                                            ...cellStyle,
                                                            textAlign:
                                                                "center"
                                                        }}
                                                    >

                                                        <span
                                                            style={{
                                                                display:
                                                                    "inline-flex",
                                                                alignItems:
                                                                    "center",
                                                                justifyContent:
                                                                    "center",
                                                                padding:
                                                                    "6px 12px",
                                                                borderRadius:
                                                                    "999px",
                                                                fontSize:
                                                                    "12px",
                                                                fontWeight:
                                                                    600,
                                                                background:
                                                                    statusStyle.background,
                                                                color:
                                                                    statusStyle.color
                                                            }}
                                                        >
                                                            {
                                                                leave.status ||
                                                                "Pending"
                                                            }
                                                        </span>

                                                    </td>


                                                    <td
                                                        style={{
                                                            ...cellStyle,
                                                            textAlign:
                                                                "center"
                                                        }}
                                                    >

                                                        {
                                                            leave.status?.toLowerCase() ===
                                                            "pending" ||
                                                            !leave.status ? (

                                                                <div
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        justifyContent:
                                                                            "center",
                                                                        gap:
                                                                            "8px"
                                                                    }}
                                                                >

                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleStatusChange(
                                                                                leave.id,
                                                                                "Approved"
                                                                            )
                                                                        }
                                                                        style={{
                                                                            display:
                                                                                "inline-flex",
                                                                            alignItems:
                                                                                "center",
                                                                            gap:
                                                                                "5px",
                                                                            border:
                                                                                "none",
                                                                            background:
                                                                                "#DCFCE7",
                                                                            color:
                                                                                "#166534",
                                                                            padding:
                                                                                "7px 10px",
                                                                            borderRadius:
                                                                                "7px",
                                                                            cursor:
                                                                                "pointer",
                                                                            fontSize:
                                                                                "12px",
                                                                            fontWeight:
                                                                                600
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            size={
                                                                                14
                                                                            }
                                                                        />

                                                                        Approve
                                                                    </button>


                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleStatusChange(
                                                                                leave.id,
                                                                                "Rejected"
                                                                            )
                                                                        }
                                                                        style={{
                                                                            display:
                                                                                "inline-flex",
                                                                            alignItems:
                                                                                "center",
                                                                            gap:
                                                                                "5px",
                                                                            border:
                                                                                "none",
                                                                            background:
                                                                                "#FEE2E2",
                                                                            color:
                                                                                "#991B1B",
                                                                            padding:
                                                                                "7px 10px",
                                                                            borderRadius:
                                                                                "7px",
                                                                            cursor:
                                                                                "pointer",
                                                                            fontSize:
                                                                                "12px",
                                                                            fontWeight:
                                                                                600
                                                                        }}
                                                                    >
                                                                        <X
                                                                            size={
                                                                                14
                                                                            }
                                                                        />

                                                                        Reject
                                                                    </button>

                                                                </div>

                                                            ) : (

                                                                <span
                                                                    style={{
                                                                        color:
                                                                            "#94A3B8",
                                                                        fontSize:
                                                                            "12px"
                                                                    }}
                                                                >
                                                                    No
                                                                    actions
                                                                </span>

                                                            )
                                                        }

                                                    </td>

                                                </tr>

                                            );
                                        }
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </Card>


            {/* ===================================================== */}
            {/* ADD LEAVE MODAL */}
            {/* ===================================================== */}

            {modalOpen && (

                <div
                    style={{
                        position:
                            "fixed",
                        inset: 0,
                        background:
                            "rgba(15, 23, 42, 0.45)",
                        display:
                            "flex",
                        alignItems:
                            "center",
                        justifyContent:
                            "center",
                        padding:
                            "20px",
                        zIndex: 9999
                    }}
                    onMouseDown={(event) => {
                        if (
                            event.target ===
                            event.currentTarget
                        ) {
                            handleCloseModal();
                        }
                    }}
                >

                    <div
                        style={{
                            width:
                                "100%",
                            maxWidth:
                                "520px",
                            background:
                                "#FFFFFF",
                            borderRadius:
                                "16px",
                            padding:
                                "28px",
                            boxSizing:
                                "border-box",
                            boxShadow:
                                "0 20px 50px rgba(15, 23, 42, 0.20)"
                        }}
                        onMouseDown={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <h2
                            style={{
                                margin:
                                    "0 0 6px",
                                color:
                                    "#0F172A",
                                fontSize:
                                    "22px"
                            }}
                        >
                            Add Leave Request
                        </h2>

                        <p
                            style={{
                                margin:
                                    "0 0 24px",
                                color:
                                    "#64748B",
                                fontSize:
                                    "14px"
                            }}
                        >
                            Create a new employee
                            leave request.
                        </p>


                        <form
                            onSubmit={
                                handleSubmit
                            }
                        >

                            {/* Employee */}

                            <label
                                style={
                                    labelStyle
                                }
                            >
                                Employee
                            </label>

                            <select
                                name="employeeId"
                                value={
                                    formData.employeeId
                                }
                                onChange={
                                    handleChange
                                }
                                style={
                                    inputStyle
                                }
                                required
                            >

                                <option value="">
                                    Select employee
                                </option>

                                {employees.map(
                                    (employee) => (
                                        <option
                                            key={
                                                employee.id
                                            }
                                            value={
                                                employee.id
                                            }
                                        >
                                            {
                                                employee.name
                                            }
                                        </option>
                                    )
                                )}

                            </select>


                            {/* From Date */}

                            <label
                                style={
                                    labelStyle
                                }
                            >
                                From Date
                            </label>

                            <input
                                type="date"
                                name="fromDate"
                                value={
                                    formData.fromDate
                                }
                                onChange={
                                    handleChange
                                }
                                style={
                                    inputStyle
                                }
                                required
                            />


                            {/* To Date */}

                            <label
                                style={
                                    labelStyle
                                }
                            >
                                To Date
                            </label>

                            <input
                                type="date"
                                name="toDate"
                                value={
                                    formData.toDate
                                }
                                onChange={
                                    handleChange
                                }
                                style={
                                    inputStyle
                                }
                                required
                            />


                            {/* Reason */}

                            <label
                                style={
                                    labelStyle
                                }
                            >
                                Reason
                            </label>

                            <textarea
                                name="reason"
                                value={
                                    formData.reason
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter reason for leave..."
                                rows="4"
                                style={{
                                    ...inputStyle,
                                    resize:
                                        "vertical",
                                    minHeight:
                                        "100px"
                                }}
                                required
                            />


                            {/* Buttons */}

                            <div
                                style={{
                                    display:
                                        "flex",
                                    justifyContent:
                                        "flex-end",
                                    gap:
                                        "10px",
                                    marginTop:
                                        "24px"
                                }}
                            >

                                <button
                                    type="button"
                                    onClick={
                                        handleCloseModal
                                    }
                                    disabled={
                                        saving
                                    }
                                    style={{
                                        padding:
                                            "10px 18px",
                                        borderRadius:
                                            "8px",
                                        border:
                                            "1px solid #CBD5E1",
                                        background:
                                            "#FFFFFF",
                                        color:
                                            "#334155",
                                        cursor:
                                            saving
                                                ? "not-allowed"
                                                : "pointer",
                                        fontWeight:
                                            600
                                    }}
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    disabled={
                                        saving
                                    }
                                    style={{
                                        padding:
                                            "10px 18px",
                                        borderRadius:
                                            "8px",
                                        border:
                                            "none",
                                        background:
                                            "#2563EB",
                                        color:
                                            "#FFFFFF",
                                        cursor:
                                            saving
                                                ? "not-allowed"
                                                : "pointer",
                                        fontWeight:
                                            600,
                                        opacity:
                                            saving
                                                ? 0.7
                                                : 1
                                    }}
                                >
                                    {saving
                                        ? "Saving..."
                                        : "Submit Leave"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </DashboardLayout>
    );
}


/* ============================================================= */
/* STYLES */
/* ============================================================= */

const headerStyle = {
    textAlign: "left",
    padding: "0 14px 14px 0",
    color: "#94A3B8",
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase",
    borderBottom:
        "1px solid #E2E8F0"
};


const cellStyle = {
    padding: "16px 14px 16px 0",
    color: "#475569",
    fontSize: "14px",
    borderBottom:
        "1px solid #F1F5F9"
};


const labelStyle = {
    display: "block",
    marginBottom: "7px",
    color: "#334155",
    fontSize: "13px",
    fontWeight: 600
};


const inputStyle = {
    width: "100%",
    height: "44px",
    boxSizing: "border-box",
    marginBottom: "18px",
    padding: "0 12px",
    border:
        "1px solid #CBD5E1",
    borderRadius: "8px",
    background: "#FFFFFF",
    color: "#0F172A",
    fontSize: "14px",
    outline: "none"
};


export default Leave;