import {
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";

import {
    CalendarCheck,
    Search,
    ChevronDown,
    Check
} from "lucide-react";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import Card from "../../components/atoms/Card";
import Button from "../../components/atoms/Button";
import Badge from "../../components/atoms/Badge";

import DatePicker from "../../components/molecules/DatePicker";

import {
    getAttendanceByDate,
    markAttendance
} from "../../services/attendanceService";

import {
    getEmployees
} from "../../services/employeeService";


/* =====================================================
   CUSTOM DROPDOWN
===================================================== */

function CustomDropdown({
    label,
    value,
    options,
    placeholder,
    onChange
}) {
    const [open, setOpen] =
        useState(false);

    const dropdownRef =
        useRef(null);

    useEffect(() => {
        const handleOutsideClick =
            (event) => {
                if (
                    dropdownRef.current &&
                    !dropdownRef.current.contains(
                        event.target
                    )
                ) {
                    setOpen(false);
                }
            };

        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, []);

    const selectedOption =
        options.find(
            (option) =>
                String(option.value) ===
                String(value)
        );

    return (
        <div
            ref={dropdownRef}
            style={{
                position: "relative",
                width: "100%"
            }}
        >
            <label
                style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#1F2937"
                }}
            >
                {label}
            </label>

            {/* DROPDOWN BUTTON */}

            <button
                type="button"
                onClick={() =>
                    setOpen(
                        (previous) =>
                            !previous
                    )
                }
                style={{
                    width: "100%",
                    height: "46px",
                    padding:
                        "0 13px",
                    border:
                        open
                            ? "1px solid #2563EB"
                            : "1px solid #CBD5E1",
                    borderRadius: "9px",
                    backgroundColor:
                        "#FFFFFF",
                    color:
                        selectedOption
                            ? "#1F2937"
                            : "#64748B",
                    fontFamily:
                        "inherit",
                    fontSize: "14px",
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "flex",
                    alignItems:
                        "center",
                    justifyContent:
                        "space-between",
                    boxSizing:
                        "border-box",
                    boxShadow:
                        open
                            ? "0 0 0 3px #DBEAFE"
                            : "none"
                }}
            >
                <span>
                    {selectedOption
                        ? selectedOption.label
                        : placeholder}
                </span>

                <ChevronDown
                    size={17}
                    color="#64748B"
                    style={{
                        transform:
                            open
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                        transition:
                            "transform 0.2s ease"
                    }}
                />
            </button>

            {/* DROPDOWN MENU */}

            {open && (
                <div
                    style={{
                        position:
                            "absolute",
                        top:
                            "calc(100% + 6px)",
                        left: 0,
                        width:
                            "100%",
                        padding: "6px",
                        backgroundColor:
                            "#FFFFFF",
                        opacity: 1,
                        border:
                            "1px solid #CBD5E1",
                        borderRadius:
                            "9px",
                        boxShadow:
                            "0 12px 30px rgba(15, 23, 42, 0.20)",
                        zIndex:
                            999999,
                        boxSizing:
                            "border-box",
                        isolation:
                            "isolate"
                    }}
                >
                    {options.map(
                        (option) => {
                            const isSelected =
                                String(
                                    option.value
                                ) ===
                                String(
                                    value
                                );

                            return (
                                <button
                                    key={
                                        option.value
                                    }
                                    type="button"
                                    onClick={() => {
                                        onChange(
                                            option.value
                                        );

                                        setOpen(
                                            false
                                        );
                                    }}
                                    style={{
                                        width:
                                            "100%",
                                        minHeight:
                                            "38px",
                                        padding:
                                            "8px 10px",
                                        border:
                                            "none",
                                        borderRadius:
                                            "7px",
                                        backgroundColor:
                                            isSelected
                                                ? "#DBEAFE"
                                                : "#FFFFFF",
                                        color:
                                            isSelected
                                                ? "#2563EB"
                                                : "#1F2937",
                                        cursor:
                                            "pointer",
                                        display:
                                            "flex",
                                        alignItems:
                                            "center",
                                        justifyContent:
                                            "space-between",
                                        textAlign:
                                            "left",
                                        fontFamily:
                                            "inherit",
                                        fontSize:
                                            "14px",
                                        fontWeight:
                                            isSelected
                                                ? 600
                                                : 500
                                    }}
                                >
                                    <span>
                                        {
                                            option.label
                                        }
                                    </span>

                                    {isSelected && (
                                        <Check
                                            size={
                                                16
                                            }
                                            color="#2563EB"
                                        />
                                    )}
                                </button>
                            );
                        }
                    )}
                </div>
            )}
        </div>
    );
}


