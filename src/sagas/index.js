import {all, fork} from 'redux-saga/effects'
import {AuthWatcher} from "./AuthSaga";
import {UserWatcher} from "./UserSaga";
import {AttendanceWatcher} from "./AttendanceSaga";
import {DepartmentWatcher} from "./DepartmentSaga";
import {DesignationWatcher} from "./DesignationSaga";
import {ExpenseWatcher} from "./ExpenseSaga";
import {LeaveWatcher} from "./LeaveSaga";
import {SettingWatcher} from "./SettingSaga";
import { ActivityWatcher } from './ActivitySaga';
import { TimelineWatcher } from './TimelineSaga';
import { ProductWatcher } from './ProductSaga';
import { ClientWatcher } from './ClientSaga';


export default function *rootSaga() {
    yield all([
        AuthWatcher,
        UserWatcher,
        AttendanceWatcher,
        DepartmentWatcher,
        DesignationWatcher,
        ExpenseWatcher,
        LeaveWatcher,
        SettingWatcher,
        ActivityWatcher,
        TimelineWatcher,
        ProductWatcher,
        ClientWatcher
    ].map(fork));
}