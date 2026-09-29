import { useEffect, useState } from "react";

import {
    Plus,
    Search,
    Pencil,
    Trash2
} from "lucide-react";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import Card from "../../components/atoms/Card";
import Button from "../../components/atoms/Button";
import Input from "../../components/atoms/Input";
import Avatar from "../../components/atoms/Avatar";
import Badge from "../../components/atoms/Badge";
import IconButton from "../../components/atoms/IconButton";

import ApplyLeaveModal from "../../components/organisms/ApplyLeaveModal";

import {
    getLeaveRequests,
    createLeaveRequest,
    updateLeaveStatus,
    deleteLeaveRequest
} from "../../services/leaveService";

function Leave() {

    const [leaveRequests,setLeaveRequests]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState("");

    const [search,setSearch]=useState("");
    const [statusFilter,setStatusFilter]=useState("All");

    const [isModalOpen,setIsModalOpen]=useState(false);
    const [selectedLeave,setSelectedLeave]=useState(null);

    useEffect(()=>{
        loadLeaveRequests();
    },[]);

    const loadLeaveRequests=async()=>{

        try{

            setLoading(true);

            const response=await getLeaveRequests();

            setLeaveRequests(response.data || []);

        }

        catch(err){

            setError(
                err?.response?.data?.message ||
                "Failed to load leave requests."
            );

        }

        finally{

            setLoading(false);

        }

    };
    const handleSubmit = async (formData) => {

            try {

                setError("");

                if (selectedLeave) {

                    await updateLeaveStatus(
                        selectedLeave.id,
                        formData.status
                    );

                } else {

                    await createLeaveRequest({
                        employeeId: Number(formData.employeeId),
                        fromDate: formData.fromDate,
                        toDate: formData.toDate,
                        reason: formData.reason,
                        status: formData.status
                    });

                }

                setIsModalOpen(false);
                setSelectedLeave(null);

                await loadLeaveRequests();

            }
            catch (err) {

                console.error(err);

                setError(
                    err?.response?.data?.message ||
                    "Operation failed."
                );

            }

        };

    const formatDate=(date)=>{

        if(!date) return "-";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day:"2-digit",
                month:"short",
                year:"numeric"
            }
        );

    };

    const filteredLeaves=leaveRequests.filter((leave)=>{

        const value=search.toLowerCase();

        const matchesSearch=

            leave.employeeName
            ?.toLowerCase()
            .includes(value)

            ||

            leave.reason
            ?.toLowerCase()
            .includes(value);

        const matchesStatus=

            statusFilter==="All"

            ||

            leave.status===statusFilter;

        return matchesSearch && matchesStatus;

    });

    return(

            <DashboardLayout
            title="Leave Management"
            subtitle="Manage employee leave requests"
            >

            <div
            style={{
            display:"flex",
            flexDirection:"column",
            gap:"28px"
            }}
            >

            <Card
            style={{
            padding:"28px",
            borderRadius:"18px"
            }}
            >

            <div
            style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            marginBottom:"28px"
            }}
            >

            <div>

            <h2
            style={{
            margin:0,
            fontSize:"30px",
            color:"var(--text-primary)"
            }}
            >
            Leave Requests
            </h2>

            <p
            style={{
            marginTop:"8px",
            color:"var(--text-secondary)"
            }}
            >
            Manage all employee leave requests.
            </p>

            </div>

            <Button
            variant="primary"
            onClick={()=>{
            setSelectedLeave(null);
            setIsModalOpen(true);
            }}
            >

            <Plus size={18}/>

            <span className="button-text">
            Apply Leave
            </span>

            </Button>

            </div>

            <div
            style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            marginBottom:"26px",
            gap:"20px"
            }}
            >

            <div
            style={{
            position:"relative",
            width:"340px"
            }}
            >

            <Search
            size={18}
            style={{
            position:"absolute",
            left:"16px",
            top:"50%",
            transform:"translateY(-50%)",
            color:"var(--text-secondary)"
            }}
            />

            <Input
            placeholder="Search leave..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            style={{
            paddingLeft:"46px"
            }}
            />

            </div>

            <select

            value={statusFilter}

            onChange={(e)=>setStatusFilter(e.target.value)}

            style={{

            height:"46px",

            minWidth:"180px",

            borderRadius:"12px",

            border:"1px solid var(--border-color)",

            background:"var(--card)",

            color:"var(--text-primary)",

            padding:"0 14px"

            }}

            >

            <option value="All">All Status</option>

            <option value="Pending">Pending</option>

            <option value="Approved">Approved</option>

            <option value="Rejected">Rejected</option>

            </select>

            </div>

            {error &&

            <div
            style={{
            padding:"14px",
            background:"#FEE2E2",
            color:"#DC2626",
            borderRadius:"12px",
            marginBottom:"20px"
            }}
            >
            {error}
            </div>

            }

            <div
            style={{
            overflowX:"auto"
            }}
            >

            <table
            style={{
            width:"100%",
            borderCollapse:"collapse"
            }}
            >

            <thead>

            <tr>

            <th style={thStyle}>Employee</th>

            <th style={thStyle}>From</th>

            <th style={thStyle}>To</th>

            <th style={thStyle}>Reason</th>

            <th style={thStyle}>Status</th>

            <th style={thStyle}>Actions</th>

            </tr>

            </thead>

            <tbody>
            {loading ? (

            <tr>

            <td
            colSpan="6"
            style={{
            textAlign:"center",
            padding:"50px",
            color:"var(--text-secondary)"
            }}
            >
            Loading leave requests...
            </td>

            </tr>

            ) : filteredLeaves.length===0 ? (

            <tr>

            <td
            colSpan="6"
            style={{
            padding:"70px 20px",
            textAlign:"center"
            }}
            >

            <h3
            style={{
            marginBottom:"10px",
            color:"var(--text-primary)"
            }}
            >
            No Leave Requests
            </h3>

            <p
            style={{
            color:"var(--text-secondary)"
            }}
            >
            No leave requests found.
            </p>

            </td>

            </tr>

            ) : (

            filteredLeaves.map((leave)=>(

            <tr
            key={leave.id}
            style={{
            borderBottom:"1px solid var(--border-color)"
            }}
            >

            <td
            style={tdStyle}
            >

            <div
            style={{
            display:"flex",
            alignItems:"center",
            gap:"14px"
            }}
            >

            <Avatar
            name={leave.employeeName}
            />

            <div>

            <h4
            style={{
            margin:0,
            fontSize:"15px"
            }}
            >
            {leave.employeeName}
            </h4>

            <span
            style={{
            fontSize:"13px",
            color:"var(--text-secondary)"
            }}
            >
            Employee #{leave.employeeId}
            </span>

            </div>

            </div>

            </td>

            <td style={tdStyle}>
            {formatDate(leave.fromDate)}
            </td>

            <td style={tdStyle}>
            {formatDate(leave.toDate)}
            </td>

            <td style={tdStyle}>
            {leave.reason}
            </td>

            <td style={tdStyle}>

            <Badge
            variant={
            leave.status==="Approved"
            ? "success"
            : leave.status==="Rejected"
            ? "danger"
            : "warning"
            }
            >

            {leave.status}

            </Badge>

            </td>

            <td style={tdStyle}>

            <div
            style={{
            display:"flex",
            gap:"10px"
            }}
            >

            <IconButton
            variant="primary"
            onClick={()=>{
            setSelectedLeave(leave);
            setIsModalOpen(true);
            }}
            >

            <Pencil size={16}/>

            </IconButton>

            <IconButton
            variant="danger"
                        onClick={async()=>{
                            if(!window.confirm("Delete this leave request?"))
                                return;
                            try{
                            await deleteLeaveRequest(leave.id);
                                loadLeaveRequests();}
                            catch(err){
                                setError(
                                    err?.response?.data?.message ||
                                    "Failed to delete leave request." );
                            }}}
            >

            <Trash2 size={16}/>

            </IconButton>

            </div>

            </td>

            </tr>

            ))

            )}

            </tbody>

            </table>

            </div>

            </Card>

            <ApplyLeaveModal
                isOpen={isModalOpen}
                onClose={() => {

                    setIsModalOpen(false);
                    setSelectedLeave(null);

                }}
                leave={selectedLeave}
                onSubmit={handleSubmit}
            />

            </div>

            </DashboardLayout>

            );

            }

            const thStyle={

            textAlign:"left",

            padding:"18px",

            fontWeight:600,

            fontSize:"14px",

            borderBottom:"1px solid var(--border-color)",

            color:"var(--text-secondary)"

            };

            const tdStyle={

            padding:"18px",

            fontSize:"14px",

            color:"var(--text-primary)"

            };

            export default Leave;
