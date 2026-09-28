import { Pencil, Trash2 } from "lucide-react";
import Avatar from "../atoms/Avatar";

function EmployeeRow({
    employee,
    onEdit,
    onDelete
}) {
    const employeeName = employee?.name || "Unknown";
    const department = employee?.department || "-";
    const email = employee?.email || "-";
    const salary = employee?.salary ?? 0;

    return (
        <tr>
            {/* Employee */}
            <td
                style={{
                    padding: "14px 12px 14px 0",
                    borderBottom: "1px solid #E2E8F0"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px"
                    }}
                >
                    <Avatar
                        name={employeeName}
                        size={40}
                    />

                    <div>
                        <div
                            style={{
                                fontWeight: 600,
                                color: "#0F172A"
                            }}
                        >
                            {employeeName}
                        </div>

                        <div
                            style={{
                                fontSize: "12px",
                                color: "#64748B",
                                marginTop: "3px"
                            }}
                        >
                            ID: {employee?.id}
                        </div>
                    </div>
                </div>
            </td>

            {/* Department */}
            <td
                style={{
                    padding: "14px 12px",
                    borderBottom: "1px solid #E2E8F0",
                    color: "#334155"
                }}
            >
                {department}
            </td>

            {/* Email */}
            <td
                style={{
                    padding: "14px 12px",
                    borderBottom: "1px solid #E2E8F0",
                    color: "#334155",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }}
            >
                {email}
            </td>

            {/* Salary */}
            <td
                style={{
                    padding: "14px 12px",
                    borderBottom: "1px solid #E2E8F0",
                    color: "#0F172A",
                    fontWeight: 600,
                    whiteSpace: "nowrap"
                }}
            >
                ₹{Number(salary).toLocaleString("en-IN")}
            </td>

            {/* Actions */}
            <td
                style={{
                    padding: "14px 0 14px 12px",
                    borderBottom: "1px solid #E2E8F0"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px"
                    }}
                >
                    {/* Edit */}
                    <button
                        type="button"
                        onClick={() => onEdit(employee)}
                        aria-label="Edit employee"
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "9px",
                            border: "1px solid #D7DEFF",
                            backgroundColor: "#F3F5FF",
                            color: "#6366F1",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            padding: 0
                        }}
                    >
                        <Pencil size={17} />
                    </button>

                    {/* Delete */}
                    <button
                        type="button"
                        onClick={() => onDelete(employee.id)}
                        aria-label="Delete employee"
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "9px",
                            border: "1px solid #FECACA",
                            backgroundColor: "#FFF5F5",
                            color: "#EF4444",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            padding: 0
                        }}
                    >
                        <Trash2 size={17} />
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default EmployeeRow;