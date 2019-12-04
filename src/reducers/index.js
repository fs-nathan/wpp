import { combineReducers } from 'redux';
import authentications, { initialState as authenticationsInitialState } from './authentications';
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
import listUserRole, { initialState as listUserRoleInitialState } from './userRole/listUserRole';
import createUserRole, { initialState as createUserRoleInitialState } from './userRole/createUserRole';
import updateUserRole, { initialState as updateUserRoleInitialState } from './userRole/updateUserRole';
import deleteUserRole, { initialState as deleteUserRoleInitialState } from './userRole/deleteUserRole';
import publicMember, { initialState as publicMemberInitialState } from './user/publicMember';
import privateMember, { initialState as privateMemberInitialState } from './user/privateMember';
import searchUser, { initialState as searchUserInitialState } from './user/searchUser';
import inviteUserJoinGroup, { initialState as inviteUserJoinGroupInitialState } from './user/inviteUserJoinGroup';
import banUserFromGroup, { initialState as banUserFromGroupInitialState } from './user/banUserFromGroup';
import createIcon, { initialState as createIconInitialState } from './icon/createIcon';
import deleteIcon, { initialState as deleteIconInitialState } from './icon/deleteIcon';
import documents from './documents';
import taskOffer from './taskDetail/offer';
import taskRemind from './taskDetail/remind'
import subTask from './taskDetail/subTask';
import media from './taskDetail/media'
import taskCommand from './taskDetail/command';
import commonTaskDetail from './taskDetail/common';
import location from './taskDetail/location'
import detailTask from './taskDetail/taskDetail';
import taskMember from './taskDetail/member';
<<<<<<< HEAD
import trackingTime from './taskDetail/time';
=======
import listDetailTask from './taskDetail/listTaskDetail'
import listGroupTask from './taskDetail/listGroupTask'
>>>>>>> origin/dev_quan
const rootReducer = combineReducers({
  authentications,
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
<<<<<<< HEAD
    trackingTime,

=======
    listDetailTask,
    listGroupTask,
>>>>>>> origin/dev_quan
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
    searchUser,
    inviteUserJoinGroup,
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
  }),
  major: combineReducers({
    listMajor,
  }),
  userRole: combineReducers({
    listUserRole,
    createUserRole,
    updateUserRole,
    deleteUserRole,
  }),
});

export const DEFAULT_STATE = {
  authentications: authenticationsInitialState,
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
    searchUser: searchUserInitialState,
    inviteUserJoinGroup: inviteUserJoinGroupInitialState,
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
  },
  major: {
    listMajor: listMajorInitialState,
  },
  userRole: {
    listUserRole: listUserRoleInitialState,
    createUserRole: createUserRoleInitialState,
    updateUserRole: updateUserRoleInitialState,
    deleteUserRole: deleteUserRoleInitialState,
  },
};

export default rootReducer;
