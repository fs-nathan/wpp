import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';
import { openCreateRemind } from 'actions/chat/chat';
import { deleteRemind, pinRemind, unPinRemind } from 'actions/taskDetail/taskDetailActions';
import clsx from 'clsx';
import AlertModal from 'components/AlertModal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';


const ButtonIcon = styled(IconButton)`
  &:hover {
    background: none;
  }
  & > span > svg {
    &:hover {
      fill: #03b000;
    }
  }
`

const MemberMenuLists = ({ item, className, idx }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  const [isOpenDelete, setOpenDelete] = React.useState(false);
  const handleOpenModalDelete = () => {
    setOpenDelete(true);
    setAnchorEl(null);
  };
  const handleCloseModalDelete = () => {
    setOpenDelete(false);
  };
  const confirmDelete = () => {
    dispatch(deleteRemind({ remind_id: item.id, taskId: taskId }))
  }

  function onClickPin() {
    const action = item.is_ghim ? unPinRemind : pinRemind;
    dispatch(action({ remind_id: item.id, taskId: taskId }))
    handleClose();
  }

  function openEdit() {
    dispatch(openCreateRemind(true, false, item))
    handleClose();
  }

  return (
    <div className={clsx(className, "styled-menu")} >
      <ButtonIcon
        onClick={handleClick}
        aria-controls={"simple-menu" + idx} aria-haspopup="true">
        <Icon path={mdiDotsVertical} size={1} />
      </ButtonIcon>
      <Menu
        id={"simple-menu" + idx}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: -30,
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={onClickPin}>
          {item.is_ghim ? t('LABEL_CHAT_TASK_BO_GHIM') : t('LABEL_CHAT_TASK_GHIM_NHAC_HEN')}
        </MenuItem>
        {item.can_modify &&
          <MenuItem onClick={openEdit}>{t('LABEL_CHAT_TASK_SUA_NHAC_HEN')}</MenuItem>
        }
        {item.can_modify &&
          <MenuItem onClick={handleOpenModalDelete}>{t('LABEL_CHAT_TASK_XOA_NHAC_HEN')}</MenuItem>
        }
      </Menu>
      <AlertModal
        open={isOpenDelete}
        setOpen={setOpenDelete}
        content={t('IDS_WP_ALERT_CONTENT')}
        onConfirm={confirmDelete}
      />
    </div>
  )
}

export default MemberMenuLists