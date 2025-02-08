import { ActivityService } from "services/ActivityService";
import {ActivityActions, GeneralActions} from "../slices/actions";
import {all, call, put, takeLatest} from 'redux-saga/effects'


function *createTodayGoal({type, payload}) {
    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        console.warn("Create Today Goal",payload)
        const result = yield call(ActivityService.createTodayGoal, payload);
        const resultHis = yield call(ActivityService.getUserActivityHistory,payload.id);
        const data = yield resultHis.json()
        // console.warn("Create Today Goal with data ",data)
        yield put(ActivityActions.getUserActivitySuccessfull(data));
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }
}

function *getUserActivityHistory({type,payload}) {

    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        console.warn("Get User Activvity History ",payload.id) 
        const result = yield call(ActivityService.getUserActivityHistory,payload.id);
        const data = yield result.json()
        console.log(" User Activity Data ",data)
         yield put(ActivityActions.getUserActivitySuccessfull(data));
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }
}

function *updateCheckOutStatus({type,payload}) {
    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
         console.warn("payload check out ",payload)
        const result = yield call(ActivityService.updateCheckOutStatus,payload);
        const data = yield result.json()
       
        const result1 = yield call(ActivityService.getUserActivityHistory,payload.user);
        const data1 = yield result1.json()
        console.warn("payload check out ",data1)
         yield put(ActivityActions.getUserActivitySuccessfull(data1));
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }
}

function *updateBreakInStatus({type,payload}) {
    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        console.warn("payload break in ",payload)
        const result = yield call(ActivityService.updateBreakInStatus,payload);
        const data = yield result.json()
        const resultHis = yield call(ActivityService.getUserActivityHistory,payload.user);
        const data1 = yield resultHis.json()
        console.log("Break in SAGA ",data1)
        yield put(ActivityActions.getUserActivitySuccessfull(data1));
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }
}

function *updateBreakOutStatus({ type, payload }) {
    try {
      yield put(GeneralActions.removeError(type));
      yield put(GeneralActions.startLoading(type));
  
      // Perform the break out status update
      const result = yield call(ActivityService.updateBreakOutStatus, payload);
      const data = yield result.json();
  
      // Fetch the updated user activity history
      console.warn("Payload Break Out ",payload)
      const resultHis = yield call(ActivityService.getUserActivityHistory,payload.user);
      const data1 = yield resultHis.json();
    console.warn(" Updated Break Out Saga ",data1)
      // Dispatch the updated user activity history
      yield put(ActivityActions.getUserActivitySuccessfull(data1));
      yield put(GeneralActions.stopLoading(type))
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Unknown error occurred";
      yield put(GeneralActions.addError({
        action: type,
        message: errorMessage
      }));
    } finally {
      yield put(GeneralActions.stopLoading(type));
    }
  }
  
function *updateTodayStatus({type,payload}){
    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        const result = yield call(ActivityService.updateTodayStatus,payload);
        const data = yield result.json()
        console.log("Today Status Payload ",payload)
        const result1 = yield call(ActivityService.getUserActivityHistory,payload.user);
        const data1 = yield result1.json()
         yield put(ActivityActions.getUserActivitySuccessfull(data1));
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }

}

function *updateLateCheckIn({type,payload}){
    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        console.log("Update late check in ",payload._id)
        const result = yield call(ActivityService.updateLateCheckInStatus,payload);
        const data = yield result.json()
        const resultHis = yield call(ActivityService.getUserActivityHistory,payload.user);
        const data1 = yield resultHis.json()
        yield put(ActivityActions.getUserActivitySuccessfull(data1));
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }

}

function *updateEarlyCheckOut({type,payload}){

    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        const result = yield call(ActivityService.updateEarlyCheckOutStatus,payload);
        const data = yield result.json()
        console.log("Update Early  check in ",payload._id)
        const resultHis = yield call(ActivityService.getUserActivityHistory,payload.user);
        const data1 = yield resultHis.json()
        yield put(ActivityActions.getUserActivitySuccessfull(data1));
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }

}

function *updateIdelStart({type,payload}) {
    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        const result = yield call(ActivityService.updateIdelStartStatus,payload);
        // const data = yield result.json()
        const resultHis = yield call(ActivityService.getUserActivityHistory,payload.user);
        const data1 = yield resultHis.json()
        yield put(ActivityActions.getUserActivitySuccessfull(data1));
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }
}

function *updateIdelEnd({type,payload}) {
    try {
        console.log("IDEL END ")
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        const result = yield call(ActivityService.updateIdelEndStatus,payload);
        const data = yield result.json()
        const resultHis = yield call(ActivityService.getUserActivityHistory,payload.user);
        const data1 = yield resultHis.json()
        yield put(ActivityActions.getUserActivitySuccessfull(data1));
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }

}

function *updateProductiityStatus({type,payload}) {
    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
         console.log("Productivity Status ",payload)
        const result = yield call(ActivityService.updateProductivityStatus,payload);
        const data = yield result.json()

        const resultHis = yield call(ActivityService.getUserActivityHistory,payload.user);
        const data1 = yield resultHis.json()
        yield put(ActivityActions.getUserActivitySuccessfull(data1));
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }
}

function *overLimitBreakStatus({type,payload}) {
    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        // console.log("OVER LIMIT STATUS ")
        const result = yield call(ActivityService.updateOverLimitBreakStatus,payload);
        const data = yield result.json()
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }
}



export function *ActivityWatcher() {
    yield all([
        yield takeLatest(ActivityActions.createTodayGoal.type, createTodayGoal),
        yield takeLatest(ActivityActions.getUserActivity.type, getUserActivityHistory),
        yield takeLatest(ActivityActions.checkOutStatusUpdate.type, updateCheckOutStatus),
        yield takeLatest(ActivityActions.breakStartRed.type, updateBreakInStatus),
        yield takeLatest(ActivityActions.breakEndRed.type, updateBreakOutStatus),
        yield takeLatest(ActivityActions.createTodayStatus.type,updateTodayStatus),
        yield takeLatest(ActivityActions.lateCheckIn.type,updateLateCheckIn),
        yield takeLatest(ActivityActions.earlyCheckOut.type,updateEarlyCheckOut),
        yield takeLatest(ActivityActions.idelStartRed.type,updateIdelStart),
        yield takeLatest(ActivityActions.idelEndRed.type,updateIdelEnd),
        yield takeLatest(ActivityActions.overLimitBreakRed.type,overLimitBreakStatus),
        yield takeLatest(ActivityActions.productivityStatusRed.type,updateProductiityStatus)
 ]);
}