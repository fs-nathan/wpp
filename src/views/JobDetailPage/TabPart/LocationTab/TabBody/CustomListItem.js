import { IconButton, ListItem, ListItemAvatar, ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem } from '@material-ui/core';
import { mdiDotsHorizontal, mdiMapMarker } from '@mdi/js';
import Icon from '@mdi/react';
import { deleteShareLocation } from 'actions/taskDetail/taskDetailActions';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ColorTypo from '../../../../../components/ColorTypo';

const HeaderSubText = styled(ListSubheader)`
  font-size: 13px;
  color: #6e6d6d;
  padding: 0;
  margin: 0;
`

const ItemAvatar = styled(ListItemAvatar)`
  & > div {
    background: #d6d6d6;
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

const CustomListItem = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleDelete = (id) => () => {
    handleClose();
    dispatch(deleteShareLocation(taskId, id))
  }

  let locationArr = useSelector(state => state.taskDetail.location.locations);
  return (
    <ListItem>
      {Array.isArray(locationArr) && locationArr.map((location, idx) => {
        return (
          <div className="styled-list-item-location" key={idx}>
            <HeaderSubText component='p'>{location.date_create}</HeaderSubText>
            {location.locations.map((item, key) => {
              return (
                <div className="styled-common-location" key={key}>
                  <ItemAvatar>
                    <div>
                      <Icon path={mdiMapMarker} alt='map' size={1.1} color={'ff9d00'} />
                    </div>
                  </ItemAvatar>
                  <ListItemText
                    primary={item.user_share}
                    secondary={
                      <span>
                        <ColorTypo variant='caption' color='blue'>{t('LABEL_CHAT_TASK_LUC', { createdAt: `${item.time_create} - ${item.date_create}` })}</ColorTypo>
                        <br />
                        <ColorTypo variant='caption'>{item.address}</ColorTypo>
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
                    <MenuItem onClick={handleClose}>{t('LABEL_CHAT_TASK_CHIA_SE')}</MenuItem>
                    <MenuItem onClick={handleClose}>{t('LABEL_CHAT_TASK_XEM_TIN_NHAN')}</MenuItem>
                    <MenuItem onClick={handleDelete(item.id)}>{t('LABEL_CHAT_TASK_XOA')}</MenuItem>
                  </Menu>
                </div>
              )
            })}
          </div>
        )
      })}
    </ListItem>
  );
}

export default CustomListItem
