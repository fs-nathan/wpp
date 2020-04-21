import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import { mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';
import { cancelStopTask, deleteTask, pinTaskAction, stopTask, unPinTaskAction } from 'actions/taskDetail/taskDetailActions';
import ColorTypo from 'components/ColorTypo';
import get from 'lodash/get';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import EditJobModal, { EDIT_MODE } from '../../../ListPart/ListHeader/CreateJobModal';
import { taskIdSelector } from '../../../selectors';
import ModalDeleteConfirm from '../../ModalDeleteConfirm';
import './styles.scss';

function TabHeader(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isPinned = useSelector(state => get(state, 'taskDetail.detailTask.taskDetails.is_ghim'));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editMode, setEditMode] = React.useState(null);

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }
  //  bien tam dung
  const [pause, setIsPause] = React.useState(true);
  const handleClickPause = () => {
    setIsPause(!pause);
  };
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
      roles = `${user_create.position} - ${user_create.room}`;
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
          >
            Đã được giao ngày {detailTask.date_create}
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
        >
          Sửa tên, mô tả công việc
        </MenuItem>
        <MenuItem
          onClick={onClickEdit(EDIT_MODE.PRIORITY)}
        >
          Thay đổi mức độ ưu tiên
        </MenuItem>
        <MenuItem
          onClick={onClickEdit(EDIT_MODE.GROUP)}
        >
          Thay đổi nhóm việc
        </MenuItem>
        <MenuItem
          onClick={onClickEdit(EDIT_MODE.ASSIGN_TYPE)}
        >
          Thay đổi hình thức giao việc
        </MenuItem>
        <MenuItem
          onClick={onClickEdit(EDIT_MODE.WORK_DATE)}
        >
          Thay đổi lịch làm việc
        </MenuItem>
        <MenuItem
          onClick={onClickPin}
        >
          {isPinned ? 'Bỏ ghim' : 'Ghim công việc'}
        </MenuItem>
        {pause ? (
          <MenuItem
            onClick={onClickPause}
          >
            Tạm dừng
          </MenuItem>
        ) : (
            <MenuItem
              onClick={onClickResume}
            >
              Hủy tạm dừng
            </MenuItem>
          )}
        <MenuItem
          onClick={onClickDelete}
        >
          Xóa
        </MenuItem>
      </Menu>
      <EditJobModal
        isOpen={openCreateJobModal}
        setOpen={setOpenCreateJobModal}
        data={detailTask}
        editMode={editMode}
      />
      <ModalDeleteConfirm
        confirmDelete={confirmDelete}
        isOpen={isOpenDelete}
        handleOpenModalDelete={handleOpenModalDelete}
        handleCloseModalDelete={handleCloseModalDelete}
      />
    </div>
  );
}

export default TabHeader;
