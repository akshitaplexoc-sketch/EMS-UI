import { Outlet } from "react-router-dom";

import Sidebar from "../../organisms/Sidebar";
import Header from "../../organisms/Header";

import "./DashboardLayout.css";

function DashboardLayout() {
    return (
        <div className="dashboard-layout">

            <Sidebar />

            <div className="dashboard-right">

                <Header />

                <main className="dashboard-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;