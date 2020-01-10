import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { 
  ListItemText, ListSubheader, Button,
  TableCell, Table, TableHead, TableBody, TableRow,
  Menu, MenuItem, IconButton,
} from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiDotsVertical,
  mdiCheckCircle,
  mdiAccountMinus,
  mdiAccountConvert,
} from '@mdi/js';
import CustomModal from '../../../../components/CustomModal';
import ColorTypo from '../../../../components/ColorTypo';
import SearchInput from '../../../../components/SearchInput';
import AlertModal from '../../../../components/AlertModal';
import { connect } from 'react-redux';
import { StyledList, StyledListItem, Primary, Secondary } from '../../../../components/CustomList';
import { get, map, filter } from 'lodash';
import CustomAvatar from '../../../../components/CustomAvatar';
import { addMemberProject } from '../../../../actions/project/addMemberToProject';
import { removeMemberProject } from '../../../../actions/project/removeMemberFromProject';
import { updateStateJoinTask } from '../../../../actions/project/updateStateJoinTask';
import { assignMemberToAllTask } from '../../../../actions/project/assignMemberToAllTask';

const ListContainer = styled.div`
  margin-top: 8px;
`;

const StyledListSubheader = styled(ListSubheader)`
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin: 0 16px;
  & > * {
    color: rgba(0, 0, 0, 0.54);  
    font-size: 14px;
  }
`;

const CustomListItem = styled(StyledListItem)`
  padding: 10px 16px;
  &:hover {
    cursor: auto !important;
  }
`;

const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledTableHead = styled(TableHead)` 
  background-color: #eee; 
  & * {
    text-transform: none;
  }
`;

const StyledTableBody = styled(TableBody)`
`;

const UserTableCell = styled(TableCell)`
  & > span {
    font-size: 15px;
    color: #111;
  }
  & > small {
    font-size: 13px;
    color: #333;
  }
`;

const MiddleTableCell = styled(TableCell)`
  text-align: center;
`;

const AddButton = styled(Button)`
  color: #222;
  background-color: #fff;
  transition: none;
  & > span {
    font-size: 12px;
    &:last-child {
      display: none;
    }
  }
  &:hover {
    color: #fff;
    background-color: #03c30b;
    border-color: #03c30b; 
  }
`;

const CustomMenuItem = styled(({ selected, refs, ...rest }) => (<MenuItem {...rest} />))`
  display: flex;
  align-items: center;
  color: ${props => props.selected ? '#05b50c' : '#222'};
  & > svg {
    fill: ${props => props.selected ? '#05b50c' : '#888'};
    margin-right: 10px;
  }
  &:nth-child(2), &:nth-child(3) {  
    border-bottom: 1px solid #f4f4f4;
  }
`;

const StyledPrimary = styled(Primary)`
  font-size: 15px;
  color: #111;
`;

const StyledSecondary = styled(Secondary)`
  font-size: 13px;
  color: #333;
`;

const LeftContainer = styled.div`
  & > * {
    &:nth-child(1) {
      width: 90%;
      margin: 8px auto;
    }
  }
`;

const RightContainer = styled.div`
  & > * {
    &:nth-child(1) {
      font-size: 14px;
      padding: 12px;
    }
  }
`;

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

function UserFreeRoomList({ room, onAddMember, }) {

  if (get(room, 'users', []).length > 0)
    return (
      <StyledList
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
            <CustomAvatar style={{ width: 40, height: 40, }} src={get(user, 'avatar', '')} alt='avatar' />
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
              size='small'
              variant='outlined'
              onClick={evt => onAddMember(user)}
            >
              Thêm
            </AddButton>
          </CustomListItem>
        ))}
      </StyledList>
    );
  else return null;
}

const SettingButton = ({ member, onRemoveMember, onChangeStateJoinTask, onAssignMemberToAllTask }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [alert, setAlert] = React.useState(false);

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget);
  }

  function handleClose(evt) {
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
        onClose={handleClose}
        transformOrigin={{
          vertical: -30,
          horizontal: 'right',
        }}
      >
        <CustomMenuItem 
          selected={get(member, 'join_task_status_code') === 1} 
          onClick={evt => {
            handleClose();
            onChangeStateJoinTask(member, 1);
          }}
        >
          <Icon path={mdiCheckCircle} size={0.7} /> Tham gia tất cả việc
        </CustomMenuItem>
        <CustomMenuItem 
          selected={get(member, 'join_task_status_code') === 0}
          onClick={evt => {
            handleClose();
            onChangeStateJoinTask(member, 0);
          }}
        >
          <Icon path={mdiCheckCircle} size={0.7} /> Tham gia việc khi được chọn
        </CustomMenuItem>
        <CustomMenuItem
          onClick={evt => {
            handleClose();
            onAssignMemberToAllTask(member);
          }}
        >
          <Icon path={mdiAccountConvert} size={0.7} /> Gán vào công việc được tạo
        </CustomMenuItem>
        <CustomMenuItem
          onClick={evt => setAlert(true)}
        >
          <Icon path={mdiAccountMinus} size={0.7} /> Loại trừ
        </CustomMenuItem>
      </Menu>
      <AlertModal 
        open={alert}
        setOpen={setAlert}
        content='Bạn chắc chắn muốn loại trừ thành viên?'
        onCancle={handleClose}
        onConfirm={() => {
          handleClose();
          onRemoveMember(member);
        }}
      />
    </div>
  );
}

