import {get, post, patch, del} from "../utils/api";

const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:5000/api";

const GetLeaves = async (params) => get(`${API_URL}/leave`, params);

const GetAllLeaves = async() => get(`${API_URL}/leave`)

const GetLeaveById = async (id) => get(`${API_URL}/leave/${id}`);

const CreateLeave = async (params) => post(`${API_URL}/leave`, params);

const UpdateLeave = async (id, params) => patch(`${API_URL}/leave/${id}`, params);

const DeleteLeave = async (id) => del(`${API_URL}/leave/${id}`);

export const LeaveService = {
    GetLeaves,
    GetAllLeaves,
    GetLeaveById,
    CreateLeave,
    UpdateLeave,
    DeleteLeave
};