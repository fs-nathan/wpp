import { Avatar, Menu, MenuItem } from '@material-ui/core';
import { mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';
import { deleteSubTask } from 'actions/taskDetail/taskDetailActions';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalDeleteConfirm from '../../ModalDeleteConfirm';
import { ButtonIcon } from './AllSubtaskListItem';
import './styles.scss';

const FinishedSubtaskList = (props) => {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const completeSubTasks = useSelector(state => state.taskDetail.subTask.completeSubTasks);
  // bien modal delete
  const [isOpenDel, setOpenDel] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState("")

  // const [data] = React.useState([1, 2, 3, 4]);
  // const [isHover, setIsHover] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(evt, id) {
    setSelectedId(id)
    setAnchorEl(evt.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const handleOpenModalDelete = () => {
    console.log(selectedId)
    setOpenDel(true)
    setAnchorEl(null)
  };

  const handleCloseModalDelete = () => {
    setOpenDel(false);
  };

  const confirmDelete = () => {
    dispatch(deleteSubTask({ taskId, sub_task_id: selectedId }))
    // console.log('taskId::::', props);
  }

  return (
    <ul style={{ padding: 0 }}>
      {completeSubTasks.map((item, index) => {
        return (
          <li className="finishedSubTask--item" key={index}>
            <abbr title={item.user_create_name}>
              <Avatar className="finishedSubTask--avatar" src={item.user_create_avatar} alt='avatar' />
            </abbr>
            <div>
              <div className="finishedSubTask--title">
                {`${item.name}`}
              </div>
              <div className="finishedSubTask--subTitle" >
                <abbr title={item.user_complete_name}>
                  <Avatar src={item.user_complete_avatar} style={{ width: 12, height: 12 }} />
                </abbr>
                  Hoàn thành lúc {item.time_complete}
              </div>
            </div>
            <div className="finishedSubTask--menuIcon" >
              <ButtonIcon onClick={e => handleClick(e, item.id)} aria-haspopup="true">
                <Icon path={mdiDotsVertical} size={1} />
              </ButtonIcon>
            </div>
          </li>
        );
      })}

      <Menu
        className="finishedSubTask--menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: -10,
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleOpenModalDelete}>Xóa</MenuItem>
      </Menu>

      <ModalDeleteConfirm
        confirmDelete={confirmDelete}
        isOpen={isOpenDel}
        handleCloseModalDelete={handleCloseModalDelete}
        handleOpenModalDelete={handleOpenModalDelete}
        {...props}
      />
    </ul>
  );
}

export default FinishedSubtaskList