/* =====================================================
   ATTENDANCE PAGE
===================================================== */

function Attendance() {
    const [attendance, setAttendance] =
        useState([]);

    const [employees, setEmployees] =
        useState([]);

    const [selectedDate, setSelectedDate] =
        useState(
            new Date()
                .toISOString()
                .split("T")[0]
        );

    const [search, setSearch] =
        useState("");

    const [selectedEmployee, setSelectedEmployee] =
        useState("");

    const [selectedStatus, setSelectedStatus] =
        useState("Present");

    const [loading, setLoading] =
        useState(true);

    const [marking, setMarking] =
        useState(false);

    const [error, setError] =
        useState("");


    /* =====================================================
       LOAD EMPLOYEES
    ===================================================== */

    useEffect(() => {
        loadEmployees();
    }, []);


    /* =====================================================
       LOAD ATTENDANCE
    ===================================================== */

    useEffect(() => {
        loadAttendance();
    }, [selectedDate]);


    const loadEmployees =
        async () => {
            try {
                const data =
                    await getEmployees();

                setEmployees(
                    Array.isArray(data)
                        ? data
                        : []
                );
            } catch (error) {
                console.error(
                    "Failed to load employees:",
                    error
                );

                setEmployees([]);
            }
        };


    const loadAttendance =
        async () => {
            try {
                setLoading(true);
                setError("");

                const data =
                    await getAttendanceByDate(
                        selectedDate
                    );

                setAttendance(
                    Array.isArray(data)
                        ? data
                        : []
                );
            } catch (error) {
                console.error(
                    "Failed to load attendance:",
                    error
                );

                setAttendance([]);

                setError(
                    error?.response?.data
                        ?.message ||
                        "Failed to load attendance."
                );
            } finally {
                setLoading(false);
            }
        };


    /* =====================================================
       MARK ATTENDANCE
    ===================================================== */

    const handleMarkAttendance =
        async (event) => {
            event.preventDefault();

            if (!selectedEmployee) {
                setError(
                    "Please select an employee."
                );
                return;
            }

            try {
                setMarking(true);
                setError("");

                await markAttendance({
                    employeeId:
                        Number(
                            selectedEmployee
                        ),
                    date:
                        selectedDate,
                    status:
                        selectedStatus
                });

                setSelectedEmployee("");
                setSelectedStatus(
                    "Present"
                );

                await loadAttendance();
            } catch (error) {
                console.error(
                    "Failed to mark attendance:",
                    error
                );

                setError(
                    error?.response?.data
                        ?.message ||
                        "Failed to mark attendance."
                );
            } finally {
                setMarking(false);
            }
        };


    /* =====================================================
       SEARCH
    ===================================================== */

    const filteredAttendance =
        useMemo(() => {
            const searchValue =
                search
                    .trim()
                    .toLowerCase();

            if (!searchValue) {
                return attendance;
            }

            return attendance.filter(
                (item) =>
                    (
                        item?.employeeName ||
                        ""
                    )
                        .toLowerCase()
                        .includes(
                            searchValue
                        )
            );
        }, [
            attendance,
            search
        ]);


    /* =====================================================
       STATUS
    ===================================================== */

    const getStatusVariant =
        (status) => {
            switch (
                status?.toLowerCase()
            ) {
                case "present":
                    return "success";

                case "absent":
                    return "danger";

                case "on leave":
                    return "warning";

                default:
                    return "default";
            }
        };


    /* =====================================================
       OPTIONS
    ===================================================== */

    const employeeOptions =
        employees.map(
            (employee) => ({
                value:
                    employee.id,
                label:
                    employee.name
            })
        );

    const statusOptions = [
        {
            value: "Present",
            label: "Present"
        },
        {
            value: "Absent",
            label: "Absent"
        },
        {
            value: "On Leave",
            label: "On Leave"
        }
    ];


    return (
        <DashboardLayout
            title="Attendance"
            subtitle="Manage employee attendance"
        >

            {/* =================================================
                MARK ATTENDANCE
            ================================================= */}

            <Card
                style={{
                    marginBottom:
                        "24px"
                }}
            >
                <div
                    style={{
                        display:
                            "flex",
                        alignItems:
                            "center",
                        gap: "12px",
                        marginBottom:
                            "22px"
                    }}
                >
                    <div
                        style={{
                            width:
                                "42px",
                            height:
                                "42px",
                            borderRadius:
                                "10px",
                            display:
                                "flex",
                            alignItems:
                                "center",
                            justifyContent:
                                "center",
                            backgroundColor:
                                "#DBEAFE",
                            color:
                                "#2563EB",
                            flexShrink: 0
                        }}
                    >
                        <CalendarCheck
                            size={21}
                        />
                    </div>

                    <div>
                        <h2
                            style={{
                                margin:
                                    0,
                                fontSize:
                                    "19px",
                                fontWeight:
                                    700,
                                color:
                                    "#1F2937"
                            }}
                        >
                            Mark Attendance
                        </h2>

                        <p
                            style={{
                                margin:
                                    "4px 0 0",
                                fontSize:
                                    "13px",
                                color:
                                    "#64748B"
                            }}
                        >
                            Select an
                            employee and
                            attendance
                            status.
                        </p>
                    </div>
                </div>


                {/* ERROR */}

                {error && (
                    <div
                        style={{
                            marginBottom:
                                "18px",
                            padding:
                                "12px 14px",
                            borderRadius:
                                "8px",
                            backgroundColor:
                                "#FEF2F2",
                            border:
                                "1px solid #FECACA",
                            color:
                                "#B91C1C",
                            fontSize:
                                "14px"
                        }}
                    >
                        {error}
                    </div>
                )}


                {/* FORM */}

                <form
                    onSubmit={
                        handleMarkAttendance
                    }
                    style={{
                        position:
                            "relative",
                        zIndex: 10,
                        display:
                            "grid",
                        gridTemplateColumns:
                            "repeat(3, minmax(0, 1fr)) auto",
                        gap: "16px",
                        alignItems:
                            "end"
                    }}
                >

                    {/* DATE */}

                    <DatePicker
                        label="Date"
                        value={
                            selectedDate
                        }
                        onChange={
                            setSelectedDate
                        }
                    />


                    {/* EMPLOYEE */}

                    <CustomDropdown
                        label="Employee"
                        value={
                            selectedEmployee
                        }
                        placeholder="Select employee"
                        options={
                            employeeOptions
                        }
                        onChange={
                            setSelectedEmployee
                        }
                    />


                    {/* STATUS */}

                    <CustomDropdown
                        label="Status"
                        value={
                            selectedStatus
                        }
                        placeholder="Select status"
                        options={
                            statusOptions
                        }
                        onChange={
                            setSelectedStatus
                        }
                    />


                    {/* BUTTON */}

                    <Button
                        type="submit"
                        variant="primary"
                        loading={
                            marking
                        }
                        disabled={
                            marking
                        }
                        style={{
                            height:
                                "46px",
                            whiteSpace:
                                "nowrap"
                        }}
                    >
                        Mark Attendance
                    </Button>
                </form>
            </Card>


            {/* =================================================
                ATTENDANCE RECORDS
            ================================================= */}

            <Card>
                <div
                    style={{
                        display:
                            "flex",
                        alignItems:
                            "center",
                        justifyContent:
                            "space-between",
                        gap: "20px",
                        marginBottom:
                            "20px"
                    }}
                >
                    <div>
                        <h2
                            style={{
                                margin:
                                    0,
                                fontSize:
                                    "19px",
                                fontWeight:
                                    700,
                                color:
                                    "#1F2937"
                            }}
                        >
                            Attendance Records
                        </h2>

                        <p
                            style={{
                                margin:
                                    "4px 0 0",
                                fontSize:
                                    "13px",
                                color:
                                    "#64748B"
                            }}
                        >
                            {
                                filteredAttendance.length
                            }{" "}
                            records
                        </p>
                    </div>


                    {/* SEARCH */}

                    <div
                        style={{
                            position:
                                "relative",
                            width:
                                "280px"
                        }}
                    >
                        <Search
                            size={18}
                            style={{
                                position:
                                    "absolute",
                                left:
                                    "12px",
                                top:
                                    "50%",
                                transform:
                                    "translateY(-50%)",
                                color:
                                    "#64748B",
                                pointerEvents:
                                    "none"
                            }}
                        />

                        <input
                            type="text"
                            value={
                                search
                            }
                            onChange={(
                                event
                            ) =>
                                setSearch(
                                    event
                                        .target
                                        .value
                                )
                            }
                            placeholder="Search employee..."
                            style={{
                                width:
                                    "100%",
                                height:
                                    "42px",
                                padding:
                                    "0 12px 0 38px",
                                border:
                                    "1px solid #CBD5E1",
                                borderRadius:
                                    "9px",
                                backgroundColor:
                                    "#FFFFFF",
                                color:
                                    "#1F2937",
                                fontFamily:
                                    "inherit",
                                fontSize:
                                    "14px",
                                outline:
                                    "none",
                                boxSizing:
                                    "border-box"
                            }}
                        />
                    </div>
                </div>


                {/* LOADING */}

                {loading ? (
                    <div
                        style={{
                            padding:
                                "50px",
                            textAlign:
                                "center",
                            color:
                                "#64748B"
                        }}
                    >
                        Loading attendance...
                    </div>
                ) : filteredAttendance.length ===
                  0 ? (
                    <div
                        style={{
                            padding:
                                "50px",
                            textAlign:
                                "center",
                            color:
                                "#64748B"
                        }}
                    >
                        No attendance
                        records found
                        for this date.
                    </div>
                ) : (
                    <div
                        style={{
                            width:
                                "100%",
                            overflowX:
                                "auto"
                        }}
                    >
                        <table
                            style={{
                                width:
                                    "100%",
                                borderCollapse:
                                    "collapse"
                            }}
                        >
                            <thead>
                                <tr>
                                    <th
                                        style={{
                                            textAlign:
                                                "left",
                                            padding:
                                                "13px 12px",
                                            borderBottom:
                                                "1px solid #CBD5E1",
                                            color:
                                                "#64748B",
                                            fontSize:
                                                "12px",
                                            fontWeight:
                                                700,
                                            textTransform:
                                                "uppercase"
                                        }}
                                    >
                                        Employee
                                    </th>

                                    <th
                                        style={{
                                            textAlign:
                                                "left",
                                            padding:
                                                "13px 12px",
                                            borderBottom:
                                                "1px solid #CBD5E1",
                                            color:
                                                "#64748B",
                                            fontSize:
                                                "12px",
                                            fontWeight:
                                                700,
                                            textTransform:
                                                "uppercase"
                                        }}
                                    >
                                        Date
                                    </th>

                                    <th
                                        style={{
                                            textAlign:
                                                "left",
                                            padding:
                                                "13px 12px",
                                            borderBottom:
                                                "1px solid #CBD5E1",
                                            color:
                                                "#64748B",
                                            fontSize:
                                                "12px",
                                            fontWeight:
                                                700,
                                            textTransform:
                                                "uppercase"
                                        }}
                                    >
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredAttendance.map(
                                    (
                                        item
                                    ) => (
                                        <tr
                                            key={
                                                item.id
                                            }
                                        >
                                            <td
                                                style={{
                                                    padding:
                                                        "15px 12px",
                                                    borderBottom:
                                                        "1px solid #CBD5E1",
                                                    color:
                                                        "#1F2937",
                                                    fontWeight:
                                                        600
                                                }}
                                            >
                                                {
                                                    item.employeeName
                                                }
                                            </td>

                                            <td
                                                style={{
                                                    padding:
                                                        "15px 12px",
                                                    borderBottom:
                                                        "1px solid #CBD5E1",
                                                    color:
                                                        "#64748B"
                                                }}
                                            >
                                                {new Date(
                                                    item.date
                                                ).toLocaleDateString(
                                                    "en-IN"
                                                )}
                                            </td>

                                            <td
                                                style={{
                                                    padding:
                                                        "15px 12px",
                                                    borderBottom:
                                                        "1px solid #CBD5E1"
                                                }}
                                            >
                                                <Badge
                                                    variant={getStatusVariant(
                                                        item.status
                                                    )}
                                                >
                                                    {
                                                        item.status
                                                    }
                                                </Badge>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </DashboardLayout>
    );
}

export default Attendance;