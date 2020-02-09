import React from 'react';
import { IconButton, Menu, MenuItem, Badge,  } from '@material-ui/core';
import CustomAvatar from '../../../../components/CustomAvatar';
import Icon from '@mdi/react';
import {
  mdiAccountPlus,
  mdiDotsVertical,
} from '@mdi/js';
import { useHistory } from 'react-router-dom';
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
import {
  Container, SubTitle, LinkSpan, SettingContainer,
} from '../../../../components/TableComponents';
import { get } from 'lodash';
import TitleManagerModal from '../../Modals/TitleManager';
import RoleManagerModal from '../../Modals/RoleManager';
import LevelManagerModal from '../../Modals/LevelManager';
import MajorManagerModal from '../../Modals/MajorManager';
import LogoManagerModal from '../../Modals/LogoManager';
import TableSettingsModal from '../../Modals/TableSettings';
import PermissionSettingsModal from '../../Modals/PermissionSettings';
import CreateAccountModal from '../../Modals/CreateAccount';
import './style.scss';

const NewUserBadge = ({ className = '', ...props }) =>
  <Badge
    className={`view_Department_AllUserTalbe___user-badge ${className}`}
    {...props}
  />

function displayDate(date) {
  if (
    (date instanceof Date && !isNaN(date))
  ) {
    return (
      <>
        <span>{date.toLocaleDateString()}</span>
      </>
    );
  } else {
    return <span />;
  }
}

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

function AllUsersTable({ 
  listRoom,
  doSortUser,
  listUserOfGroup, 
  expand, handleExpand, handleSubSlide,
  doPublicMember, doPrivateMember,
  doBanUserFromGroup, 
  getRequirementJoinGroup,
}) {

  const history = useHistory();

  const { data: { rooms }, loading: listRoomLoading, error: listRoomError } = listRoom;
  const { data: { rooms: group, maxUser }, error: listUserOfGroupError, loading: listUserOfGroupLoading } = listUserOfGroup;
  const { data: { requirements } } = getRequirementJoinGroup;

  const loading = listUserOfGroupLoading || listRoomLoading;
  const error = listUserOfGroupError || listRoomError;
  const [moreModal, setMoreModal] = React.useState(0);
  const [createAccount, setCreateAccount] = React.useState(false);

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

  return (
    <Container>
      {error !== null && <ErrorBox />}
      {error === null && (
        <CustomTable
          options={{
            title: 'Danh sách nhân sự',
            subTitle: () => 
              <SubTitle>
                Đã có {rooms.reduce((sum, room) => sum += get(room, 'number_member', 0), 0)}/{maxUser} thành viên
              </SubTitle>,
            subActions: [{
              label: 'Thêm thành viên',
              icon: () => requirements.length > 0 
                ? <NewUserBadge badgeContent={'N'}><Icon path={mdiAccountPlus} size={1} color={'rgba(0, 0, 0, 0.54)'} /></NewUserBadge>
                : <Icon path={mdiAccountPlus} size={1} color={'rgba(0, 0, 0, 0.54)'} />,
              onClick: () => handleSubSlide(1),
              noExpand: true,
            }],
            mainAction: {
              label: '+ Thêm tài khoản',
              onClick: () => setCreateAccount(true),  
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
              label: 'Quản lý trình độ',
              onClick: () => setMoreModal(3),
            }, {
              label: 'Quản lý chuyên ngành',
              onClick: () => setMoreModal(4),
            }, {
              label: 'Quản lý biểu tượng',
              onClick: () => setMoreModal(5),
            }, {
              label: 'Cài đặt bảng',
              onClick: () => setMoreModal(6),
            }],
            grouped: {
              bool: true,
              id: 'id',
              label: (group) => get(group, 'id') === 'Default' ? 'Mặc định' : get(group, 'name'),
              item: 'users',
            },
            row: {
              id: 'id',
              onClick: (row) => history.push(`/members/${get(row, 'id')}`),
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
            field: (row) => <LinkSpan 
              onClick={evt => history.push(`/members/${get(row, 'id')}`)}
            >{get(row, 'name', '')}</LinkSpan>,
            align: 'left',
            width: '14%',
          }, {
            label: 'Chức danh',
            field: 'position',
            align: 'left',
            width: '10%',
          }, {
            label: 'Ngày sinh',
            field: (row) =>(displayDate(get(row, 'birthday', 0))),
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
            label: (row) => <IconButton disabled><Icon path={mdiAccountPlus} size={1} color={'rgba(0, 0, 0, 0)'}/></IconButton>,
            field: (row) => <PermissionButton 
                              user={row} 
                              setCurrentSettingUser={setCurrentSettingUser}
                              setCurrentSettingAnchorEl={setCurrentSettingAnchorEl}
                            />,
            align: 'center',
            width: '5%',
          }]}
          data={group}
        />
      )}
      <TitleManagerModal open={moreModal === 1} setOpen={setMoreModal} />
      <RoleManagerModal open={moreModal === 2} setOpen={setMoreModal} />
      <LevelManagerModal open={moreModal === 3} setOpen={setMoreModal} />
      <MajorManagerModal open={moreModal === 4} setOpen={setMoreModal} />
      <LogoManagerModal open={moreModal === 5} setOpen={setMoreModal} isSelect={false} />
      <TableSettingsModal open={moreModal === 6} setOpen={setMoreModal} />
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
    listRoom: state.room.listRoom,
    listUserOfGroup: state.user.listUserOfGroup,
    sortUser: state.user.sortUser,
    getRequirementJoinGroup: state.groupUser.getRequirementJoinGroup,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doListRoom: (quite) => dispatch(listRoom(quite)),
    doListUserOfGroup: (quite) => dispatch(listUserOfGroup(quite)),
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
