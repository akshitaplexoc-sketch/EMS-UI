import "./AuthLayout.css";

function AuthLayout({ children }) {
    return (
        <div className="auth-layout">

            <section className="auth-brand-section">

                <div className="auth-brand-content">

                    <div className="auth-logo">
                        EMS
                    </div>

                    <h1>
                        Employee Management System
                    </h1>

                    <p>
                        Manage your workforce securely and efficiently
                        with one simple platform.
                    </p>

                </div>

            </section>

            <section className="auth-form-section">

                <div className="auth-form-container">
                    {children}
                </div>

            </section>

        </div>
    );
}

export default AuthLayout;