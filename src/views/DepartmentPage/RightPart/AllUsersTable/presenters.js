import React from 'react';
import { IconButton, Menu, MenuItem, Badge } from '@material-ui/core';
import CustomAvatar from '../../../../components/CustomAvatar';
import { LightTooltip, TooltipWrapper } from '../../../../components/LightTooltip';
import Icon from '@mdi/react';
import {
  mdiAccountPlus,
  mdiDotsVertical,
} from '@mdi/js';
import { useHistory } from 'react-router-dom';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import CustomTable from '../../../../components/CustomTable';
import CustomBadge from '../../../../components/CustomBadge';
import {
  Container, SubTitle, LinkSpan, SettingContainer,
} from '../../../../components/TableComponents';
import { get, isNil } from 'lodash';
import { DRAWER_TYPE } from '../../../../constants/constants';
import './style.scss';

const TooltipBody = ({ className = '', state, ...props }) =>
  <div 
    className={`view_Department_AllUserTalbe___tooltip-${state === 0 ? 'private' : 'public'} ${className}`}
    {...props}
  />

const NewUserBadge = ({ className = '', ...props }) =>
  <Badge
    className={`view_Department_AllUserTalbe___user-badge ${className}`}
    {...props}
  />

const PermissionButton = ({ 
  user,
  handleOpenMenu,
}) => {
  return (
    <SettingContainer onClick={evt => evt.stopPropagation()}>
      <IconButton 
        aria-controls="simple-menu" aria-haspopup="true" 
        onClick={evt => handleOpenMenu(evt.currentTarget, user)} 
        size='small'
      >
        <Icon path={mdiDotsVertical} size={1} color='rgba(0, 0, 0, 0.7)'/>
      </IconButton>
    </SettingContainer>
  );
}

function StateBadge({ user }) {
  return (
    get(user, 'state', 0) === 0
    ? (
      <LightTooltip
        placement='top'
        title={
          <TooltipBody state={0}>
            <div>
              <span>Trạng thái:</span>
              <span>Hạn chế</span>
            </div>
            <small>Chỉ tương tác được với các thành viên có trạng thái Công khai khác</small>
          </TooltipBody>
        }
      >
        <TooltipWrapper>
          <CustomBadge color='#ec1000'>
            Hạn chế
          </CustomBadge>
        </TooltipWrapper>
      </LightTooltip>
    )
    : (
      <LightTooltip
        placement='top'
        title={
          <TooltipBody state={1}>
            <div>
              <span>Trạng thái:</span>
              <span>Công khai</span>
            </div>
            <small>Tương tác được với tất cả các thành viên</small>
          </TooltipBody>
        }
      >
        <TooltipWrapper>
          <CustomBadge color='#48bb78'>
            Công khai
          </CustomBadge>
        </TooltipWrapper>
      </LightTooltip>
    )
  );
}

function AllUsersTable({ 
  rooms, maxUser, hasRequirement,
  expand, handleExpand,
  handleSortUser,
  handleChangeState,
  handleBanUserFromGroup,
  handleOpenModal, 
  handleVisibleDrawerMessage,
}) {

  const history = useHistory();

  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const [menuData, setMenuData] = React.useState(null);

  function doOpenMenu(anchorEl, data) {
    setMenuAnchorEl(anchorEl);
    setMenuData(data);
  }

  return (
    <Container>
      {isNil(rooms.error)
      ? (
        <CustomTable
          options={{
            title: 'Danh sách nhân sự',
            subTitle: () => 
              <SubTitle>
                Đã có {rooms.rooms.reduce((sum, room) => sum += get(room, 'number_member', 0), 0)}/{maxUser} thành viên
              </SubTitle>,
            subActions: [{
              label: 'Thêm thành viên',
              icon: () => hasRequirement 
                ? <NewUserBadge badgeContent={'N'}>
                    <Icon path={mdiAccountPlus} size={1} color={'rgba(0, 0, 0, 0.54)'} />
                  </NewUserBadge>
                : <Icon path={mdiAccountPlus} size={1} color={'rgba(0, 0, 0, 0.54)'} />,
              onClick: () => {
                handleVisibleDrawerMessage({
                  type: DRAWER_TYPE.ADD_USER,
                  anchor: 'left'
                })
              },
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
              bool: true,
              id: 'id',
              label: (room) => get(room, 'id') === 'Default' ? 'Mặc định' : get(room, 'name'),
              item: 'users',
            },
            row: {
              id: 'id',
              onClick: (user) => history.push(`/members/${get(user, 'id')}`),
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
                handleSortUser(
                  destination.droppableId,
                  draggableId, 
                  destination.index
                );
              }, 
            },
            loading: {
              bool: rooms.loading,
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
                <Icon path={mdiAccountPlus} size={1} color={'rgba(0, 0, 0, 0)'}/>
              </IconButton>,
            field: (user) => <PermissionButton 
                              user={user} 
                              handleOpenMenu={doOpenMenu}
                            />,
            align: 'center',
            width: '5%',
          }]}
          data={rooms.rooms}
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
          handleChangeState(menuData);
          setMenuAnchorEl(null);
        }}>
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
            onConfirm: () => handleBanUserFromGroup(menuData),
          });
          setMenuAnchorEl(null);
        }}>
          Rời nhóm
        </MenuItem>
      </Menu>
    </Container>
  )
}

export default AllUsersTable;
