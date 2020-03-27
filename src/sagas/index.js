import { fork, takeEvery, takeLatest, takeLeading } from "redux-saga/effects";
import { LOGIN, LOGIN_CHECK_STATE } from "../constants/actions/authentications";
import { LIST_COMMENT, LIST_DOCUMENT_FROM_ME, LIST_DOCUMENT_SHARE, LIST_GOOGLE_DOCUMENT, LIST_MY_DOCUMENT, LIST_PROJECT_DOCUMENT, LIST_PROJECT_DOCUMENT_OF_FOLDER, LIST_RECENT, LIST_TRASH } from "../constants/actions/documents";
import { COPY_GROUP_TASK } from "../constants/actions/groupTask/copyGroupTask";
import { CREATE_GROUP_TASK } from "../constants/actions/groupTask/createGroupTask";
import { DELETE_GROUP_TASK } from "../constants/actions/groupTask/deleteGroupTask";
import { GET_ALL_GROUP_TASK } from "../constants/actions/groupTask/getAllGroupTask";
import { LIST_GROUP_TASK } from "../constants/actions/groupTask/listGroupTask";
import { SORT_GROUP_TASK } from "../constants/actions/groupTask/sortGroupTask";
import { UPDATE_GROUP_TASK } from "../constants/actions/groupTask/updateGroupTask ";
import { ACCEPT_REQUIREMENT_JOIN_GROUP } from "../constants/actions/groupUser/acceptRequirementJoinGroup";
import { CANCLE_INVITATION_JOIN_GROUP } from "../constants/actions/groupUser/cancleInvitationJoinGroup";
import { GET_LIST_GROUP } from "../constants/actions/groupUser/getListGroup";
import { GET_LIST_INVITATION_SENT } from "../constants/actions/groupUser/getListInvitationSent";
import { GET_REQUIREMENT_JOIN_GROUP } from "../constants/actions/groupUser/getRequirementJoinGroup";
import { INVITE_USER_JOIN_GROUP } from "../constants/actions/groupUser/inviteUserJoinGroup";
import { REJECT_REQUIREMENT_JOIN_GROUP } from "../constants/actions/groupUser/rejectRequirementJoinGroup";
import { RESEND_INVITATION_USER_JOIN_GROUP } from "../constants/actions/groupUser/resendInvitationUserJoinGroup";
import { SEARCH_USER } from "../constants/actions/groupUser/searchUser";
import { CREATE_ICON } from "../constants/actions/icon/createIcon";
import { DELETE_ICON } from "../constants/actions/icon/deleteIcon";
import { LIST_ICON } from "../constants/actions/icon/listIcon";
import { CREATE_LEVEL } from "../constants/actions/level/createLevel";
import { DELETE_LEVEL } from "../constants/actions/level/deleteLevel";
import { LIST_LEVEL } from "../constants/actions/level/listLevel";
import { UPDATE_LEVEL } from "../constants/actions/level/updateLevel";
import { CREATE_MAJOR } from "../constants/actions/major/createMajor";
import { DELETE_MAJOR } from "../constants/actions/major/deleteMajor";
import { LIST_MAJOR } from "../constants/actions/major/listMajor";
import { UPDATE_MAJOR } from "../constants/actions/major/updateMajor";
import { CREATE_POSITION } from "../constants/actions/position/createPosition";
import { DELETE_POSITION } from "../constants/actions/position/deletePosition";
import { LIST_POSITION } from "../constants/actions/position/listPosition";
import { UPDATE_POSITION } from "../constants/actions/position/updatePosition";
import { ADD_MEMBER_PROJECT } from "../constants/actions/project/addMemberProject";
import { ADD_PROJECT_ROLE_TO_MEMBER } from "../constants/actions/project/addProjectRoleToMember";
import { ASSIGN_MEMBER_TO_ALL_TASK } from "../constants/actions/project/assignMemberToAllTask";
import { COPY_PROJECT } from "../constants/actions/project/copyProject";
import { CREATE_PROJECT } from "../constants/actions/project/createProject";
import { DELETE_PROJECT } from "../constants/actions/project/deleteProject";
import { DETAIL_PROJECT } from "../constants/actions/project/detailProject";
import { HIDE_PROJECT } from "../constants/actions/project/hideProject";
import { LIST_DELETED_PROJECT } from "../constants/actions/project/listDeletedProject";
import { LIST_PROJECT } from "../constants/actions/project/listProject";
import { MEMBER_PROJECT } from "../constants/actions/project/memberProject";
import { REMOVE_MEMBER_PROJECT } from "../constants/actions/project/removeMemberProject";
import { REMOVE_PROJECT_ROLE_FROM_MEMBER } from "../constants/actions/project/removeProjectRoleFromMember";
import { DETAIL_STATUS } from "../constants/actions/project/setting/detailStatus";
import { UPDATE_STATUS_COPY } from "../constants/actions/project/setting/updateStatusCopy";
import { UPDATE_STATUS_DATE } from "../constants/actions/project/setting/updateStatusDate";
import { UPDATE_STATUS_VIEW } from "../constants/actions/project/setting/updateStatusView";
import { SHOW_PROJECT } from "../constants/actions/project/showProject";
import { SORT_PROJECT } from "../constants/actions/project/sortProject";
import { UPDATE_GROUP_PERMISSION_MEMBER } from "../constants/actions/project/updateGroupPermissionMember";
import { UPDATE_PROJECT } from "../constants/actions/project/updateProject";
import { UPDATE_STATE_JOIN_TASK } from "../constants/actions/project/updateStateJoinTask";
import { CREATE_PROJECT_GROUP } from "../constants/actions/projectGroup/createProjectGroup";
import { DELETE_PROJECT_GROUP } from "../constants/actions/projectGroup/deleteProjectGroup";
import { DETAIL_DEFAULT_GROUP } from "../constants/actions/projectGroup/detailDefaultGroup";
import { DETAIL_PROJECT_GROUP } from "../constants/actions/projectGroup/detailProjectGroup";
import { EDIT_PROJECT_GROUP } from "../constants/actions/projectGroup/editProjectGroup";
import { LIST_PROJECT_GROUP } from "../constants/actions/projectGroup/listProjectGroup";
import { MEMBER_PROJECT_GROUP } from "../constants/actions/projectGroup/memberProjectGroup";
import { SORT_PROJECT_GROUP } from "../constants/actions/projectGroup/sortProjectGroup";
import { INVITE_OTHER_PEOPLE_CREATE_ACCOUNT } from "../constants/actions/register/inviteOtherPeopleCreateAccount";
import { CREATE_ROOM } from "../constants/actions/room/createRoom";
import { DELETE_ROOM } from "../constants/actions/room/deleteRoom";
import { DETAIL_ROOM } from "../constants/actions/room/detailRoom";
import { GET_USER_OF_ROOM } from "../constants/actions/room/getUserOfRoom";
import { LIST_ROOM } from "../constants/actions/room/listRoom";
import { SORT_ROOM } from "../constants/actions/room/sortRoom";
import { UPDATE_ROOM } from "../constants/actions/room/updateRoom";
import { FETCH_GROUP_DETAIL, FETCH_LIST_COLOR_GROUP, GET_SETTING_DATE } from "../constants/actions/setting/setting";
import { CREATE_TASK } from '../constants/actions/task/createTask';
import { DELETE_TASK } from '../constants/actions/task/deleteTask';
import { LIST_TASK } from '../constants/actions/task/listTask';
import { SORT_TASK } from '../constants/actions/task/sortTask';
// ==================================
import * as taskDetailType from "../constants/actions/taskDetail/taskDetailConst";
import { BAN_USER_FROM_GROUP } from "../constants/actions/user/banUserFromGroup";
import { DETAIL_USER } from "../constants/actions/user/detailUser";
import { LIST_USER_OF_GROUP } from "../constants/actions/user/listUserOfGroup";
import { PRIVATE_MEMBER } from "../constants/actions/user/privateMember";
import { PUBLIC_MEMBER } from "../constants/actions/user/publicMember";
import { SORT_USER } from "../constants/actions/user/sortUser";
import { UPDATE_USER } from "../constants/actions/user/updateUser";
import { UPLOAD_DOCUMENTS_USER } from "../constants/actions/user/uploadDocumentsUser";
import { CREATE_USER_ROLE } from "../constants/actions/userRole/createUserRole";
import { DELETE_USER_ROLE } from "../constants/actions/userRole/deleteUserRole";
import { LIST_USER_ROLE } from "../constants/actions/userRole/listUserRole";
import { UPDATE_USER_ROLE } from "../constants/actions/userRole/updateUserRole";
// ==================================
import { watchLoadTaskAssignPage, watchLoadTaskDuePage, watchLoadTaskOverviewPage, watchLoadTaskRolePage } from "../views/JobPage/redux/sagas";
import { login, loginCheckState } from "./authentications";
import { listComment, listDocumentShare, listDocumentShareFromMe, listGoogleDocument, listMyDocument, listProjectDocument, listProjectDocumentOfFolder, listRecent, listTrash } from "./documents";
import { copyGroupTask } from "./groupTask/copyGroupTask";
import { createGroupTask } from "./groupTask/createGroupTask";
import { deleteGroupTask } from "./groupTask/deleteGroupTask";
import { getAllGroupTask } from "./groupTask/getAllGroupTask";
import { listGroupTask } from "./groupTask/listGroupTask";
import { sortGroupTask } from "./groupTask/sortGroupTask";
import { updateGroupTask } from "./groupTask/updateGroupTask";
import { acceptRequirementJoinGroup } from "./groupUser/acceptRequirementUserJoinGroup";
import { cancleInvitationJoinGroup } from "./groupUser/cancleInvitationJoinGroup";
import { getListGroup } from "./groupUser/getListGroup";
import { getListInvitationSent } from "./groupUser/getListInvitationSent";
import { getRequirementJoinGroup } from "./groupUser/getRequirementUserJoinGroup";
import { inviteUserJoinGroup } from "./groupUser/inviteUserJoinGroup";
import { rejectRequirementJoinGroup } from "./groupUser/rejectRequirementUserJoinGroup";
import { resendInvitationUserJoinGroup } from "./groupUser/resendInvitationUserJoinGroup";
import { searchUser } from "./groupUser/searchUser";
import { createIcon } from "./icon/createIcon";
import { deleteIcon } from "./icon/deleteIcon";
import { listIcon } from "./icon/listIcon";
import { createLevel } from "./level/createLevel";
import { deleteLevel } from "./level/deleteLevel";
import { listLevel } from "./level/listLevel";
import { updateLevel } from "./level/updateLevel";
import { createMajor } from "./major/createMajor";
import { deleteMajor } from "./major/deleteMajor";
import { listMajor } from "./major/listMajor";
import { updateMajor } from "./major/updateMajor";
import { createPosition } from "./position/createPosition";
import { deletePosition } from "./position/deletePosition";
import { listPosition } from "./position/listPosition";
import { updatePosition } from "./position/updatePosition";
import { addMemberProject } from "./project/addMemberProject";
import { addProjectRoleToMember } from "./project/addProjectRoleToMember";
import { assignMemberToAllTask } from "./project/assignMemberToAllTask";
import { copyProject } from "./project/copyProject";
import { createProject } from "./project/createProject";
import { deleteProject } from "./project/deleteProject";
import { detailProject } from "./project/detailProject";
import { hideProject } from "./project/hideProject";
import { listDeletedProject, listProject } from "./project/listProject";
import { memberProject } from "./project/memberProject";
import { removeMemberProject } from "./project/removeMemberProject";
import { removeProjectRoleFromMember } from "./project/removeProjectRoleFromMember";
import { detailStatus } from "./project/setting/detailStatus";
import { updateStatusCopy } from "./project/setting/updateStatusCopy";
import { updateStatusDate } from "./project/setting/updateStatusDate";
import { updateStatusView } from "./project/setting/updateStatusView";
import { showProject } from "./project/showProject";
import { sortProject } from "./project/sortProject";
import { updateGroupPermissionMember } from "./project/updateGroupPermissionMember";
import { updateProject } from "./project/updateProject";
import { updateStateJoinTask } from "./project/updateStateJoinTask";
import { createProjectGroup } from "./projectGroup/createProjectGroup";
import { deleteProjectGroup } from "./projectGroup/deleteProjectGroup";
import { detailDefaultGroup } from "./projectGroup/detailDefaultGroup";
import { detailProjectGroup } from "./projectGroup/detailProjectGroup";
import { editProjectGroup } from "./projectGroup/editProjectGroup";
import { listProjectGroup } from "./projectGroup/listProjectGroup";
import { memberProjectGroup } from "./projectGroup/memberProjectGroup";
import { sortProjectGroup } from "./projectGroup/sortProjectGroup";
import { inviteOtherPeopleCreateAccount } from "./register/inviteOtherPeopleCreateAccount";
import { createRoom } from "./room/createRoom";
import { deleteRoom } from "./room/deleteRoom";
import { detailRoom } from "./room/detailRoom";
import { getUserOfRoom } from "./room/getUserOfRoom";
import { listRoom } from "./room/listRoom";
import { sortRoom } from "./room/sortRoom";
import { updateRoom } from "./room/updateRoom";
import { getGroupDetail, getListColor, getSettingDate } from "./setting/setting";
import { createTask } from './task/createTask';
import { deleteTask } from './task/deleteTask';
import { listTask } from './task/listTask';
import { sortTask } from './task/sortTask';
import * as taskDetailSaga from "./taskDetail/TaskDetailSaga";
import { banUserFromGroup } from "./user/banUserFromGroup";
import { detailUser } from "./user/detailUser";
import { listUserOfGroup } from "./user/listUserOfGroup";
import { privateMember } from "./user/privateMember";
import { publicMember } from "./user/publicMember";
import { sortUser } from "./user/sortUser";
import { updateUser } from "./user/updateUser";
import { uploadDocumentsUser } from "./user/uploadDocumentsUser";
import { createUserRole } from "./userRole/createUserRole";
import { deleteUserRole } from "./userRole/deleteUserRole";
import { listUserRole } from "./userRole/listUserRole";
import { updateUserRole } from "./userRole/updateUserRole";

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
  yield takeEvery(CREATE_MAJOR, createMajor);
  yield takeEvery(UPDATE_MAJOR, updateMajor);
  yield takeEvery(DELETE_MAJOR, deleteMajor);
  yield takeEvery(CREATE_LEVEL, createLevel);
  yield takeEvery(UPDATE_LEVEL, updateLevel);
  yield takeEvery(DELETE_LEVEL, deleteLevel);
  yield takeLatest(LIST_USER_ROLE, listUserRole);
  yield takeEvery(CREATE_USER_ROLE, createUserRole);
  yield takeEvery(UPDATE_USER_ROLE, updateUserRole);
  yield takeEvery(DELETE_USER_ROLE, deleteUserRole);
  yield takeEvery(PUBLIC_MEMBER, publicMember);
  yield takeEvery(PRIVATE_MEMBER, privateMember);
  yield takeLatest(SEARCH_USER, searchUser);
  yield takeEvery(INVITE_USER_JOIN_GROUP, inviteUserJoinGroup);
  yield takeEvery(
    RESEND_INVITATION_USER_JOIN_GROUP,
    resendInvitationUserJoinGroup
  );
  yield takeLatest(GET_REQUIREMENT_JOIN_GROUP, getRequirementJoinGroup);
  yield takeLatest(GET_LIST_INVITATION_SENT, getListInvitationSent);
  yield takeLatest(CANCLE_INVITATION_JOIN_GROUP, cancleInvitationJoinGroup);
  yield takeEvery(ACCEPT_REQUIREMENT_JOIN_GROUP, acceptRequirementJoinGroup);
  yield takeEvery(REJECT_REQUIREMENT_JOIN_GROUP, rejectRequirementJoinGroup);
  yield takeLatest(GET_LIST_GROUP, getListGroup);
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
  yield takeLatest(DETAIL_DEFAULT_GROUP, detailDefaultGroup);
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
  yield takeEvery(REMOVE_PROJECT_ROLE_FROM_MEMBER, removeProjectRoleFromMember);
  yield takeEvery(UPDATE_GROUP_PERMISSION_MEMBER, updateGroupPermissionMember);
  yield takeEvery(ASSIGN_MEMBER_TO_ALL_TASK, assignMemberToAllTask);
  yield takeLatest(DETAIL_STATUS, detailStatus);
  yield takeEvery(UPDATE_STATUS_COPY, updateStatusCopy);
  yield takeEvery(UPDATE_STATUS_DATE, updateStatusDate);
  yield takeEvery(UPDATE_STATUS_VIEW, updateStatusView);
  yield takeLatest(LIST_GROUP_TASK, listGroupTask);
  yield takeEvery(CREATE_GROUP_TASK, createGroupTask);
  yield takeEvery(COPY_GROUP_TASK, copyGroupTask);
  yield takeEvery(UPDATE_GROUP_TASK, updateGroupTask);
  yield takeEvery(DELETE_GROUP_TASK, deleteGroupTask);
  yield takeEvery(SORT_GROUP_TASK, sortGroupTask);
  yield takeLatest(GET_ALL_GROUP_TASK, getAllGroupTask);
  yield takeLatest(LIST_TASK, listTask);
  yield takeEvery(CREATE_TASK, createTask);
  yield takeEvery(DELETE_TASK, deleteTask);
  yield takeEvery(SORT_TASK, sortTask);
  yield takeEvery(
    INVITE_OTHER_PEOPLE_CREATE_ACCOUNT,
    inviteOtherPeopleCreateAccount
  );

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
  yield takeLatest(LIST_GOOGLE_DOCUMENT, listGoogleDocument);
  yield takeLatest(FETCH_LIST_COLOR_GROUP, getListColor);
  yield takeLatest(GET_SETTING_DATE, getSettingDate);

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
    taskDetailType.APPROVE_OFFER_REQUEST,
    taskDetailSaga.approveOffer
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
  yield takeLeading(
    taskDetailType.PIN_REMIND_REQUEST,
    taskDetailSaga.pinRemind
  );
  yield takeLeading(
    taskDetailType.UNPIN_REMIND_REQUEST,
    taskDetailSaga.unpinRemind
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
  yield takeLeading(
    taskDetailType.GET_COMMAND_REQUEST,
    taskDetailSaga.getCommand
  );
  yield takeLeading(
    taskDetailType.CREATE_COMMAND_REQUEST,
    taskDetailSaga.createCommand
  );
  yield takeLeading(
    taskDetailType.UPDATE_COMMAND_REQUEST,
    taskDetailSaga.updateCommand
  );
  yield takeLeading(
    taskDetailType.DELETE_COMMAND_REQUEST,
    taskDetailSaga.deleteCommand
  );

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
  yield takeLeading(
    taskDetailType.GET_PERMISSION_REQUEST,
    taskDetailSaga.getPermission
  );
  yield takeLeading(
    taskDetailType.UPDATE_PERMISSION_REQUEST,
    taskDetailSaga.updatePermission
  );
  // Member Role::
  yield takeLeading(taskDetailType.GET_ROLE_REQUEST, taskDetailSaga.getRole);
  yield takeLeading(taskDetailType.POST_ROLE_REQUEST, taskDetailSaga.createRole);
  yield takeLeading(taskDetailType.UPDATE_ROLE_REQUEST, taskDetailSaga.updateRole);
  yield takeLeading(taskDetailType.DELETE_ROLE_REQUEST, taskDetailSaga.deleteRole);
  yield takeLeading(taskDetailType.UPDATE_ROLES_FOR_MEMBER_REQUEST, taskDetailSaga.updateRolesForMember);

  //Time
  yield takeLeading(
    taskDetailType.GET_TRACKING_TIME_REQUEST,
    taskDetailSaga.getTrackingTime
  );
  yield takeLeading(
    taskDetailType.GET_TRACKING_TIME_COMPLETE_REQUEST,
    taskDetailSaga.getTrackingTimeComplete
  );
  yield takeLeading(
    taskDetailType.UPDATE_TIME_DURATION_REQUEST,
    taskDetailSaga.updateTimeDuration
  );

  // List Task Detail
  yield takeLeading(
    taskDetailType.GET_LIST_TASK_DETAIL_REQUEST,
    taskDetailSaga.getListTaskDetail
  );
  yield takeLeading(
    taskDetailType.POST_TASK_REQUEST,
    taskDetailSaga.createTask
  );
  // List Group Task
  yield takeLeading(
    taskDetailType.GET_LIST_GROUP_TASK_REQUEST,
    taskDetailSaga.getListGroupTask
  );
  yield takeLeading(
    taskDetailType.GET_LIST_OFFER_REQUEST,
    taskDetailSaga.getListOffer
  );
  // get project group
  // yield takeLeading(taskDetailType.GET_PROJECT_GROUP_LISTPART_REQUEST, taskDetailSaga.getProjectGroup);
  // get project detail
  yield takeLeading(
    taskDetailType.GET_PROJECT_DETAIL_REQUEST,
    taskDetailSaga.getProjectDetail
  );
  // get project list basic
  yield takeLeading(
    taskDetailType.GET_PROJECT_LIST_BASIC_REQUEST,
    taskDetailSaga.getProjectListBasic
  );
  //edit name and description task
  yield takeLeading(
    taskDetailType.UPDATE_NAME_DESCRIPTION_TASK_REQUEST,
    taskDetailSaga.updateNameDescriptionTask
  );
  // static task
  yield takeLeading(
    taskDetailType.STATIC_TASK_REQUEST,
    taskDetailSaga.getStaticTask
  );
  //updateComplete
  yield takeLeading(
    taskDetailType.UPDATE_COMPLETE_REQUEST,
    taskDetailSaga.updateComplete
  );
  // pin
  yield takeLeading(taskDetailType.PIN_TASK_REQUEST, taskDetailSaga.pinTask);
  yield takeLeading(
    taskDetailType.UN_PIN_TASK_REQUEST,
    taskDetailSaga.unPinTask
  );

  yield fork(watchLoadTaskOverviewPage);
  yield fork(watchLoadTaskDuePage);
  yield fork(watchLoadTaskAssignPage);
  yield fork(watchLoadTaskRolePage);
}

export default rootSaga;
