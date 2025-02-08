import {all, call, put, takeLatest} from 'redux-saga/effects'
import {ClientService} from "../services";
import { GeneralActions, UserActions, ClientActions} from "../slices/actions";
import {push} from "connected-react-router";



function *createClient({type, payload}) {

    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        const result = yield call(ClientService.createClient, payload);
        const clients = yield call(ClientService.getClient)
        const resultClient = yield clients.json()
        console.log("Client Get ",resultClient.data)
        yield put(ClientActions.getSuccessfullyClients(resultClient))
    
        yield put(GeneralActions.stopLoading(type))
        
    } catch (err) {
       
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }
}

function *updateClient({type,payload}) {
    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        console.log(" Update Client ",payload)
        const result = yield call(ClientService.updateClient, payload.id,payload);
        const clients = yield call(ClientService.getClient)
        const resultClient = yield clients.json()
        console.log("Client Get ",resultClient.data)
        yield put(ClientActions.getSuccessfullyClients(resultClient))
    
        yield put(GeneralActions.stopLoading(type))
        
    } catch (err) {
       
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }
}

function *deleteClient({type,payload}) {
    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        console.log(" Delete  Client ",payload)
        const result = yield call(ClientService.deleteClient, payload);
        const clients = yield call(ClientService.getClient)
        const resultClient = yield clients.json()
        console.log("Client Get ",resultClient.data)
        yield put(ClientActions.getSuccessfullyClients(resultClient))
    
        yield put(GeneralActions.stopLoading(type))
        
    } catch (err) {
       
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }
}

function *getClient({type,payload}) {
    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        const clients = yield call(ClientService.getClient)
        const result = yield clients.json()
        console.log("Client Get ",result.data)
        yield put(ClientActions.getSuccessfullyClients(result))

        yield put(GeneralActions.stopLoading(type));
       
    
    } catch (err) {
       
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.message
        }));
    }
}

export function *ClientWatcher() {
    yield all([
        yield takeLatest(ClientActions.createClient.type, createClient),
        yield takeLatest(ClientActions.updateClient.type, updateClient),
        yield takeLatest(ClientActions.deleteClient.type, deleteClient),
        yield takeLatest(ClientActions.getClients.type, getClient),

    ]);
}