import { SET_PROJECT, SET_PROJECT_GROUP } from 'constants/actions/localStorage';
import { fork, takeEvery, takeLatest, takeLeading } from "redux-saga/effects";
import {
  ADD_MEMBER_HANDLE,
  ADD_MEMBER_MONITOR,
  CREATE_GROUP_OFFER,
  DELETE_DOCUMENT_OFFER,
  DELETE_GROUP_OFFER,
  DELETE_MEMBER_HANDLE,
  DELETE_MEMBER_MONITOR,
  HANDLE_OFFER_OFFERPAGE,
  LOAD_DETAIL_OFFER,
  UPDATE_OFFER_DETAIL_DESCRIPTION_SECTION,
  UPDATE_OFFER_APPROVAL_CONDITION,
  DELETE_OFFER,
  LOAD_OFFER_BY_DEPARTMENT_ID,
  LOAD_OFFER_BY_GROUP_ID,
  LOAD_OFFER_BY_PROJECT_ID,
  LOAD_SUMMARY_BY_GROUP,
  LOAD_SUMMARY_BY_PROJECT,
  LOAD_SUMMARY_DEPARTMENT,
  LOAD_SUMMARY_OVERVIEW,
  LOAD_TASK_RENCENTLY,
  UPDATE_GROUP_OFFER_OFFERPAGE,
  UPLOAD_DOCUMENT_OFFER,
} from "views/OfferPage/redux/types";
import watchAsyncAction from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/saga";
import { LOGIN, LOGIN_CHECK_STATE } from "../constants/actions/authentications";
import { CREATE_PERSONAL_CATEGORY_REMIND, CREATE_PERSONAL_REMIND, DELETE_PERSONAL_CATEGORY_REMIND, DELETE_PERSONAL_REMIND, LIST_PERSONAL_REMIND, LIST_PERSONAL_REMIND_CATEGORY, LIST_REMIND_PROJECT, LIST_REMIND_RECENTLY, SORT_PERSONAL_REMIND_CATEGORY, UPDATE_PERSONAL_CATEGORY_REMIND, UPDATE_PERSONAL_REMIND } from "../constants/actions/calendar/alarmCalendar";
import { CALENDAR_PAGE_PERMISSION } from "../constants/actions/calendar/permission";
import { GROUP_SCHEDULE_ADD_DAY_OFF, GROUP_SCHEDULE_ADD_WORKING_DAY, GROUP_SCHEDULE_ADD_WORKING_STAGE, GROUP_SCHEDULE_CREATE, GROUP_SCHEDULE_CREATE_SHIFT_STAGE, GROUP_SCHEDULE_CREATE_SHIFT_STAGE_ALLTIME, GROUP_SCHEDULE_DELETE, GROUP_SCHEDULE_DELETE_DAY_OFF, GROUP_SCHEDULE_DELETE_SHIFT_STAGE, GROUP_SCHEDULE_DELETE_SHIFT_STAGE_ALLTIME, GROUP_SCHEDULE_DELETE_WORKING_DAY, GROUP_SCHEDULE_DELETE_WORKING_STAGE, GROUP_SCHEDULE_DETAIL, GROUP_SCHEDULE_LIST, GROUP_SCHEDULE_SET_WORKING_DAY, GROUP_SCHEDULE_UPDATE, GROUP_SCHEDULE_UPDATE_SHIFT_STAGE, GROUP_SCHEDULE_UPDATE_SHIFT_STAGE_ALLTIME, GROUP_SCHEDULE_UPDATE_WORKING_STAGE, SETTING_START_DAY_WEEK } from "../constants/actions/calendar/projectCalendar";
import { CREATE_SCHEDULE, DELETE_ALL_SCHEDULE, DELETE_SCHEDULE, LIST_WEEKS_IN_YEAR, SCHEDULE_LIST, SCHEDULE_OF_WEEK_LIST, SCHEDULE_OF_WEEK_LIST_FROM_MODAL, SETTING_STARTING_DAY, UPDATE_SCHEDULE } from "../constants/actions/calendar/weeklyCalendar";
import * as chatTypes from "../constants/actions/chat/chat";
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
import { DELETE_TRASH_PROJECT } from "../constants/actions/project/deleteTrashProject";
import { DETAIL_PROJECT } from "../constants/actions/project/detailProject";
import { HIDE_PROJECT } from "../constants/actions/project/hideProject";
import { LIST_PROJECT_BASIC_INFO } from "../constants/actions/project/listBasic";
import { LIST_DELETED_PROJECT } from "../constants/actions/project/listDeletedProject";
import { LIST_PROJECT } from "../constants/actions/project/listProject";
import { MEMBER_PROJECT } from "../constants/actions/project/memberProject";
import { PERMISSION_PROJECT } from "../constants/actions/project/permissionProject";
import { REMOVE_GROUP_PERMISSION_MEMBER } from "../constants/actions/project/removeGroupPermissionMember";
import { REMOVE_MEMBER_PROJECT } from "../constants/actions/project/removeMemberProject";
import { REMOVE_PROJECT_ROLE_FROM_MEMBER } from "../constants/actions/project/removeProjectRoleFromMember";
import { RESTORE_TRASH_PROJECT } from "../constants/actions/project/restoreTrashProject";
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
import { CREATE_TASK } from "../constants/actions/task/createTask";
import { DELETE_TASK } from "../constants/actions/task/deleteTask";
import { LIST_TASK } from "../constants/actions/task/listTask";
import { SORT_TASK } from "../constants/actions/task/sortTask";
// ==================================
import * as taskDetailType from "../constants/actions/taskDetail/taskDetailConst";
import { BAN_USER_FROM_GROUP } from "../constants/actions/user/banUserFromGroup";
import { DETAIL_USER } from "../constants/actions/user/detailUser";
import { LIST_USER_OF_GROUP } from "../constants/actions/user/listUserOfGroup";
import { PERMISSION_USER } from "../constants/actions/user/permissionUser";
import { PRIVATE_MEMBER } from "../constants/actions/user/privateMember";
import { PUBLIC_MEMBER } from "../constants/actions/user/publicMember";
import { REMOVE_GROUP_PERMISSION_USER } from "../constants/actions/user/removeGroupPermissionUser";
import { SORT_USER } from "../constants/actions/user/sortUser";
import { UPDATE_GROUP_PERMISSION_USER } from "../constants/actions/user/updateGroupPermissionUser";
import { UPDATE_USER } from "../constants/actions/user/updateUser";
import { UPLOAD_DOCUMENTS_USER } from "../constants/actions/user/uploadDocumentsUser";
import { CREATE_USER_ROLE } from "../constants/actions/userRole/createUserRole";
import { DELETE_USER_ROLE } from "../constants/actions/userRole/deleteUserRole";
import { LIST_USER_ROLE } from "../constants/actions/userRole/listUserRole";
import { UPDATE_USER_ROLE } from "../constants/actions/userRole/updateUserRole";
import { GET_PERMISSION_VIEW_DETAIL_PROJECT, GET_PERMISSION_VIEW_PROJECTS, GET_PERMISSION_VIEW_USERS } from "../constants/actions/viewPermissions";
// ==================================
import { watchLoadTaskAssignPage, watchLoadTaskDuePage, watchLoadTaskOverviewPage, watchLoadTaskPage, watchLoadTaskRolePage } from "../views/JobPage/redux/sagas";
import {
  doAddMemberHandle,
  doAddMemberMonitor,
  doCreateOfferGroup,
  doDeleteDocumentOffer,
  doDeleteGroupOffer,
  doDeleteMemberHandle,
  doDeleteMemberMonitor,
  doDeleteOffer,
  doGetSummaryByGroup,
  doGetTaskRecently,
  doHandleOffer,
  doLoadDetailOffer,
  doUpdateOfferDetailDescriptionSection,
  doUpdateOfferApprovalCondition,
  doLoadOfferByDepartmentID,
  doLoadOfferByGroupID,
  doLoadOfferByProjectID,
  doLoadSummaryByDepartment,
  doLoadSummaryOverview,
  doLoadSummaryProject,
  doUpdateGroupOffer,
  doUploadDocumentOffer,
} from '../views/OfferPage/redux/sagas';
import { login, loginCheckState } from "./authentications";
import { createPersonalRemind } from "./calendar/alarmCalendar/createPersonalRemind";
import { createPersonalRemindCategory } from "./calendar/alarmCalendar/createPersonalRemindCategory";
import { deletePersonalRemind } from "./calendar/alarmCalendar/deletePersonalRemind";
import { deletePersonalRemindCategory } from "./calendar/alarmCalendar/deletePersonalRemindCategory";
import { listPersonalRemind } from "./calendar/alarmCalendar/listPersonalRemind";
import { listPersonalRemindCategory } from "./calendar/alarmCalendar/listPersonalRemindCategory";
import { listRemindProject } from "./calendar/alarmCalendar/listRemindProject";
import { listRemindRecently } from "./calendar/alarmCalendar/listRemindRecently";
import { sortPersonalRemindCategory } from "./calendar/alarmCalendar/sortPeronalRemindCategory";
import { updatePersonalRemind } from "./calendar/alarmCalendar/updatePersonalRemind";
import { updatePersonalRemindCategory } from "./calendar/alarmCalendar/updatePersonalRemindCategory";
import { listCalendarPermission } from "./calendar/permission/listPermission";
import { projectScheduleAddDayOff } from "./calendar/projectCalendar/addDayOff";
import { projectScheduleAddWorkingDays } from "./calendar/projectCalendar/addWorkingDay";
import { createProjectGroupSchedule } from "./calendar/projectCalendar/createProjectGroupSchedule";
import { projectScheduleCreateShiftStage } from "./calendar/projectCalendar/createShiftStage";
import { projectScheduleCreateShiftStageAllTime } from "./calendar/projectCalendar/createShiftStageAllTime";
import { projectScheduleCreateWorkingStage } from "./calendar/projectCalendar/createWorkingStage";
import { projectScheduleDeleteDayOff } from "./calendar/projectCalendar/deleteDayOff";
import { deleteProjectGroupSchedule } from "./calendar/projectCalendar/deleteProjectGroupSchedule";
import { projectScheduleDeleteShiftStage } from "./calendar/projectCalendar/deleteShiftStage";
import { projectScheduleDeleteShiftStageAllTime } from "./calendar/projectCalendar/deleteShiftStageAllTime";
import { projectScheduleDeleteWorkingDays } from "./calendar/projectCalendar/deleteWorkingDay";
import { projectScheduleDeleteWorkingStage } from "./calendar/projectCalendar/deleteWorkingStage";
import { projectGroupScheduleDetail } from "./calendar/projectCalendar/getGroupScheduleDetail";
import { listProjectGroupSchedule } from "./calendar/projectCalendar/listProjectGroupSchedule";
import { projectScheduleSettingStartingDay } from "./calendar/projectCalendar/settingStartingDay";
import { projectScheduleSetWorkingDay } from "./calendar/projectCalendar/setWorkingDay";
import { updateProjectGroupSchedule } from "./calendar/projectCalendar/updateProjectGroupSchedule";
import { projectScheduleUpdateShiftStage } from "./calendar/projectCalendar/updateShiftStage";
import { projectScheduleUpdateShiftStageAllTime } from "./calendar/projectCalendar/updateShiftStageAllTime";
import { projectScheduleUpdateWorkingStage } from "./calendar/projectCalendar/updateWorkingStage";
import { createSchedule } from "./calendar/weeklyCalendar/createSchedule";
import { deleteAllSchedule } from "./calendar/weeklyCalendar/deleteAllSchedule";
import { deleteSchedule } from "./calendar/weeklyCalendar/deleteSchedule";
import { listWeeklySchedule } from "./calendar/weeklyCalendar/listSchedule";
import { listScheduleOfWeek } from "./calendar/weeklyCalendar/listScheduleOfWeek";
import { listScheduleOfWeekFromModal } from "./calendar/weeklyCalendar/listScheduleOfWeekFromModal";
import { listWeeksInYear } from "./calendar/weeklyCalendar/listWeeksInYear";
import { settingStartingDay } from "./calendar/weeklyCalendar/settingStartingDay";
import { updateSchedule } from "./calendar/weeklyCalendar/updateSchedule";
import * as chatDetailSaga from "./chat/chat";
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
import { setProject, setProjectGroup } from './localStorage';
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
import { deleteTrashProject } from "./project/deleteTrashProject";
import { detailProject } from "./project/detailProject";
import { hideProject } from "./project/hideProject";
import { listProjectBasicInfo } from "./project/listBasicInfo";
import { listDeletedProject, listProject } from "./project/listProject";
import { memberProject } from "./project/memberProject";
import { permissionProject } from "./project/permissionProject";
import { removeGroupPermissionMember } from "./project/removeGroupPermissionMember";
import { removeMemberProject } from "./project/removeMemberProject";
import { removeProjectRoleFromMember } from "./project/removeProjectRoleFromMember";
import { restoreTrashProject } from "./project/restoreTrashProject";
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
import { createTask } from "./task/createTask";
import { deleteTask } from "./task/deleteTask";
import { listTask } from "./task/listTask";
import { sortTask } from "./task/sortTask";
import * as taskDetailSaga from "./taskDetail/TaskDetailSaga";
import { banUserFromGroup } from "./user/banUserFromGroup";
import { detailUser } from "./user/detailUser";
import { listUserOfGroup } from "./user/listUserOfGroup";
import { permissionUser } from "./user/permissionUser";
import { privateMember } from "./user/privateMember";
import { publicMember } from "./user/publicMember";
import { removeGroupPermissionUser } from "./user/removeGroupPermissionUser";
import { sortUser } from "./user/sortUser";
import { updateGroupPermissionUser } from "./user/updateGroupPermissionUser";
import { updateUser } from "./user/updateUser";
import { uploadDocumentsUser } from "./user/uploadDocumentsUser";
import { createUserRole } from "./userRole/createUserRole";
import { deleteUserRole } from "./userRole/deleteUserRole";
import { listUserRole } from "./userRole/listUserRole";
import { updateUserRole } from "./userRole/updateUserRole";
import { getPermissionViewDetailProject, getPermissionViewProjects, getPermissionViewUsers } from "./viewPermissions";

