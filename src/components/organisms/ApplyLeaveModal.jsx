import { useEffect, useState } from "react";
import Button from "../atoms/Button";

function ApplyLeaveModal({
    isOpen,
    onClose,
    onSubmit,
    leave
}) {
    const [formData, setFormData] = useState({
        employeeId: "",
        fromDate: "",
        toDate: "",
        reason: ""
        // status:"Pending",
    });

useEffect(() => {

    if (leave) {

        setFormData({
            employeeId: leave.employeeId || "",
            fromDate: leave.fromDate
                ? leave.fromDate.substring(0, 10)
                : "",
            toDate: leave.toDate
                ? leave.toDate.substring(0, 10)
                : "",
            reason: leave.reason || "",
            status: leave.status || "Pending"
        });

    } else {

        setFormData({
            employeeId: "",
            fromDate: "",
            toDate: "",
            reason: "",
            status: "Pending"
        });

    }

}, [leave]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(formData);
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.45)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999
            }}
        >
            <div
                style={{
                    width: "500px",
                    background: "#ffffff",
                    borderRadius: "18px",
                    padding: "30px",
                    boxShadow: "0 20px 50px rgba(0,0,0,.25)"
                }}
            >
                <h2
                    style={{
                        margin: 0,
                        marginBottom: "25px",
                        color: "#111827",
                        textAlign: "center",
                        fontSize: "28px",
                        fontWeight: "700"
                    }}
                >
                    {leave ? "Update Leave" : "Apply Leave"}
                </h2>

                <form onSubmit={handleSubmit}>

                    <div style={{ marginBottom: 18 }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: 8,
                                color: "#374151",
                                fontWeight: 600
                            }}
                        >
                            Employee ID
                        </label>

                        <input
                            type="number"
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleChange}
                            disabled={!!leave}
                            required
                            style={{
                                width: "100%",
                                height: 48,
                                border: "1px solid #D1D5DB",
                                borderRadius: 10,
                                padding: "0 14px",
                                background: leave ? "#F3F4F6" : "#fff",
                                color: "#111827",
                                boxSizing: "border-box"
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: 18 }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: 8,
                                color: "#374151",
                                fontWeight: 600
                            }}
                        >
                            From Date
                        </label>

                        <input
                            type="date"
                            name="fromDate"
                            value={formData.fromDate}
                            onChange={handleChange}
                            disabled={!!leave}
                            required
                            style={{
                                width: "100%",
                                height: 48,
                                border: "1px solid #D1D5DB",
                                borderRadius: 10,
                                padding: "0 14px",
                                background: leave ? "#F3F4F6" : "#fff",
                                color: "#111827",
                                boxSizing: "border-box"
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: 18 }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: 8,
                                color: "#374151",
                                fontWeight: 600
                            }}
                        >
                            To Date
                        </label>

                        <input
                            type="date"
                            name="toDate"
                            value={formData.toDate}
                            onChange={handleChange}
                            disabled={!!leave}
                            required
                            style={{
                                width: "100%",
                                height: 48,
                                border: "1px solid #D1D5DB",
                                borderRadius: 10,
                                padding: "0 14px",
                                background: leave ? "#F3F4F6" : "#fff",
                                color: "#111827",
                                boxSizing: "border-box"
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: 24 }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: 8,
                                color: "#374151",
                                fontWeight: 600
                            }}
                        >
                            Reason
                        </label>

                        <textarea
                            rows="4"
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            disabled={!!leave}
                            required
                            style={{
                                width: "100%",
                                border: "1px solid #D1D5DB",
                                borderRadius: 10,
                                padding: "12px 14px",
                                resize: "none",
                                background: leave ? "#F3F4F6" : "#fff",
                                color: "#111827",
                                boxSizing: "border-box"
                            }}
                        />
                        {leave && (

                            <div style={{ marginBottom: 24 }}>

                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: 8,
                                        color: "#374151",
                                        fontWeight: 600
                                    }}
                                >
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    style={{
                                        width: "100%",
                                        height: 48,
                                        border: "1px solid #D1D5DB",
                                        borderRadius: 10,
                                        padding: "0 14px",
                                        background: "#fff",
                                        color: "#111827"
                                    }}
                                >
                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="Approved">
                                        Approved
                                    </option>

                                    <option value="Rejected">
                                        Rejected
                                    </option>

                                </select>

                            </div>

                            )}
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 12
                        }}
                    >
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="primary"
                        >
                            {leave ? "Update Status" : "Apply Leave"}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default ApplyLeaveModal;