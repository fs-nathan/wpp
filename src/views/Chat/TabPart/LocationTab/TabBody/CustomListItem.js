import { IconButton, ListItem, ListItemAvatar, ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem } from '@material-ui/core';
import { mdiDotsHorizontal, mdiMapMarker } from '@mdi/js';
import Icon from '@mdi/react';
import { forwardMessage, loadChat } from 'actions/chat/chat';
import { deleteShareLocation } from 'actions/taskDetail/taskDetailActions';
import ColorTypo from 'components/ColorTypo';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import './styles.scss';

const HeaderSubText = styled(ListSubheader)`
  display: inline-block;
  width: 100%;
  position: relative;  
  font-size: 14px;
  font-weight: 600;
  color: #9e9e9e;
  padding: 0;
  margin: 0;
`

const ItemAvatar = styled(ListItemAvatar)`
  & > div {
    background: #f2f2f2;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

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

const CustomListItem = ({ isMe, handleClickLocation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (evt) => {
    evt.stopPropagation();
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleDelete = (id) => () => {
    handleClose();
    dispatch(deleteShareLocation(taskId, id))
  }

  function handleShare(item) {
    setAnchorEl(null);
    dispatch(forwardMessage(true, { ...item, id: item.chat_id }));
  }

  function handleViewChat(item) {
    setAnchorEl(null);
    dispatch(loadChat(taskId, undefined, false, undefined, item.chat_id))
  }

  let locationArr = useSelector(state => state.taskDetail.location.locations);

  return (
    <ListItem>
      {Array.isArray(locationArr) && locationArr.map((location, idx) => {
        return (!isMe || location.locations.filter(({ is_me }) => is_me).length > 0) ? (
          <div className="styled-list-item-location" key={idx}>
            <HeaderSubText component='p'>{location.date_create}</HeaderSubText>
            {location.locations.map((item, key) => {
              if (isMe && !item.is_me) return null;
              return (
                <div className="styled-common-location" key={key}>
                  <ItemAvatar onClick={() => handleClickLocation({ isMe, ...item })}>
                    <div>
                      <Icon path={mdiMapMarker} alt='map' size={2} color={'#f44336'} style={{ padding: 5 }} />
                    </div>
                  </ItemAvatar>
                  <ListItemText
                    onClick={() => handleClickLocation({ isMe, ...item })}
                    className="LocationItem--content"
                    primary={item.user_share}
                    secondary={
                      <span>
                        <ColorTypo className="LocationItem--time" variant='caption' color='blue'>{t('LABEL_CHAT_TASK_CHIA_SE_LUC', { createdAt: `${item.time_create} - ${item.date_create}` })}</ColorTypo>
                        <br />
                        <ColorTypo className="LocationItem--location" variant='caption'>{item.address}</ColorTypo>
                      </span>
                    }
                  />
                  <div className="styled-menu-location">
                    <ListItemIcon style={{ display: 'contents' }}>
                      <ButtonIcon size='small' onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
                        <Icon path={mdiDotsHorizontal} size={1} />
                      </ButtonIcon>
                    </ListItemIcon>
                  </div>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    transformOrigin={{
                      vertical: -30,
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem onClick={() => handleShare(item)}>{t('LABEL_CHAT_TASK_CHIA_SE')}</MenuItem>
                    <MenuItem onClick={() => handleViewChat(item)}>{t('LABEL_CHAT_TASK_XEM_TIN_NHAN')}</MenuItem>
                    {item.can_delete && <MenuItem onClick={handleDelete(item.id)}>{t('LABEL_CHAT_TASK_XOA')}</MenuItem>}
                  </Menu>
                </div>
              )
            })}
          </div >
        ) : null
      })}
    </ListItem >
  );
}

export default CustomListItem
