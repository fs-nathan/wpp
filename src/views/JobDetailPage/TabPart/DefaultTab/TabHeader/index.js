import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import { mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';
import { cancelStopTask, deleteTask, pinTaskAction, stopTask, unPinTaskAction } from 'actions/taskDetail/taskDetailActions';
import AlertModal from 'components/AlertModal';
import ColorTypo from 'components/ColorTypo';
import compact from 'lodash/compact';
import get from 'lodash/get';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import EditJobModal, { EDIT_MODE } from '../../../ListPart/ListHeader/CreateJobModal';
import { taskIdSelector } from '../../../selectors';
import './styles.scss';

function TabHeader(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskDetails = useSelector(state => get(state, 'taskDetail.detailTask.taskDetails'));
  const { is_ghim: isPinned, state_code } = taskDetails || {};
  const pause = state_code === 4;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editMode, setEditMode] = React.useState(null);

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  const [openCreateJobModal, setOpenCreateJobModal] = React.useState(false);
  const [isOpenDelete, setOpenDelete] = React.useState(false);
  const detailTask = useSelector(state => state.taskDetail.detailTask.taskDetails);
  const taskId = useSelector(taskIdSelector);
  const projectId = useSelector(state => state.taskDetail.commonTaskDetail.activeProjectId);

  let avatar, name, roles;
  if (detailTask) {
    let user_create = detailTask.user_create;
    if (user_create) {
      avatar = user_create.avatar;
      name = user_create.name;
      roles = compact([user_create.room, user_create.position]).join(' - ');
    }
  }
  const handleOpenModalDelete = () => {
    setOpenDelete(true);
    setAnchorEl(null);
  };
  const handleCloseModalDelete = () => {
    setOpenDelete(false);
  };
  const confirmDelete = () => {
    dispatch(deleteTask({ taskId, projectId }));
  };

  function onClickPin() {
    setAnchorEl(null);
    if (isPinned) {
      dispatch(unPinTaskAction({ task_id: taskId, projectId }));
    } else {
      dispatch(pinTaskAction({ task_id: taskId, projectId }));
    }
  }
  // console.log("task id::::", value.taskId)
  const onClickEdit = (mode) => () => {
    setOpenCreateJobModal(true);
    setAnchorEl(null);
    setEditMode(mode)
  }

  const onClickPause = () => {
    dispatch(stopTask(taskId));
    setAnchorEl(null);
  }
  const onClickResume = () => {
    dispatch(cancelStopTask(taskId));
    setAnchorEl(null);
  }
  const onClickDelete = () => {
    handleCloseMenu();
    handleOpenModalDelete();
  }
  return (
    <div className="container-dt-tabheader">
      <Avatar className="tabHeaderDefault--avatar" src={avatar} alt="avatar" />
      <div className="tabHeaderDefault--container">
        <div className="tabHeaderDefault--name">{name}</div>
        <div className="tabHeaderDefault--role">
          {roles}
        </div>
        {detailTask && (
          <ColorTypo
            component="div"
            variant="caption"
            style={{ color: 'rgb(174, 168, 168)', fontSize: 12 }}
          >{t('LABEL_CHAT_TASK_DA_DUOC_GIAO_NGAY', { date_create: detailTask.date_create })}
          </ColorTypo>
        )}
      </div>
      <IconButton
        className="tabHeaderDefault--button"
        onClick={handleClick}
        aria-controls="simple-menu"
        aria-haspopup="true"
      >
        <Icon path={mdiDotsVertical} size={1} className="job-detail-icon" />
      </IconButton>
      <Menu
        className="tabHeaderDefault--menu"
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        transformOrigin={{
          vertical: -30,
          horizontal: 'right'
        }}
      >
        <MenuItem
          onClick={onClickEdit(EDIT_MODE.NAME_DES)}
        >{t('LABEL_CHAT_TASK_SUA_TEN_MO_TA_CONG_VIEC')}</MenuItem>
        <MenuItem
          onClick={onClickEdit(EDIT_MODE.PRIORITY)}
        >{t('LABEL_CHAT_TASK_THAY_DOI_MUC_DO_UU_TIEN')}</MenuItem>
        <MenuItem
          onClick={onClickEdit(EDIT_MODE.GROUP)}
        >{t('LABEL_CHAT_TASK_THAY_DOI_NHOM_VIEC')}</MenuItem>
        <MenuItem
          onClick={onClickEdit(EDIT_MODE.ASSIGN_TYPE)}
        >{t('LABEL_CHAT_TASK_THAY_DOI_HINH_THUC_GIAO_VIEC')}</MenuItem>
        <MenuItem
          onClick={onClickEdit(EDIT_MODE.WORK_DATE)}
        >{t('LABEL_CHAT_TASK_THAY_DOI_LICH_LAM_VIEC')}</MenuItem>
        <MenuItem
          onClick={onClickPin}
        >
          {isPinned ? t('LABEL_CHAT_TASK_BO_GHIM') : t('LABEL_CHAT_TASK_GHIM_CONG_VIEC')}
        </MenuItem>
        {!pause ? (
          <MenuItem
            onClick={onClickPause}
          >{t('LABEL_CHAT_TASK_TAM_DUNG')}</MenuItem>
        ) : (
            <MenuItem
              onClick={onClickResume}
            >{t('LABEL_CHAT_TASK_HUY_TAM_DUNG')}</MenuItem>
          )}
        <MenuItem
          onClick={onClickDelete}
        >{t('LABEL_CHAT_TASK_XOA')}</MenuItem>
      </Menu>
      <EditJobModal
        isOpen={openCreateJobModal}
        setOpen={setOpenCreateJobModal}
        data={detailTask}
        editMode={editMode}
      />
      <AlertModal
        open={isOpenDelete}
        setOpen={setOpenDelete}
        content={t('IDS_WP_ALERT_CONTENT')}
        onConfirm={confirmDelete}
      />
      {/* <ModalDeleteConfirm
        confirmDelete={confirmDelete}
        isOpen={isOpenDelete}
        handleOpenModalDelete={handleOpenModalDelete}
        handleCloseModalDelete={handleCloseModalDelete}
      /> */}
    </div>
  );
}

export default TabHeader;
