import api from "./api";

export const getAttendance = async () => {
    const response = await api.get("/Attendance");

    return response.data?.data || [];
};

export const getAttendanceByDate = async (date) => {
    const response = await api.get(
        `/Attendance/date/${date}`
    );

    return response.data?.data || [];
};

export const markAttendance = async ({
    employeeId,
    date,
    status
}) => {
    const response = await api.post(
        "/Attendance/mark",
        {
            employeeId,
            date,
            status
        }
    );

    return response.data?.data || response.data;
};