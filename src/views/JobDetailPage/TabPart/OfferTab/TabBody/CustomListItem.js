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
    content, dataHander, date_create,
    user_create_avatar, user_create_name, user_can_handers
  } = offer

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <React.Fragment>
      <li className="styled-list-item-ot">
        <div className="wrapper-list-item">
          <div className="styled-title-box-ot">
            <UserHanderAvatar src={user_create_avatar} alt='avatar' />
            <div>
              <StyleContent variant='body1' bold>{user_create_name}</StyleContent>
              <ColorTypo variant='caption'>
                <Badge component='small' size='small' badge color='orangelight' label={'Đề xuất'} />
                &nbsp;
                với
                &nbsp;
            <ColorTypo color='orange' variant='caption'>{user_can_handers.join(", ")}</ColorTypo> lúc {date_create}
              </ColorTypo>
            </div>
            <div className="styled-menu-offer">
              <ButtonIcon size='small' onClick={handleClick} >
                <Icon path={mdiDotsHorizontal} size={1} />
              </ButtonIcon>
            </div>
          </div>
          <div className="styled-content-box-ot">
            <StyleContent>{content}</StyleContent>
          </div>
        </div>
        <ApprovedBox {...props} approved={dataHander} handleClickOpen={() => props.handleClickOpen()} />
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