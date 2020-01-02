import { takeLatest, takeLeading, takeEvery } from 'redux-saga/effects';
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
import { COPY_PROJECT } from '../constants/actions/project/copyProject';
import { copyProject } from './project/copyProject';
import { SORT_PROJECT } from '../constants/actions/project/sortProject';
import { sortProject } from './project/sortProject';
import { UPDATE_PROJECT } from '../constants/actions/project/updateProject';
import { updateProject } from './project/updateProject';
import { DELETE_PROJECT } from '../constants/actions/project/deleteProject';
import { deleteProject } from './project/deleteProject';
import { LIST_PROJECT } from '../constants/actions/project/listProject';
import { LIST_DELETED_PROJECT } from '../constants/actions/project/listDeletedProject';
import { listProject, listDeletedProject } from './project/listProject';
import { DETAIL_PROJECT } from '../constants/actions/project/detailProject';
import { detailProject } from './project/detailProject';
import { HIDE_PROJECT } from '../constants/actions/project/hideProject';
import { hideProject } from './project/hideProject';
import { SHOW_PROJECT } from '../constants/actions/project/showProject';
import { showProject } from './project/showProject';
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
import { ASSIGN_MEMBER_TO_ALL_TASK } from '../constants/actions/project/assignMemberToAllTask';
import { assignMemberToAllTask } from './project/assignMemberToAllTask';
import { LIST_GROUP_TASK } from '../constants/actions/groupTask/listGroupTask';
import { listGroupTask } from './groupTask/listGroupTask';
import { CREATE_GROUP_TASK } from '../constants/actions/groupTask/createGroupTask';
import { createGroupTask } from './groupTask/createGroupTask';
import { UPDATE_GROUP_TASK } from '../constants/actions/groupTask/updateGroupTask ';
import { updateGroupTask } from './groupTask/updateGroupTask';
import { DELETE_GROUP_TASK } from '../constants/actions/groupTask/deleteGroupTask';
import { deleteGroupTask } from './groupTask/deleteGroupTask';
import { SORT_GROUP_TASK } from '../constants/actions/groupTask/sortGroupTask';
import { sortGroupTask } from './groupTask/sortGroupTask';
import { GET_ALL_GROUP_TASK } from '../constants/actions/groupTask/getAllGroupTask';
import { getAllGroupTask } from './groupTask/getAllGroupTask';
import { LIST_TASK } from '../constants/actions/task/listTask';
import { listTask } from './task/listTask';
import { CREATE_TASK } from '../constants/actions/task/createTask';
import { createTask } from './task/createTask';
import { DELETE_TASK } from '../constants/actions/task/deleteTask';
import { deleteTask } from './task/deleteTask';
import * as taskDetailType from '../constants/actions/taskDetail/taskDetailConst';
import * as taskDetailSaga from './taskDetail/TaskDetailSaga';
import {
  LIST_COMMENT,
  LIST_TRASH,
  LIST_MY_DOCUMENT,
  LIST_RECENT,
  LIST_PROJECT_DOCUMENT,
  LIST_PROJECT_DOCUMENT_OF_FOLDER,
  LIST_DOCUMENT_FROM_ME,
  LIST_DOCUMENT_SHARE
} from '../constants/actions/documents';
import {
  listComment,
  listTrash,
  listRecent,
  listMyDocument,
  listProjectDocument,
  listProjectDocumentOfFolder,
  listDocumentShareFromMe,
  listDocumentShare
} from './documents';
import { FETCH_GROUP_DETAIL } from '../constants/actions/setting/setting';
import { getGroupDetail } from './setting/setting';

