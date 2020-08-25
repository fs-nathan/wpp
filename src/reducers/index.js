import { combineReducers } from "redux";
import { pluginSettings } from "views/HomePage/redux/pluginSettings";
import { postModule } from "views/HomePage/redux/post";
import { weekScheduleModule } from "views/HomePage/redux/weekSchedule";
import { settingGroupPermission } from "views/SettingGroupPage/GroupPermissionSettings/redux";
import { settingGroupHome } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux";
import apiCall from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/reducer";
import { apiKeyModule } from "webpush";
import taskReducer from "../views/JobPage/redux/reducers";
import offerReducer from "../views/OfferPage/redux/reducers";
import updateSchedule, {
  initialState as updateScheduleInitialState,
} from "././calendar/weeklyCalendar/updateSchedule";
import authentications, {
  initialState as authenticationsInitialState,
} from "./authentications";
import createPersonalRemind, {
  initialState as createPersonalRemindInitialState,
} from "./calendar/alarmCalendar/createPersonalRemind";
import createPersonalRemindCategory, {
  initialState as createPersonalRemindCategoryInitialState,
} from "./calendar/alarmCalendar/createPersonalRemindCategory";
import listPersonalRemind, {
  initialState as listPersonalRemindInitialState,
} from "./calendar/alarmCalendar/listPersonalRemind";
import listPersonalRemindCategory, {
  initialState as listPersonalRemindCategoryInitialState,
} from "./calendar/alarmCalendar/listPersonalRemindCategory";
import listRemindProject, {
  initialState as listRemindProjectInitialState,
} from "./calendar/alarmCalendar/listRemindProject";
import listRemindRecently, {
  initialState as listRemindRecentlyInitialState,
} from "./calendar/alarmCalendar/listRemindRecently";
import updatePersonalRemindCategory, {
  initialState as updatePersonalRemindCategoryInitialState,
} from "./calendar/alarmCalendar/updatePersonalRemindCategory";
import listCalendarPermission, {
  initialState as listCalendarPermissionInitialState,
} from "./calendar/permission/listPermission";
import projectGroupAddDayOff, {
  initialState as projectGroupAddDayOffInitialState,
} from "./calendar/projectCalendar/addDayOff";
import projectGroupAddWorkingDays, {
  initialState as projectGroupAddWorkingDaysInitialState,
} from "./calendar/projectCalendar/addWorkingDay";
import projectCalendarAddWorkingStage, {
  initialState as projectCalendarAddWorkingStageInitialState,
} from "./calendar/projectCalendar/addWorkingStage";
import createProjectGroupSchedule, {
  initialState as createProjectGroupScheduleInitialState,
} from "./calendar/projectCalendar/createProjectGroupSchedule";
import projectCalendarCreateShiftStage, {
  initialState as projectCalendarCreateShiftStageInitialStage,
} from "./calendar/projectCalendar/createShiftStage";
import projectCalendarCreateShiftStageAllTime, {
  initialState as projectCalendarCreateShiftStageAllTimeInitialState,
} from "./calendar/projectCalendar/createShiftStageAllTime";
import projectGroupDeleteDayOff, {
  initialState as projectGroupDeleteDayOffInitialState,
} from "./calendar/projectCalendar/deleteDayOff";
import deleteProjectGroupSchedule, {
  initialState as deleteProjectGroupScheduleInitialState,
} from "./calendar/projectCalendar/deleteProjectGroupSchedule";
import projectCalendarDeleteShiftStage, {
  initialState as projectCalendarDeleteShiftStageInitialStage,
} from "./calendar/projectCalendar/deleteShiftStage";
import projectCalendarDeleteShiftStageAllTime, {
  initialState as projectCalendarDeleteShiftStageAllTimeInitialState,
} from "./calendar/projectCalendar/deleteShiftStageAllTime";
import projectGroupDeleteWorkingDays, {
  initialState as projectGroupDeleteWorkingDayInitialState,
} from "./calendar/projectCalendar/deleteWorkingDay";
import projectCalendarDeleteWorkingStage, {
  initialState as projectCalendarDeleteWorkingStageInitialState,
} from "./calendar/projectCalendar/deleteWorkingStage";
import getProjectGroupScheduleDetail, {
  initialState as getProjectGroupScheduleDetailInitialState,
} from "./calendar/projectCalendar/getGroupScheduleDetail";
import listProjectGroupSchedule, {
  initialState as listProjectGroupScheduleInitialState,
} from "./calendar/projectCalendar/listSchedule";
import projectGroupSettingStartingDay, {
  initialState as projectGroupSettingStartingDayInitialState,
} from "./calendar/projectCalendar/settingStartingDay";
import projectGroupSetWorkingDay, {
  initialState as projectGroupSetWorkingDayInitialState,
} from "./calendar/projectCalendar/setWorkingDay";
import updateProjectGroupSchedule, {
  initialState as updateProjectGroupScheduleInititalState,
} from "./calendar/projectCalendar/updateProjectGroupSchedule";
import projectCalendarUpdateShiftStage, {
  initialState as projectCalendarUpdateShiftStageInitialStage,
} from "./calendar/projectCalendar/updateShiftStage";
import projectCalendarUpdateShiftStageAllTime, {
  initialState as projectCalendarUpdateShiftStageAllTimeInitialState,
} from "./calendar/projectCalendar/updateShiftStageAllTime";
import projectCalendarUpdateWorkingStage, {
  initialState as projectCalendarUpdateWorkingStageInitialState,
} from "./calendar/projectCalendar/updateWorkingStage";
import createSchedule, {
  initialState as createScheduleInitialState,
} from "./calendar/weeklyCalendar/createSchedule";
import deleteSchedule, {
  initialState as deleteScheduleInitialState,
} from "./calendar/weeklyCalendar/deleteSchedule";
import listSchedule, {
  initialState as listScheduleInitialState,
} from "./calendar/weeklyCalendar/listSchedule";
import listScheduleOfWeek, {
  initialState as listScheduleOfWeekInitialState,
} from "./calendar/weeklyCalendar/listScheduleOfWeek";
import listScheduleOfWeekFromModal, {
  initialState as listScheduleOfWeekFromModalInitialState,
} from "./calendar/weeklyCalendar/listScheduleOfWeekFromModal";
import listWeeksInYear, {
  initialState as listWeeksInYearInitialState,
} from "./calendar/weeklyCalendar/listWeeksInYear";
import settingStartingDay, {
  initialState as settingStartingDayInitialState,
} from "./calendar/weeklyCalendar/settingStartingDay";
import chat, { initialState as chatInitialState } from "./chat/chat";
import documents from "./documents";
import gantt, { initialState as ganttInitialState } from "./gantt";
import copyGroupTask, {
  initialState as copyGroupTaskInitialState,
} from "./groupTask/copyGroupTask";
import createGroupTask, {
  initialState as createGroupTaskInitialState,
} from "./groupTask/createGroupTask";
import deleteGroupTask, {
  initialState as deleteGroupTaskInitialState,
} from "./groupTask/deleteGroupTask";
import getAllGroupTask, {
  initialState as getAllGroupTaskInitialState,
} from "./groupTask/getAllGroupTask";
import listGroupTask1, {
  initialState as listGroupTaskInitialState,
} from "./groupTask/listGroupTask";
import sortGroupTask, {
  initialState as sortGroupTaskInitialState,
} from "./groupTask/sortGroupTask";
import updateGroupTask, {
  initialState as updateGroupTaskInitialState,
} from "./groupTask/updateGroupTask";
import acceptRequirementJoinGroup, {
  initialState as acceptRequirementJoinGroupInitialState,
} from "./groupUser/acceptRequirementJoinGroup";
import cancleInvitationJoinGroup, {
  initialState as cancleInvitationJoinGroupInitialState,
} from "./groupUser/cancleInvitationJoinGroup";
import getListGroup, {
  initialState as getListGroupInitialState,
} from "./groupUser/getListGroup";
import getListInvitationSent, {
  initialState as getListInvitationSentInitialState,
} from "./groupUser/getListInvitationSent";
import getRequirementJoinGroup, {
  initialState as getRequirementJoinGroupInitialState,
} from "./groupUser/getRequirementJoinGroup";
import inviteUserJoinGroup, {
  initialState as inviteUserJoinGroupInitialState,
} from "./groupUser/inviteUserJoinGroup";
import rejectRequirementJoinGroup, {
  initialState as rejectRequirementJoinGroupInitialState,
} from "./groupUser/rejectRequirementJoinGroup";
import resendInvitationUserJoinGroup, {
  initialState as resendInvitationUserJoinGroupInitialState,
} from "./groupUser/resendInvitationUserJoinGroup";
import searchUser, {
  initialState as searchUserInitialState,
} from "./groupUser/searchUser";
import createIcon, {
  initialState as createIconInitialState,
} from "./icon/createIcon";
import deleteIcon, {
  initialState as deleteIconInitialState,
} from "./icon/deleteIcon";
import listIcon, {
  initialState as listIconInitialState,
} from "./icon/listIcon";
import createLevel, {
  initialState as createLevelInitialState,
} from "./level/createLevel";
import deleteLevel, {
  initialState as deleteLevelInitialState,
} from "./level/deleteLevel";
import listLevel, {
  initialState as listLevelInitialState,
} from "./level/listLevel";
import updateLevel, {
  initialState as updateLevelInitialState,
} from "./level/updateLevel";
import localStorage, {
  initialState as localStorageInitialState,
} from "./localStorage";
import createMajor, {
  initialState as createMajorInitialState,
} from "./major/createMajor";
import deleteMajor, {
  initialState as deleteMajorInitialState,
} from "./major/deleteMajor";
import listMajor, {
  initialState as listMajorInitialState,
} from "./major/listMajor";
import updateMajor, {
  initialState as updateMajorInitialState,
} from "./major/updateMajor";
import createPosition, {
  initialState as createPositionInitialState,
} from "./position/createPosition";
import deletePosition, {
  initialState as deletePositionInitialState,
} from "./position/deletePosition";
import listPosition, {
  initialState as listPositionInitialState,
} from "./position/listPosition";
import updatePosition, {
  initialState as updatePositionInitialState,
} from "./position/updatePosition";
import addMemberProject, {
  initialState as addMemberProjectInitialState,
} from "./project/addMemberProject";
import addProjectRoleToMember, {
  initialState as addProjectRoleToMemberInitialState,
} from "./project/addProjectRoleToMember";
import assignMemberToAllTask, {
  initialState as assignMemberToAllTaskInitialState,
} from "./project/assignMemberToAllTask";
import copyProject, {
  initialState as copyProjectInitialState,
} from "./project/copyProject";
import createProject, {
  initialState as createProjectInitialState,
} from "./project/createProject";
import deleteProject, {
  initialState as deleteProjectInitialState,
} from "./project/deleteProject";
import deleteTrashProject, {
  initialState as deleteTrashProjectInitialState,
} from "./project/deleteTrashProject";
import detailProject, {
  initialState as detailProjectInitialState,
} from "./project/detailProject";
import hideProject, {
  initialState as hideProjectInitialState,
} from "./project/hideProject";
import listProjectBasicInfo, {
  initialState as listProjectBasicInfoInitialState,
} from "./project/listBasicInfo";
import listDeletedProject, {
  initialState as listDeletedProjectInitialState,
} from "./project/listDeletedProject";
import listProject, {
  initialState as listProjectInitialState,
} from "./project/listProject";
import memberProject, {
  initialState as memberProjectInitialState,
} from "./project/memberProject";
import permissionProject, {
  initialState as permissionProjectInitialState,
} from "./project/permissionProject";
import removeGroupPermissionMember, {
  initialState as removeGroupPermissionMemberInitialState,
} from "./project/removeGroupPermissionMember";
import removeMemberProject, {
  initialState as removeMemberProjectInitialState,
} from "./project/removeMemberProject";
import removeProjectRoleFromMember, {
  initialState as removeProjectRoleFromMemberInitialState,
} from "./project/removeProjectRoleFromMember";
import restoreTrashProject, {
  initialState as restoreTrashProjectInitialState,
} from "./project/restoreTrashProject";
import detailStatus, {
  initialState as detailStatusInitialState,
} from "./project/setting/detailStatus";
import updateStatusCopy, {
  initialState as updateStatusCopyInitialState,
} from "./project/setting/updateStatusCopy";
import updateStatusDate, {
  initialState as updateStatusDateInitialState,
} from "./project/setting/updateStatusDate";
import updateStatusView, {
  initialState as updateStatusViewInitialState,
} from "./project/setting/updateStatusView";
import updateNotificationSetting, {
  initialState as updateNotificationSettingInitialState,
} from "./project/setting/updateNotificationSetting";
import showProject, {
  initialState as showProjectInitialState,
} from "./project/showProject";
import sortProject, {
  initialState as sortProjectInitialState,
} from "./project/sortProject";
import updateGroupPermissionMember, {
  initialState as updateGroupPermissionMemberInitialState,
} from "./project/updateGroupPermissionMember";
import updateProject, {
  initialState as updateProjectInitialState,
} from "./project/updateProject";
import updateStateJoinTask, {
  initialState as updateStateJoinTaskInitialState,
} from "./project/updateStateJoinTask";
import createProjectGroup, {
  initialState as createProjectGroupInitialState,
} from "./projectGroup/createProjectGroup";
import deleteProjectGroup, {
  initialState as deleteProjectGroupInitialState,
} from "./projectGroup/deleteProjectGroup";
import detailDefaultGroup, {
  initialState as detailDefaultGroupInitialState,
} from "./projectGroup/detailDefaultGroup";
import detailProjectGroup, {
  initialState as detailProjectGroupInitialState,
} from "./projectGroup/detailProjectGroup";
import editProjectGroup, {
  initialState as editProjectGroupInitialState,
} from "./projectGroup/editProjectGroup";
import listProjectGroup, {
  initialState as listProjectGroupInitialState,
} from "./projectGroup/listProjectGroup";
import listProjectGroupDeleted, { initialState as listProjectGroupDeletedInitialState} from "./projectGroup/listProjectGroupDeleted";
import memberProjectGroup, {
  initialState as memberProjectGroupInitialState,
} from "./projectGroup/memberProjectGroup";
import sortProjectGroup, {
  initialState as sortProjectGroupInitialState,
} from "./projectGroup/sortProjectGroup";
import inviteOtherPeopleCreateAccount, {
  initialState as inviteOtherPeopleCreateAccountInitialState,
} from "./register/inviteOtherPeopleCreateAccount";
import createRoom, {
  initialState as createRoomInitialState,
} from "./room/createRoom";
import deleteRoom, {
  initialState as deleteRoomInitialState,
} from "./room/deleteRoom";
import detailRoom, {
  initialState as detailRoomInitialState,
} from "./room/detailRoom";
import getUserOfRoom, {
  initialState as getUserOfRoomInitialState,
} from "./room/getUserOfRoom";
import listRoom, {
  initialState as listRoomInitialState,
} from "./room/listRoom";
import sortRoom, {
  initialState as sortRoomInitialState,
} from "./room/sortRoom";
import updateRoom, {
  initialState as updateRoomInitialState,
} from "./room/updateRoom";
import setting, {
  initialState as settingInitialState,
} from "./setting/setting";
import system, { initialState as systemInitialState } from "./system/system";
import createTask, {
  initialState as createTaskInitialState,
} from "./task/createTask";
import deleteTask, {
  initialState as deleteTaskInitialState,
} from "./task/deleteTask";
import listTask, {
  initialState as listTaskInitialState,
} from "./task/listTask";
import sortTask, {
  initialState as sortTaskInitialState,
} from "./task/sortTask";
import taskCommand from "./taskDetail/command";
import commonTaskDetail from "./taskDetail/common";
import listGroupOffer from "./taskDetail/listGroupOffer";
import listGroupPermission from "./taskDetail/listGroupPermission";
import listGroupTask from "./taskDetail/listGroupTask";
import listDetailTask from "./taskDetail/listTaskDetail";
import location from "./taskDetail/location";
import media from "./taskDetail/media";
import taskMember from "./taskDetail/member";
import taskOffer from "./taskDetail/offer";
import taskRemind from "./taskDetail/remind";
import subTask from "./taskDetail/subTask";
import detailTask from "./taskDetail/taskDetail";
import trackingTime from "./taskDetail/time";
import banUserFromGroup, {
  initialState as banUserFromGroupInitialState,
} from "./user/banUserFromGroup";
import deleteDocumentsUser, {
  initialState as deleteDocumentsUserInitialState,
} from "./user/deleteDocumentsUser";
import detailUser, {
  initialState as detailUserInitialState,
} from "./user/detailUser";
import listUserOfGroup, {
  initialState as listUserOfGroupInitialState,
} from "./user/listOfUserGroup/listUserOfGroup";
import permissionUser, {
  initialState as permissionUserInitialState,
} from "./user/permissionUser";
import privateMember, {
  initialState as privateMemberInitialState,
} from "./user/privateMember";
import publicMember, {
  initialState as publicMemberInitialState,
} from "./user/publicMember";
import removeGroupPermissionUser, {
  initialState as removeGroupPermissionUserInitialState,
} from "./user/removeGroupPermissionUser";
import sortUser, {
  initialState as sortUserInitialState,
} from "./user/sortUser";
import updateGroupPermissionUser, {
  initialState as updateGroupPermissionUserInitialState,
} from "./user/updateGroupPermissionUser";
import updateUser, {
  initialState as updateUserInitialState,
} from "./user/updateUser";
import uploadDocumentsUser, {
  initialState as uploadDocumentsUserInitialState,
} from "./user/uploadDocumentsUser";
import createUserRole, {
  initialState as createUserRoleInitialState,
} from "./userRole/createUserRole";
import deleteUserRole, {
  initialState as deleteUserRoleInitialState,
} from "./userRole/deleteUserRole";
import listUserRole, {
  initialState as listUserRoleInitialState,
} from "./userRole/listUserRole";
import updateUserRole, {
  initialState as updateUserRoleInitialState,
} from "./userRole/updateUserRole";
import viewPermissions, {
  initialState as viewPermissionsInitialState,
} from "./viewPermissions";

