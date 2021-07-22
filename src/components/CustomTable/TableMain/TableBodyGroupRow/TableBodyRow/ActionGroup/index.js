import React from "react";
import { Menu, MenuItem, TableCell, TableRow } from "@material-ui/core";
import Icon from "@mdi/react";
import { mdiAccountPlus, mdiDeleteOutline, mdiDotsVertical } from "@mdi/js";
import { get } from "lodash";
import EditJobModal, {
  EDIT_MODE,
} from "views/JobDetailPage/ListPart/ListHeader/CreateJobModal";
import AddMemberModal from "views/JobDetailPage/ListPart/ListHeader/AddMemberModal";
import UpdateTaskStatus from "views/JobDetailPage/ListPart/ListHeader/UpdateStatus";
import "../style.scss";
import compact from "lodash/compact";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "actions/task/deleteTask";
import { useTranslation } from "react-i18next";
import AlertModal from "components/AlertModal";
import {
  cancelStopTask,
  chooseTask,
  getListGroupTask,
  getTaskDetailTabPart,
  pinTaskAction,
  stopTask,
  unPinTaskAction,
} from "actions/taskDetail/taskDetailActions";
import { listTask } from "actions/task/listTask";
import ProgressModal from "views/JobDetailPage/TabPart/ProgressTab/ProgressModal";
import CompleteTaskModal from "views/JobDetailPage/TabPart/ProgressTab/TabBody/ProgressSlider/ModalEdit";
import { useTimes } from "components/CustomPopover";
import moment from "moment";

