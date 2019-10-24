import React from 'react';
import styled from 'styled-components';
import { Avatar, IconButton, Menu, MenuItem,  } from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiAccountPlus,
  mdiDotsVertical,
} from '@mdi/js';
import { useLocation, useHistory } from 'react-router-dom';
import { listRoom } from '../../../../actions/room/listRoom';
import { sortUser } from '../../../../actions/user/sortUser';
import { listUserOfGroup } from '../../../../actions/user/listUserOfGroup';
import { publicMember } from '../../../../actions/user/publicMember';
import { privateMember } from '../../../../actions/user/privateMember';
import { banUserFromGroup } from '../../../../actions/user/banUserFromGroup';
import { connect } from 'react-redux';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import CustomTable from '../../../../components/CustomTable';
import CustomBadge from '../../../../components/CustomBadge';
import AlertModal from '../../../../components/AlertModal';
import { get } from 'lodash';
import TitleManagerModal from '../../Modals/TitleManager';
import RoleManagerModal from '../../Modals/RoleManager';
import LogoManagerModal from '../../Modals/LogoManager';
import TableSettingsModal from '../../Modals/TableSettings';
import PermissionSettingsModal from '../../Modals/PermissionSettings';
import { 
  CustomEventListener, CustomEventDispose, 
  SORT_USER, SORT_ROOM, CREATE_ROOM,
  INVITE_USER_JOIN_GROUP, BAN_USER_FROM_GROUP,
} from '../../../../constants/events';

const Container = styled.div`
  grid-area: right;
  min-height: 100%;
`;

const SubTitle = styled.span`
  font-size: 13px;
  & > span {
    color: blue;
  }
`;

const PermissionButton = ({ handleChangeState, user, doPrivateMember, doPublicMember, doBanUserFromGroup }) => {

  const [state, setState] = React.useState(get(user, 'state', 0));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState(false);

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget);
  }

  function handleClose(openModal = false) {
    return evt => {
      setOpen(openModal);
      setAnchorEl(null);
    }
  }

  function changeState(user) {
    if (state === 0) {
      handleChangeState({
        state: 1,
      });
      setState(1);
      doPublicMember({
        userId: get(user, 'id'),
      });
    } else {
      handleChangeState({
        state: 0,
      });
      setState(0);
      doPrivateMember({
        userId: get(user, 'id'),
      });
    }
    setAnchorEl(null);
  }

  function handleLeaveGroup(user) {
    doBanUserFromGroup({
      userId: get(user, 'id'),
    });
    setAnchorEl(null);
  }

  return (
    <div onClick={evt => evt.stopPropagation()}>
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
        <MenuItem onClick={evt => changeState(user)}>Chuyển trạng thái</MenuItem>
        <MenuItem onClick={handleClose(true)}>Phân quyền</MenuItem>
        <MenuItem onClick={evt => setAlert(true)}>Rời nhóm</MenuItem>
      </Menu>
      <PermissionSettingsModal open={open} setOpen={setOpen} />
      <AlertModal 
        open={alert}
        setOpen={setAlert}
        content='Bạn chắc chắn muốn xóa người dùng ra khỏi nhóm?'
        onConfirm={() => handleLeaveGroup(user)}
      />
    </div>
  );
}

function StateBadge({ row, stateObj }) {
  const [stateOfRow, setStateOfRow] = React.useState(stateObj[get(row, 'id')]);
  
  React.useEffect(() => {
    setStateOfRow(stateObj[get(row, 'id')]);
  }, [row, stateObj]);

  if (get(stateOfRow, 'state', 0) === 0) {
    return (
      <CustomBadge color='#ec1000'>
        Hạn chế
      </CustomBadge>
    )
  } else {
    return (
      <CustomBadge color='#48bb78'>
        Công khai
      </CustomBadge>
    )
  }
}