function MemberSetting({ 
  open, setOpen, 
  memberProject, 
  doAddMemberProject, doRemoveMemberProject, 
  doUpdateStateJoinTask,
  doAssignMemberToAllTask,
}) {

  const { projectId } = useParams();

  const { data: { membersAdded, membersFree, } } = memberProject;

  const [searchPatern, setSearchPatern] = React.useState('');

  const [members, setMembers] = React.useState([]);

  React.useEffect(() => {
    let members = map(membersFree, (room) => {
      const { name, _id: id, users } = room;
      const ownedUsers = filter(users, user => {
        if ((get(user, 'name', '').toLowerCase().includes(searchPatern.toLowerCase()))
        ) {
          return true;
        }
        return false;
      });
      return {
        name,
        id,
        users: ownedUsers,
      };
    });
    setMembers(members);
  }, [membersFree, searchPatern]);

  function handleAddMember(member) {
    doAddMemberProject({
      projectId,
      memberId: get(member, 'id'),
      groupPermission: 0,
      roles: [],
    });
  }

  function handleRemoveMember(member) {
    doRemoveMemberProject({
      projectId,
      memberId: get(member, 'id'),
    });
  }

  function handleUpdateStateJoinTask(member, state) {
    doUpdateStateJoinTask({
      projectId,
      memberId: get(member, 'id'),
      state,
    });
  }

  function handleAssignMemberToAllTask(member) {
    doAssignMemberToAllTask({
      projectId,
      memberId: get(member, 'id'),
    });
  }

  return (
    <React.Fragment>
      <CustomModal
        title={`Quản lý thành viên dự án`}
        fullWidth={true}
        maxWidth='lg'
        open={open}
        setOpen={setOpen}
        confirmRender={null}
        onConfirm={() => null}
        cancleRender={() => 'Thoát'}
        height='tall'
        columns={2}
        left={{
          title: 'Danh sách thành viên',
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
                {members.map(room => (
                  <UserFreeRoomList
                    room={room}
                    key={get(room, 'id')}
                    onAddMember={handleAddMember}
                  />
                ))}
              </ListContainer>
            </LeftContainer>,
        }}
        right={{
          title: 'Thành viên dự án',
          content: () => 
            <RightContainer>
              <Table>
                <StyledTableHead>
                  <TableRow>
                    <MiddleTableCell></MiddleTableCell>
                    <TableCell>Thành viên</TableCell>
                    <MiddleTableCell>Nhóm quyền</MiddleTableCell>
                    <MiddleTableCell>Vai trò</MiddleTableCell>
                    <MiddleTableCell>Trạng thái</MiddleTableCell>
                    <MiddleTableCell></MiddleTableCell>
                  </TableRow>
                </StyledTableHead>
                <StyledTableBody>
                  {membersAdded.map(member => (
                    <TableRow key={get(member, 'id')}>
                      <MiddleTableCell>
                        <CustomAvatar src={get(member, 'avatar')} alt='avatar' />
                      </MiddleTableCell>
                      <UserTableCell>
                        <span>{get(member, 'name', '')}</span>
                        <br />
                        <small>{get(member, 'email', '')}</small>  
                      </UserTableCell>
                      <MiddleTableCell>{get(member, 'group_permission_name', '')}</MiddleTableCell>
                      <MiddleTableCell>{get(member, 'roles', '')}</MiddleTableCell>
                      <MiddleTableCell>{getJoinStatusName(get(member, 'join_task_status_code', ''))}</MiddleTableCell>
                      <MiddleTableCell>
                        <SettingButton 
                          member={member} 
                          onRemoveMember={handleRemoveMember} 
                          onChangeStateJoinTask={handleUpdateStateJoinTask}  
                          onAssignMemberToAllTask={handleAssignMemberToAllTask}
                        />
                      </MiddleTableCell>
                    </TableRow>
                  ))}
                </StyledTableBody>
              </Table>
            </RightContainer>,
        }}
      />
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    memberProject: state.project.memberProject,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doAddMemberProject: ({ projectId, memberId, groupPermission, roles, }) => dispatch(addMemberProject({ projectId, memberId, groupPermission, roles, })),
    doRemoveMemberProject: ({ projectId, memberId, }) => dispatch(removeMemberProject({ projectId, memberId, })),
    doUpdateStateJoinTask: ({ projectId, memberId, state, }) => dispatch(updateStateJoinTask({ projectId, memberId, state, })),
    doAssignMemberToAllTask: ({ projectId, memberId, }) => dispatch(assignMemberToAllTask({ projectId, memberId })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MemberSetting);
