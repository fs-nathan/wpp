import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiDotsHorizontal, mdiCancel, mdiCheck } from '@mdi/js';
import {
  Avatar, IconButton, Menu, MenuItem,
} from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import { useSelector } from 'react-redux';
import ApprovedBox from './ApprovedBox';
import { Badge } from './BadgeOffer';

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

export const UserHanderAvatar = styled(Avatar)`
  width: 25px;
  height: 25px;
`

export const StyleContent = styled(ColorTypo)`
  font-size: 14px;
`

const CustomListItem = (props) => {
  const offer = useSelector(state => state.taskDetail.taskOffer.offer);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {
    content, dataHander, date_create, priority,
    user_create_avatar, user_create_name,status,
    agree,
    disagree,
  } = offer || {}

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <React.Fragment>
      <li className="offerTabItem">
        <ColorTypo className="offerTabItem--content">{content}</ColorTypo>
        <ColorTypo color='orange' variant='caption'>
          <Avatar className="offerTabItem--avatar" src={user_create_avatar} alt='avatar' />
          lúc {date_create}
          {priority}
        </ColorTypo>
        <div className="offerTabItem--status">
            {status}
            {agree} dong y - {disagree} tu choi
        </div>
        <ButtonIcon size='small' onClick={handleClick} >
          <Icon path={mdiDotsHorizontal} size={1} />
        </ButtonIcon>
      </li>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: -30,
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => {
          props.handleClickOpen()
          setAnchorEl(null)
        }}>Chỉnh sửa</MenuItem>
        <MenuItem onClick={() => {
          props.handleOpenModalDelete(props.offer)
          setAnchorEl(null)
        }}>Xóa</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default CustomListItem