function AllUsersTable({ 
  listRoom, doListRoom,
  sortUser, doSortUser,
  listUserOfGroup, doListUserOfGroup, 
  expand, handleExpand, handleSubSlide,
  doPublicMember, doPrivateMember,
  doBanUserFromGroup, 
}) {

  const location = useLocation();
  const history = useHistory();

  const { data: { rooms }, loading: listRoomLoading, error: listRoomError } = listRoom;
  const { data: { rooms: group }, error: listUserOfGroupError, loading: listUserOfGroupLoading } = listUserOfGroup;
  const { error: sortUserError, loading: sortUserLoading } = sortUser;

  const loading = listUserOfGroupLoading || sortUserLoading || listRoomLoading;
  const error = listUserOfGroupError || sortUserError || listRoomError;
  const [moreModal, setMoreModal] = React.useState(0);

  const [stateObj, setStateObj] = React.useState({});

  React.useEffect(() => {
    doListRoom();
  }, [doListRoom]);

  React.useEffect(() => {
    doListUserOfGroup();
  }, [doListUserOfGroup]);

  React.useEffect(() => {
    const { data: { rooms } } = listUserOfGroup;
    let _stateObj = {};
    rooms.forEach(room => {
      const users = get(room, 'users', []);
      users.forEach(user => {
        _stateObj[get(user, 'id')] = {
          state: get(user, 'state'),
        };
      });
    });
    setStateObj(_stateObj);
  }, [listUserOfGroup]);

  function handleChangeState(userId) {
    return (options) => {
      let _stateObj = { ...stateObj };
      _stateObj[userId] = {
        ..._stateObj[userId],
        ...options,
      }
      setStateObj(_stateObj);
    }
  }

  React.useEffect(() => {
    const doListUserOfGroupHandler = () => {
      doListUserOfGroup();
    };
    
    CustomEventListener(SORT_USER, doListUserOfGroupHandler);
    CustomEventListener(CREATE_ROOM, doListUserOfGroupHandler);
    CustomEventListener(SORT_ROOM, doListUserOfGroupHandler);
    CustomEventListener(INVITE_USER_JOIN_GROUP, doListUserOfGroupHandler);
    CustomEventListener(BAN_USER_FROM_GROUP, doListUserOfGroupHandler);
    
    return () => {
      CustomEventDispose(SORT_USER, doListUserOfGroupHandler);
      CustomEventDispose(CREATE_ROOM, doListUserOfGroupHandler);
      CustomEventDispose(SORT_ROOM, doListUserOfGroupHandler);
      CustomEventDispose(INVITE_USER_JOIN_GROUP, doListUserOfGroupHandler);
      CustomEventDispose(BAN_USER_FROM_GROUP, doListUserOfGroupHandler);
    }
  }, [doListUserOfGroup]);

  return (
    <Container>
      {loading && <LoadingBox />}
      {error !== null && <ErrorBox />}
      {!loading && error === null && (
        <CustomTable
          options={{
            title: 'Danh sách nhân sự',
            subTitle: () => 
              <SubTitle>
                Đã có {rooms.reduce((sum, room) => sum += get(room, 'number_member', 0), 0)} thành viên
                <span> (Nâng cấp)</span>
              </SubTitle>,
            subActions: [{
              label: 'Thêm thành viên',
              iconPath: mdiAccountPlus,
              onClick: () => handleSubSlide(true),
            }],
            mainAction: {
              label: '+ Thêm tài khoản',
              onClick: null,  
            },
            expand: {
              bool: expand,
              toggleExpand: () => handleExpand(!expand),
            },
            moreMenu: [{
              label: 'Quản lý chức danh',
              onClick: () => setMoreModal(1),
            }, {
              label: 'Quản lý vai trò',
              onClick: () => setMoreModal(2),
            }, {
              label: 'Quản lý biểu tượng',
              onClick: () => setMoreModal(3),
            }, {
              label: 'Cài đặt bảng',
              onClick: () => setMoreModal(4),
            }],
            grouped: {
              bool: true,
              id: 'id',
              label: 'name',
              item: 'users',
            },
            row: {
              id: 'id',
              onClick: (row, group) => history.push(`${location.pathname}/nguoi-dung/${get(row, 'id')}`),
            },
            draggable: {
              bool: true,
              onDragEnd: result => {
                const { source, destination, draggableId } = result;
                if (!destination) return;
                if (
                  destination.droppableId === source.droppableId &&
                  destination.index === source.index
                ) return;
                doSortUser({
                  userId: draggableId,
                  roomId: destination.droppableId,
                  sortIndex: destination.index,
                });
              }, 
            }
          }}
          columns={[{
            label: '',
            field: (row) => <Avatar src={get(row, 'avatar')} alt='avatar' />,
          }, {
            label: 'Họ và tên',
            field: 'name',
          }, {
            label: 'Chức danh',
            field: 'position',
          }, {
            label: 'Ngày sinh',
            field: (row) =>(new Date(get(row, 'birthday', 0))).toLocaleDateString(),
          }, {
            label: 'Giới tính',
            field: 'gender',
          }, {
            label: 'Email',
            field: 'email',
          }, {
            label: 'Điện thoại',
            field: 'phone',
          }, {
            label: 'Vai trò',
            field: 'role',
          }, {
            label: 'Trạng thái',
            field: (row) => <StateBadge row={row} stateObj={stateObj} />,
          }, {
            label: '',
            field: (row) => <PermissionButton 
                              user={row} 
                              handleChangeState={handleChangeState(get(row, 'id'))} 
                              doPublicMember={doPublicMember}
                              doPrivateMember={doPrivateMember}
                              doBanUserFromGroup={doBanUserFromGroup}
                            />,
          }]}
          data={group}
        />
      )}
      <TitleManagerModal open={moreModal === 1} setOpen={setMoreModal} />
      <RoleManagerModal open={moreModal === 2} setOpen={setMoreModal} />
      <LogoManagerModal open={moreModal === 3} setOpen={setMoreModal} />
      <TableSettingsModal open={moreModal === 4} setOpen={setMoreModal} />
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    listRoom: state.room.listRoom,
    listUserOfGroup: state.user.listUserOfGroup,
    sortUser: state.user.sortUser,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doListRoom: () => dispatch(listRoom()),
    doListUserOfGroup: () => dispatch(listUserOfGroup()),
    doSortUser: ({ roomId, userId, sortIndex }) => dispatch(sortUser({ roomId, userId, sortIndex })),
    doPublicMember: ({ userId }) => dispatch(publicMember({ userId })),
    doPrivateMember: ({ userId }) => dispatch(privateMember({ userId })),
    doBanUserFromGroup: ({ userId }) => dispatch(banUserFromGroup({ userId })),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllUsersTable);
