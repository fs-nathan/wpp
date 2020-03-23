import { Badge, CircularProgress, IconButton, Menu, MenuItem } from '@material-ui/core';
import { mdiAccountPlus, mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';
import { find, get, isNil } from 'lodash';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CustomAvatar from '../../../../components/CustomAvatar';
import CustomBadge from '../../../../components/CustomBadge';
import CustomTable from '../../../../components/CustomTable';
import ErrorBox from '../../../../components/ErrorBox';
import LoadingBox from '../../../../components/LoadingBox';
import { Container, LinkSpan, SettingContainer } from '../../../../components/TableComponents';
import { DRAWER_TYPE } from '../../../../constants/constants';
import { Context as UserPageContext } from '../../index';
import '../AllUsersTable/style.scss';

const NewUserBadge = ({ className = '', ...props }) =>
  <Badge
    className={`view_Department_AllUserTalbe___user-badge ${className}`}
    {...props}
  />

const PermissionButton = ({
  handleOpenMenu,
}) => {
  return (
    <SettingContainer onClick={evt => evt.stopPropagation()}>
      <IconButton
        aria-controls="simple-menu" aria-haspopup="true"
        onClick={evt => handleOpenMenu(evt.currentTarget)}
        size='small'
      >
        <Icon path={mdiDotsVertical} size={1} color='rgba(0, 0, 0, 0.7)' />
      </IconButton>
    </SettingContainer>
  );
}

function StateBadge({ user }) {
  return (
    get(user, 'state', 0) === 0
      ? (
        <CustomBadge color='#ec1000'>
          Hạn chế
        </CustomBadge>
      )
      : (
        <CustomBadge color='#48bb78'>
          Công khai
        </CustomBadge>
      )
  );
}

function DepartmentUsersTable({
  room, hasRequirement, publicPrivatePendings,
  expand, handleExpand,
  handleSortUser,
  handleChangeState,
  handleBanUserFromGroup,
  handleOpenModal,
  handleVisibleDrawerMessage,
}) {

  const { setDepartmentId } = React.useContext(UserPageContext);
  const { departmentId } = useParams();
  const history = useHistory();

  React.useEffect(() => {
    setDepartmentId(departmentId);
  }, [departmentId, setDepartmentId]);

  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [publicPrivateDisabled, setPublicPrivateDisabled] = React.useState(false);

  function doOpenMenu(anchorEl, user) {
    setMenuAnchorEl(anchorEl);
    setUser(user);
  }

  React.useEffect(() => {
    setPublicPrivateDisabled(!isNil(
      find(publicPrivatePendings.pendings, pending => pending === get(user, 'id'))
    ));
  }, [publicPrivatePendings, user]);


  return (
    <Container>
      {isNil(room.error)
        ? (
          <CustomTable
            options={{
              title: 'Danh sách nhân sự',
              subTitle: `Đã có ${get(room.room, 'number_member', 0)} thành viên`,
              subActions: [{
                label: 'Thêm thành viên',
                icon: () => hasRequirement
                  ? <NewUserBadge badgeContent={'N'}>
                    <Icon path={mdiAccountPlus} size={1} color={'rgba(0, 0, 0, 0.54)'} />
                  </NewUserBadge>
                  : <Icon path={mdiAccountPlus} size={1} color={'rgba(0, 0, 0, 0.54)'} />,
                onClick: () => handleVisibleDrawerMessage({
                  type: DRAWER_TYPE.ADD_USER,
                  anchor: 'left'
                }),
                noExpand: true,
              }],
              mainAction: {
                label: '+ Thêm tài khoản',
                onClick: () => handleOpenModal('CREATE_ACCOUNT'),
              },
              expand: {
                bool: expand,
                toggleExpand: () => handleExpand(!expand),
              },
              moreMenu: [{
                label: 'Quản lý chức danh',
                onClick: () => handleOpenModal('TITLE'),
              }, {
                label: 'Quản lý vai trò',
                onClick: () => handleOpenModal('ROLE'),
              }, {
                label: 'Quản lý trình độ',
                onClick: () => handleOpenModal('LEVEL'),
              }, {
                label: 'Quản lý chuyên ngành',
                onClick: () => handleOpenModal('MAJOR'),
              }, {
                label: 'Quản lý biểu tượng',
                onClick: () => handleOpenModal('LOGO'),
              }, {
                label: 'Cài đặt bảng',
                onClick: () => handleOpenModal('TABLE_SETTING'),
              }],
              grouped: {
                bool: false,
              },
              row: {
                id: 'id',
                onClick: (user) => history.push(`/members/${get(user, 'id', '')}`),
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
                  handleSortUser(draggableId, departmentId, destination.index);
                },
              },
              loading: {
                bool: room.loading,
                component: () => <LoadingBox />,
              },
            }}
            columns={[{
              label: '',
              field: (user) => <CustomAvatar style={{ width: 35, height: 35 }} src={get(user, 'avatar')} alt='avatar' />,
              align: 'left',
              width: '5%',
            }, {
              label: 'Họ và tên',
              field: (user) => <LinkSpan
                onClick={evt => history.push(`/members/${get(user, 'id')}`)}
              >{get(user, 'name', '')}</LinkSpan>,
              align: 'left',
              width: '14%',
            }, {
              label: 'Chức danh',
              field: 'position',
              align: 'left',
              width: '10%',
            }, {
              label: 'Ngày sinh',
              field: (user) => get(user, 'birthday'),
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
              field: (user) => <StateBadge user={user} />,
              align: 'center',
              width: '10%',
            }, {
              label: () => <IconButton disabled>
                <Icon path={mdiAccountPlus} size={1} color={'rgba(0, 0, 0, 0)'} />
              </IconButton>,
              field: (user) => <PermissionButton
                handleOpenMenu={currentTarget =>
                  doOpenMenu(
                    currentTarget,
                    user,
                  )
                }
              />,
              align: 'center',
              width: '5%',
            }]}
            data={room.room.users}
          />
        ) : <ErrorBox />}
      <Menu
        id="simple-menu"
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={() => setMenuAnchorEl(null)}
        transformOrigin={{
          vertical: -30,
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => {
          handleChangeState(user);
          setMenuAnchorEl(null);
        }}
          disabled={publicPrivateDisabled}
        >
          {publicPrivateDisabled &&
            <CircularProgress
              size={16}
              className="margin-circular"
              color="white"
            />}
          Chuyển trạng thái
        </MenuItem>
        <MenuItem onClick={() => {
          handleOpenModal('PERMISSION_SETTING');
          setMenuAnchorEl(null);
        }}>
          Phân quyền
        </MenuItem>
        <MenuItem onClick={() => {
          handleOpenModal('ALERT', {
            content: 'Bạn chắc chắn muốn xóa người dùng ra khỏi nhóm?',
            onConfirm: () => handleBanUserFromGroup(user),
          });
          setMenuAnchorEl(null);
        }}>
          Rời nhóm
        </MenuItem>
      </Menu>
    </Container>
  )
}

export default DepartmentUsersTable;