const rootReducer = combineReducers({
  authentications,
  chat,
  system,
  setting,
  documents,
  taskDetail: combineReducers({
    taskOffer,
    taskRemind,
    subTask,
    media,
    taskCommand,
    commonTaskDetail,
    location,
    detailTask,
    taskMember,
    trackingTime,
    listDetailTask,
    listGroupTask,
    listGroupOffer,
    listGroupPermission,
  }),
  room: combineReducers({
    listRoom,
    detailRoom,
    getUserOfRoom,
    createRoom,
    deleteRoom,
    updateRoom,
    sortRoom,
  }),
  user: combineReducers({
    listUserOfGroup,
    sortUser,
    detailUser,
    uploadDocumentsUser,
    deleteDocumentsUser,
    updateUser,
    publicMember,
    privateMember,
    banUserFromGroup,
    permissionUser,
    updateGroupPermissionUser,
    removeGroupPermissionUser,
  }),
  icon: combineReducers({
    listIcon,
    createIcon,
    deleteIcon,
  }),
  position: combineReducers({
    listPosition,
    createPosition,
    updatePosition,
    deletePosition,
  }),
  level: combineReducers({
    listLevel,
    createLevel,
    updateLevel,
    deleteLevel,
  }),
  major: combineReducers({
    listMajor,
    createMajor,
    updateMajor,
    deleteMajor,
  }),
  userRole: combineReducers({
    listUserRole,
    createUserRole,
    updateUserRole,
    deleteUserRole,
  }),
  projectGroup: combineReducers({
    createProjectGroup,
    editProjectGroup,
    listProjectGroup,
    listProjectGroupDeleted,
    deleteProjectGroup,
    sortProjectGroup,
    detailProjectGroup,
    memberProjectGroup,
    detailDefaultGroup,
  }),
  project: combineReducers({
    createProject,
    updateProject,
    deleteProject,
    listProject,
    listDeletedProject,
    detailProject,
    hideProject,
    showProject,
    memberProject,
    permissionProject,
    addMemberProject,
    removeMemberProject,
    updateStateJoinTask,
    addProjectRoleToMember,
    removeProjectRoleFromMember,
    updateGroupPermissionMember,
    removeGroupPermissionMember,
    assignMemberToAllTask,
    sortProject,
    copyProject,
    deleteTrashProject,
    restoreTrashProject,
    listProjectBasicInfo,
    setting: combineReducers({
      detailStatus,
      updateStatusDate,
      updateStatusCopy,
      updateStatusView,
      updateNotificationSetting,
    }),
  }),
  groupTask: combineReducers({
    listGroupTask: listGroupTask1,
    createGroupTask,
    copyGroupTask,
    deleteGroupTask,
    updateGroupTask,
    sortGroupTask,
    getAllGroupTask,
  }),
  task: combineReducers({
    listTask,
    createTask,
    deleteTask,
    sortTask,
  }),
  taskPage: taskReducer,
  offerPage: offerReducer,
  groupUser: combineReducers({
    searchUser,
    inviteUserJoinGroup,
    resendInvitationUserJoinGroup,
    getRequirementJoinGroup,
    getListInvitationSent,
    acceptRequirementJoinGroup,
    rejectRequirementJoinGroup,
    cancleInvitationJoinGroup,
    getListGroup,
  }),
  register: combineReducers({
    inviteOtherPeopleCreateAccount,
  }),
  gantt,
  [settingGroupHome.key]: settingGroupHome.reducer,
  [settingGroupPermission.key]: settingGroupPermission.reducer,
  [postModule.key]: postModule.reducer,
  [weekScheduleModule.key]: weekScheduleModule.reducer,
  [apiKeyModule.key]: apiKeyModule.reducer,
  [pluginSettings.key]: pluginSettings.reducer,

  apiCall: apiCall,
  inviteOtherPeopleCreateAccount,
  viewPermissions,
  calendar: combineReducers({
    listSchedule,
    listScheduleOfWeek,
    listScheduleOfWeekFromModal,
    listWeeksInYear,
    projectGroupSetWorkingDay,
    settingStartingDay,
    listProjectGroupSchedule,
    projectCalendarAddWorkingStage,
    createSchedule,
    updateSchedule,
    listCalendarPermission,
    projectCalendarUpdateWorkingStage,
    deleteSchedule,
    listPersonalRemindCategory,
    projectCalendarCreateShiftStage,
    listRemindRecently,
    listPersonalRemind,
    projectCalendarDeleteWorkingStage,
    createProjectGroupSchedule,
    getProjectGroupScheduleDetail,
    projectCalendarUpdateShiftStage,
    projectGroupSettingStartingDay,
    projectGroupAddWorkingDays,
    projectCalendarDeleteShiftStage,
    projectGroupDeleteWorkingDays,
    projectGroupAddDayOff,
    projectGroupDeleteDayOff,
    createPersonalRemindCategory,
    createPersonalRemind,
    listRemindProject,
    projectCalendarCreateShiftStageAllTime,
    projectCalendarUpdateShiftStageAllTime,
    projectCalendarDeleteShiftStageAllTime,
    updateProjectGroupSchedule,
    deleteProjectGroupSchedule,
    updatePersonalRemindCategory,
  }),
  localStorage,
});

