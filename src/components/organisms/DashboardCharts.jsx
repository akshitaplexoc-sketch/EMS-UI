import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";

import Card from "../atoms/Card";
import { useTheme } from "../ThemeContext";

function DashboardCharts({
    employees = []
}) {
    const { theme } = useTheme();

    const departmentMap = {};

    employees.forEach((employee) => {
        const department =
            employee?.department || "Other";

        departmentMap[department] =
            (departmentMap[department] || 0) + 1;
    });

    const departmentData = Object.entries(
        departmentMap
    ).map(([department, count]) => ({
        department,
        count
    }));

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns:
                    "minmax(0, 1.6fr) minmax(300px, 1fr)",
                gap: "20px",
                marginTop: "24px"
            }}
        >
            {/* Employees by Department */}
            <Card>
                <div style={{ marginBottom: "20px" }}>
                    <h3
                        style={{
                            margin: 0,
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "var(--theme-text)"
                        }}
                    >
                        Employees by Department
                    </h3>

                    <p
                        style={{
                            margin: "5px 0 0",
                            fontSize: "12px",
                            color: "var(--theme-muted)"
                        }}
                    >
                        Current employee distribution
                    </p>
                </div>

                {departmentData.length === 0 ? (
                    <div
                        style={{
                            height: "300px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--theme-muted)"
                        }}
                    >
                        No employee data available.
                    </div>
                ) : (
                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >
                        <BarChart
                            data={departmentData}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 40
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke={theme.border}
                            />

                            <XAxis
                                dataKey="department"
                                tick={{
                                    fill: theme.muted,
                                    fontSize: 11
                                }}
                                axisLine={{
                                    stroke: theme.border
                                }}
                                tickLine={false}
                                angle={-25}
                                textAnchor="end"
                            />

                            <YAxis
                                allowDecimals={false}
                                tick={{
                                    fill: theme.muted,
                                    fontSize: 11
                                }}
                                axisLine={{
                                    stroke: theme.border
                                }}
                                tickLine={false}
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor:
                                        theme.surface,
                                    border:
                                        `1px solid ${theme.border}`,
                                    borderRadius: "10px",
                                    color: theme.text
                                }}
                            />

                            <Bar
                                dataKey="count"
                                fill={theme.primary}
                                radius={[
                                    6,
                                    6,
                                    0,
                                    0
                                ]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </Card>

            {/* Employee Donut */}
            <Card>
                <div style={{ marginBottom: "10px" }}>
                    <h3
                        style={{
                            margin: 0,
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "var(--theme-text)"
                        }}
                    >
                        Employees
                    </h3>

                    <p
                        style={{
                            margin: "5px 0 0",
                            fontSize: "12px",
                            color: "var(--theme-muted)"
                        }}
                    >
                        Employee distribution by department
                    </p>
                </div>

                {departmentData.length === 0 ? (
                    <div
                        style={{
                            height: "300px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--theme-muted)"
                        }}
                    >
                        No employee data available.
                    </div>
                ) : (
                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >
                        <PieChart>
                            <Pie
                                data={departmentData}
                                dataKey="count"
                                nameKey="department"
                                cx="50%"
                                cy="45%"
                                innerRadius={65}
                                outerRadius={95}
                                paddingAngle={3}
                            >
                                {departmentData.map(
                                    (item, index) => (
                                        <Cell
                                            key={
                                                item.department
                                            }
                                            fill={
                                                [
                                                    theme.primary,
                                                    "#22C55E",
                                                    "#EAB308",
                                                    "#EF4444",
                                                    "#0F766E",
                                                    "#F97316"
                                                ][
                                                    index %
                                                        6
                                                ]
                                            }
                                        />
                                    )
                                )}
                            </Pie>

                            <Tooltip
                                contentStyle={{
                                    backgroundColor:
                                        theme.surface,
                                    border:
                                        `1px solid ${theme.border}`,
                                    borderRadius: "10px",
                                    color: theme.text
                                }}
                            />

                            <Legend
                                verticalAlign="bottom"
                                height={36}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </Card>
        </div>
    );
}

export default DashboardCharts;