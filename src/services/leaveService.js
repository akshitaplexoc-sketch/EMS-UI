import api from "./api";

export const getLeaveRequests = async () => {
    const response = await api.get("/LeaveRequest");
    return response.data;
};

export const createLeaveRequest = async (leave) => {
    const response = await api.post("/LeaveRequest", leave);
    return response.data;
};

export const updateLeaveStatus = async (id,status)=>{
    const response=await api.put(
        `/LeaveRequest/${id}/status`,
        {
            status
        }
    );
     return response.data;
};

export const deleteLeaveRequest = async (id) => {
    const response = await api.delete(`/LeaveRequest/${id}`);
    return response.data;
};