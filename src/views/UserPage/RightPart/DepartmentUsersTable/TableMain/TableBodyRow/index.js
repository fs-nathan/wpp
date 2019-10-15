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
import ColorTypo from '../../../../../../components/ColorTypo';
import ColorChip from '../../../../../../components/ColorChip';
import PermissionSettingsModal from '../../../../Modals/PermissionSettings';
import { publicMember } from '../../../../../../actions/user/publicMember';
import { privateMember } from '../../../../../../actions/user/privateMember';
import { banUserFromGroup } from '../../../../../../actions/user/banUserFromGroup';
import { connect } from 'react-redux';
import _ from 'lodash';
import LoadingBox from '../../../../../../components/LoadingBox';
import { CustomEventListener, CustomEventDispose, PUBLIC_MEMBER, PRIVATE_MEMBER } from '../../../../../../constants/events';

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
  &:nth-child(4), &:nth-child(5), &:nth-child(6), &:nth-child(8), &:nth-child(9) {
    text-align: center;
  }
`;

function TableBodyRow({ user, index, doPublicMember, doPrivateMember, doBanUserFromGroup }) {

  const location = useLocation();
  const history = useHistory();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(_.get(user, 'state', 0));
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setState(_.get(user, 'state', 0));
  }, [user]);

  React.useEffect(() => {
    const loadingFalseHandler = () => {
      setLoading(false);
    };

    CustomEventListener(PUBLIC_MEMBER, loadingFalseHandler);
    CustomEventListener(PRIVATE_MEMBER, loadingFalseHandler);

    return () => {
      CustomEventDispose(PUBLIC_MEMBER, loadingFalseHandler);
      CustomEventDispose(PRIVATE_MEMBER, loadingFalseHandler);
    }
  }, [])

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
    setLoading(true);
    if (state === 0) {
      setState(1);
      doPublicMember({
        userId: _.get(user, 'id'),
      });
    } else {
      setState(0);
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
          onClick={() => history.push(`${location.pathname}/nguoi-dung/${_.get(user, 'id', '')}`)}
          innerRef={provided.innerRef}
          {...provided.draggableProps} 
        >
          <StyledTableBodyCell>
            <div {...provided.dragHandleProps}>
              <Icon path={mdiDragVertical} size={1} color='rgba(0, 0, 0, 0.7)'/>
            </div>
          </StyledTableBodyCell>
          <StyledTableBodyCell>
            <Avatar style={{width: 30, height: 30}} src={_.get(user, 'avatar')} alt='avatar' />
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
            {loading && <LoadingBox size={8} />}
            {!loading && (
              <ColorChip badge size='small' color={state === 0 ? 'red' : 'green'} 
                label={
                  state === 0 
                  ? `${t('views.user_page.right_part.users_table.table_main.table_body_row.state_label.private')}` 
                  : `${t('views.user_page.right_part.users_table.table_main.table_body_row.state_label.public')}`
                } 
              />
            )}
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
