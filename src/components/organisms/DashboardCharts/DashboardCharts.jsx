import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell
} from "recharts";

import "./DashboardCharts.css";

const employeeData = [

    { month: "Jan", employees: 120 },

    { month: "Feb", employees: 150 },

    { month: "Mar", employees: 180 },

    { month: "Apr", employees: 210 },

    { month: "May", employees: 230 },

    { month: "Jun", employees: 248 }

];

const departmentData = [

    { name: "IT", value: 45 },

    { name: "HR", value: 18 },

    { name: "Sales", value: 22 },

    { name: "Finance", value: 15 }

];

const COLORS = [

    "#3B82F6",

    "#8B5CF6",

    "#22C55E",

    "#F97316"

];

function DashboardCharts() {

    return (

        <div className="dashboard-charts">

            <div className="chart-card">

                <div className="chart-header">

                    <h3>Employee Overview</h3>

                    <span>Last 6 Months</span>

                </div>

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >

                    <LineChart
                        data={employeeData}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="month"
                        />

                        <Tooltip />

                        <Line

                            type="monotone"

                            dataKey="employees"

                            stroke="#3B82F6"

                            strokeWidth={3}

                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

            <div className="chart-right">

                <div className="chart-card">

                    <div className="chart-header">

                        <h3>Departments</h3>

                    </div>

                    <ResponsiveContainer
                        width="100%"
                        height={250}
                    >

                        <PieChart>

                            <Pie

                                data={departmentData}

                                dataKey="value"

                                outerRadius={90}

                            >

                                {

                                    departmentData.map((entry, index) => (

                                        <Cell

                                            key={index}

                                            fill={COLORS[index]}

                                        />

                                    ))

                                }

                            </Pie>

                            <Tooltip />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

                <div className="quote-card">

                    <h2>

                        Great teams build great companies.

                    </h2>

                    <p>

                        Together we create a better workplace every day.

                    </p>

                </div>

            </div>

        </div>

    );

}

export default DashboardCharts;