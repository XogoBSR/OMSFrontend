import {get, post, patch, del} from "../utils/api";

const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:5000/api";

const GetAttendances = async (params) => { 
    const result = await get(`${API_URL}/attendance`, params)
        return result

};

const GetAttendanceById = async (id) => get(`${API_URL}/attendance/${id}`);

const GetAttendanceByMonth = async (startDate,endDate) => get(`${API_URL}/attendance/${startDate}/${endDate}`)

const GetAttendanceUserToday = async () => get(`${API_URL}/attendance/today`);

const CreateAttendance = async (params) => {

    const token = localStorage.getItem("merakihr-token");
    const result = await fetch(`${API_URL}/attendance`, {
        method: 'POST',
         body: JSON.stringify(params),
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    if(result) {
         return result 
    }

};

const UpdateAttendance = async (id, params) => {
    console.log("Update Attendenc ",params)
    patch(`${API_URL}/attendance/${id}`, params)
};

const DeleteAttendance = async (id) => del(`${API_URL}/attendance/${id}`);

const CreateLunch = async (id,params) => patch(`${API_URL}/attendance/lunchcreate/${id}`, params)
 

const UpdateLunch = async (id,params) => patch(`${API_URL}/attendance/lunchupdate/${id}`,params)

export const AttendanceService = {
    GetAttendances,
    GetAttendanceById,
    GetAttendanceUserToday,
    CreateAttendance,
    UpdateAttendance,
    DeleteAttendance,
    CreateLunch,
    UpdateLunch,
    GetAttendanceByMonth
};