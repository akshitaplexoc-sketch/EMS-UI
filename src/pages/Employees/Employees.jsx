import { useEffect, useState } from "react";

import {
    Plus,
    Search,
    Pencil,
    Trash2
} from "lucide-react";

import AddEmployeeModal from "../../components/organisms/AddEmployeeModal";

import {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from "../../services/employeeService";

import "./Employees.css";

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadEmployees = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getEmployees();

            console.log("Employees API response:", response);

            setEmployees(response?.data || []);
        } catch (err) {
            console.error("Failed to load employees:", err);

            setError(
                err?.response?.data?.message ||
                "Failed to load employees."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    const handleAddEmployee = async (employeeData) => {
        try {
            setError("");

            await createEmployee(employeeData);

            setIsModalOpen(false);
            setSelectedEmployee(null);

            await loadEmployees();
        } catch (err) {
            console.error("Failed to create employee:", err);

            setError(
                err?.response?.data?.message ||
                "Failed to add employee."
            );
        }
    };

    const handleEditEmployee = (employee) => {
        console.log("Selected employee:", employee);
        console.log("Selected employee ID:", employee.id);

        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    const handleUpdateEmployee = async (employeeData) => {
        try {
            setError("");

            console.log(
                "Updating employee:",
                selectedEmployee
            );

            console.log(
                "Employee ID:",
                selectedEmployee?.id
            );

            if (!selectedEmployee?.id) {
                setError("Employee ID is missing.");
                return;
            }

            await updateEmployee(
                selectedEmployee.id,
                employeeData
            );

            setIsModalOpen(false);
            setSelectedEmployee(null);

            await loadEmployees();
        } catch (err) {
            console.error(
                "Failed to update employee:",
                err
            );

            setError(
                err?.response?.data?.message ||
                "Failed to update employee."
            );
        }
    };

    const handleDeleteEmployee = async (employee) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${employee.name}?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            await deleteEmployee(employee.id);

            await loadEmployees();
        } catch (err) {
            console.error(
                "Failed to delete employee:",
                err
            );

            setError(
                err?.response?.data?.message ||
                "Failed to delete employee."
            );
        }
    };

    const handleModalSubmit = (employeeData) => {
        if (selectedEmployee) {
            handleUpdateEmployee(employeeData);
        } else {
            handleAddEmployee(employeeData);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEmployee(null);
    };

    const filteredEmployees = employees.filter(
        (employee) => {
            const searchValue =
                search.toLowerCase();

            return (
                employee.id
                    ?.toString()
                    .includes(searchValue) ||
                employee.name
                    ?.toLowerCase()
                    .includes(searchValue) ||
                employee.email
                    ?.toLowerCase()
                    .includes(searchValue) ||
                employee.department
                    ?.toLowerCase()
                    .includes(searchValue)
            );
        }
    );

    return (
        <div className="employees-page">

            <div className="employees-header">
                <div>
                    <h1>Employees</h1>

                    <p>
                        Manage your organization's employees.
                    </p>
                </div>

                <button
                    className="add-employee-btn"
                    onClick={() => {
                        setSelectedEmployee(null);
                        setIsModalOpen(true);
                    }}
                >
                    <Plus size={18} />

                    Add Employee
                </button>
            </div>

            {error && (
                <div className="employees-error">
                    {error}
                </div>
            )}

            <div className="employees-card">

                <div className="employees-toolbar">

                    <div className="employee-search">

                        <Search size={17} />

                        <input
                            type="text"
                            placeholder="Search employees..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>

                </div>

                <div className="employees-table-wrapper">

                    <table className="employees-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Salary</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {loading ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="employees-message"
                                    >
                                        Loading employees...
                                    </td>
                                </tr>
                            ) : filteredEmployees.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="employees-message"
                                    >
                                        No employees found.
                                    </td>
                                </tr>
                            ) : (
                                filteredEmployees.map(
                                    (employee) => (
                                        <tr
                                            key={employee.id}
                                        >
                                            <td>
                                                {employee.id}
                                            </td>

                                            <td>
                                                {employee.name}
                                            </td>

                                            <td>
                                                {employee.email}
                                            </td>

                                            <td>
                                                {employee.department}
                                            </td>

                                            <td>
                                                ₹
                                                {Number(
                                                    employee.salary
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </td>

                                            <td>
                                                <div className="employee-actions">

                                                    <button
                                                        type="button"
                                                        className="employee-action edit"
                                                        onClick={() =>
                                                            handleEditEmployee(
                                                                employee
                                                            )
                                                        }
                                                        title="Edit employee"
                                                    >
                                                        <Pencil
                                                            size={16}
                                                        />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="employee-action delete"
                                                        onClick={() =>
                                                            handleDeleteEmployee(
                                                                employee
                                                            )
                                                        }
                                                        title="Delete employee"
                                                    >
                                                        <Trash2
                                                            size={16}
                                                        />
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )
                            )}

                        </tbody>

                    </table>

                </div>
            </div>

            <AddEmployeeModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleModalSubmit}
                employee={selectedEmployee}
            />

        </div>
    );
}

export default Employees;