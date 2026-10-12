import api from "./api";

export const getEmployees = async (pageNumber = 1, pageSize = 5, searchTerm = "", sortBy="id" , isAscending=true) => {
    const response = await api.get(`/Employees`, {
        params: {
            pageNumber,
            pageSize,
            searchTerm,
            sortBy,
            isAscending
        }
    });
    // return response.data?.data || [];
    return response.data;
};

export const getEmployeeById = async (id) => {
    const response = await api.get(`/Employees/${id}`);

    return response.data?.data || null;
};

export const createEmployee = async (employee) => {
    const response = await api.post("/Employees", employee);

    return response.data?.data || response.data;
};

export const updateEmployee = async (id, employee) => {
    const response = await api.put(`/Employees/${id}`, employee);

    return response.data?.data || response.data;
};

export const deleteEmployee = async (id) => {
    const response = await api.delete(`/Employees/${id}`);

    return response.data;
};