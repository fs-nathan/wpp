import React from 'react';
import styled from 'styled-components';
import { Avatar, IconButton, Menu, MenuItem,  } from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiAccountPlus,
  mdiDotsVertical,
} from '@mdi/js';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { detailRoom } from '../../../../actions/room/detailRoom';
import { getUserOfRoom } from '../../../../actions/room/getUserOfRoom';
import { sortUser } from '../../../../actions/user/sortUser';
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
  SORT_USER, INVITE_USER_JOIN_GROUP, BAN_USER_FROM_GROUP,
} from '../../../../constants/events';

const Container = styled.div`
  grid-area: right;
  min-height: 100%;
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

function DepartmentUsersTable({ 
  detailRoom, doDetailRoom,
  getUserOfRoom, doGetUserOfRoom,
  sortUser, doSortUser,
  expand, handleExpand, handleSubSlide,
  doPublicMember, doPrivateMember,
  doBanUserFromGroup, 
}) {

  const { departmentId } = useParams();
  const location = useLocation();
  const history = useHistory();

  const { data: { room }, loading: detailRoomLoading, error: detailRoomError } = detailRoom;
  const { data: { users }, loading: getUserOfRoomLoading, error: getUserOfRoomError } = getUserOfRoom;
  const { loading: sortUserLoading, error: sortUserError } = sortUser;

  const loading = detailRoomLoading || sortUserLoading || getUserOfRoomLoading;
  const error = detailRoomError || sortUserError || getUserOfRoomError;
  const [moreModal, setMoreModal] = React.useState(0);

  const [stateObj, setStateObj] = React.useState({});

  React.useEffect(() => {
    if (departmentId !== 'default')
    doDetailRoom({
      roomId: departmentId,
    });
  }, [doDetailRoom, departmentId]);

  React.useEffect(() => {
    doGetUserOfRoom({
      roomId: departmentId,
    });
  }, [doGetUserOfRoom, departmentId]);

  React.useEffect(() => {
    const { data: { users } } = getUserOfRoom;
    let _stateObj = {};
    users.forEach(user => {
      _stateObj[get(user, 'id')] = {
        state: get(user, 'state'),
      };
    });
    setStateObj(_stateObj);
  }, [getUserOfRoom]);

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
    const doGetUserOfRoomHandler = () => {
      doGetUserOfRoom({
        roomId: departmentId,
      });
    };
    
    CustomEventListener(SORT_USER, doGetUserOfRoomHandler);
    CustomEventListener(INVITE_USER_JOIN_GROUP, doGetUserOfRoomHandler);
    CustomEventListener(BAN_USER_FROM_GROUP, doGetUserOfRoomHandler);

    return () => {
      CustomEventDispose(SORT_USER, doGetUserOfRoomHandler);
      CustomEventDispose(INVITE_USER_JOIN_GROUP, doGetUserOfRoomHandler);
      CustomEventDispose(BAN_USER_FROM_GROUP, doGetUserOfRoomHandler)
    }
  }, [doGetUserOfRoom, departmentId]);

  return (
    <Container>
      {loading && <LoadingBox />}
      {error !== null && <ErrorBox />}
      {!loading && error === null && (
        <CustomTable
          options={{
            title: `${ departmentId === 'default' ? 'Mặc định' : get(room, 'name', '') }`,
            subTitle: `${ departmentId === 'default' ? '' : `Đã có ${get(room, 'number_member', 0)} thành viên`}`,
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
              bool: false,
            },
            row: {
              id: 'id',
              onClick: (row) => history.push(`${location.pathname.replace(`/thong-tin/${departmentId}`, '')}/nguoi-dung/${get(row, 'id', '')}`),
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
          data={users}
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
    detailRoom: state.room.detailRoom,
    getUserOfRoom: state.room.getUserOfRoom,
    sortUser: state.user.sortUser,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doDetailRoom: ({ roomId }) => dispatch(detailRoom({ roomId })),
    doGetUserOfRoom: ({ roomId }) => dispatch(getUserOfRoom({ roomId })),
    doSortUser: ({ roomId, userId, sortIndex }) => dispatch(sortUser({ roomId, userId, sortIndex })),
    doPublicMember: ({ userId }) => dispatch(publicMember({ userId })),
    doPrivateMember: ({ userId }) => dispatch(privateMember({ userId })),
    doBanUserFromGroup: ({ userId }) => dispatch(banUserFromGroup({ userId })),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DepartmentUsersTable);