function* rootSaga() {

  // Hoang - begin

  yield takeEvery(LOGIN, login);
  yield takeEvery(LOGIN_CHECK_STATE, loginCheckState);
  yield takeLatest(LIST_ROOM, listRoom);
  yield takeLatest(DETAIL_ROOM, detailRoom);
  yield takeLatest(GET_USER_OF_ROOM, getUserOfRoom);
  yield takeLatest(LIST_USER_OF_GROUP, listUserOfGroup);
  yield takeEvery(SORT_USER, sortUser);
  yield takeLatest(LIST_ICON, listIcon);
  yield takeEvery(CREATE_ROOM, createRoom);
  yield takeEvery(DELETE_ROOM, deleteRoom);
  yield takeEvery(UPDATE_ROOM, updateRoom);
  yield takeEvery(SORT_ROOM, sortRoom);
  yield takeLatest(DETAIL_USER, detailUser);
  yield takeEvery(UPLOAD_DOCUMENTS_USER, uploadDocumentsUser);
  yield takeLatest(LIST_MAJOR, listMajor);
  yield takeLatest(LIST_LEVEL, listLevel);
  yield takeLatest(LIST_POSITION, listPosition);
  yield takeEvery(UPDATE_USER, updateUser);
  yield takeEvery(CREATE_POSITION, createPosition);
  yield takeEvery(UPDATE_POSITION, updatePosition);
  yield takeEvery(DELETE_POSITION, deletePosition);
  yield takeLatest(LIST_USER_ROLE, listUserRole);
  yield takeEvery(CREATE_USER_ROLE, createUserRole);
  yield takeEvery(UPDATE_USER_ROLE, updateUserRole);
  yield takeEvery(DELETE_USER_ROLE, deleteUserRole);
  yield takeEvery(PUBLIC_MEMBER, publicMember);
  yield takeEvery(PRIVATE_MEMBER, privateMember);
  yield takeEvery(SEARCH_USER, searchUser);
  yield takeEvery(INVITE_USER_JOIN_GROUP, inviteUserJoinGroup);
  yield takeEvery(BAN_USER_FROM_GROUP, banUserFromGroup);
  yield takeEvery(CREATE_ICON, createIcon);
  yield takeEvery(DELETE_ICON, deleteIcon);
  yield takeEvery(CREATE_PROJECT_GROUP, createProjectGroup);
  yield takeEvery(EDIT_PROJECT_GROUP, editProjectGroup);
  yield takeLatest(LIST_PROJECT_GROUP, listProjectGroup);
  yield takeEvery(DELETE_PROJECT_GROUP, deleteProjectGroup);
  yield takeEvery(SORT_PROJECT_GROUP, sortProjectGroup);
  yield takeLatest(DETAIL_PROJECT_GROUP, detailProjectGroup);
  yield takeLatest(MEMBER_PROJECT_GROUP, memberProjectGroup);
  yield takeEvery(CREATE_PROJECT, createProject);
  yield takeEvery(COPY_PROJECT, copyProject);
  yield takeEvery(SORT_PROJECT, sortProject);
  yield takeEvery(UPDATE_PROJECT, updateProject);
  yield takeEvery(DELETE_PROJECT, deleteProject);
  yield takeLatest(LIST_PROJECT, listProject);
  yield takeLatest(LIST_DELETED_PROJECT, listDeletedProject);
  yield takeLatest(DETAIL_PROJECT, detailProject);
  yield takeEvery(HIDE_PROJECT, hideProject);
  yield takeEvery(SHOW_PROJECT, showProject);
  yield takeLatest(MEMBER_PROJECT, memberProject);
  yield takeEvery(ADD_MEMBER_PROJECT, addMemberProject);
  yield takeEvery(REMOVE_MEMBER_PROJECT, removeMemberProject);
  yield takeEvery(UPDATE_STATE_JOIN_TASK, updateStateJoinTask);
  yield takeEvery(ADD_PROJECT_ROLE_TO_MEMBER, addProjectRoleToMember);
  yield takeEvery(
    REMOVE_PROJECT_ROLE_FROM_MEMBER,
    removeProjectRoleFromMember
  );
  yield takeEvery(UPDATE_GROUP_PERMISSION_MEMBER, updateGroupPermissionMember);
  yield takeEvery(ASSIGN_MEMBER_TO_ALL_TASK, assignMemberToAllTask);
  yield takeLatest(LIST_GROUP_TASK, listGroupTask);
  yield takeEvery(CREATE_GROUP_TASK, createGroupTask);
  yield takeEvery(UPDATE_GROUP_TASK, updateGroupTask);
  yield takeEvery(DELETE_GROUP_TASK, deleteGroupTask);
  yield takeEvery(SORT_GROUP_TASK, sortGroupTask);
  yield takeLatest(GET_ALL_GROUP_TASK, getAllGroupTask);
  yield takeLatest(LIST_TASK, listTask);
  yield takeEvery(CREATE_TASK, createTask);
  yield takeEvery(DELETE_TASK, deleteTask);

  // Hoang - end

  yield takeLatest(LIST_COMMENT, listComment);
  yield takeLatest(LIST_TRASH, listTrash);
  yield takeLatest(LIST_MY_DOCUMENT, listMyDocument);
  yield takeLatest(FETCH_GROUP_DETAIL, getGroupDetail);
  yield takeLatest(LIST_RECENT, listRecent);
  yield takeLatest(LIST_PROJECT_DOCUMENT, listProjectDocument);
  yield takeLatest(
    LIST_PROJECT_DOCUMENT_OF_FOLDER,
    listProjectDocumentOfFolder
  );
  yield takeLatest(LIST_DOCUMENT_FROM_ME, listDocumentShareFromMe);
  yield takeLatest(LIST_DOCUMENT_SHARE, listDocumentShare);

  // Priority
  yield takeLeading(
    taskDetailType.UPDATE_TASK_PRIORITY_REQUEST,
    taskDetailSaga.updatePriority
  );

  //Offer::
  yield takeLeading(taskDetailType.GET_OFFER_REQUEST, taskDetailSaga.getOffer);
  yield takeLeading(
    taskDetailType.CREATE_OFFER_REQUEST,
    taskDetailSaga.createOffer
  );
  yield takeLeading(
    taskDetailType.UPDATE_OFFER_REQUEST,
    taskDetailSaga.updateOffer
  );
  yield takeLeading(
    taskDetailType.DELETE_OFFER_REQUEST,
    taskDetailSaga.deleteOffer
  );
  yield takeLeading(
    taskDetailType.UPLOAD_DOCUMENT_TO_OFFER_REQUEST,
    taskDetailSaga.uploadDocumentToOffer
  );
  yield takeLeading(
    taskDetailType.DELETE_DOCUMENT_TO_OFFER_REQUEST,
    taskDetailSaga.deleteDocumentToOffer
  );
  yield takeLeading(
    taskDetailType.HANDLE_OFFER_REQUEST,
    taskDetailSaga.handleOffer
  );
  //Subtask::
  yield takeLeading(
    taskDetailType.GET_SUBTASK_REQUEST,
    taskDetailSaga.getSubTask
  );
  yield takeLeading(
    taskDetailType.POST_SUBTASK_REQUEST,
    taskDetailSaga.postSubTask
  );
  yield takeLeading(
    taskDetailType.UPDATE_SUBTASK_REQUEST,
    taskDetailSaga.updateSubTask
  );
  yield takeLeading(
    taskDetailType.DELETE_SUBTASK_REQUEST,
    taskDetailSaga.deleteSubTask
  );
  yield takeLeading(
    taskDetailType.POST_COMPLETE_SUBTASK_REQUEST,
    taskDetailSaga.completeSubTask
  );
  //Remind::
  yield takeLeading(
    taskDetailType.GET_REMIND_REQUEST,
    taskDetailSaga.getRemind
  );
  yield takeLeading(
    taskDetailType.POST_REMIND_TIME_DETAIL_REQUEST,
    taskDetailSaga.postRemindWithTimeDetail
  );
  yield takeLeading(
    taskDetailType.POST_REMIND_DURATION_REQUEST,
    taskDetailSaga.postRemindDuration
  );
  yield takeLeading(
    taskDetailType.UPDATE_REMIND_TIME_DETAIL_REQUEST,
    taskDetailSaga.updateRemindWithTimeDetail
  );
  yield takeLeading(
    taskDetailType.UPDATE_REMIND_DURATION_REQUEST,
    taskDetailSaga.updateRemindWithDuration
  );
  yield takeLeading(
    taskDetailType.DELETE_REMIND_REQUEST,
    taskDetailSaga.deleteRemind
  );

  // Media Image File
  yield takeLeading(
    taskDetailType.GET_IMAGE_TABPART_REQUEST,
    taskDetailSaga.getImage
  );
  yield takeLeading(
    taskDetailType.GET_FILE_TABPART_REQUEST,
    taskDetailSaga.getFile
  );
  yield takeLeading(
    taskDetailType.GET_LINK_TABPART_REQUEST,
    taskDetailSaga.getLink
  );
  // Location
  yield takeLeading(
    taskDetailType.GET_LOCATION_TABPART_REQUEST,
    taskDetailSaga.getLocation
  );
  // Task Detail - TabPart - cot phai
  yield takeLeading(
    taskDetailType.GET_TASK_DETAIL_TABPART_REQUEST,
    taskDetailSaga.getTaskDetail
  );
  //Command and Decsion::
  yield takeLeading(taskDetailType.GET_COMMAND_REQUEST, taskDetailSaga.getCommand);
  yield takeLeading(taskDetailType.CREATE_COMMAND_REQUEST, taskDetailSaga.createCommand);
  yield takeLeading(taskDetailType.UPDATE_COMMAND_REQUEST, taskDetailSaga.updateCommand);
  yield takeLeading(taskDetailType.DELETE_COMMAND_REQUEST, taskDetailSaga.deleteCommand);

  //Member::
  yield takeLeading(
    taskDetailType.GET_MEMBER_REQUEST,
    taskDetailSaga.getMember
  );
  yield takeLeading(
    taskDetailType.GET_MEMBER_NOT_ASSIGNED_REQUEST,
    taskDetailSaga.getMemberNotAssigned
  );
  yield takeLeading(
    taskDetailType.POST_MEMBER_REQUEST,
    taskDetailSaga.createMember
  );
  yield takeLeading(
    taskDetailType.DELETE_MEMBER_REQUEST,
    taskDetailSaga.deleteMember
  );

  // Member Permission::
  yield takeLeading(taskDetailType.GET_PERMISSION_REQUEST, taskDetailSaga.getPermission);
  yield takeLeading(taskDetailType.UPDATE_PERMISSION_REQUEST, taskDetailSaga.updatePermission);
  // Member Role::
  yield takeLeading(taskDetailType.GET_ROLE_REQUEST, taskDetailSaga.getRole);
  yield takeLeading(taskDetailType.POST_ROLE_REQUEST, taskDetailSaga.createRole);
  yield takeLeading(taskDetailType.UPDATE_ROLE_REQUEST, taskDetailSaga.updateRole);
  yield takeLeading(taskDetailType.DELETE_ROLE_REQUEST, taskDetailSaga.deleteRole);

  //Time
  yield takeLeading(taskDetailType.GET_TRACKING_TIME_REQUEST, taskDetailSaga.getTrackingTime);
  yield takeLeading(taskDetailType.UPDATE_TIME_DURATION_REQUEST, taskDetailSaga.updateTimeDuration);
  yield takeLeading(taskDetailType.GET_TRACKING_TIME_REQUEST, taskDetailSaga.getTrackingTime)

  // List Task Detail
  yield takeLeading(taskDetailType.GET_LIST_TASK_DETAIL_REQUEST, taskDetailSaga.getListTaskDetail);
  yield takeLeading(taskDetailType.POST_TASK_REQUEST, taskDetailSaga.createTask);
  // List Group Task 
  yield takeLeading(taskDetailType.GET_LIST_GROUP_TASK_REQUEST, taskDetailSaga.getListGroupTask);
  // get project group 
  // yield takeLeading(taskDetailType.GET_PROJECT_GROUP_LISTPART_REQUEST, taskDetailSaga.getProjectGroup);
  // get project detail
  yield takeLeading(taskDetailType.GET_PROJECT_DETAIL_REQUEST, taskDetailSaga.getProjectDetail);
  // get project list basic 
  yield takeLeading(taskDetailType.GET_PROJECT_LIST_BASIC_REQUEST, taskDetailSaga.getProjectListBasic);
  //edit name and description task
  yield takeLeading(taskDetailType.UPDATE_NAME_DESCRIPTION_TASK_REQUEST, taskDetailSaga.updateNameDescriptionTask);
};

export default rootSaga;
