import { takeLatest, takeLeading } from 'redux-saga/effects';
import { LOGIN, LOGIN_CHECK_STATE } from '../constants/actions/authentications';
import { login, loginCheckState } from './authentications';
import { LIST_ROOM } from '../constants/actions/room/listRoom';
import { listRoom } from './room/listRoom';
import { DETAIL_ROOM } from '../constants/actions/room/detailRoom';
import { detailRoom } from './room/detailRoom';
import { GET_USER_OF_ROOM } from '../constants/actions/room/getUserOfRoom';
import { getUserOfRoom } from './room/getUserOfRoom';
import { LIST_USER_OF_GROUP } from '../constants/actions/user/listUserOfGroup';
import { listUserOfGroup } from './user/listUserOfGroup';
import { SORT_USER } from '../constants/actions/user/sortUser';
import { sortUser } from './user/sortUser';
import { LIST_ICON } from '../constants/actions/icon/listIcon';
import { listIcon } from './icon/listIcon';
import { CREATE_ROOM } from '../constants/actions/room/createRoom';
import { createRoom } from './room/createRoom';
import { DELETE_ROOM } from '../constants/actions/room/deleteRoom';
import { deleteRoom } from './room/deleteRoom';
import { UPDATE_ROOM } from '../constants/actions/room/updateRoom';
import { updateRoom } from './room/updateRoom';
import { SORT_ROOM } from '../constants/actions/room/sortRoom';
import { sortRoom } from './room/sortRoom';
import { DETAIL_USER } from '../constants/actions/user/detailUser';
import { detailUser } from './user/detailUser';
import { UPLOAD_DOCUMENTS_USER } from '../constants/actions/user/uploadDocumentsUser';
import { uploadDocumentsUser } from './user/uploadDocumentsUser';
import { LIST_MAJOR } from '../constants/actions/major/listMajor';
import { listMajor } from './major/listMajor';
import { LIST_LEVEL } from '../constants/actions/level/listLevel';
import { listLevel } from './level/listLevel';
import { LIST_POSITION } from '../constants/actions/position/listPosition';
import { listPosition } from './position/listPosition';
import { UPDATE_USER } from '../constants/actions/user/updateUser';
import { updateUser } from './user/updateUser';
import { CREATE_POSITION } from '../constants/actions/position/createPosition';
import { createPosition } from './position/createPosition';
import { UPDATE_POSITION } from '../constants/actions/position/updatePosition';
import { updatePosition } from './position/updatePosition';
import { DELETE_POSITION } from '../constants/actions/position/deletePosition';
import { deletePosition } from './position/deletePosition';
import { LIST_USER_ROLE } from '../constants/actions/userRole/listUserRole';
import { listUserRole } from './userRole/listUserRole';
import { CREATE_USER_ROLE } from '../constants/actions/userRole/createUserRole';
import { createUserRole } from './userRole/createUserRole';
import { UPDATE_USER_ROLE } from '../constants/actions/userRole/updateUserRole';
import { updateUserRole } from './userRole/updateUserRole';
import { DELETE_USER_ROLE } from '../constants/actions/userRole/deleteUserRole';
import { deleteUserRole } from './userRole/deleteUserRole';
import { PUBLIC_MEMBER } from '../constants/actions/user/publicMember';
import { publicMember } from './user/publicMember';
import { PRIVATE_MEMBER } from '../constants/actions/user/privateMember';
import { privateMember } from './user/privateMember';
import { SEARCH_USER } from '../constants/actions/user/searchUser';
import { searchUser } from './user/searchUser';
import { INVITE_USER_JOIN_GROUP } from '../constants/actions/user/inviteUserJoinGroup';
import { inviteUserJoinGroup } from './user/inviteUserJoinGroup';
import { BAN_USER_FROM_GROUP } from '../constants/actions/user/banUserFromGroup';
import { banUserFromGroup } from './user/banUserFromGroup';
import { CREATE_ICON } from '../constants/actions/icon/createIcon';
import { createIcon } from './icon/createIcon';
import { DELETE_ICON } from '../constants/actions/icon/deleteIcon';
import { deleteIcon } from './icon/deleteIcon';
import {
  GET_OFFER_REQUEST, CREATE_OFFER_REQUEST, GET_SUBTASK_REQUEST, POST_SUBTASK_REQUEST
} from '../constants/actions/taskDetail/taskDetailConst'
import {
  getOffer, createOffer, getSubTask, postSubTask
} from './taskDetail/TaskDetailSaga'
import { CREATE_PROJECT_GROUP } from '../constants/actions/projectGroup/createProjectGroup';
import { createProjectGroup } from './projectGroup/createProjectGroup';
import { EDIT_PROJECT_GROUP } from '../constants/actions/projectGroup/editProjectGroup';
import { editProjectGroup } from './projectGroup/editProjectGroup';
import { LIST_PROJECT_GROUP } from '../constants/actions/projectGroup/listProjectGroup';
import { listProjectGroup } from './projectGroup/listProjectGroup';
import { DELETE_PROJECT_GROUP } from '../constants/actions/projectGroup/deleteProjectGroup';
import { deleteProjectGroup } from './projectGroup/deleteProjectGroup';
import { SORT_PROJECT_GROUP } from '../constants/actions/projectGroup/sortProjectGroup';
import { sortProjectGroup } from './projectGroup/sortProjectGroup';
import { DETAIL_PROJECT_GROUP } from '../constants/actions/projectGroup/detailProjectGroup';
import { detailProjectGroup } from './projectGroup/detailProjectGroup';
import { MEMBER_PROJECT_GROUP } from '../constants/actions/projectGroup/memberProjectGroup';
import { memberProjectGroup } from './projectGroup/memberProjectGroup';
import { CREATE_PROJECT } from '../constants/actions/project/createProject';
import { createProject } from './project/createProject';
import { UPDATE_PROJECT } from '../constants/actions/project/updateProject';
import { updateProject } from './project/updateProject';
import { DELETE_PROJECT } from '../constants/actions/project/deleteProject';
import { deleteProject } from './project/deleteProject';
import { LIST_PROJECT } from '../constants/actions/project/listProject';
import { listProject } from './project/listProject';
import { DETAIL_PROJECT } from '../constants/actions/project/detailProject';
import { detailProject } from './project/detailProject';
import { HIDE_PROJECT } from '../constants/actions/project/hideProject';
import { hideProject } from './project/hideProject';
import { MEMBER_PROJECT } from '../constants/actions/project/memberProject';
import { memberProject } from './project/memberProject';
import { ADD_MEMBER_PROJECT } from '../constants/actions/project/addMemberProject';
import { addMemberProject } from './project/addMemberProject';
import { REMOVE_MEMBER_PROJECT } from '../constants/actions/project/removeMemberProject';
import { removeMemberProject } from './project/removeMemberProject';
import { UPDATE_STATE_JOIN_TASK } from '../constants/actions/project/updateStateJoinTask';
import { updateStateJoinTask } from './project/updateStateJoinTask';
import { ADD_PROJECT_ROLE_TO_MEMBER } from '../constants/actions/project/addProjectRoleToMember';
import { addProjectRoleToMember } from './project/addProjectRoleToMember';
import { REMOVE_PROJECT_ROLE_FROM_MEMBER } from '../constants/actions/project/removeProjectRoleFromMember';
import { removeProjectRoleFromMember } from './project/removeProjectRoleFromMember';
import { UPDATE_GROUP_PERMISSION_MEMBER } from '../constants/actions/project/updateGroupPermissionMember';
import { updateGroupPermissionMember } from './project/updateGroupPermissionMember';
import * as taskDetailType from '../constants/actions/taskDetail/taskDetailConst';
import * as taskDetailSaga from './taskDetail/TaskDetailSaga';

