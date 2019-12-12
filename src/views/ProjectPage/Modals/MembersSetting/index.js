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
} from '@mdi/js';
import CustomModal from '../../../../components/CustomModal';
import ColorTypo from '../../../../components/ColorTypo';
import SearchInput from '../../../../components/SearchInput';
import AlertModal from '../../../../components/AlertModal';
import { connect } from 'react-redux';
import { StyledList, StyledListItem, Primary, Secondary } from '../../../../components/CustomList';
import { get, map, filter } from 'lodash';
import CustomAvatar from '../../../../components/CustomAvatar';
import colorPal from '../../../../helpers/colorPalette';
import { addMemberProject } from '../../../../actions/project/addMemberToProject';
import { removeMemberProject } from '../../../../actions/project/removeMemberFromProject';
import { updateStateJoinTask } from '../../../../actions/project/updateStateJoinTask';

const Header = styled(ColorTypo)`
  margin-bottom: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ListContainer = styled.div`
  margin-top: 8px;
`;

const StyledListSubheader = styled(ListSubheader)`
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 5px 0;
  & > * {
    color: rgba(0, 0, 0, 0.54);  
    font-size: 14px;
  }
`;

const CustomListItem = styled(StyledListItem)`
  padding: 10px 0;
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
    font-size: 14px;
    color: ${colorPal['green'][0]};
  }
  & > small {
    font-size: 12px;
    color: ${colorPal['gray'][0]};
  }
`;

const MiddleTableCell = styled(TableCell)`
  text-align: center;
`;

const AddButton = styled(Button)`
  color: #222;
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
  &:nth-child(3) {  
    border-bottom: 1px solid #f4f4f4;
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
            onClick={evt => onAddMember(user)}
          >
            <CustomAvatar style={{ width: 40, height: 40, }} src={get(user, 'avatar', '')} alt='avatar' />
            <ListItemText 
              primary={
                <Primary>
                  {get(user, 'name', '')}
                </Primary>  
              }
              secondary={
                <Secondary>
                  {get(user, 'email', '')}
                </Secondary>
              }
            />
            <AddButton
              size='small'
              variant='outlined'
            >
              Thêm
            </AddButton>
          </CustomListItem>
        ))}
      </StyledList>
    );
  else return null;
}

const SettingButton = ({ member, onRemoveMember, onChangeStateJoinTask, }) => {

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
        <MenuItem onClick={evt => setAlert(true)}>
          Loại trừ
        </MenuItem>
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

  return (
    <React.Fragment>
      <CustomModal
        title={`Quản lý thành viên dự án`}
        fullWidth={true}
        maxWidth='lg'
        open={open}
        setOpen={setOpen}
        onConfirm={() => null}
        height='tall'
        columns={2}
        left={
          <>
            <Header color='gray' uppercase bold>Thành viên sẵn sàng tham gia</Header>
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
          </>
        }
        right={
          <>
            <Header color='gray' uppercase bold>Thành viên đã tham gia</Header>
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
                    />
                  </MiddleTableCell>
                </TableRow>
              ))}
            </StyledTableBody>
          </Table>
          </>
        }
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
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MemberSetting);