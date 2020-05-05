import { combineReducers } from "redux";
import { postModule } from "views/HomePage/redux/post";
import { weekScheduleModule } from "views/HomePage/redux/weekSchedule";
import { settingGroupPermission } from "views/SettingGroupPage/GroupPermissionSettings/redux";
import { settingGroupHome } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux";
import apiCall from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/reducer";
import taskReducer from "../views/JobPage/redux/reducers";
import authentications, {
  initialState as authenticationsInitialState,
} from "./authentications";
import chat, { initialState as chatInitialState } from "./chat/chat";
// import documents from './documents'
// import taskOffer from './taskDetail/offer'
import documents from "./documents";
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
import detailUser, {
  initialState as detailUserInitialState,
} from "./user/detailUser";
import listUserOfGroup, {
  initialState as listUserOfGroupInitialState,
} from "./user/listUserOfGroup";
import privateMember, {
  initialState as privateMemberInitialState,
} from "./user/privateMember";
import publicMember, {
  initialState as publicMemberInitialState,
} from "./user/publicMember";
import sortUser, {
  initialState as sortUserInitialState,
} from "./user/sortUser";
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
    updateUser,
    publicMember,
    privateMember,
    banUserFromGroup,
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
    assignMemberToAllTask,
    sortProject,
    copyProject,
    deleteTrashProject,
    restoreTrashProject,
    setting: combineReducers({
      detailStatus,
      updateStatusDate,
      updateStatusCopy,
      updateStatusView,
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
  [settingGroupHome.key]: settingGroupHome.reducer,
  [settingGroupPermission.key]: settingGroupPermission.reducer,
  [postModule.key]: postModule.reducer,
  [weekScheduleModule.key]: weekScheduleModule.reducer,

  apiCall: apiCall,
  inviteOtherPeopleCreateAccount,
  viewPermissions,
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
    updateUser: updateUserInitialState,
    publicMember: publicMemberInitialState,
    privateMember: privateMemberInitialState,
    banUserFromGroup: banUserFromGroupInitialState,
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
    assignMemberToAllTask: assignMemberToAllTaskInitialState,
    sortProject: sortProjectInitialState,
    copyProject: copyProjectInitialState,
    deleteTrashProject: deleteTrashProjectInitialState,
    restoreTrashProject: restoreTrashProjectInitialState,
    setting: {
      detailStatus: detailStatusInitialState,
      updateStatusDate: updateStatusDateInitialState,
      updateStatusCopy: updateStatusCopyInitialState,
      updateStatusView: updateStatusViewInitialState,
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
};

export default rootReducer;
