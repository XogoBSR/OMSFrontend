import {all, call, put, takeLatest} from 'redux-saga/effects'
import {AttendanceService} from "../services";
import {AttendanceActions, GeneralActions} from "../slices/actions";

function *getAttendances({type, payload}) {
    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        console.warn("Get Attendeces saga payload ",payload)
        const result = yield call(AttendanceService.GetAttendances, payload);
         console.warn("Get Attendeces saga ",result)
        yield put(AttendanceActions.getAttendancesSuccess(result.data));
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }
}

function *getAttendanceById({type, payload}) {
    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        const result = yield call(AttendanceService.GetAttendanceById, payload);
        yield put(AttendanceActions.getAttendanceByIdSuccess(result.data));
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }
}

function *createAttendance({type, payload}) {
    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        console.warn("Create Attendeces saga payload ",payload)
        const result = yield call(AttendanceService.CreateAttendance, payload);
        console.warn("Create Attendeces result ",result)
        let attendancePayload = {
            user: payload.user,
            date: payload.checkIn
        }
        const resultAtte = yield call(AttendanceService.GetAttendances, attendancePayload)
        console.warn("Get Attendeces result ",resultAtte)
        yield put(AttendanceActions.getAttendancesSuccess(resultAtte.data));

        yield put(GeneralActions.addSuccess({
            action: type,
            message: result.data.message
        }));
        yield put(GeneralActions.stopLoading(type))
   
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }
}

function *updateAttendance({type, payload}) {
    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        const result = yield call(AttendanceService.UpdateAttendance, payload.id, payload);
        console.log("Check out Attendances Payload ",payload)
        // let payloadTemp = {
        //     user:payload.user,
        //     date:payload.checkOut
        // }
        // const result1 = yield call(AttendanceService.GetAttendances, payloadTemp);
         console.warn("Get Attendeces saga ",result)
        // yield put(AttendanceActions.getAttendancesSuccess(result.data));
        yield put(GeneralActions.addSuccess({
            action: type,
            message: result.data.message
        }));
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
        
    }
}

function *deleteAttendance({type, payload}) {
    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        const result = yield call(AttendanceService.DeleteAttendance, payload);
        yield put(GeneralActions.addSuccess({
            action: type,
            message: result.data.message
        }));
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }
}

function *createLunchBreak({type, payload}) {
    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        const result = yield call(AttendanceService.CreateLunch, payload.id, payload);
        yield put(GeneralActions.addSuccess({
            action: type,
            message: result.data.message
        }));
    
        yield put(GeneralActions.stopLoading(type))

    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }
}

function *updateLunchBreak({type,payload}) {
    try {
  
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        const result = yield call(AttendanceService.UpdateLunch, payload.id, payload);
        yield put(GeneralActions.addSuccess({
            action: type,
            message: result.data.message
        }));
        yield put(GeneralActions.stopLoading(type))
    

    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }

}

function *getAttendanceByMonth({type,payload}) {
    try {
  
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        const result = yield call(AttendanceService.GetAttendanceByMonth, payload.startDate, payload.endDate);
        console.log(" Month Attendances ",result.data)
        yield put(AttendanceActions.getAttendancesSuccess(result.data));
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }
}

export function *AttendanceWatcher() {
    yield all([
        yield takeLatest(AttendanceActions.getAttendances.type, getAttendances),
        yield takeLatest(AttendanceActions.getAttendanceById.type, getAttendanceById),
        yield takeLatest(AttendanceActions.createAttendance.type, createAttendance),
        yield takeLatest(AttendanceActions.updateAttendance.type, updateAttendance),
        yield takeLatest(AttendanceActions.deleteAttendance.type, deleteAttendance),
        yield takeLatest(AttendanceActions.createLunchBreak.type, createLunchBreak),
        yield takeLatest(AttendanceActions.updateLunchBreak.type, updateLunchBreak),
        yield takeLatest(AttendanceActions.getAttendancesByMonth.type, getAttendanceByMonth),

    ]);
}