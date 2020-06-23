import { Avatar, IconButton, ListItem, Menu, MenuItem } from '@material-ui/core';
import { mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';
import { openDetailMember } from 'actions/chat/chat';
import { deleteMember } from 'actions/taskDetail/taskDetailActions';
import { detailUser } from 'actions/user/detailUser';
import compact from 'lodash/compact';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import './styles.scss';
import { currentColorSelector } from 'views/JobDetailPage/selectors';

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
const StyledListItem = styled(ListItem)`
    padding : 7px 0;
    &:hover .styled-menu-member {
      opacity: 1;
    }
`

const MemberListItem = ({
  id, name, avatar,
  room, position, group_permission,
  handleClickPermission,
  can_ban,
  is_admin,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const groupActiveColor = useSelector(currentColorSelector)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleDeleteMembers = () => {
    dispatch(openDetailMember(false))
    dispatch(deleteMember({ task_id: taskId, member_id: id }))
  };

  const handleClickDetail = () => {
    setAnchorEl(null);
    dispatch(detailUser({ userId: id }))
  };

  const onClickPermission = () => {
    setAnchorEl(null);
    handleClickPermission()
  };

  return (
    <React.Fragment>
      <StyledListItem className="memberItem">
        <Avatar className="memberItem--avatar" src={avatar} alt='avatar' onClick={handleClickDetail} />
        <div className="memberItem--textWrap" onClick={handleClickDetail}>
          <div className="memberItem--name">
            {name}
          </div>
          <div className="memberItem--department">
            {group_permission && group_permission.name}
          </div>
          <div className="memberItem--role">
            {compact([room, position]).join(' - ')}
          </div>
        </div>
        {is_admin && <div className="memberItem--admin" style={{ backgroundColor: groupActiveColor }}>
          Admin
        </div>
        }
        <ButtonIcon
          className="memberItem--menuButton"
          size='small' onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
          <Icon path={mdiDotsVertical} size={1} />
        </ButtonIcon>
      </StyledListItem>
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
        <MenuItem className="memberItem--menuItem" onClick={handleClickDetail}>{t('LABEL_CHAT_TASK_CHI_TIET')}</MenuItem>
        {!is_admin && <MenuItem className="memberItem--menuItem" onClick={onClickPermission}>{t('LABEL_CHAT_TASK_PHAN_QUYEN')}</MenuItem>}
        {can_ban && <MenuItem className="memberItem--menuItem" onClick={handleDeleteMembers}>{t('LABEL_CHAT_TASK_XOA')}</MenuItem>}
      </Menu>
    </React.Fragment >
  );
}

export default MemberListItem