import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import Card from "../../components/atoms/Card";
import Button from "../../components/atoms/Button";
import SearchBar from "../../components/molecules/SearchBar";
import EmployeeRow from "../../components/molecules/EmployeeRow";
import AddEmployeeModal from "../../components/organisms/AddEmployeeModal";

import {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from "../../services/employeeService";

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const loadEmployees = async () => {
        try {
            setLoading(true);

            const data = await getEmployees();

            setEmployees(
                Array.isArray(data) ? data : []
            );
        } catch (error) {
            console.error(
                "Failed to load employees:",
                error
            );

            setEmployees([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    const filteredEmployees = useMemo(() => {
        const searchValue = search
            .trim()
            .toLowerCase();

        if (!searchValue) {
            return employees;
        }

        return employees.filter((employee) => {
            return (
                employee?.name
                    ?.toLowerCase()
                    .includes(searchValue) ||
                employee?.email
                    ?.toLowerCase()
                    .includes(searchValue) ||
                employee?.department
                    ?.toLowerCase()
                    .includes(searchValue)
            );
        });
    }, [employees, search]);

    // Open modal for adding employee
    const handleAddEmployee = () => {
        setSelectedEmployee(null);
        setModalOpen(true);
    };

    // Open modal for editing employee
    const handleEditEmployee = (employee) => {
        setSelectedEmployee(employee);
        setModalOpen(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedEmployee(null);
    };

    // Add or update employee
    const handleSubmitEmployee = async (employeeData) => {
        try {
            if (selectedEmployee) {
                await updateEmployee(
                    selectedEmployee.id,
                    employeeData
                );
            } else {
                await createEmployee(employeeData);
            }

            setModalOpen(false);
            setSelectedEmployee(null);

            await loadEmployees();
        } catch (error) {
            console.error(
                "Failed to save employee:",
                error
            );

            alert(
                error?.response?.data?.message ||
                "Failed to save employee. Please try again."
            );

            throw error;
        }
    };

    // Delete employee
    const handleDeleteEmployee = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteEmployee(id);

            await loadEmployees();
        } catch (error) {
            console.error(
                "Failed to delete employee:",
                error
            );

            alert(
                error?.response?.data?.message ||
                "Failed to delete employee. Please try again."
            );
        }
    };

    return (
        <DashboardLayout
            title="Employees"
            subtitle="Manage your employees"
        >
            <Card
                style={{
                    width: "100%",
                    boxSizing: "border-box"
                }}
            >
                {/* Page Header */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "20px",
                        marginBottom: "24px"
                    }}
                >
                    <div>
                        <h2
                            style={{
                                margin: 0,
                                color: "var(--theme-text)",
                                fontSize: "24px",
                                fontWeight: 700
                            }}
                        >
                            Employee Directory
                        </h2>

                        <p
                            style={{
                                margin: "6px 0 0",
                                color: "var(--theme-muted)",
                                fontSize: "14px"
                            }}
                        >
                            {employees.length} employees
                        </p>
                    </div>

                    <Button
                        type="button"
                        variant="primary"
                        icon={<Plus size={18} />}
                        onClick={handleAddEmployee}
                    >
                        Add Employee
                    </Button>
                </div>

                {/* Search */}
                <div
                    style={{
                        marginBottom: "24px",
                        maxWidth: "400px"
                    }}
                >
                    <SearchBar
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search employees..."
                    />
                </div>

                {/* Loading */}
                {loading ? (
                    <div
                        style={{
                            padding: "40px",
                            textAlign: "center",
                            color: "var(--theme-muted)"
                        }}
                    >
                        Loading employees...
                    </div>
                ) : (
                    <div
                        style={{
                            width: "100%",
                            overflowX: "auto"
                        }}
                    >
                        <table
                            style={{
                                width: "100%",
                                minWidth: "900px",
                                borderCollapse: "collapse",
                                tableLayout: "fixed"
                            }}
                        >
                            <colgroup>
                                <col
                                    style={{
                                        width: "28%"
                                    }}
                                />

                                <col
                                    style={{
                                        width: "22%"
                                    }}
                                />

                                <col
                                    style={{
                                        width: "25%"
                                    }}
                                />

                                <col
                                    style={{
                                        width: "15%"
                                    }}
                                />

                                <col
                                    style={{
                                        width: "10%"
                                    }}
                                />
                            </colgroup>

                            <thead>
                                <tr>
                                    <th
                                        style={{
                                            textAlign: "left",
                                            padding: "0 0 14px",
                                            color: "var(--theme-muted)",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            textTransform: "uppercase",
                                            borderBottom:
                                                "1px solid var(--theme-border)"
                                        }}
                                    >
                                        Employee
                                    </th>

                                    <th
                                        style={{
                                            textAlign: "left",
                                            padding: "0 0 14px",
                                            color: "var(--theme-muted)",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            textTransform: "uppercase",
                                            borderBottom:
                                                "1px solid var(--theme-border)"
                                        }}
                                    >
                                        Department
                                    </th>

                                    <th
                                        style={{
                                            textAlign: "left",
                                            padding: "0 0 14px",
                                            color: "var(--theme-muted)",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            textTransform: "uppercase",
                                            borderBottom:
                                                "1px solid var(--theme-border)"
                                        }}
                                    >
                                        Email
                                    </th>

                                    <th
                                        style={{
                                            textAlign: "left",
                                            padding: "0 0 14px",
                                            color: "var(--theme-muted)",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            textTransform: "uppercase",
                                            borderBottom:
                                                "1px solid var(--theme-border)"
                                        }}
                                    >
                                        Salary
                                    </th>

                                    <th
                                        style={{
                                            textAlign: "center",
                                            padding: "0 0 14px",
                                            color: "var(--theme-muted)",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            textTransform: "uppercase",
                                            borderBottom:
                                                "1px solid var(--theme-border)"
                                        }}
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredEmployees.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            style={{
                                                padding:
                                                    "40px 20px",
                                                textAlign: "center",
                                                color:
                                                    "var(--theme-muted)"
                                            }}
                                        >
                                            No employees found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredEmployees.map(
                                        (employee) => (
                                            <EmployeeRow
                                                key={employee.id}
                                                employee={employee}
                                                onEdit={
                                                    handleEditEmployee
                                                }
                                                onDelete={
                                                    handleDeleteEmployee
                                                }
                                            />
                                        )
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>

            {/* Add / Edit Employee Modal */}
            <AddEmployeeModal
                isOpen={modalOpen}
                employee={selectedEmployee}
                onClose={handleCloseModal}
                onSubmit={handleSubmitEmployee}
            />
        </DashboardLayout>
    );
}

export default Employees;