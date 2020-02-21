import { combineReducers } from 'redux';
import authentications, { initialState as authenticationsInitialState } from './authentications';
import system, { initialState as systemInitialState } from './system/system';
import chat, { initialState as chatInitialState } from './chat/chat';
import setting, { initialState as settingInitialState } from './setting/setting';
import listRoom, { initialState as listRoomInitialState } from './room/listRoom';
import detailRoom, { initialState as detailRoomInitialState } from './room/detailRoom';
import getUserOfRoom, { initialState as getUserOfRoomInitialState } from './room/getUserOfRoom';
import listUserOfGroup, { initialState as listUserOfGroupInitialState } from './user/listUserOfGroup';
import sortUser, { initialState as sortUserInitialState } from './user/sortUser';
import listIcon, { initialState as listIconInitialState } from './icon/listIcon';
import createRoom, { initialState as createRoomInitialState } from './room/createRoom';
import deleteRoom, { initialState as deleteRoomInitialState } from './room/deleteRoom';
import updateRoom, { initialState as updateRoomInitialState } from './room/updateRoom';
import sortRoom, { initialState as sortRoomInitialState } from './room/sortRoom';
import detailUser, { initialState as detailUserInitialState } from './user/detailUser';
import uploadDocumentsUser, { initialState as uploadDocumentsUserInitialState } from './user/uploadDocumentsUser';
import listMajor, { initialState as listMajorInitialState } from './major/listMajor';
import listPosition, { initialState as listPositionInitialState } from './position/listPosition';
import listLevel, { initialState as listLevelInitialState } from './level/listLevel';
import updateUser, { initialState as updateUserInitialState } from './user/updateUser';
import createPosition, { initialState as createPositionInitialState } from './position/createPosition';
import updatePosition, { initialState as updatePositionInitialState } from './position/updatePosition';
import deletePosition, { initialState as deletePositionInitialState } from './position/deletePosition';
import createLevel, { initialState as createLevelInitialState } from './level/createLevel';
import updateLevel, { initialState as updateLevelInitialState } from './level/updateLevel';
import deleteLevel, { initialState as deleteLevelInitialState } from './level/deleteLevel';
import createMajor, { initialState as createMajorInitialState } from './major/createMajor';
import updateMajor, { initialState as updateMajorInitialState } from './major/updateMajor';
import deleteMajor, { initialState as deleteMajorInitialState } from './major/deleteMajor';
import listUserRole, { initialState as listUserRoleInitialState } from './userRole/listUserRole';
import createUserRole, { initialState as createUserRoleInitialState } from './userRole/createUserRole';
import updateUserRole, { initialState as updateUserRoleInitialState } from './userRole/updateUserRole';
import deleteUserRole, { initialState as deleteUserRoleInitialState } from './userRole/deleteUserRole';
import publicMember, { initialState as publicMemberInitialState } from './user/publicMember';
import privateMember, { initialState as privateMemberInitialState } from './user/privateMember';
import banUserFromGroup, { initialState as banUserFromGroupInitialState } from './user/banUserFromGroup';
import searchUser, { initialState as searchUserInitialState } from './groupUser/searchUser';
import inviteUserJoinGroup, { initialState as inviteUserJoinGroupInitialState } from './groupUser/inviteUserJoinGroup';
import resendInvitationUserJoinGroup, { initialState as resendInvitationUserJoinGroupInitialState } from './groupUser/resendInvitationUserJoinGroup';
import getRequirementJoinGroup, { initialState as getRequirementJoinGroupInitialState } from './groupUser/getRequirementJoinGroup';
import acceptRequirementJoinGroup, { initialState as acceptRequirementJoinGroupInitialState } from './groupUser/acceptRequirementJoinGroup';
import rejectRequirementJoinGroup, { initialState as rejectRequirementJoinGroupInitialState } from './groupUser/rejectRequirementJoinGroup';
import getListGroup, { initialState as getListGroupInitialState } from './groupUser/getListGroup';
import createIcon, { initialState as createIconInitialState } from './icon/createIcon';
import deleteIcon, { initialState as deleteIconInitialState } from './icon/deleteIcon';
import createProjectGroup, { initialState as createProjectGroupInitialState } from './projectGroup/createProjectGroup';
import editProjectGroup, { initialState as editProjectGroupInitialState } from './projectGroup/editProjectGroup';
import listProjectGroup, { initialState as listProjectGroupInitialState } from './projectGroup/listProjectGroup';
import deleteProjectGroup, { initialState as deleteProjectGroupInitialState } from './projectGroup/deleteProjectGroup';
import sortProjectGroup, { initialState as sortProjectGroupInitialState } from './projectGroup/sortProjectGroup';
import detailProjectGroup, { initialState as detailProjectGroupInitialState } from './projectGroup/detailProjectGroup';
import memberProjectGroup, { initialState as memberProjectGroupInitialState } from './projectGroup/memberProjectGroup';
import detailDefaultGroup, { initialState as detailDefaultGroupInitialState } from './projectGroup/detailDefaultGroup';
import createProject, { initialState as createProjectInitialState } from './project/createProject';
import sortProject, { initialState as sortProjectInitialState } from './project/sortProject';
import copyProject, { initialState as copyProjectInitialState } from './project/copyProject';
import addMemberProject, { initialState as addMemberProjectInitialState } from './project/addMemberProject';
import deleteProject, { initialState as deleteProjectInitialState } from './project/deleteProject';
import listProject, { initialState as listProjectInitialState } from './project/listProject';
import listDeletedProject, { initialState as listDeletedProjectInitialState } from './project/listDeletedProject';
import detailProject, { initialState as detailProjectInitialState } from './project/detailProject';
import hideProject, { initialState as hideProjectInitialState } from './project/hideProject';
import showProject, { initialState as showProjectInitialState } from './project/showProject';
import memberProject, { initialState as memberProjectInitialState } from './project/memberProject';
import updateProject, { initialState as updateProjectInitialState } from './project/updateProject';
import removeMemberProject, { initialState as removeMemberProjectInitialState } from './project/removeMemberProject';
import updateStateJoinTask, { initialState as updateStateJoinTaskInitialState } from './project/updateStateJoinTask';
import addProjectRoleToMember, { initialState as addProjectRoleToMemberInitialState } from './project/addProjectRoleToMember';
import removeProjectRoleFromMember, { initialState as removeProjectRoleFromMemberInitialState } from './project/removeProjectRoleFromMember';
import updateGroupPermissionMember, { initialState as updateGroupPermissionMemberInitialState } from './project/updateGroupPermissionMember';
import assignMemberToAllTask, { initialState as assignMemberToAllTaskInitialState } from './project/assignMemberToAllTask';
import detailStatus, { initialState as detailStatusInitialState} from './project/setting/detailStatus';
import updateStatusDate, { initialState as updateStatusDateInitialState} from './project/setting/updateStatusDate';
import updateStatusCopy, { initialState as updateStatusCopyInitialState} from './project/setting/updateStatusCopy';
import listGroupTask1, { initialState as listGroupTaskInitialState} from './groupTask/listGroupTask';
import createGroupTask, { initialState as createGroupTaskInitialState} from './groupTask/createGroupTask';
import copyGroupTask, { initialState as copyGroupTaskInitialState} from './groupTask/copyGroupTask';
import deleteGroupTask, { initialState as deleteGroupTaskInitialState} from './groupTask/deleteGroupTask';
import updateGroupTask, { initialState as updateGroupTaskInitialState} from './groupTask/updateGroupTask';
import sortGroupTask, { initialState as sortGroupTaskInitialState} from './groupTask/sortGroupTask';
import getAllGroupTask, { initialState as getAllGroupTaskInitialState} from './groupTask/getAllGroupTask';
import listTask, { initialState as listTaskInitialState} from './task/listTask';
import createTask, { initialState as createTaskInitialState} from './task/createTask';
import deleteTask, { initialState as deleteTaskInitialState} from './task/deleteTask';
import sortTask, { initialState as sortTaskInitialState} from './task/sortTask';
import inviteOtherPeopleCreateAccount, {initialState as inviteOtherPeopleCreateAccountInitialState} from './register/inviteOtherPeopleCreateAccount';
// import documents from './documents'
// import taskOffer from './taskDetail/offer'
import documents from './documents';
import taskOffer from './taskDetail/offer';
import taskRemind from './taskDetail/remind';
import subTask from './taskDetail/subTask';
import media from './taskDetail/media';
import taskCommand from './taskDetail/command';
import commonTaskDetail from './taskDetail/common';
import location from './taskDetail/location'
import detailTask from './taskDetail/taskDetail';
import taskMember from './taskDetail/member';
import trackingTime from './taskDetail/time';
import listDetailTask from './taskDetail/listTaskDetail'
import listGroupTask from './taskDetail/listGroupTask'

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
  }),
  room: combineReducers({
    listRoom,
    detailRoom,
    getUserOfRoom,
    createRoom,
    deleteRoom,
    updateRoom,
    sortRoom
  }),
  user: combineReducers({
    listUserOfGroup,
    sortUser,
    detailUser,
    uploadDocumentsUser,
    updateUser,
    publicMember,
    privateMember,
    banUserFromGroup
  }),
  icon: combineReducers({
    listIcon,
    createIcon,
    deleteIcon
  }),
  position: combineReducers({
    listPosition,
    createPosition,
    updatePosition,
    deletePosition
  }),
  level: combineReducers({
    listLevel,
    createLevel,
    updateLevel,
    deleteLevel
  }),
  major: combineReducers({
    listMajor,
    createMajor,
    updateMajor,
    deleteMajor
  }),
  userRole: combineReducers({
    listUserRole,
    createUserRole,
    updateUserRole,
    deleteUserRole
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
    addMemberProject,
    removeMemberProject,
    updateStateJoinTask,
    addProjectRoleToMember,
    removeProjectRoleFromMember,
    updateGroupPermissionMember,
    assignMemberToAllTask,
    sortProject,
    copyProject,
    setting: combineReducers({
      detailStatus,
      updateStatusDate,
      updateStatusCopy,
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
  groupUser: combineReducers({
    searchUser,
    inviteUserJoinGroup,
    resendInvitationUserJoinGroup,
    getRequirementJoinGroup,
    acceptRequirementJoinGroup,
    rejectRequirementJoinGroup,
    getListGroup,
  }),
  register: combineReducers({
    inviteOtherPeopleCreateAccount,
  })
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
    sortRoom: sortRoomInitialState
  },
  user: {
    listUserOfGroup: listUserOfGroupInitialState,
    sortUser: sortUserInitialState,
    detailUser: detailUserInitialState,
    uploadDocumentsUser: uploadDocumentsUserInitialState,
    updateUser: updateUserInitialState,
    publicMember: publicMemberInitialState,
    privateMember: privateMemberInitialState,
    banUserFromGroup: banUserFromGroupInitialState
  },
  icon: {
    listIcon: listIconInitialState,
    createIcon: createIconInitialState,
    deleteIcon: deleteIconInitialState
  },
  position: {
    listPosition: listPositionInitialState,
    createPosition: createPositionInitialState,
    updatePosition: updatePositionInitialState,
    deletePosition: deletePositionInitialState
  },
  level: {
    listLevel: listLevelInitialState,
    createLevel: createLevelInitialState,
    updateLevel: updateLevelInitialState,
    deleteLevel: deleteLevelInitialState
  },
  major: {
    listMajor: listMajorInitialState,
    createMajor: createMajorInitialState,
    updateMajor: updateMajorInitialState,
    deleteMajor: deleteMajorInitialState
  },
  userRole: {
    listUserRole: listUserRoleInitialState,
    createUserRole: createUserRoleInitialState,
    updateUserRole: updateUserRoleInitialState,
    deleteUserRole: deleteUserRoleInitialState
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
    addMemberProject: addMemberProjectInitialState,
    removeMemberProject: removeMemberProjectInitialState,
    updateStateJoinTask: updateStateJoinTaskInitialState,
    addProjectRoleToMember: addProjectRoleToMemberInitialState,
    removeProjectRoleFromMember: removeProjectRoleFromMemberInitialState,
    updateGroupPermissionMember: updateGroupPermissionMemberInitialState,
    assignMemberToAllTask: assignMemberToAllTaskInitialState,
    sortProject: sortProjectInitialState,
    copyProject: copyProjectInitialState,
    setting: {
      detailStatus: detailStatusInitialState,
      updateStatusDate: updateStatusDateInitialState,
      updateStatusCopy: updateStatusCopyInitialState,
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
    acceptRequirementJoinGroup: acceptRequirementJoinGroupInitialState,
    rejectRequirementJoinGroup: rejectRequirementJoinGroupInitialState,
    getListGroup: getListGroupInitialState,
  },
  register: {
    inviteOtherPeopleCreateAccount: inviteOtherPeopleCreateAccountInitialState,
  }
};

export default rootReducer;
