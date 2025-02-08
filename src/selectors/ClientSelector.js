import {createSelector} from "@reduxjs/toolkit";

const clientSelector = (state) => state.client;

const getClients = () => createSelector(
    clientSelector,
    client => client.clients
);

const getPagination = () => createSelector(
    clientSelector,
    client => client.pagination
)

export const ClientSelector = {
    getClients,
    getPagination
};