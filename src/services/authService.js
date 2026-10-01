import api from "./api";

export const login = async ({ email, password }) => {
    const response = await api.post("/Auth/login", {
        email,
        password
    });

    const result = response.data;

    const token = result?.data?.token;

    if (!token) {
        throw new Error("Login succeeded but no authentication token was returned.");
    }

    localStorage.setItem("token", token);

    // Store user information for the dashboard/header
    localStorage.setItem(
        "user",
        JSON.stringify(result.data)
    );

    return result.data;
};

export const register = async ({ name, email, password }) => {
    const response = await api.post("/Auth/register", {
        username: name,
        email,
        password
    });

    return response.data;
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

export const getProfile = async () => {
    const response = await api.get("/Auth/profile");
    return response.data;
};

export const updateProfile = async (data) => {
    const response = await api.put("/Auth/profile", data);
    return response.data;
};

export const changePassword = async (data) => {
    const response = await api.put("/Auth/change-password",data );
    return response.data;
};