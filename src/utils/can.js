import store from "../store";
import {actions, features} from "../constants/permission";
import ROLES from "../constants/role";

function defineAbility(roles) {
    let permissions = [
        { act: actions.readAll, feat: 'All' }
    ];

    if (roles.includes(ROLES.admin.id)) {
        permissions = [
            ...permissions,
            { act: actions.read, feat: features.department },
            { act: actions.read, feat: features.designation },
            { act: actions.read, feat: features.expense },
            { act: actions.create, feat: features.department },
            { act: actions.create, feat: features.designation },
            { act: actions.create, feat: features.expense },
            { act: actions.update, feat: features.setting },
            { act: actions.readAll, feat: features.leavereport},
            { act: actions.readAll, feat: features.approve},
            { act: actions.readAll, feat: features.configuration},
            { act: actions.readAll, feat: features.calendar},
            {act: actions.readAll, feat: features.overview},
            {act: actions.readAll, feat: features.timerequest},
            {act: actions.readAll, feat: features.taskrequest},
            {act: actions.readAll, feat: features.workschedule},
            {act: actions.readAll, feat: features.projectlist},
            {act: actions.readAll, feat: features.projectoverview},
            {act: actions.readAll, feat: features.projecttimesheet},
            {act: actions.readAll, feat: features.client},
            {act: actions.readAll, feat: features.projects},
            {act: actions.readAll, feat: features.timeline},
            {act: actions.readAll, feat: features.leave},


        ]
    }

    if ([ROLES.admin.id, ROLES.humanresource.id].some(e => roles.includes(e))) {
        permissions = [
            ...permissions,
            { act: actions.readAll, feat: features.user },
            { act: actions.readAll, feat: features.department},
            { act: actions.readAll, feat: features.attendance},
            { act: actions.readAll, feat: features.expense },
            { act: actions.readAll, feat: features.leave },
            { act: actions.readAll, feat: features.report },
            { act: actions.create, feat: features.user },
            {act: actions.create, feat: features.projectlist},
            {act: actions.readAll, feat: features.projectoverview},
            {act: actions.readAll, feat: features.projecttimesheet},
            {act: actions.readAll, feat: features.client},
            {act: actions.readAll, feat: features.projects},
            {act: actions.readAll, feat: features.timeline},
            {act: actions.readAll, feat: features.leave},
        ];
    }

    if ([ROLES.admin.id, ROLES.humanresource.id, ROLES.manager.id].some(e => roles.includes(e))) {
        permissions = [
            ...permissions,
            { act: actions.read, feat: features.user },
            { act: actions.read, feat: features.attendance },
            { act: actions.read, feat: features.leave },
            { act: actions.read, feat: features.report },
            {act: actions.create, feat: features.projectlist},
            {act: actions.readAll, feat: features.projectoverview},
            {act: actions.readAll, feat: features.projecttimesheet},
            {act: actions.readAll, feat: features.client},
            {act: actions.readAll, feat: features.projects},
            {act: actions.readAll, feat: features.timeline},
            {act: actions.readAll, feat: features.leave},
            
        ];
    }

    if (roles.includes(ROLES.manager.id)) {
        permissions = [
            ...permissions,
            { act: actions.readSome, feat: features.user },
            { act: actions.readSome, feat: features.attendance },
            { act: actions.readSome, feat: features.leave },
            { act: actions.readSome, feat: features.report },
            { act: actions.readAll, feat: features.leavereport},
            { act: actions.readAll, feat: features.approve},
            { act: actions.readAll, feat: features.configuration},
            { act: actions.readAll, feat: features.calendar},
            {act: actions.readAll, feat: features.projectlist},
            {act: actions.readAll, feat: features.projectoverview},
            {act: actions.readAll, feat: features.projecttimesheet},
            {act: actions.readAll, feat: features.client},
            {act: actions.readAll, feat: features.projects},
            {act: actions.readAll, feat: features.timeline},
            {act: actions.readAll, feat: features.leave},
        ]
    }

    if ([ROLES.employee.id].some(e => roles.includes(e))) {
        permissions = [
            ...permissions,
            { act: actions.read, feat: features.attendance },
            { act: actions.readSelf, feat: features.attendance },
            // { act: actions.read, feat: features.leave },
            // { act: actions.readSelf, feat: features.leave },
            {act: actions.read, feat: features.tasks},
            {act: actions.read, feat: features.projectsemployee},
            {act: actions.readAll, feat: features.tasknote},
            {act: actions.read, feat: features.usertimeline},
            {act: actions.readSelf, feat: features.userleave},
        ]
    }

    return permissions;
}

export default function Can(act, feat) {
    
    const state = store.getState();
    // console.log("MAIN STATE ",state)
    const roles = state.user.profile?.role ?? [];
    const permissions = defineAbility(roles);

    return Boolean(permissions.find(e => e.act === act && e.feat === feat));
}