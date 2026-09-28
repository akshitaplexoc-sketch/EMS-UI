import api from "./api";

/**
 * Get all leave requests
 *
 * API response:
 * {
 *   status: 0,
 *   message: "",
 *   data: null,
 *   dtos: [...]
 * }
 */
export const getLeaves = async () => {
    const response = await api.get("/LeaveRequest");

    console.log("Leave API response:", response.data);

    const result = response.data;

    // Your API returns the list inside "dtos"
    if (Array.isArray(result?.dtos)) {
        return result.dtos;
    }

    // Fallback in case backend returns data instead
    if (Array.isArray(result?.data)) {
        return result.data;
    }

    return [];
};


/**
 * Create leave request
 */
export const createLeave = async (leaveData) => {
    const response = await api.post(
        "/LeaveRequest",
        leaveData
    );

    console.log("Create Leave response:", response.data);

    return response.data;
};


/**
 * Approve / Reject leave request
 */
export const updateLeaveStatus = async (id, status) => {
    const response = await api.put(
        `/LeaveRequest/${id}/status`,
        {
            status: status
        }
    );

    console.log("Update Leave Status response:", response.data);

    return response.data;
};