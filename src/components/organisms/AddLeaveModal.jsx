import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Input from "../atoms/Input";

function AddLeaveModal({
    isOpen,
    onClose,
    onSubmit,
    employees = []
}) {
    const [employeeId, setEmployeeId] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [reason, setReason] = useState("");

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        setEmployeeId("");
        setFromDate("");
        setToDate("");
        setReason("");
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!employeeId) {
            alert("Please select an employee.");
            return;
        }

        if (!fromDate) {
            alert("Please select from date.");
            return;
        }

        if (!toDate) {
            alert("Please select to date.");
            return;
        }

        if (toDate < fromDate) {
            alert("To date cannot be before from date.");
            return;
        }

        if (!reason.trim()) {
            alert("Please enter a reason.");
            return;
        }

        onSubmit({
            employeeId: Number(employeeId),
            fromDate,
            toDate,
            reason: reason.trim()
        });
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 2147483647,
                backgroundColor: "rgba(15, 23, 42, 0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                boxSizing: "border-box"
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "560px",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "16px",
                    boxShadow:
                        "0 20px 50px rgba(15, 23, 42, 0.2)"
                }}
            >
                {/* Header */}
                <div
                    style={{
                        padding: "20px 24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #E5E7EB"
                    }}
                >
                    <div>
                        <h2
                            style={{
                                margin: 0,
                                fontSize: "20px",
                                fontWeight: 700,
                                color: "#1F2937"
                            }}
                        >
                            Add Leave Request
                        </h2>

                        <p
                            style={{
                                margin: "5px 0 0",
                                fontSize: "13px",
                                color: "#6B7280"
                            }}
                        >
                            Submit a leave request for an employee.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            width: "36px",
                            height: "36px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "none",
                            borderRadius: "8px",
                            backgroundColor: "#F3F4F6",
                            color: "#6B7280",
                            cursor: "pointer"
                        }}
                    >
                        <X size={19} />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    style={{
                        padding: "24px"
                    }}
                >
                    {/* Employee */}
                    <div style={{ marginBottom: "18px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "7px",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#374151"
                            }}
                        >
                            Employee
                        </label>

                        <select
                            value={employeeId}
                            onChange={(event) =>
                                setEmployeeId(event.target.value)
                            }
                            style={selectStyle}
                        >
                            <option value="">
                                Select employee
                            </option>

                            {employees.map((employee) => (
                                <option
                                    key={employee.id}
                                    value={employee.id}
                                >
                                    {employee.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Dates */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "16px",
                            marginBottom: "18px"
                        }}
                    >
                        <div>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "7px",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    color: "#374151"
                                }}
                            >
                                From Date
                            </label>

                            <input
                                type="date"
                                value={fromDate}
                                onChange={(event) =>
                                    setFromDate(event.target.value)
                                }
                                style={dateInputStyle}
                            />
                        </div>

                        <div>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "7px",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    color: "#374151"
                                }}
                            >
                                To Date
                            </label>

                            <input
                                type="date"
                                value={toDate}
                                min={fromDate || undefined}
                                onChange={(event) =>
                                    setToDate(event.target.value)
                                }
                                style={dateInputStyle}
                            />
                        </div>
                    </div>

                    {/* Reason */}
                    <div style={{ marginBottom: "24px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "7px",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#374151"
                            }}
                        >
                            Reason
                        </label>

                        <textarea
                            value={reason}
                            onChange={(event) =>
                                setReason(event.target.value)
                            }
                            placeholder="Enter reason for leave"
                            rows={4}
                            style={{
                                width: "100%",
                                padding: "12px",
                                border: "1px solid #D1D5DB",
                                borderRadius: "9px",
                                backgroundColor: "#FFFFFF",
                                color: "#1F2937",
                                fontSize: "14px",
                                outline: "none",
                                resize: "vertical",
                                boxSizing: "border-box",
                                fontFamily: "inherit"
                            }}
                        />
                    </div>

                    {/* Footer */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "10px"
                        }}
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            style={cancelButtonStyle}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            style={submitButtonStyle}
                        >
                            Submit Leave
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const selectStyle = {
    width: "100%",
    height: "46px",
    padding: "0 12px",
    border: "1px solid #D1D5DB",
    borderRadius: "9px",
    backgroundColor: "#FFFFFF",
    color: "#1F2937",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    cursor: "pointer"
};

const dateInputStyle = {
    width: "100%",
    height: "46px",
    padding: "0 12px",
    border: "1px solid #D1D5DB",
    borderRadius: "9px",
    backgroundColor: "#FFFFFF",
    color: "#1F2937",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    cursor: "pointer"
};

const cancelButtonStyle = {
    height: "42px",
    padding: "0 18px",
    border: "1px solid #D1D5DB",
    borderRadius: "9px",
    backgroundColor: "#FFFFFF",
    color: "#374151",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600
};

const submitButtonStyle = {
    height: "42px",
    padding: "0 18px",
    border: "none",
    borderRadius: "9px",
    backgroundColor: "var(--theme-primary)",
    color: "#FFFFFF",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600
};

export default AddLeaveModal;