function* rootSaga() {
  yield takeLeading(LOGIN, login);
  yield takeLeading(LOGIN_CHECK_STATE, loginCheckState);
  yield takeLeading(LIST_ROOM, listRoom);
  yield takeLeading(DETAIL_ROOM, detailRoom);
  yield takeLeading(GET_USER_OF_ROOM, getUserOfRoom);
  yield takeLeading(LIST_USER_OF_GROUP, listUserOfGroup);
  yield takeLeading(SORT_USER, sortUser);
  yield takeLeading(LIST_ICON, listIcon);
  yield takeLeading(CREATE_ROOM, createRoom);
  yield takeLeading(DELETE_ROOM, deleteRoom);
  yield takeLeading(UPDATE_ROOM, updateRoom);
  yield takeLeading(SORT_ROOM, sortRoom);
  yield takeLeading(DETAIL_USER, detailUser);
  yield takeLeading(UPLOAD_DOCUMENTS_USER, uploadDocumentsUser);
  yield takeLeading(LIST_MAJOR, listMajor);
  yield takeLeading(LIST_LEVEL, listLevel);
  yield takeLeading(LIST_POSITION, listPosition);
  yield takeLeading(UPDATE_USER, updateUser);
  yield takeLeading(CREATE_POSITION, createPosition);
  yield takeLeading(UPDATE_POSITION, updatePosition);
  yield takeLeading(DELETE_POSITION, deletePosition);
  yield takeLeading(LIST_USER_ROLE, listUserRole);
  yield takeLeading(CREATE_USER_ROLE, createUserRole);
  yield takeLeading(UPDATE_USER_ROLE, updateUserRole);
  yield takeLeading(DELETE_USER_ROLE, deleteUserRole);
  yield takeLeading(PUBLIC_MEMBER, publicMember);
  yield takeLeading(PRIVATE_MEMBER, privateMember);
  yield takeLeading(SEARCH_USER, searchUser);
  yield takeLeading(INVITE_USER_JOIN_GROUP, inviteUserJoinGroup);
  yield takeLeading(BAN_USER_FROM_GROUP, banUserFromGroup);
  yield takeLeading(CREATE_ICON, createIcon);
  yield takeLeading(DELETE_ICON, deleteIcon);

  //Offer::
  yield takeLeading(taskDetailType.GET_OFFER_REQUEST, taskDetailSaga.getOffer);
  yield takeLeading(taskDetailType.CREATE_OFFER_REQUEST, taskDetailSaga.createOffer);
  yield takeLeading(taskDetailType.UPDATE_OFFER_REQUEST, taskDetailSaga.updateOffer);
  yield takeLeading(taskDetailType.DELETE_OFFER_REQUEST, taskDetailSaga.deleteOffer);
  yield takeLeading(taskDetailType.UPLOAD_DOCUMENT_TO_OFFER_REQUEST, taskDetailSaga.uploadDocumentToOffer);
  yield takeLeading(taskDetailType.DELETE_DOCUMENT_TO_OFFER_REQUEST, taskDetailSaga.deleteDocumentToOffer);
  //Subtask::
  yield takeLeading(taskDetailType.GET_SUBTASK_REQUEST, taskDetailSaga.getSubTask);
  yield takeLeading(taskDetailType.POST_SUBTASK_REQUEST, taskDetailSaga.postSubTask);
  yield takeLeading(taskDetailType.UPDATE_SUBTASK_REQUEST, taskDetailSaga.updateSubTask);
  yield takeLeading(taskDetailType.DELETE_SUBTASK_REQUEST, taskDetailSaga.deleteSubTask);
  yield takeLeading(taskDetailType.POST_COMPLETE_SUBTASK_REQUEST, taskDetailSaga.completeSubTask);
  //Remind::
  yield takeLeading(taskDetailType.GET_REMIND_REQUEST, taskDetailSaga.getRemind);
  yield takeLeading(taskDetailType.POST_REMIND_TIME_DETAIL_REQUEST, taskDetailSaga.postRemindWithTimeDetail);
  yield takeLeading(taskDetailType.POST_REMIND_DURATION_REQUEST, taskDetailSaga.postRemindDuration);
  yield takeLeading(taskDetailType.UPDATE_REMIND_TIME_DETAIL_REQUEST, taskDetailSaga.updateRemindWithTimeDetail);
  yield takeLeading(taskDetailType.UPDATE_REMIND_DURATION_REQUEST, taskDetailSaga.updateRemindWithDuration);
  yield takeLeading(taskDetailType.DELETE_REMIND_REQUEST, taskDetailSaga.deleteRemind);

  // Media Image File
  yield takeLeading(taskDetailType.GET_IMAGE_TABPART_REQUEST, taskDetailSaga.getImage);
  yield takeLeading(taskDetailType.GET_FILE_TABPART_REQUEST, taskDetailSaga.getFile);
  yield takeLeading(taskDetailType.GET_LINK_TABPART_REQUEST, taskDetailSaga.getLink);
  // Location
  yield takeLeading(taskDetailType.GET_LOCATION_TABPART_REQUEST, taskDetailSaga.getLocation);
  // Task Detail - TabPart - cot phai
  yield takeLeading(taskDetailType.GET_TASK_DETAIL_TABPART_REQUEST, taskDetailSaga.getTaskDetail);
  //Command and Decsion::
  yield takeLeading(taskDetailType.GET_COMMAND_REQUEST, taskDetailSaga.getCommand);
  yield takeLeading(taskDetailType.CREATE_COMMAND_REQUEST, taskDetailSaga.createCommand);
  yield takeLeading(taskDetailType.UPDATE_COMMAND_REQUEST, taskDetailSaga.updateCommand);
  yield takeLeading(taskDetailType.UPDATE_TASK_PRIORITY_REQUEST, taskDetailSaga.updatePriority)
 
  
  //Member::
  yield takeLeading(taskDetailType.GET_MEMBER_REQUEST, taskDetailSaga.getMember);
  yield takeLeading(taskDetailType.GET_MEMBER_NOT_ASSIGNED_REQUEST, taskDetailSaga.getMemberNotAssigned);
  yield takeLeading(taskDetailType.POST_MEMBER_REQUEST, taskDetailSaga.createMember);
  yield takeLeading(taskDetailType.DELETE_MEMBER_REQUEST, taskDetailSaga.deleteMember);
};

export default rootSaga;
