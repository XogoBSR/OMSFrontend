import {del, get, patch, post} from "../utils/api";

const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:5000/api";

const GetUsers = async (params) => get(`${API_URL}/user`, params);

const GetUserById = async (id) => get(`${API_URL}/user/${id}`);

const CreateUser = async (params) => post(`${API_URL}/user`, params);

const UpdateUser = async (id, params) => patch(`${API_URL}/user/${id}`, params);

const DeleteUser = async (id) => del(`${API_URL}/user/${id}`);

const Profile = async () => get(`${API_URL}/user/profile`);

const UpdateUserLeave = async(id,params) => patch(`${API_URL}/user/update/leave/${id}`, params);

export const UserService = {
    GetUsers,
    GetUserById,
    CreateUser,
    UpdateUser,
    DeleteUser,
    Profile,
    UpdateUserLeave
};