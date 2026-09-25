import { useEffect, useState } from "react";
import { X } from "lucide-react";
import "./AddEmployeeModal.css";

function AddEmployeeModal({
    isOpen,
    onClose,
    onSubmit,
    employee = null
}) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        department: "",
        salary: ""
    });

    const [error, setError] = useState("");

    useEffect(() => {
        if (employee) {
            setFormData({
                name: employee.name || "",
                email: employee.email || "",
                department: employee.department || "",
                salary: employee.salary ?? ""
            });
        } else {
            setFormData({
                name: "",
                email: "",
                department: "",
                salary: ""
            });
        }

        setError("");
    }, [employee, isOpen]);

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

        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.department.trim() ||
            formData.salary === ""
        ) {
            setError("Please fill in all fields.");
            return;
        }

        onSubmit({
            name: formData.name.trim(),
            email: formData.email.trim(),
            department: formData.department.trim(),
            salary: Number(formData.salary)
        });
    };

    return (
        <div className="employee-modal-overlay">
            <div className="employee-modal">

                <div className="employee-modal-header">
                    <div>
                        <h2>
                            {employee
                                ? "Edit Employee"
                                : "Add Employee"}
                        </h2>

                        <p>
                            {employee
                                ? "Update employee information."
                                : "Add a new employee to your organization."}
                        </p>
                    </div>

                    <button
                        className="employee-modal-close"
                        onClick={onClose}
                        type="button"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form
                    className="employee-form"
                    onSubmit={handleSubmit}
                >
                    <div className="employee-form-field">
                        <label htmlFor="name">Name</label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter employee name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="employee-form-field">
                        <label htmlFor="email">Email</label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter employee email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="employee-form-field">
                        <label htmlFor="department">Department</label>

                        <input
                            id="department"
                            name="department"
                            type="text"
                            placeholder="Enter department"
                            value={formData.department}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="employee-form-field">
                        <label htmlFor="salary">Salary</label>

                        <input
                            id="salary"
                            name="salary"
                            type="number"
                            min="0"
                            placeholder="Enter salary"
                            value={formData.salary}
                            onChange={handleChange}
                        />
                    </div>

                    {error && (
                        <p className="employee-form-error">
                            {error}
                        </p>
                    )}

                    <div className="employee-modal-actions">
                        <button
                            type="button"
                            className="employee-cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="employee-submit-btn"
                        >
                            {employee
                                ? "Update Employee"
                                : "Add Employee"}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default AddEmployeeModal;