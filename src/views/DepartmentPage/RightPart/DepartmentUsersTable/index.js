import React from 'react';
import { IconButton, Menu, MenuItem,  } from '@material-ui/core';
import CustomAvatar from '../../../../components/CustomAvatar';
import Icon from '@mdi/react';
import {
  mdiAccountPlus,
  mdiDotsVertical,
} from '@mdi/js';
import { useParams, useHistory } from 'react-router-dom';
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
import {
  Container, LinkSpan, SettingContainer,
} from '../../../../components/TableComponents';
import { get } from 'lodash';
import TitleManagerModal from '../../Modals/TitleManager';
import RoleManagerModal from '../../Modals/RoleManager';
import LogoManagerModal from '../../Modals/LogoManager';
import TableSettingsModal from '../../Modals/TableSettings';
import PermissionSettingsModal from '../../Modals/PermissionSettings';
import CreateAccountModal from '../../Modals/CreateAccount';
import { Context as UserPageContext } from '../../index';

const PermissionButton = ({ 
  user,
  setCurrentSettingUser, setCurrentSettingAnchorEl
}) => {

  function handleClick(evt) {
    setCurrentSettingAnchorEl(evt.currentTarget);
    setCurrentSettingUser(user);
  }

  return (
    <SettingContainer onClick={evt => evt.stopPropagation()}>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} size='small'>
        <Icon path={mdiDotsVertical} size={1} color='rgba(0, 0, 0, 0.7)'/>
      </IconButton>
    </SettingContainer>
  );
}

function StateBadge({ user }) {
  if (get(user, 'state', 0) === 0) {
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
  detailRoom,
  getUserOfRoom,
  doSortUser,
  expand, handleExpand, handleSubSlide,
  doPublicMember, doPrivateMember,
  doBanUserFromGroup, 
}) {

  const { setDepartmentId } = React.useContext(UserPageContext);
  const { departmentId } = useParams();
  const history = useHistory();

  const { data: { room }, loading: detailRoomLoading, error: detailRoomError } = detailRoom;
  const { data: { users }, loading: getUserOfRoomLoading, error: getUserOfRoomError } = getUserOfRoom;

  const loading = detailRoomLoading || getUserOfRoomLoading;
  const error = detailRoomError || getUserOfRoomError;
  const [moreModal, setMoreModal] = React.useState(0);const [createAccount, setCreateAccount] = React.useState(false);

  const [currentSettingUser, setCurrentSettingUser] = React.useState(null);
  const [currentSettingAnchorEl, setCurrentSettingAnchorEl] = React.useState(null);
  const [permisstionSettingModal, setPermisstionSettingModal] = React.useState(false);
  const [alertModal, setAlertModal] = React.useState(false);

  function handleClose(open = false) {
    return evt => {
      setPermisstionSettingModal(open);
      setCurrentSettingAnchorEl(null);
    }
  }

  function changeState(user) {
    if (get(user, 'state') === 0) {
      doPublicMember({
        userId: get(user, 'id'),
      });
    } else {
      doPrivateMember({
        userId: get(user, 'id'),
      });
    }
    setCurrentSettingAnchorEl(null);
  }

  function handleLeaveGroup(user) {
    doBanUserFromGroup({
      userId: get(user, 'id'),
    });
    setCurrentSettingAnchorEl(null);
  }

  React.useEffect(() => {
    setDepartmentId(departmentId);
  }, [departmentId, setDepartmentId]);

  return (
    <Container>
      {error !== null && <ErrorBox />}
      {error === null && (
        <CustomTable
          options={{
            title: 'Danh sách nhân sự',
            subTitle: `${ departmentId === 'default' ? '' : `Đã có ${get(room, 'number_member', 0)} thành viên`}`,
            subActions: [{
              label: 'Thêm thành viên',
              iconPath: mdiAccountPlus,
              onClick: () => handleSubSlide(1),
              noExpand: true,
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
              onClick: (row) => history.push(`/members/${get(row, 'id', '')}`),
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
                  roomId: departmentId,
                  sortIndex: destination.index,
                });
              }, 
            },
            loading: {
              bool: loading,
              component: () => <LoadingBox />,
            },
          }}
          columns={[{
            label: '',
            field: (row) => <CustomAvatar style={{ width: 35, height: 35 }} src={get(row, 'avatar')} alt='avatar' />,
            align: 'left', 
            width: '5%',
          }, {
            label: 'Họ và tên',
            field: (row) => <LinkSpan onClick={evt => history.push(`/members/${get(row, 'id', '')}`)}>{get(row, 'name', '')}</LinkSpan>,
            align: 'left',
            width: '14%',
          }, {
            label: 'Chức danh',
            field: 'position',
            align: 'left',
            width: '10%',
          }, {
            label: 'Ngày sinh',
            field: (row) =>(new Date(get(row, 'birthday', 0))).toLocaleDateString(),
            align: 'left',
            width: '10%',
          }, {
            label: 'Giới tính',
            field: 'gender',
            align: 'left',
            width: '10%',
          }, {
            label: 'Email',
            field: 'email',
            align: 'left',
            width: '15%',
          }, {
            label: 'Điện thoại',
            field: 'phone',
            align: 'left',
            width: '10%',
          }, {
            label: 'Vai trò',
            field: 'role',
            align: 'left',
            width: '10%',
          }, {
            label: 'Trạng thái',
            field: (row) => <StateBadge user={row} />,
            align: 'center',
            width: '10%',
          }, {
            label: '',
            field: (row) => <PermissionButton 
                              user={row}
                              setCurrentSettingUser={setCurrentSettingUser}
                              setCurrentSettingAnchorEl={setCurrentSettingAnchorEl}
                            />,
            align: 'center',
            width: '5%',
          }]}
          data={users}
        />
      )}
      <TitleManagerModal open={moreModal === 1} setOpen={setMoreModal} />
      <RoleManagerModal open={moreModal === 2} setOpen={setMoreModal} />
      <LogoManagerModal open={moreModal === 3} setOpen={setMoreModal} isSelect={false} />
      <TableSettingsModal open={moreModal === 4} setOpen={setMoreModal} />
      <CreateAccountModal open={createAccount} setOpen={setCreateAccount} />
      <Menu
        id="simple-menu"
        anchorEl={currentSettingAnchorEl}
        keepMounted
        open={Boolean(currentSettingAnchorEl)}
        onClose={handleClose()}
        transformOrigin={{
          vertical: -30,
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={evt => changeState(currentSettingUser)}>Chuyển trạng thái</MenuItem>
        <MenuItem onClick={handleClose(true)}>Phân quyền</MenuItem>
        <MenuItem onClick={evt => setAlertModal(true)}>Rời nhóm</MenuItem>
      </Menu>
      <PermissionSettingsModal open={permisstionSettingModal} setOpen={setPermisstionSettingModal} />
      <AlertModal 
        open={alertModal}
        setOpen={setAlertModal}
        content='Bạn chắc chắn muốn xóa người dùng ra khỏi nhóm?'
        onConfirm={() => handleLeaveGroup(currentSettingUser)}
        onCancle={() => setCurrentSettingAnchorEl(null)}
      />
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
    doDetailRoom: ({ roomId }, quite) => dispatch(detailRoom({ roomId }, quite)),
    doGetUserOfRoom: ({ roomId }, quite) => dispatch(getUserOfRoom({ roomId }, quite)),
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
