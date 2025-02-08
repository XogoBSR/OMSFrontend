import React, { useContext, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import User from "screens/User";
import MainLayout from "./layouts/MainLayout";
import Department from "screens/Department";
import FormUser from "./screens/User/Form";
import FormDepartment from "./screens/Department/Form";
import Designation from "./screens/Designation";
import FormDesignation from "./screens/Designation/Form";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./screens/Auth/Login";
import Dashboard from "./screens/Dashboard";
import Attendance from "./screens/Attendance";
import FormAttendance from "./screens/Attendance/Form";
import Expenses from "./screens/Expenses";
import FormExpenses from "./screens/Expenses/Form";
import Report from "./screens/Report";
import CreateUser from "./screens/User/Create";
import Leaves from "./screens/Leave";
import FormLeave from "./screens/Leave/Form";
import Setting from "./screens/Setting";
import Profile from "./screens/Profile";
import Timeline from "screens/Timeline";
import LeaveReport from "screens/LeaveReport/LeaveReport";
import Approval from "screens/LeaveApproval/Approval";
import LeaveConfiguration from "screens/LeaveConfiguration/LeaveConfiguration";
import LeaveCalendar from "screens/LeaveCalendar/LeaveCalendar";
import { useSelector } from "react-redux";
import { UserSelector } from "./selectors";
import TimeRequest from "screens/ActivityTimeline/TimeRequest";
import ProductList from "screens/Product/ProductList";
import Client from "screens/Client/Client";
import Tasklist from "screens/Product/Tasklist";
import ProductListStaff from "screens/Product/Staff/ProductListStaff";
import TaskListNote from "screens/Product/Staff/TaskListNote";
import TaskHistoryAdmin from "screens/Product/components/TaskHistoryAdmin";



const PrivateRoutes = [
    { path: "/app/user", component: User },
    { path: "/app/user/create", component: CreateUser },
    { path: "/app/user/update/:id", component: FormUser },
    { path: "/app/department", component: Department },
    { path: "/app/department/create", component: FormDepartment },
    { path: "/app/department/update/:id", component: FormDepartment },
    { path: "/app/designation", component: Designation },
    { path: "/app/designation/create", component: FormDesignation },
    { path: "/app/designation/update/:id", component: FormDesignation },
    { path: "/app/attendance", component: Attendance },
    { path: "/app/attendance/create", component: FormAttendance },
    { path: "/app/attendance/update/:id", component: FormAttendance },
    { path: "/app/expenses", component: Expenses },
    { path: "/app/expenses/create", component: FormExpenses },
    { path: "/app/expenses/update/:id", component: FormExpenses },
    { path: "/app/leave", component: Leaves, role: "admin" },
    { path: "/app/user/leave", component: Leaves },
    { path: "/app/leave/create", component: FormLeave },
    { path: "/app/leave/update/:id", component: FormLeave },
    { path: "/app/leave/report", component: LeaveReport },
    { path: "/app/leave/approval", component: Approval },
    { path: "/app/leave/configuration", component: LeaveConfiguration },
    { path: "/app/leave/calendar", component: LeaveCalendar },
    { path: '/app/project/list', component: ProductList},
    { path: "/app/timesheet", component: Leaves, role: "admin" },
    { path: "/app/timeline/overview"},
    { path: "/app/timeline/request", component: TimeRequest},
    { path: "/app/timeline/taskrequest"},
    { path: "/app/timeline/workschedule"},
    { path: "/app/report", component: Report },
    { path: "/app/setting", component: Setting },
    { path: "/app/profile", component: Profile },
    { path: "/app/dashboard", component: Dashboard },
    { path: "/app/timeline", component: Timeline },
    { path: "/app/user/timeline", component: Timeline },
    { path: '/app/project/timesheet', component: ProductList},
    { path: '/app/client', component: Client},
    { path: '/app/project/update', component: TaskHistoryAdmin},
    { path: '/app/tasks', component: Tasklist},
    { path: '/app/user/projects', component: ProductListStaff}
];

export default function Routes() {
    const profile = useSelector(UserSelector.profile());
    const [userRole, setUserRole] = useState([]);

    useEffect(() => {
        if (profile) {
            console.log("PROFILE ROUTES", profile);
            
        }
        console.log("PROFILE ROUTES Arr", userRole);
    }, [profile]);

    const handleLeaveClick = (event) => {
        event.preventDefault();
        console.log('Leave button clicked, but not navigating.');
    };

    return (
        <Switch>
            <Route exact={true} path={PrivateRoutes.map(item => item.path)}>
                <MainLayout>
                    <Switch>
                        {PrivateRoutes.map((item, i) => {
                           
                            if (item.path === '/app/leave' && userRole[0] !== item.role) {
                                
                                return (
                                    <Route key={i} exact path={item.path} render={(props) => (
                                        <item.component {...props} onClick={handleLeaveClick} />
                                    )} />
                                );
                            }
                            return <Route key={i} exact path={item.path} component={item.component} />;
                        })}
                    </Switch>
                </MainLayout>
            </Route>

            <Route exact={true} path={["/"]}>
                <AuthLayout>
                    <Switch>
                        <Route exact path="/" component={Login} />
                    </Switch>
                </AuthLayout>
            </Route>
        </Switch>
    );
}