const ListAction = ({ className = "", ...props }) => (
  <div className="comp_CustomTable_list-action" {...props} />
);
export const ActionList = ({ index, row, group }) => {
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openCreateJobModal, setOpenCreateJobModal] = React.useState(false);
  const [openProgressModal, setOpenProgressModal] = React.useState(false);
  const [onloadAddMember, setOnloadAddMember] = React.useState(false);
  const [updateTaskStatus, setUpdateTaskStatus] = React.useState(false);
  const [updateTaskComplete, setUpdateTaskComplete] = React.useState(false);

  const [editMode, setEditMode] = React.useState(null);
  const taskId = row?.id;
  const taskDetails = useSelector((state) =>
    get(state, "taskDetail.detailTask.taskDetails")
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const detailTask = useSelector(
    (state) => state.taskDetail.detailTask.taskDetails
  );

  const {
    is_ghim: isPinned,
    is_stop,
  } = taskDetails || {};
  const pause = is_stop;
  const taskData = {
    id: row.id,
    name: row.name,
    description: row.description,
    priority_code: row.priority_code,
    start_date: row.start_date,
    start_time: row.start_time,
    end_date: row.end_date,
    end_time: row.end_time,
    group_task: row.group_task,
    group_task_name: row.group_task_name,
    schedule_id: row.schedule_id,
    type_time: row.type_time
  }
  const confirmDelete = () => {
    dispatch(deleteTask({ taskId, projectId: detailTask.project }));
  };
  function handleClick(evt) {
    setAnchorEl(evt.currentTarget);
  }
  const onClickEdit = (mode) => () => {
    setOpenCreateJobModal(true);
    setAnchorEl(null);
    setEditMode(mode);
  };
  const onClickEditProgress = () => {
    setOpenProgressModal(true);
    setAnchorEl(null);
  };
  const onClickEditStatus = () => {
    setUpdateTaskStatus(true);
    setAnchorEl(null);
  }
  const onClickEditComplete = () => {
    setUpdateTaskComplete(true);
    setAnchorEl(null);
  }
  const editList = [
    <MenuItem key="editList1" onClick={onClickEdit(EDIT_MODE.NAME_DES)}>
      {t("LABEL_CHAT_TASK_SUA_TEN_MO_TA_CONG_VIEC")}
    </MenuItem>,
    <MenuItem key="editList2" onClick={onClickEdit(EDIT_MODE.PRIORITY)}>
      {t("LABEL_CHAT_TASK_THAY_DOI_MUC_DO_UU_TIEN")}
    </MenuItem>,
    <MenuItem key="editList3" onClick={onClickEdit(EDIT_MODE.GROUP)}>
      {t("LABEL_CHAT_TASK_THAY_DOI_NHOM_VIEC")}
    </MenuItem>,
    <MenuItem key="editList5" onClick={onClickEdit(EDIT_MODE.WORK_DATE)}>
      {t("LABEL_CHAT_TASK_THAY_DOI_LICH_LAM_VIEC")}
    </MenuItem>,
    <MenuItem key="editList6" onClick={onClickEditProgress}>
      {t("LABEL_CHAT_TASK_DIEU_CHINH_TIEN_DO")}
    </MenuItem>,
    <MenuItem key="editList6" onClick={onClickEditStatus}>
      {t("LABEL_UPDATE_TASK_STATUS")}
    </MenuItem>
  ];
  function onClickPin() {
    setAnchorEl(null);
    if (isPinned) {
      dispatch(
        unPinTaskAction({
          task_id: taskId,
          projectId: detailTask.project,
        })
      );
    } else {
      dispatch(
        pinTaskAction({
          task_id: taskId,
          projectId: detailTask.project,
        })
      );
    }
  }

  const handleAddMember = () => {
    if (row?.id) {
      dispatch(chooseTask(row?.id));
      dispatch(getTaskDetailTabPart({ taskId: row.id }));
      setOpenAdd(true);
    }
  };
  const onClickPause = () => {
    dispatch(stopTask(taskId, "Table"));
    setAnchorEl(null);
  };
  const onClickResume = () => {
    dispatch(cancelStopTask(taskId, "Table"));
    setAnchorEl(null);
  };

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  return (
    <div onMouseLeave={() => setAnchorEl(null)} className="list-view-task-list-action">
      <div>
        <ListAction>
          <div onClick={handleAddMember} className="action-add">
            <Icon path={mdiAccountPlus} color="#ffffff" width="17px" />
          </div>
          {get(row, "can_delete") === true && (
            <div onClick={() => setOpenDelete(true)} className="action-delete">
              <Icon path={mdiDeleteOutline} color="#ffffff" width="17px" />
            </div>
          )}
          <div onClick={handleClick} className="action-more">
            <Icon path={mdiDotsVertical} color="#ffffff" width="17px" />
          </div>
        </ListAction>
        {openAdd && taskDetails.project && (
          <AddMemberModal
            setOnloadAddMember={setOnloadAddMember}
            projectActive={taskDetails.project}
            isOpen={openAdd}
            setOpen={setOpenAdd}
          />
        )}
        {openDelete && (
          <AlertModal
            open={openDelete}
            setOpen={setOpenDelete}
            content={t("IDS_WP_ALERT_CONTENT")}
            onConfirm={confirmDelete}
          />
        )}
        {Boolean(anchorEl) && row.can_modify && (
          <Menu
            className="tabHeaderDefault--menu"
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            transformOrigin={{
              vertical: -30,
              horizontal: "right",
            }}
          >
            {row.can_modify && editList}
            {row.can_modify && !pause  && <MenuItem onClick={onClickEditComplete}>
                {t("LABEL_UPDATE_TASK_COMPLETE")}
              </MenuItem>
            }
            <MenuItem onClick={onClickPin}>
              {isPinned
                ? t("LABEL_CHAT_TASK_BO_GHIM")
                : t("LABEL_CHAT_TASK_GHIM_CONG_VIEC")}
            </MenuItem>
            {row.can_modify ? (
              !pause ? (
                <MenuItem onClick={onClickPause}>
                  {t("LABEL_CHAT_TASK_TAM_DUNG")}
                </MenuItem>
              ) : (
                <MenuItem onClick={onClickResume}>
                  {t("LABEL_CHAT_TASK_HUY_TAM_DUNG")}
                </MenuItem>
              )
            ) : null}
          </Menu>
        )}
        {
          openCreateJobModal && taskData && row.can_modify && <EditJobModal
            isOpen={openCreateJobModal}
            setOpen={setOpenCreateJobModal}
            data={taskData}
            editMode={editMode}
            projectId={row.project_id}
            fromView={"Table"}
          />
        }
        {taskData && row.can_modify && (
          <ProgressModal
            isOpen={openProgressModal}
            setOpen={setOpenProgressModal}
            taskData={taskData}
            fromView={"Table"}
          />
        )}
        {
          updateTaskStatus &&
          <UpdateTaskStatus isOpen={updateTaskStatus} setOpen={(status) => setUpdateTaskStatus(status)} taskId={taskId} oldStatus={row ? row.original_status : ""} isStop={row ? row.is_stop : false} />
        }
        {
          updateTaskComplete &&
          <CompleteTaskModal isOpen={updateTaskComplete} setOpen={(status) => setUpdateTaskComplete(status)} taskId={taskId} oldComplete={row ? row.complete : 0} isStop={row ? row.is_stop : false} />
        }
      </div>
    </div>
  );
};
