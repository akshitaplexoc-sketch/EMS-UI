import { useEffect, useState } from "react";
import { X } from "lucide-react";

import Button from "../atoms/Button";
import Input from "../atoms/Input";
import IconButton from "../atoms/IconButton";

const DEPARTMENTS = [
    "Human Resources",
    "Data & Analytics",
    "Software Development",
    "Artificial Intelligence & Machine Learning",
    "Information Technology",
    "Engineering",
    "Finance & Accounting",
    "Sales",
    "Marketing",
    "Operations",
    "Product Management",
    "Quality Assurance",
    "UI/UX Design",
    "Administration",
    "Executive Management"
];

function AddEmployeeModal({
    isOpen,
    onClose,
    onSubmit,
    employee = null
}) {
    const isEditMode = Boolean(employee);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        department: "",
        salary: ""
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        if (employee) {
            setFormData({
                name: employee.name || "",
                email: employee.email || "",
                department: employee.department || "",
                salary: employee.salary || ""
            });
        } else {
            setFormData({
                name: "",
                email: "",
                department: "",
                salary: ""
            });
        }

        setErrors({});
        setLoading(false);
    }, [employee, isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: ""
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }

        if (!formData.department) {
            newErrors.department = "Department is required";
        }

        if (!formData.salary) {
            newErrors.salary = "Salary is required";
        } else if (Number(formData.salary) <= 0) {
            newErrors.salary = "Salary must be greater than 0";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        setLoading(true);

        try {
            await onSubmit({
                ...(employee?.id
                    ? { id: employee.id }
                    : {}),
                name: formData.name.trim(),
                email: formData.email.trim(),
                department: formData.department,
                salary: Number(formData.salary)
            });

            onClose();
        } catch (error) {
            console.error("Employee submit error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 999999,
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
                    maxWidth: "500px",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "16px",
                    boxShadow:
                        "0 20px 50px rgba(15, 23, 42, 0.25)",
                    padding: "24px",
                    boxSizing: "border-box"
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "24px"
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
                            {isEditMode
                                ? "Edit Employee"
                                : "Add Employee"}
                        </h2>

                        <p
                            style={{
                                margin: "5px 0 0",
                                fontSize: "13px",
                                color: "#64748B"
                            }}
                        >
                            {isEditMode
                                ? "Update employee information"
                                : "Add a new employee to your organization"}
                        </p>
                    </div>

                    {/* Close button */}
                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            width: "36px",
                            height: "36px",
                            border: "1px solid #CBD5E1",
                            borderRadius: "8px",
                            backgroundColor: "#FFFFFF",
                            color: "#475569",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer"
                        }}
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div style={{ marginBottom: "17px" }}>
                        <Input
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter employee name"
                            error={errors.name}
                        />
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: "17px" }}>
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter employee email"
                            error={errors.email}
                        />
                    </div>

                    {/* Department */}
                    <div style={{ marginBottom: "17px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "7px",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#1F2937"
                            }}
                        >
                            Department
                        </label>

                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            style={{
                                width: "100%",
                                height: "46px",
                                padding: "0 13px",
                                border: errors.department
                                    ? "1px solid #DC2626"
                                    : "1px solid #CBD5E1",
                                borderRadius: "9px",
                                backgroundColor: "#FFFFFF",
                                color: formData.department
                                    ? "#1F2937"
                                    : "#64748B",
                                fontFamily: "inherit",
                                fontSize: "14px",
                                outline: "none",
                                cursor: "pointer",
                                boxSizing: "border-box"
                            }}
                        >
                            <option value="">
                                Select department
                            </option>

                            {DEPARTMENTS.map((department) => (
                                <option
                                    key={department}
                                    value={department}
                                >
                                    {department}
                                </option>
                            ))}
                        </select>

                        {errors.department && (
                            <div
                                style={{
                                    marginTop: "5px",
                                    fontSize: "12px",
                                    color: "#DC2626"
                                }}
                            >
                                {errors.department}
                            </div>
                        )}
                    </div>

                    {/* Salary */}
                    <div style={{ marginBottom: "24px" }}>
                        <Input
                            label="Salary"
                            name="salary"
                            type="number"
                            value={formData.salary}
                            onChange={handleChange}
                            placeholder="Enter salary"
                            error={errors.salary}
                        />
                    </div>

                    {/* Buttons */}
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
                            disabled={loading}
                            style={{
                                height: "42px",
                                padding: "0 18px",
                                border: "1px solid #CBD5E1",
                                borderRadius: "8px",
                                backgroundColor: "#FFFFFF",
                                color: "#334155",
                                cursor: loading
                                    ? "not-allowed"
                                    : "pointer",
                                fontSize: "14px",
                                fontWeight: 600
                            }}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                height: "42px",
                                padding: "0 18px",
                                border: "none",
                                borderRadius: "8px",
                                backgroundColor: "#2563EB",
                                color: "#FFFFFF",
                                cursor: loading
                                    ? "not-allowed"
                                    : "pointer",
                                fontSize: "14px",
                                fontWeight: 600,
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading
                                ? "Saving..."
                                : isEditMode
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