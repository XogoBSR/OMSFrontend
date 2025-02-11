import React from "react";
import {
    AccountBalance,
    AccountBalanceWallet,
    AccountTree, Assignment, AssignmentIndOutlined, CalendarToday,
    Dashboard,
    People, Settings,
    MoreTime,
    Task,
    ContactPage,
    EventNote
    
} from "@mui/icons-material";
import {actions, features} from "../../constants/permission";


const Menus = [
    { name: "Dashboard", icon: <Dashboard/>, path: "/app/dashboard", act: actions.readAll, feat: 'All' },
    { name: "Employee", icon: <People/>, path: "/app/user", act: actions.read, feat: features.user },
    { name: "Department", icon: <AccountBalance/>, path: "/app/department", act: actions.read, feat: features.department },
    { name: "Designation", icon: <AccountTree/>, path: "/app/designation", act: actions.read, feat: features.designation },
    { name: "Attendance", icon: <CalendarToday/>, path: "/app/attendance", act: actions.readAll, feat: 'All' },
    { name : "Projects", icon: <EventNote/>, path: '/app/user/projects',act: actions.read, feat: features.projectsemployee},
    { name : 'Projects', icon: <Task/>, path:'/app/projects',act:actions.readAll, feat: features.projects ,
        children: [
            { name: "Project Overview", path: "/app/project/overview", act: actions.readAll, feat: features.projectoverview },
            { name: "Project List", path: "/app/project/list", act: actions.readAll, feat: features.projectlist },
            { name: "Project Timesheet", path:"/app/project/timesheet", act:actions.readAll, feat: features.projecttimesheet},

        ]},
    { name: "Expenses", icon: <AccountBalanceWallet/>, path: "/app/expenses", act: actions.read, feat: features.expense },
    { name: "Leave", icon: <AssignmentIndOutlined/>, path: "/app/user/leave", act: actions.readSelf, feat: features.userleave },
    { name: "Leave", icon: <AssignmentIndOutlined/>, path: "/app/leave", act: actions.readAll, feat: features.leave,
        children: [
            { name: "Leave Report", path: "/app/leave/report", act: actions.readAll, feat: features.leavereport },
            { name: "Approval", path: "/app/leave/approval", act: actions.readAll, feat: features.approve },
            { name: "Calendar", path:"/app/leave/calendar", act:actions.readAll, feat: features.calendar},
            { name: "Configuration", path:"/app/leave/configuration", act:actions.readAll, feat: features.configuration}
        ]},
    
    { name: "Report", icon: <Assignment/>, path: "/app/report", act: actions.read, feat: features.report },
    { name: "Setting", icon: <Settings/>, path: "/app/setting", act: actions.update, feat: features.setting },
    { name: "Timeline", icon: <MoreTime/>, path: "/app/timeline", act: actions.readAll, feat: features.timeline , 
         children: [
        { name: "Overview", path: "/app/timeline/overview", act: actions.readAll, feat: features.overview },
        { name: "Time Request", path: "/app/timeline/request", act: actions.readAll, feat: features.timerequest },
        { name: "Task Request", path:"/app/timeline/taskrequest", act:actions.readAll, feat: features.taskrequest},
        { name: "Work Schedule", path:"/app/timeline/workschedule", act:actions.readAll, feat: features.workschedule}
    ]}, 
    { name: "Timeline", icon: <MoreTime/>, path: "/app/user/timeline", act: actions.read, feat: features.usertimeline}, 
    { name: "Client", icon: <ContactPage/>, path: "/app/client", act: actions.readAll, feat: features.client },
    { name: "My Tasks", icon: <ContactPage/>, path: "/app/tasks", act: actions.read, feat: features.tasks },
    
];

const getMenusForUser = (userRole) => {
    if (userRole === "admin") {
        // Filter out the parent Leave menu item
        return Menus.filter(menu => menu.path !== "/app/leave" || menu.path !== '/app/timeline');
    }
    return Menus;
};

export {getMenusForUser}



export default Menus;