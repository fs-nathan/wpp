import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
import { TableCell, TableRow, Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiDragVertical,
  mdiDotsVertical,
} from '@mdi/js';
import ColorTypo from '../../../../../../../components/ColorTypo';
import ColorChip from '../../../../../../../components/ColorChip';
import PermissionSettingsModal from '../../../../../Modals/PermissionSettings';
import { publicMember } from '../../../../../../../actions/user/publicMember';
import { privateMember } from '../../../../../../../actions/user/privateMember';
import { banUserFromGroup } from '../../../../../../../actions/user/banUserFromGroup';
import { connect } from 'react-redux';
import _ from 'lodash';

const StyledTableBodyRow = styled(TableRow)`
  background-color: #fff;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;

const StyledTableBodyCell = styled(TableCell)`
  padding: 8px;
  &:nth-child(1) > div {
    display: flex;
    justify-content: center;
    width: 37px;
    height: 30px;
    margin-right: 0;
  }
  &:nth-child(3), &:nth-child(4), &:nth-child(5), &:nth-child(7), &:nth-child(8) {
    text-align: center;
  }
`;

function TableBodyRow({ user, index, departmentId, doPublicMember, doPrivateMember, doBanUserFromGroup }) {

  const location = useLocation();
  const history = useHistory();
  const { t } = useTranslation();
  const [isHover, setIsHover] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget);
  }

  function handleClose(openModal = false) {
    return evt => {
      setOpen(openModal);
      setAnchorEl(null);
    }
  }

  function handleChangeState(user) {
    if (_.get(user, 'state') === 0) {
      doPublicMember({
        userId: _.get(user, 'id'),
      });
    } else {
      doPrivateMember({
        userId: _.get(user, 'id'),
      });
    }
    setAnchorEl(null);
  }

  function handleLeaveGroup(user) {
    doBanUserFromGroup({
      userId: _.get(user, 'id'),
    });
    setAnchorEl(null);
  }

  return (
    <Draggable 
      draggableId={_.get(user, 'id', '')}
      index={index}  
    >
      {(provided) => (
        <StyledTableBodyRow 
          hover
          onClick={() => history.push(`${location.pathname.replace('/them-thanh-vien', '')}/thong-tin/${departmentId}/nguoi-dung/${_.get(user, 'id', '')}`)}
          innerRef={provided.innerRef}
          {...provided.draggableProps} 
        >
          <StyledTableBodyCell
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <div {...provided.dragHandleProps}>
              {!isHover && <Avatar style={{width: 30, height: 30}} src={_.get(user, 'avatar')} alt='avatar' />}
              {isHover && <Icon path={mdiDragVertical} size={1} color='rgba(0, 0, 0, 0.7)'/>}
            </div>
          </StyledTableBodyCell>
          <StyledTableBodyCell>
            <ColorTypo>{_.get(user, 'name', '')}</ColorTypo>
          </StyledTableBodyCell>
          <StyledTableBodyCell>
            <ColorTypo>{_.get(user, 'position', '')}</ColorTypo>
          </StyledTableBodyCell>
          <StyledTableBodyCell>
            <ColorTypo color='orange'>
              {new Date(_.get(user, 'birthday', '')).toLocaleDateString()}
            </ColorTypo>
          </StyledTableBodyCell>
          <StyledTableBodyCell>
            <ColorTypo color='orange'>{_.get(user, 'gender', '')}</ColorTypo>
          </StyledTableBodyCell>
          <StyledTableBodyCell>  
            <ColorTypo color='blue'>{_.get(user, 'email', '')}</ColorTypo>
          </StyledTableBodyCell>
          <StyledTableBodyCell>  
            <ColorTypo color='blue'>{_.get(user, 'phone', '')}</ColorTypo>
          </StyledTableBodyCell>
          <StyledTableBodyCell>
            <ColorTypo color='green'>{_.get(user, 'role', '')}</ColorTypo>
          </StyledTableBodyCell>
          <StyledTableBodyCell>
            <ColorChip badge size='small' color={_.get(user, 'state', 1) === 0 ? 'red' : 'green'} 
              label={
                _.get(user, 'state', 1) === 0 
                ? `${t('views.user_page.right_part.users_table.table_main.table_body_row.state_label.private')}` 
                : `${t('views.user_page.right_part.users_table.table_main.table_body_row.state_label.public')}`
              } 
            />
          </StyledTableBodyCell>
          <StyledTableBodyCell onClick={evt => evt.stopPropagation()}>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} size='small'>
              <Icon path={mdiDotsVertical} size={1} color='rgba(0, 0, 0, 0.7)'/>
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose()}
              transformOrigin={{
                vertical: -30,
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={evt => handleChangeState(user)}>{t('views.user_page.right_part.users_table.table_main.table_body_row.change_state')}</MenuItem>
              <MenuItem onClick={handleClose(true)}>{t('views.user_page.right_part.users_table.table_main.table_body_row.manage_permission')}</MenuItem>
              <MenuItem onClick={evt => handleLeaveGroup(user)}>{t('views.user_page.right_part.users_table.table_main.table_body_row.leave_group')}</MenuItem>
            </Menu>
            <PermissionSettingsModal open={open} setOpen={setOpen} />
          </StyledTableBodyCell>
        </StyledTableBodyRow>
      )}
    </Draggable>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    doPublicMember: ({ userId }) => dispatch(publicMember({ userId })),
    doPrivateMember: ({ userId }) => dispatch(privateMember({ userId })),
    doBanUserFromGroup: ({ userId }) => dispatch(banUserFromGroup({ userId })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(TableBodyRow);
