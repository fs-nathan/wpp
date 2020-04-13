import { Button, CircularProgress, IconButton, ListItemText, ListSubheader, Menu, MenuItem, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { mdiAccountConvert, mdiAccountMinus, mdiCheckCircle, mdiChevronDown, mdiDotsVertical, mdiPlusCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { get } from 'lodash';
import React from 'react';
import ColorTypo from '../../../../components/ColorTypo';
import CustomAvatar from '../../../../components/CustomAvatar';
import { Primary, Secondary, StyledList, StyledListItem } from '../../../../components/CustomList';
import CustomModal from '../../../../components/CustomModal';
import SearchInput from '../../../../components/SearchInput';
import './style.scss';

const ListContainer = ({ className = '', ...props }) =>
  <div
    className={`view_Project_MemberSetting_Modal___list-container ${className}`}
    {...props}
  />;

const StyledListSubheader = ({ className = '', ...props }) =>
  <ListSubheader
    className={`view_Project_MemberSetting_Modal___list-subheader ${className}`}
    {...props}
  />;

const CustomListItem = ({ className = '', ...props }) =>
  <StyledListItem
    className={`view_Project_MemberSetting_Modal___list-item ${className}`}
    {...props}
  />;

const Banner = ({ className = '', ...props }) =>
  <div
    className={`view_Project_MemberSetting_Modal___banner ${className}`}
    {...props}
  />;

const StyledTableHead = ({ className = '', ...props }) =>
  <TableHead
    className={`view_Project_MemberSetting_Modal___table-head ${className}`}
    {...props}
  />;

const StyledTableBody = TableBody;

const UserTableCell = ({ className = '', ...props }) =>
  <TableCell
    className={`view_Project_MemberSetting_Modal___table-cell ${className}`}
    {...props}
  />;

const HeaderTableCell = ({ className = '', ...props }) =>
  <TableCell
    className={`view_Project_MemberSetting_Modal___header-table-cell ${className}`}
    {...props}
  />;

const AvatarTableCell = ({ className = '', ...props }) =>
  <TableCell
    className={`view_Project_MemberSetting_Modal___avatar-table-cell ${className}`}
    {...props}
  />;

const StyledRow = ({ className = '', ...props }) =>
  <TableRow
    className={`view_Project_MemberSetting_Modal___table-row ${className}`}
    {...props}
  />

const RolesBox = ({ className = '', ...props }) =>
  <div
    className={`view_Project_MemberSetting_Modal___roles-box ${className}`}
    {...props}
  />;

const AddButton = ({ className = '', disabled, ...props }) =>
  <Button
    variant="outlined"
    className={`${disabled
      ? 'view_Project_MemberSetting_Modal___add-button-disabled'
      : 'view_Project_MemberSetting_Modal___add-button'} ${className}`}
    disabled={disabled}
    {...props}
  />;

const CustomMenuItem = ({ className = '', selected, ...props }) =>
  <MenuItem
    className={`${selected
      ? 'view_Project_MemberSetting_Modal___menu-item-selected'
      : 'view_Project_MemberSetting_Modal___menu-item'} ${className}`}
    {...props}
  />;

const StyledPrimary = ({ className = '', ...props }) =>
  <Primary
    className={`view_Project_MemberSetting_Modal___primary ${className}`}
    {...props}
  />;

const StyledSecondary = ({ className = '', ...props }) =>
  <Secondary
    className={`view_Project_MemberSetting_Modal___secondary ${className}`}
    {...props}
  />;

const LeftContainer = ({ className = '', ...props }) =>
  <div
    className={`view_Project_MemberSetting_Modal___left-container ${className}`}
    {...props}
  />;

const RightContainer = ({ className = '', ...props }) =>
  <div
    className={`view_Project_MemberSetting_Modal___right-container ${className}`}
    {...props}
  />;

const RightHeader = ({ className = '', ...props }) =>
  <p
    className={`view_Project_MemberSetting_Modal___right-header ${className}`}
    {...props}
  />

const LeftHeader = ({ className = '', ...props }) =>
  <p
    className={`view_Project_MemberSetting_Modal___left-header ${className}`}
    {...props}
  />

const CustomList = ({ className = '', ...props }) =>
  <StyledList
    className={`view_Project_MemberSetting_Modal___list ${className}`}
    {...props}
  />

const PermissionBox = ({ className = '', ...props }) =>
  <div
    className={`view_Project_MemberSetting_Modal___permission-box ${className}`}
    {...props}
  />

function getJoinStatusName(statusCode) {
  switch (statusCode) {
    case 0:
      return 'Tham gia việc khi được chọn';
    case 1:
      return 'Tham gia tất cả việc';
    default:
      return '';
  }
}

function UserFreeRoomList({
  room, loading,
  onAddMember
}) {

  if (get(room, 'users', []).length > 0)
    return (
      <CustomList
        component="nav"
        aria-labelledby={`list-subheader-${get(room, 'id')}`}
        subheader={
          <StyledListSubheader component="div" id={`list-subheader-${get(room, 'id')}`}>
            <ColorTypo uppercase bold>{get(room, 'name', '')}</ColorTypo>
          </StyledListSubheader>
        }
      >
        {get(room, 'users', []).map(user => (
          <CustomListItem
            key={get(user, 'id')}
          >
            <CustomAvatar src={get(user, 'avatar', '')} alt='avatar' />
            <ListItemText
              primary={
                <StyledPrimary>
                  {get(user, 'name', '')}
                </StyledPrimary>
              }
              secondary={
                <StyledSecondary>
                  {get(user, 'email', '')}
                </StyledSecondary>
              }
            />
            <AddButton
              onClick={evt => onAddMember(user)}
              disabled={loading}
            >
              {loading && (
                <CircularProgress
                  size={16}
                  className="margin-circular"
                  color="white"
                />
              )}
              Thêm
            </AddButton>
          </CustomListItem>
        ))}
      </CustomList>
    );
  else return null;
}

const SettingButton = ({
  member,
  setAnchorEl, setCurMemberSetting,
}) => {

  return (
    <div onClick={evt => evt.stopPropagation()}>
      <IconButton aria-controls="simple-menu" aria-haspopup="true"
        onClick={evt => {
          setAnchorEl(evt.currentTarget);
          setCurMemberSetting(member);
        }}
        size='small'
      >
        <Icon path={mdiDotsVertical} size={1} color='rgba(0, 0, 0, 0.7)' />
      </IconButton>
    </div>
  );
}

/*
function ProjectMemberRole({ member, setCurMemberRole }) {
  
  return (
    <>
      {get(member, 'roles', []).map((role, index) => (
        <span key={index}>something</span>
      ))}
      <IconButton size='small' onClick={evt => setCurMemberRole(member)}>
        <Icon path={mdiPlusCircleOutline} size={0.7} />
      </IconButton>
    </>
  );
}
*/

function MemberSetting({
  open, setOpen,
  searchPatern, setSearchPatern,
  members, addMember,
  handleAddMember, handleRemoveMember,
  handleUpdateStateJoinTask,
  handleAssignMemberToAllTask,
  handleOpenModal,
}) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [curMemberSetting, setCurMemberSetting] = React.useState(null);

  return (
    <CustomModal
      title={`Quản lý thành viên dự án`}
      fullWidth={true}
      open={open}
      setOpen={setOpen}
      confirmRender={null}
      onConfirm={() => null}
      cancleRender={() => 'Thoát'}
      height='tall'
      maxWidth='lg'
      columns={2}
      loading={members.loading}
      left={{
        title: () => <LeftHeader>Danh sách thành viên</LeftHeader>,
        content: () =>
          <LeftContainer>
            <Banner>
              <SearchInput
                fullWidth
                placeholder='Tìm thành viên'
                value={searchPatern}
                onChange={evt => setSearchPatern(evt.target.value)}
              />
            </Banner>
            <ListContainer>
              {members.free.map(room => (
                <UserFreeRoomList
                  room={room}
                  key={get(room, 'id')}
                  onAddMember={handleAddMember}
                  loading={addMember.loading}
                />
              ))}
            </ListContainer>
          </LeftContainer>,
      }}
      right={{
        title: () => <RightHeader>Thành viên dự án</RightHeader>,
        content: () =>
          <RightContainer>
            <Table>
              <StyledTableHead>
                <StyledRow>
                  <AvatarTableCell></AvatarTableCell>
                  <HeaderTableCell>Thành viên</HeaderTableCell>
                  <HeaderTableCell>Nhóm quyền</HeaderTableCell>
                  <HeaderTableCell>Vai trò</HeaderTableCell>
                  <HeaderTableCell>Trạng thái</HeaderTableCell>
                  <HeaderTableCell></HeaderTableCell>
                </StyledRow>
              </StyledTableHead>
              <StyledTableBody>
                {members.added.map(member => (
                  <StyledRow key={get(member, 'id')}>
                    <AvatarTableCell width='5%'>
                      <CustomAvatar style={{ width: 30, height: 30, }} src={get(member, 'avatar')} alt='avatar' />
                    </AvatarTableCell>
                    <UserTableCell width='25%'>
                      <span>{get(member, 'name', '')}</span>
                      <br />
                      <small>{get(member, 'email', '')}</small>
                    </UserTableCell>
                    <TableCell width='15%'>
                      <PermissionBox onClick={evt => handleOpenModal('PERMISSION', {
                        curMemberId: get(member, 'id'),
                      })}>
                        <span>{get(member, 'group_permission_name', '')}</span>
                        <Icon path={mdiChevronDown} size={0.6} color={"bbb"} />
                      </PermissionBox>
                    </TableCell>
                    <TableCell width='25%'>
                      <RolesBox>
                        {get(member, 'roles', []).map(role => (
                          <p key={get(role, 'id')}>{get(role, 'name', '')}</p>
                        ))}
                        <IconButton
                          size='small'
                          onClick={evt => handleOpenModal('ROLE', {
                            curMemberId: get(member, 'id'),
                          })}
                        >
                          <Icon path={mdiPlusCircleOutline} size={1} color={'#dadada'} />
                        </IconButton>
                      </RolesBox>
                    </TableCell>
                    <TableCell width='25%'>
                      {getJoinStatusName(get(member, 'join_task_status_code', ''))}
                    </TableCell>
                    <TableCell width='5%'>
                      <SettingButton
                        member={member}
                        setAnchorEl={setAnchorEl}
                        setCurMemberSetting={setCurMemberSetting}
                      />
                    </TableCell>
                  </StyledRow>
                ))}
              </StyledTableBody>
            </Table>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={evt => setAnchorEl(null)}
              transformOrigin={{
                vertical: -30,
                horizontal: 'right',
              }}
            >
              <CustomMenuItem
                selected={get(curMemberSetting, 'join_task_status_code') === 1}
                onClick={evt => {
                  setAnchorEl(null);
                  handleUpdateStateJoinTask(curMemberSetting, 1);
                }}
              >
                <Icon path={mdiCheckCircle} size={0.7} /> Tham gia tất cả việc
              </CustomMenuItem>
              <CustomMenuItem
                selected={get(curMemberSetting, 'join_task_status_code') === 0}
                onClick={evt => {
                  setAnchorEl(null);
                  handleUpdateStateJoinTask(curMemberSetting, 0);
                }}
              >
                <Icon path={mdiCheckCircle} size={0.7} /> Tham gia việc khi được chọn
              </CustomMenuItem>
              <CustomMenuItem
                onClick={evt => {
                  setAnchorEl(null);
                  handleAssignMemberToAllTask(curMemberSetting);
                }}
              >
                <Icon path={mdiAccountConvert} size={0.7} /> Gán vào công việc được tạo
              </CustomMenuItem>
              <CustomMenuItem
                onClick={evt => {
                  setAnchorEl(null);
                  handleOpenModal('ALERT', {
                    content: 'Bạn chắc chắn muốn loại trừ thành viên?',
                    onConfirm: () => handleRemoveMember(curMemberSetting)
                  }
                  )
                }}
              >
                <Icon path={mdiAccountMinus} size={0.7} /> Loại trừ
              </CustomMenuItem>
            </Menu>
          </RightContainer>,
      }}
    />
  )
}

export default MemberSetting;
