import {del, get, patch} from "../utils/api";

const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:5000/api";

const GetSetting = async () => get(`${API_URL}/setting`);

const UpdateSetting = async (id, params) => patch(`${API_URL}/setting/${id}`, params);

const AddCompanyLeave = async (id, params) => patch(`${API_URL}/setting/company/leave/${id}`, params); 

const DeleteCompanyLeaves = async (id) => del(`${API_URL}/setting/delete/company/leave/${id}`); 

export const SettingService = {
    GetSetting,
    UpdateSetting,
    AddCompanyLeave,
    DeleteCompanyLeaves

};
