import { createSlice } from "@reduxjs/toolkit";

export const ClientSlice = createSlice({
    name: "client",
    initialState: {
        clients:[],
        pagination:{}
    },
    reducers: {
        getClients: () => {
            
        },
        createClient: () => {
 
        },
        getSuccessfullyClients: (state, action) => {
            console.log("CLient Payload ",action.payload.data)
            state.clients = [];
            state.pagination = {};
            state.clients = action.payload.data;
            state.pagination = action.payload.pagination;

        },
        deleteClient: () => {},
        updateClient: () => {}
    }
});

export default ClientSlice;