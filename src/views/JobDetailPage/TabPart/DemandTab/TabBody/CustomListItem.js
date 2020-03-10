import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiDotsHorizontal } from '@mdi/js';
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import ColorChip from '../../../../../components/ColorChip';
import ColorTypo from '../../../../../components/ColorTypo';

const Text = styled(ColorTypo)`
  font-size: 15px;
`;
const Badge = styled(ColorChip)`
  border-radius: 3px !important;
`;
const ButtonIcon = styled(IconButton)`
  &:hover {
    background: none;
  }
  & > span > svg {
    &:hover {
      fill: #03b000;
    }
  }
`;
const UserAvatar = styled(Avatar)`
  width: 25px;
  height: 25px;
`;

const CustomListItem = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = evt => {
    setAnchorEl(evt.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <li className="styled-list-item">
        <div className="styled-title-box-dmt">
          <UserAvatar src={props.item.user_create_avatar} alt="avatar" />
          <div>
            <Text variant="body1" bold>
              {props.item.user_create_name}
            </Text>
            <ColorTypo variant="caption">
              <div className="wrapper-filter-dmt">
                <Badge
                  color={props.isDemand ? 'orangelight' : 'bluelight'}
                  label={props.isDemand ? 'Chỉ đạo' : 'Quyết định'}
                  size="small"
                  badge
                  component="small"
                ></Badge>
                <p className="demand-create-time">
                  lúc {props.item.date_create}
                </p>
              </div>
            </ColorTypo>
          </div>
          <div className="styled-menu-demand">
            <ButtonIcon size="small" onClick={handleClick}>
              <Icon path={mdiDotsHorizontal} size={1} />
            </ButtonIcon>
          </div>
        </div>
        <div className="styled-content-box-dmt">
          <Text>{props.item.content}</Text>
        </div>
      </li>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: -30,
          horizontal: 'right'
        }}
      >
        <MenuItem
          onClick={() => {
            props.handleClickOpen();
            setAnchorEl(null);
          }}
        >
          Chỉnh sửa
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.handleOpenModalDelete();
            setAnchorEl(null);
          }}
        >
          Xóa
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};


export default CustomListItem