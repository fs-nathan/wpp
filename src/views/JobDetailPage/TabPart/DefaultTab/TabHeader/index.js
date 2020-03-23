import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import { mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';
import get from 'lodash/get';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { deleteTask, pinTaskAction, unPinTaskAction } from '../../../../../actions/taskDetail/taskDetailActions';
import ColorTypo from '../../../../../components/ColorTypo';
import EditJobModal from '../../../ListPart/ListHeader/CreateJobModal';
import { taskIdSelector } from '../../../selectors';
import ModalDeleteConfirm from '../../ModalDeleteConfirm';

const AvatarHeader = styled(Avatar)`
  width: 60px;
  height: 60px;
`;

const StyledIconButton = styled(IconButton)`
  margin: 0;
  padding: 0;
  &:hover {
    background: none;
  }
  & > span > svg {
    &:hover {
      fill: #03b000;
    }
  }
`;

function TabHeader(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isPinned = useSelector(state => get(state, 'taskDetail.detailTask.taskDetails.is_ghim'));

  const [anchorEl, setAnchorEl] = React.useState(null);

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
      roles = user_create.roles;
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
  return (
    <div className="container-dt-tabheader">
      <AvatarHeader src={avatar} alt="avatar" />
      <div className="tags-container">
        <ColorTypo bold component="div">{name}</ColorTypo>
        {roles &&
          <ColorTypo color={'blue'} component="div" variant="caption" style={{ fontSize: 13 }}>
            {roles}
          </ColorTypo>
        }
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
      <StyledIconButton
        onClick={handleClick}
        aria-controls="simple-menu"
        aria-haspopup="true"
      >
        <Icon path={mdiDotsVertical} size={1} className="job-detail-icon" />
      </StyledIconButton>
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
          onClick={() => {
            setOpenCreateJobModal(true);
            setAnchorEl(null);
          }}
        >
          Chỉnh sửa
        </MenuItem>
        <MenuItem
          onClick={onClickPin}
        >
          {isPinned ? 'Bỏ ghim' : 'Ghim công việc'}
        </MenuItem>
        {pause ? (
          <MenuItem
            onClick={() => {
              props.onClickPause();
              handleClickPause();
              setAnchorEl(null);
            }}
          >
            Tạm dừng
          </MenuItem>
        ) : (
            <MenuItem
              onClick={() => {
                props.onClickPause();
                handleClickPause();
                setAnchorEl(null);
              }}
            >
              Hủy tạm dừng
            </MenuItem>
          )}

        <MenuItem
          onClick={() => {
            handleCloseMenu();
            handleOpenModalDelete();
          }}
        >
          Xóa
        </MenuItem>
      </Menu>
      <EditJobModal
        isOpen={openCreateJobModal}
        setOpen={setOpenCreateJobModal}
        isRight={true}
        data={detailTask}
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