export const DEFAULT_STATE = {
  authentications: authenticationsInitialState,
  chat: chatInitialState,
  system: systemInitialState,
  setting: settingInitialState,
  room: {
    listRoom: listRoomInitialState,
    detailRoom: detailRoomInitialState,
    getUserOfRoom: getUserOfRoomInitialState,
    createRoom: createRoomInitialState,
    deleteRoom: deleteRoomInitialState,
    updateRoom: updateRoomInitialState,
    sortRoom: sortRoomInitialState,
  },
  user: {
    listUserOfGroup: listUserOfGroupInitialState,
    sortUser: sortUserInitialState,
    detailUser: detailUserInitialState,
    uploadDocumentsUser: uploadDocumentsUserInitialState,
    deleteDocumentsUser: deleteDocumentsUserInitialState,
    updateUser: updateUserInitialState,
    publicMember: publicMemberInitialState,
    privateMember: privateMemberInitialState,
    banUserFromGroup: banUserFromGroupInitialState,
    permissionUser: permissionUserInitialState,
    updateGroupPermissionUser: updateGroupPermissionUserInitialState,
    removeGroupPermissionUser: removeGroupPermissionUserInitialState,
  },
  icon: {
    listIcon: listIconInitialState,
    createIcon: createIconInitialState,
    deleteIcon: deleteIconInitialState,
  },
  position: {
    listPosition: listPositionInitialState,
    createPosition: createPositionInitialState,
    updatePosition: updatePositionInitialState,
    deletePosition: deletePositionInitialState,
  },
  level: {
    listLevel: listLevelInitialState,
    createLevel: createLevelInitialState,
    updateLevel: updateLevelInitialState,
    deleteLevel: deleteLevelInitialState,
  },
  major: {
    listMajor: listMajorInitialState,
    createMajor: createMajorInitialState,
    updateMajor: updateMajorInitialState,
    deleteMajor: deleteMajorInitialState,
  },
  userRole: {
    listUserRole: listUserRoleInitialState,
    createUserRole: createUserRoleInitialState,
    updateUserRole: updateUserRoleInitialState,
    deleteUserRole: deleteUserRoleInitialState,
  },
  projectGroup: {
    createProjectGroup: createProjectGroupInitialState,
    editProjectGroup: editProjectGroupInitialState,
    listProjectGroup: listProjectGroupInitialState,
    listProjectGroupDeleted: listProjectGroupDeletedInitialState,
    deleteProjectGroup: deleteProjectGroupInitialState,
    sortProjectGroup: sortProjectGroupInitialState,
    detailProjectGroup: detailProjectGroupInitialState,
    memberProjectGroup: memberProjectGroupInitialState,
    detailDefaultGroup: detailDefaultGroupInitialState,
  },
  project: {
    createProject: createProjectInitialState,
    updateProject: updateProjectInitialState,
    deleteProject: deleteProjectInitialState,
    listProject: listProjectInitialState,
    listDeletedProject: listDeletedProjectInitialState,
    detailProject: detailProjectInitialState,
    hideProject: hideProjectInitialState,
    showProject: showProjectInitialState,
    memberProject: memberProjectInitialState,
    permissionProject: permissionProjectInitialState,
    addMemberProject: addMemberProjectInitialState,
    removeMemberProject: removeMemberProjectInitialState,
    updateStateJoinTask: updateStateJoinTaskInitialState,
    addProjectRoleToMember: addProjectRoleToMemberInitialState,
    removeProjectRoleFromMember: removeProjectRoleFromMemberInitialState,
    updateGroupPermissionMember: updateGroupPermissionMemberInitialState,
    removeGroupPermissionMember: removeGroupPermissionMemberInitialState,
    assignMemberToAllTask: assignMemberToAllTaskInitialState,
    sortProject: sortProjectInitialState,
    copyProject: copyProjectInitialState,
    deleteTrashProject: deleteTrashProjectInitialState,
    restoreTrashProject: restoreTrashProjectInitialState,
    listProjectBasicInfo: listProjectBasicInfoInitialState,
    setting: {
      detailStatus: detailStatusInitialState,
      updateStatusDate: updateStatusDateInitialState,
      updateStatusCopy: updateStatusCopyInitialState,
      updateStatusView: updateStatusViewInitialState,
      updateNotificationSetting: updateNotificationSettingInitialState,
    },
  },
  groupTask: {
    listGroupTask: listGroupTaskInitialState,
    updateGroupTask: updateGroupTaskInitialState,
    createGroupTask: createGroupTaskInitialState,
    copyGroupTask: copyGroupTaskInitialState,
    deleteGroupTask: deleteGroupTaskInitialState,
    sortGroupTask: sortGroupTaskInitialState,
    getAllGroupTask: getAllGroupTaskInitialState,
  },
  task: {
    listTask: listTaskInitialState,
    createTask: createTaskInitialState,
    deleteTask: deleteTaskInitialState,
    sortTask: sortTaskInitialState,
  },
  groupUser: {
    searchUser: searchUserInitialState,
    inviteUserJoinGroup: inviteUserJoinGroupInitialState,
    resendInvitationUserJoinGroup: resendInvitationUserJoinGroupInitialState,
    getRequirementJoinGroup: getRequirementJoinGroupInitialState,
    getListInvitationSent: getListInvitationSentInitialState,
    cancleInvitationJoinGroup: cancleInvitationJoinGroupInitialState,
    acceptRequirementJoinGroup: acceptRequirementJoinGroupInitialState,
    rejectRequirementJoinGroup: rejectRequirementJoinGroupInitialState,
    getListGroup: getListGroupInitialState,
  },
  register: {
    inviteOtherPeopleCreateAccount: inviteOtherPeopleCreateAccountInitialState,
  },
  viewPermissions: viewPermissionsInitialState,
  gantt: ganttInitialState,
  calendar: {
    listSchedule: listScheduleInitialState,
    listScheduleOfWeek: listScheduleOfWeekInitialState,
    listScheduleOfWeekFromModal: listScheduleOfWeekFromModalInitialState,
    listWeeksInYear: listWeeksInYearInitialState,
    settingStartingDay: settingStartingDayInitialState,
    listProjectGroupSchedule: listProjectGroupScheduleInitialState,
    createSchedule: createScheduleInitialState,
    updateSchedule: updateScheduleInitialState,
    deleteSchedule: deleteScheduleInitialState,
    listPersonalRemindCategory: listPersonalRemindCategoryInitialState,
    listRemindRecently: listRemindRecentlyInitialState,
    createProjectGroupSchedule: createProjectGroupScheduleInitialState,
    updateProjectGroupSchedule: updateProjectGroupScheduleInititalState,
    deleteProjectGroupSchedule: deleteProjectGroupScheduleInitialState,
    getProjectGroupScheduleDetail: getProjectGroupScheduleDetailInitialState,
    projectGroupSettingStartingDay: projectGroupSettingStartingDayInitialState,
    projectGroupSetWorkingDay: projectGroupSetWorkingDayInitialState,
    projectGroupAddWorkingDays: projectGroupAddWorkingDaysInitialState,
    projectGroupDeleteWorkingDays: projectGroupDeleteWorkingDayInitialState,
    projectGroupAddDayOff: projectGroupAddDayOffInitialState,
    projectGroupDeleteDayOff: projectGroupDeleteDayOffInitialState,
    createPersonalRemindCategory: createPersonalRemindCategoryInitialState,
    updatePersonalRemindCategory: updatePersonalRemindCategoryInitialState,
    listPersonalRemind: listPersonalRemindInitialState,
    createPersonalRemind: createPersonalRemindInitialState,
    listRemindProject: listRemindProjectInitialState,
    listCalendarPermission: listCalendarPermissionInitialState,
    projectCalendarAddWorkingStage: projectCalendarAddWorkingStageInitialState,
    projectCalendarUpdateWorkingStage: projectCalendarUpdateWorkingStageInitialState,
    projectCalendarDeleteWorkingStage: projectCalendarDeleteWorkingStageInitialState,
    projectCalendarCreateShiftStage: projectCalendarCreateShiftStageInitialStage,
    projectCalendarUpdateShiftStage: projectCalendarUpdateShiftStageInitialStage,
    projectCalendarDeleteShiftStage: projectCalendarDeleteShiftStageInitialStage,
    projectCalendarCreateShiftStageAllTime: projectCalendarCreateShiftStageAllTimeInitialState,
    projectCalendarUpdateShiftStageAllTime: projectCalendarUpdateShiftStageAllTimeInitialState,
    projectCalendarDeleteShiftStageAllTime: projectCalendarDeleteShiftStageAllTimeInitialState,
  },
  localStorage: localStorageInitialState,
};

export default rootReducer;
