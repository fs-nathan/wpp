import { Menu, MenuItem } from '@material-ui/core';
import { mdiCheckCircle, mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';
import { deleteSubTask } from 'actions/taskDetail/taskDetailActions';
import AlertModal from 'components/AlertModal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonIcon } from './AllSubtaskListItem';
import './styles.scss';

const FinishedSubtaskList = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const completeSubTasks = useSelector(state => state.taskDetail.subTask.completeSubTasks);
  // bien modal delete
  const [isOpenDelete, setOpenDelete] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState("")

  // const [data] = React.useState([1, 2, 3, 4]);
  // const [isHover, setIsHover] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(evt, id) {
    setSelectedId(id)
    setAnchorEl(evt.currentTarget)
    evt.stopPropagation();
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const handleOpenModalDelete = () => {
    console.log(selectedId)
    setOpenDelete(true)
    setAnchorEl(null)
  };

  const handleCloseModalDelete = () => {
    setOpenDelete(false);
  };

  const confirmDelete = () => {
    dispatch(deleteSubTask({ taskId, sub_task_id: selectedId }))
    // console.log('taskId::::', props);
  }

  const onClickTitle = (item) => {
    return () => props.setSelectedItem(item)
  }

  return (
    <ul style={{ padding: 0 }}>
      {completeSubTasks.map((item, index) => {
        return (
          <li className="finishedSubTask--item"
            onClick={onClickTitle(item)}
            key={index}>
            {/* <abbr title={item.user_create_name}>
              <Avatar className="finishedSubTask--avatar" src={item.user_create_avatar} alt='avatar' />
            </abbr> */}
            <Icon path={mdiCheckCircle} size={1} color="rgb(2,218,137)" />
            <div className="finishedSubTask--title" >
              {`${item.name}`}
            </div>
            {/* <div className="finishedSubTask--subTitle" >
                <abbr title={item.user_complete_name}>
                  <Avatar src={item.user_complete_avatar} style={{ width: 12, height: 12 }} />
                  <Icon path={mdiDotsVertical} size={1} />
                </abbr>
                  Hoàn thành lúc {item.time_complete}
              </div> */}
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
        <MenuItem onClick={handleOpenModalDelete}>{t('LABEL_CHAT_TASK_XOA')}</MenuItem>
      </Menu>

      <AlertModal
        open={isOpenDelete}
        setOpen={setOpenDelete}
        content={t('IDS_WP_ALERT_CONTENT')}
        onConfirm={confirmDelete}
      />
    </ul>
  );
}

export default FinishedSubtaskList