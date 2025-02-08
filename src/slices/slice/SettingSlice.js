import { createSlice } from "@reduxjs/toolkit";

export const SettingSlice = createSlice({
    name: "setting",
    initialState: {
        setting: {}
    },
    reducers: {
        getSetting: () => {},
        getSettingSuccess: (state, action) => {
            state.setting = action.payload;
        },
        updateSetting: () => {},
        addCompanyLeave: () => {},
        deleteAllCompanyLeave: () => {}
    }
});

export default SettingSlice;