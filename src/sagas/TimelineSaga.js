import {all, call, put, takeLatest} from 'redux-saga/effects'
import {ActivityActions, GeneralActions, TimelineActions} from "../slices/actions";
import { TimelineService } from 'services/TimelineService';


function *createTimelineRequest({type,payload}) {

    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        const result = yield call(TimelineService.CreateTimelineRequest, payload);
        const resultHis = yield call(TimelineService.GetTimelineRequests)
        console.warn("Create  Timeline Saga ",resultHis)
        yield put(TimelineActions.getTimelineRequestsSuccess(resultHis.data));
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }

}

function *updateTimelineRequest({type,payload}) {
    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        console.warn("Update Timeline Saga ",payload)
        const result = yield call(TimelineService.UpdateTimelineRequest, payload);
        console.warn("Update Timeline Saga ",result)
        yield put(TimelineActions.getTimelineRequestsSuccess(result.data));
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }
}

function *getTimelineRequests({type,payload}) {
          try {
                yield put(GeneralActions.removeError(type));
                yield put(GeneralActions.startLoading(type));
                console.warn("Get Timeline Saga ",payload)
                const result = yield call(TimelineService.GetTimelineRequests, payload);
                yield put(TimelineActions.getTimelineRequestsSuccess(result.data));
                yield put(GeneralActions.stopLoading(type))
            } catch (err) {
                yield put(GeneralActions.stopLoading(type));
                yield put(GeneralActions.addError({
                    action: type,
                    message: err.response?.data?.error
                }));
            }
}

function *getTimelineRequestByDate({type,payload}){
    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        console.warn("Get Timeline By Date  ",payload)
        const result = yield call(TimelineService.GetTimelineRequestByDate, payload.id,payload.date);
        yield put(TimelineActions.getTimelineRequestsSuccess(result.data));
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }
}

export function *TimelineWatcher() {
        yield all([
        yield takeLatest(TimelineActions.createTimelineRequest.type,createTimelineRequest),
        yield takeLatest(TimelineActions.updateTimelineRequest.type,updateTimelineRequest),
        yield takeLatest(TimelineActions.getTimelineRequests.type,getTimelineRequests),
        yield takeLatest(TimelineActions.getTimelineRequestByDate.type,getTimelineRequestByDate),
        ])
} 