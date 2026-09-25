import api from "./api";

export const getAttendance = async () => {
    const response = await api.get("/Attendance");
    return response.data;
};

export const getAttendanceByDate = async (date) => {
    const response = await api.get(`/Attendance/date/${date}`);
    return response.data;
};

export const markAttendance = async (attendance) => {
    const response = await api.post(
        "/Attendance/mark",
        attendance
    );

    return response.data;
};