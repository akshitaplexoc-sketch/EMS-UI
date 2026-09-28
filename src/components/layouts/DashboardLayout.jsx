import Sidebar from "../organisms/Sidebar";
import Header from "../organisms/Header";

function DashboardLayout({
    children,
    title = "Dashboard",
    subtitle = "Manage your organization"
}) {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                backgroundColor:
                    "var(--theme-background)",
                color: "var(--theme-text)"
            }}
        >
            <Sidebar />

            <div
                style={{
                    flex: 1,
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Header
                    title={title}
                    subtitle={subtitle}
                />

                <main
                    style={{
                        flex: 1,
                        padding: "28px",
                        boxSizing: "border-box",
                        overflowX: "hidden",
                        backgroundColor:
                            "var(--theme-background)",
                        color: "var(--theme-text)"
                    }}
                >
                    {children}
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;