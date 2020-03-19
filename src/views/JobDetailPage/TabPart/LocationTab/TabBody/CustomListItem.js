import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiDotsHorizontal, mdiMapMarker } from '@mdi/js';
import {
  ListItem, ListItemAvatar, ListItemText,
  IconButton, Menu, MenuItem,
  ListSubheader, ListItemIcon,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
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
                        <ColorTypo variant='caption' color='blue'>Lúc {item.time_create} - {item.date_create}</ColorTypo>
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
                    <MenuItem onClick={handleClose}>Chia sẻ</MenuItem>
                    <MenuItem onClick={handleClose}>Xem tin nhắn</MenuItem>
                    <MenuItem onClick={handleClose}>Xóa</MenuItem>
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