function* rootSaga() {
  // Hoang - begin

  yield takeEvery(LOGIN, login);
  yield takeEvery(LOGIN_CHECK_STATE, loginCheckState);
  yield takeLeading(LIST_ROOM, listRoom);
  yield takeLeading(DETAIL_ROOM, detailRoom);
  yield takeLeading(GET_USER_OF_ROOM, getUserOfRoom);
  yield takeLeading(LIST_USER_OF_GROUP, listUserOfGroup);
  yield takeEvery(SORT_USER, sortUser);
  yield takeLeading(PERMISSION_USER, permissionUser);
  yield takeEvery(UPDATE_GROUP_PERMISSION_USER, updateGroupPermissionUser);
  yield takeEvery(REMOVE_GROUP_PERMISSION_USER, removeGroupPermissionUser);
  yield takeLeading(LIST_ICON, listIcon);
  yield takeEvery(CREATE_ROOM, createRoom);
  yield takeEvery(DELETE_ROOM, deleteRoom);
  yield takeEvery(UPDATE_ROOM, updateRoom);
  yield takeEvery(SORT_ROOM, sortRoom);
  yield takeLeading(DETAIL_USER, detailUser);
  yield takeEvery(UPLOAD_DOCUMENTS_USER, uploadDocumentsUser);
  yield takeLeading(LIST_MAJOR, listMajor);
  yield takeLeading(LIST_LEVEL, listLevel);
  yield takeLeading(LIST_POSITION, listPosition);
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
  yield takeLeading(LIST_USER_ROLE, listUserRole);
  yield takeEvery(CREATE_USER_ROLE, createUserRole);
  yield takeEvery(UPDATE_USER_ROLE, updateUserRole);
  yield takeEvery(DELETE_USER_ROLE, deleteUserRole);
  yield takeEvery(PUBLIC_MEMBER, publicMember);
  yield takeEvery(PRIVATE_MEMBER, privateMember);
  yield takeLeading(SEARCH_USER, searchUser);
  yield takeEvery(INVITE_USER_JOIN_GROUP, inviteUserJoinGroup);
  yield takeEvery(
    RESEND_INVITATION_USER_JOIN_GROUP,
    resendInvitationUserJoinGroup
  );
  yield takeLeading(GET_REQUIREMENT_JOIN_GROUP, getRequirementJoinGroup);
  yield takeLeading(GET_LIST_INVITATION_SENT, getListInvitationSent);
  yield takeLeading(CANCLE_INVITATION_JOIN_GROUP, cancleInvitationJoinGroup);
  yield takeEvery(ACCEPT_REQUIREMENT_JOIN_GROUP, acceptRequirementJoinGroup);
  yield takeEvery(REJECT_REQUIREMENT_JOIN_GROUP, rejectRequirementJoinGroup);
  yield takeLeading(GET_LIST_GROUP, getListGroup);
  yield takeEvery(BAN_USER_FROM_GROUP, banUserFromGroup);
  yield takeEvery(CREATE_ICON, createIcon);
  yield takeEvery(DELETE_ICON, deleteIcon);
  yield takeEvery(CREATE_PROJECT_GROUP, createProjectGroup);
  yield takeEvery(EDIT_PROJECT_GROUP, editProjectGroup);
  yield takeLeading(LIST_PROJECT_GROUP, listProjectGroup);
  yield takeEvery(DELETE_PROJECT_GROUP, deleteProjectGroup);
  yield takeEvery(SORT_PROJECT_GROUP, sortProjectGroup);
  yield takeLeading(DETAIL_PROJECT_GROUP, detailProjectGroup);
  yield takeLeading(MEMBER_PROJECT_GROUP, memberProjectGroup);
  yield takeLeading(DETAIL_DEFAULT_GROUP, detailDefaultGroup);
  yield takeEvery(CREATE_PROJECT, createProject);
  yield takeEvery(COPY_PROJECT, copyProject);
  yield takeEvery(SORT_PROJECT, sortProject);
  yield takeEvery(UPDATE_PROJECT, updateProject);
  yield takeEvery(DELETE_PROJECT, deleteProject);
  yield takeLeading(LIST_PROJECT, listProject);
  yield takeLeading(LIST_PROJECT_BASIC_INFO, listProjectBasicInfo);
  yield takeLeading(LIST_DELETED_PROJECT, listDeletedProject);
  yield takeLeading(DETAIL_PROJECT, detailProject);
  yield takeEvery(HIDE_PROJECT, hideProject);
  yield takeEvery(SHOW_PROJECT, showProject);
  yield takeEvery(DELETE_TRASH_PROJECT, deleteTrashProject);
  yield takeEvery(RESTORE_TRASH_PROJECT, restoreTrashProject);
  yield takeLeading(MEMBER_PROJECT, memberProject);
  yield takeLeading(PERMISSION_PROJECT, permissionProject);
  yield takeEvery(ADD_MEMBER_PROJECT, addMemberProject);
  yield takeEvery(REMOVE_MEMBER_PROJECT, removeMemberProject);
  yield takeEvery(UPDATE_STATE_JOIN_TASK, updateStateJoinTask);
  yield takeEvery(ADD_PROJECT_ROLE_TO_MEMBER, addProjectRoleToMember);
  yield takeEvery(REMOVE_PROJECT_ROLE_FROM_MEMBER, removeProjectRoleFromMember);
  yield takeEvery(UPDATE_GROUP_PERMISSION_MEMBER, updateGroupPermissionMember);
  yield takeEvery(REMOVE_GROUP_PERMISSION_MEMBER, removeGroupPermissionMember);
  yield takeEvery(ASSIGN_MEMBER_TO_ALL_TASK, assignMemberToAllTask);
  yield takeLeading(DETAIL_STATUS, detailStatus);
  yield takeEvery(UPDATE_STATUS_COPY, updateStatusCopy);
  yield takeEvery(UPDATE_STATUS_DATE, updateStatusDate);
  yield takeEvery(UPDATE_STATUS_VIEW, updateStatusView);
  yield takeLeading(LIST_GROUP_TASK, listGroupTask);
  yield takeEvery(CREATE_GROUP_TASK, createGroupTask);
  yield takeEvery(COPY_GROUP_TASK, copyGroupTask);
  yield takeEvery(UPDATE_GROUP_TASK, updateGroupTask);
  yield takeEvery(DELETE_GROUP_TASK, deleteGroupTask);
  yield takeEvery(SORT_GROUP_TASK, sortGroupTask);
  yield takeLeading(GET_ALL_GROUP_TASK, getAllGroupTask);
  yield takeLeading(LIST_TASK, listTask);
  yield takeEvery(CREATE_TASK, createTask);
  yield takeEvery(DELETE_TASK, deleteTask);
  yield takeEvery(SORT_TASK, sortTask);
  yield takeEvery(
    INVITE_OTHER_PEOPLE_CREATE_ACCOUNT,
    inviteOtherPeopleCreateAccount
  );
  yield takeLeading(GET_PERMISSION_VIEW_PROJECTS, getPermissionViewProjects);
  yield takeLeading(GET_PERMISSION_VIEW_USERS, getPermissionViewUsers);
  yield takeLeading(
    GET_PERMISSION_VIEW_DETAIL_PROJECT,
    getPermissionViewDetailProject
  );
  yield takeEvery(
    SET_PROJECT,
    setProject,
  );
  yield takeEvery(
    SET_PROJECT_GROUP,
    setProjectGroup,
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
  yield takeLeading(
    taskDetailType.POST_ROLE_REQUEST,
    taskDetailSaga.createRole
  );
  yield takeLeading(
    taskDetailType.UPDATE_ROLE_REQUEST,
    taskDetailSaga.updateRole
  );
  yield takeLeading(
    taskDetailType.DELETE_ROLE_REQUEST,
    taskDetailSaga.deleteRole
  );
  yield takeLeading(
    taskDetailType.UPDATE_ROLES_FOR_MEMBER_REQUEST,
    taskDetailSaga.updateRolesForMember
  );

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
  // stop task
  yield takeLeading(taskDetailType.STOP_TASK, taskDetailSaga.stopTask);
  yield takeLeading(
    taskDetailType.CANCEL_STOP_TASK,
    taskDetailSaga.cancelStopTask
  );
  // delete share location
  yield takeLeading(
    taskDetailType.DELETE_SHARE_LOCATION,
    taskDetailSaga.deleteShareLocation
  );
  // update task
  yield takeLeading(
    taskDetailType.UPDATE_NAME_DESCRIPTION,
    taskDetailSaga.updateNameDescription
  );
  yield takeLeading(
    taskDetailType.UPDATE_GROUP_TASK,
    taskDetailSaga.updateGroupTask
  );
  yield takeLeading(
    taskDetailType.UPDATE_TYPE_ASSIGN,
    taskDetailSaga.updateTypeAssign
  );
  yield takeLeading(
    taskDetailType.UPDATE_SCHEDULE_ASSIGN,
    taskDetailSaga.updateScheduleTask
  );
  // getSchedules
  yield takeLeading(taskDetailType.GET_SCHEDULES, taskDetailSaga.getSchedules);
  yield takeLeading(taskDetailType.DELETE_TASK_REQUEST, taskDetailSaga.deleteTask);
  //chat
  yield takeLeading(chatTypes.DELETE_CHAT, chatDetailSaga.deleteChat);
  yield takeLeading(chatTypes.LOAD_CHAT, chatDetailSaga.loadChat);
  yield takeLeading(chatTypes.CHAT_IMAGE, chatDetailSaga.chatImage);
  yield takeLeading(chatTypes.CHAT_FILE, chatDetailSaga.chatFile);
  yield takeLeading(
    chatTypes.CHAT_FORWARD_FILE,
    chatDetailSaga.chatForwardFile
  );
  yield takeLeading(chatTypes.CHAT_STICKER, chatDetailSaga.chatSticker);
  yield takeLeading(
    chatTypes.GET_CHAT_NOT_VIEWED,
    chatDetailSaga.getChatNotViewed
  );
  yield takeLeading(chatTypes.GET_NOTI_CHAT, chatDetailSaga.getNotiChat);
  yield takeLeading(chatTypes.FORWARD_CHAT, chatDetailSaga.forwardChat);
  yield takeLeading(
    chatTypes.GET_LIST_STICKERS,
    chatDetailSaga.getListStickers
  );
  yield takeLeading(chatTypes.LOAD_LIST_TASK, chatDetailSaga.loadListTask);
  yield takeLeading(chatTypes.GET_EMOTIONS, chatDetailSaga.getEmotions);
  yield takeLeading(chatTypes.CHAT_EMOTION, chatDetailSaga.chatEmotion);
  yield takeLeading(
    chatTypes.GET_EMOTIONS_REACT_MEMBER,
    chatDetailSaga.getEmotionsReactMember
  );
  yield takeLeading(chatTypes.CREATE_CHAT_TEXT, chatDetailSaga.createChatText);
  yield takeLeading(chatTypes.CHAT_QUICK_LIKE, chatDetailSaga.chatQuickLike);
  yield takeLeading(
    chatTypes.CREATE_CHAT_FILE_FROM_GOOGLE_DRIVER,
    chatDetailSaga.createChatFileFromGoogleDriver
  );
  yield takeLeading(chatTypes.GET_VIEWED_CHAT, chatDetailSaga.getViewedChat);
  yield takeLeading(
    chatTypes.GET_REMIND_DETAIL,
    chatDetailSaga.getRemindDetail
  );
  yield takeLeading(
    chatTypes.GET_SUBTASK_DETAIL,
    chatDetailSaga.getSubtaskDetail
  );
  yield takeLeading(chatTypes.GET_OFFER_DETAIL, chatDetailSaga.getOfferDetail);
  yield takeLeading(
    chatTypes.GET_DEMAND_DETAIL,
    chatDetailSaga.getDemandDetail
  );
  yield takeLeading(
    chatTypes.GET_GIRD_LIST_TASK,
    chatDetailSaga.getGirdListTask
  );
  yield takeLeading(
    chatTypes.GET_DATA_PIN_ON_TASK_CHAT,
    chatDetailSaga.getDataPinOnTaskChat
  );
  yield fork(watchLoadTaskPage);
  yield fork(watchLoadTaskOverviewPage);
  yield fork(watchLoadTaskDuePage);
  yield fork(watchLoadTaskAssignPage);
  yield fork(watchLoadTaskRolePage);

  /// Offerpage
  yield takeLatest(LOAD_TASK_RENCENTLY, doGetTaskRecently);
  yield takeLatest(LOAD_SUMMARY_BY_GROUP, doGetSummaryByGroup);
  yield takeEvery(CREATE_GROUP_OFFER, doCreateOfferGroup);
  yield takeLatest(LOAD_OFFER_BY_GROUP_ID, doLoadOfferByGroupID);
  yield takeLatest(LOAD_SUMMARY_DEPARTMENT, doLoadSummaryByDepartment)
  yield takeLatest(LOAD_OFFER_BY_DEPARTMENT_ID, doLoadOfferByDepartmentID);
  yield takeLatest(LOAD_SUMMARY_OVERVIEW, doLoadSummaryOverview)
  yield takeEvery(DELETE_GROUP_OFFER, doDeleteGroupOffer)
  yield takeEvery(UPDATE_GROUP_OFFER_OFFERPAGE, doUpdateGroupOffer)
  yield takeLatest(LOAD_DETAIL_OFFER, doLoadDetailOffer)
  yield takeLatest(UPDATE_OFFER_DETAIL_DESCRIPTION_SECTION, doUpdateOfferDetailDescriptionSection)
  yield takeLatest(UPDATE_OFFER_APPROVAL_CONDITION, doUpdateOfferApprovalCondition)
  yield takeLatest(DELETE_OFFER, doDeleteOffer)
  yield takeEvery(UPLOAD_DOCUMENT_OFFER, doUploadDocumentOffer)
  yield takeEvery(DELETE_DOCUMENT_OFFER, doDeleteDocumentOffer)
  yield takeEvery(ADD_MEMBER_HANDLE, doAddMemberHandle)
  yield takeEvery(DELETE_MEMBER_HANDLE, doDeleteMemberHandle)
  yield takeEvery(ADD_MEMBER_MONITOR, doAddMemberMonitor)
  yield takeEvery(DELETE_MEMBER_MONITOR, doDeleteMemberMonitor)
  yield takeEvery(HANDLE_OFFER_OFFERPAGE, doHandleOffer)
  yield takeLatest(LOAD_SUMMARY_BY_PROJECT, doLoadSummaryProject)
  yield takeLatest(LOAD_OFFER_BY_PROJECT_ID, doLoadOfferByProjectID)
  //

  //calendar
  yield takeLatest(SCHEDULE_LIST, listWeeklySchedule);
  yield takeLatest(SCHEDULE_OF_WEEK_LIST, listScheduleOfWeek);
  yield takeLatest(SCHEDULE_OF_WEEK_LIST_FROM_MODAL, listScheduleOfWeekFromModal);
  yield takeLatest(LIST_WEEKS_IN_YEAR, listWeeksInYear);
  yield takeLatest(SETTING_STARTING_DAY, settingStartingDay);
  yield takeLatest(GROUP_SCHEDULE_LIST, listProjectGroupSchedule);
  yield takeEvery(CREATE_SCHEDULE, createSchedule);
  yield takeEvery(UPDATE_SCHEDULE, updateSchedule);
  yield takeEvery(DELETE_SCHEDULE, deleteSchedule);
  yield takeEvery(DELETE_ALL_SCHEDULE, deleteAllSchedule);
  yield takeLatest(LIST_PERSONAL_REMIND_CATEGORY, listPersonalRemindCategory);
  yield takeLatest(SORT_PERSONAL_REMIND_CATEGORY, sortPersonalRemindCategory);
  yield takeLatest(LIST_REMIND_RECENTLY, listRemindRecently);
  yield takeLatest(LIST_REMIND_PROJECT, listRemindProject);
  yield takeLatest(GROUP_SCHEDULE_CREATE, createProjectGroupSchedule);
  yield takeLatest(GROUP_SCHEDULE_DETAIL, projectGroupScheduleDetail);
  yield takeEvery(SETTING_START_DAY_WEEK, projectScheduleSettingStartingDay);
  yield takeLatest(
    GROUP_SCHEDULE_ADD_WORKING_DAY,
    projectScheduleAddWorkingDays
  );
  yield takeEvery(
    GROUP_SCHEDULE_DELETE_WORKING_DAY,
    projectScheduleDeleteWorkingDays
  );
  yield takeLatest(GROUP_SCHEDULE_ADD_DAY_OFF, projectScheduleAddDayOff);
  yield takeLatest(GROUP_SCHEDULE_DELETE_DAY_OFF, projectScheduleDeleteDayOff);
  yield takeLatest(CREATE_PERSONAL_CATEGORY_REMIND, createPersonalRemindCategory);
  yield takeEvery(UPDATE_PERSONAL_CATEGORY_REMIND, updatePersonalRemindCategory);
  yield takeEvery(DELETE_PERSONAL_CATEGORY_REMIND, deletePersonalRemindCategory);
  yield takeLatest(LIST_PERSONAL_REMIND, listPersonalRemind);
  yield takeLatest(CREATE_PERSONAL_REMIND, createPersonalRemind);
  yield takeEvery(UPDATE_PERSONAL_REMIND, updatePersonalRemind);
  yield takeEvery(DELETE_PERSONAL_REMIND, deletePersonalRemind);
  yield takeEvery(GROUP_SCHEDULE_UPDATE, updateProjectGroupSchedule);
  yield takeEvery(GROUP_SCHEDULE_DELETE, deleteProjectGroupSchedule);
  yield takeEvery(GROUP_SCHEDULE_SET_WORKING_DAY, projectScheduleSetWorkingDay);
  yield takeLatest(GROUP_SCHEDULE_ADD_WORKING_STAGE, projectScheduleCreateWorkingStage);
  yield takeLatest(GROUP_SCHEDULE_UPDATE_WORKING_STAGE, projectScheduleUpdateWorkingStage);
  yield takeLatest(GROUP_SCHEDULE_DELETE_WORKING_STAGE, projectScheduleDeleteWorkingStage);
  yield takeLatest(GROUP_SCHEDULE_CREATE_SHIFT_STAGE, projectScheduleCreateShiftStage);
  yield takeLatest(GROUP_SCHEDULE_DELETE_SHIFT_STAGE, projectScheduleDeleteShiftStage);
  yield takeLatest(GROUP_SCHEDULE_UPDATE_SHIFT_STAGE, projectScheduleUpdateShiftStage);
  yield takeLatest(GROUP_SCHEDULE_CREATE_SHIFT_STAGE_ALLTIME, projectScheduleCreateShiftStageAllTime);
  yield takeLatest(GROUP_SCHEDULE_UPDATE_SHIFT_STAGE_ALLTIME, projectScheduleUpdateShiftStageAllTime);
  yield takeEvery(GROUP_SCHEDULE_DELETE_SHIFT_STAGE_ALLTIME, projectScheduleDeleteShiftStageAllTime);
  yield takeLatest(CALENDAR_PAGE_PERMISSION, listCalendarPermission);
  yield fork(watchAsyncAction);
}

export default rootSaga;
