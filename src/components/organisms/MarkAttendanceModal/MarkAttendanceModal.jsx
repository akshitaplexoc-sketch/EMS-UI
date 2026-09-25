import { useEffect, useState } from "react";
import { X } from "lucide-react";

import "./MarkAttendanceModal.css";

function MarkAttendanceModal({
    isOpen,
    onClose,
    onSubmit,
    employees = []
}) {
    const [formData, setFormData] = useState({
        employeeId: "",
        date: new Date().toISOString().split("T")[0],
        status: "Present"
    });

    const [error, setError] = useState("");

    useEffect(() => {
        if (isOpen) {
            setFormData({
                employeeId: "",
                date: new Date().toISOString().split("T")[0],
                status: "Present"
            });

            setError("");
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.employeeId) {
            setError("Please select an employee.");
            return;
        }

        if (!formData.date) {
            setError("Please select a date.");
            return;
        }

        if (!formData.status) {
            setError("Please select a status.");
            return;
        }

        onSubmit({
            employeeId: Number(formData.employeeId),
            date: formData.date,
            status: formData.status
        });
    };

    return (
        <div className="attendance-modal-overlay">
            <div className="attendance-modal">

                <div className="attendance-modal-header">
                    <div>
                        <h2>Mark Attendance</h2>
                        <p>
                            Mark attendance for an employee.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="attendance-modal-close"
                        onClick={onClose}
                    >
                        <X size={20} />
                    </button>
                </div>

                <form
                    className="attendance-form"
                    onSubmit={handleSubmit}
                >
                    <div className="attendance-form-field">
                        <label htmlFor="employeeId">
                            Employee
                        </label>

                        <select
                            id="employeeId"
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleChange}
                        >
                            <option value="">
                                Select employee
                            </option>

                            {employees.map((employee) => (
                                <option
                                    key={employee.id}
                                    value={employee.id}
                                >
                                    {employee.name} - ID {employee.id}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="attendance-form-field">
                        <label htmlFor="date">
                            Date
                        </label>

                        <input
                            id="date"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="attendance-form-field">
                        <label htmlFor="status">
                            Status
                        </label>

                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
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

                    {error && (
                        <p className="attendance-form-error">
                            {error}
                        </p>
                    )}

                    <div className="attendance-modal-actions">
                        <button
                            type="button"
                            className="attendance-cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="attendance-submit-btn"
                        >
                            Mark Attendance
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default MarkAttendanceModal;