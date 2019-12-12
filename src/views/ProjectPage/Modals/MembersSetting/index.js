import React from 'react';
import styled from 'styled-components';
import {
  ListItemText,
  ListSubheader,
  IconButton,
  TableCell,
  Table,
  TableHead,
  TableBody,
  TableRow
} from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import ColorTypo from '../../../../components/ColorTypo';
import SearchInput from '../../../../components/SearchInput';
import { connect } from 'react-redux';
import {
  StyledList,
  StyledListItem,
  Primary,
  Secondary
} from '../../../../components/CustomList';
import { get, map, filter, find, remove } from 'lodash';
import Icon from '@mdi/react';
import {
  mdiChevronDown,
  mdiChevronUp,
  mdiCheckCircle,
  mdiAccountMultipleCheck,
  // mdiAccountMultipleRemove,
  mdiAccountMultiplePlus
} from '@mdi/js';
import CustomAvatar from '../../../../components/CustomAvatar';
import colorPal from '../../../../helpers/colorPalette';

const Header = styled(ColorTypo)`
  padding: 0 8px;
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
  &:hover {
    cursor: pointer;
  }
  & > *:first-child {
    fill: rgba(0, 0, 0, 0.54);
  }
  & > *:last-child {
    color: rgba(0, 0, 0, 0.54);
    font-size: 14px;
    font-weight: 500;
    margin-left: 8px;
  }
`;

const CustomListItem = styled(StyledListItem)`
  padding: 10px 0;
`;

const Banner = styled.div`
  display: flex;
  align-items: center;
  & > * {
    &:not(:last-child) {
      margin-right: 8px;
    }
  }
`;

const StyledTableHead = styled(TableHead)`
  background-color: #eee;
  & * {
    text-transform: none;
  }
`;

const StyledTableBody = styled(TableBody)``;

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

function UserFreeRoomList({ room, selectedMembers, onSelectMember }) {
  const [expand, setExpand] = React.useState(true);

  return (
    <StyledList
      component="nav"
      aria-labelledby={`list-subheader-${get(room, 'id')}`}
      subheader={
        <StyledListSubheader
          component="div"
          id={`list-subheader-${get(room, 'id')}`}
          onClick={evt => setExpand(prev => !prev)}
        >
          {get(room, 'users', []).length > 0 ? (
            <Icon path={expand ? mdiChevronDown : mdiChevronUp} size={1} />
          ) : (
            <Icon path={mdiChevronUp} size={1} color={'rgba(0, 0, 0, 0)'} />
          )}
          <ColorTypo>{get(room, 'name', '')}</ColorTypo>
        </StyledListSubheader>
      }
    >
      {expand &&
        get(room, 'users', []).map(user => (
          <CustomListItem
            key={get(user, 'id')}
            onClick={evt => onSelectMember(user)}
          >
            <Icon
              path={mdiCheckCircle}
              size={1}
              color={
                find(selectedMembers, { id: get(user, 'id') })
                  ? '#05b50c'
                  : 'rgba(0, 0, 0, 0)'
              }
            />
            <CustomAvatar
              style={{ width: 40, height: 40 }}
              src={get(user, 'avatar', '')}
              alt="avatar"
            />
            <ListItemText
              primary={<Primary>{get(user, 'name', '')}</Primary>}
              secondary={<Secondary>{get(user, 'email', '')}</Secondary>}
            />
          </CustomListItem>
        ))}
    </StyledList>
  );
}

function MemberSetting({ open, setOpen, memberProject }) {
  const {
    data: { membersAdded, membersFree }
  } = memberProject;

  const [searchPatern, setSearchPatern] = React.useState('');

  const [members, setMembers] = React.useState([]);
  const [selectedMembers, setSelectedMembers] = React.useState([]);

  React.useEffect(() => {
    let members = map(membersFree, room => {
      const { name, _id: id, users } = room;
      const ownedUsers = filter(users, user => {
        if (
          get(user, 'name', '')
            .toLowerCase()
            .includes(searchPatern.toLowerCase())
        ) {
          return true;
        }
        return false;
      });
      return {
        name,
        id,
        users: ownedUsers
      };
    });
    setMembers(members);
  }, [membersFree, searchPatern]);

  function handleSelectMember(member) {
    setSelectedMembers(selectedMembers => {
      let newSelectedMembers = [...selectedMembers];
      if (find(selectedMembers, { id: get(member, 'id') })) {
        remove(newSelectedMembers, { id: get(member, 'id') });
      } else {
        newSelectedMembers.push(member);
      }
      return newSelectedMembers;
    });
  }

  return (
    <React.Fragment>
      <CustomModal
        title={`Quản lý thành viên dự án`}
        fullWidth={true}
        maxWidth="lg"
        open={open}
        setOpen={setOpen}
        onConfirm={() => null}
        height="tall"
        columns={2}
        left={
          <>
            <Header color="gray" uppercase bold>
              Thành viên sẵn sàng tham gia
            </Header>
            <Banner>
              <SearchInput
                fullWidth
                placeholder="Tìm thành viên"
                value={searchPatern}
                onChange={evt => setSearchPatern(evt.target.value)}
              />
              <abbr title="Chọn tất cả">
                <IconButton
                  onClick={evt =>
                    setSelectedMembers(selectedMembers => {
                      let newSelectedMembers = [];
                      members.forEach(room => {
                        get(room, 'users', []).forEach(user => {
                          newSelectedMembers.push(user);
                        });
                      });
                      return newSelectedMembers;
                    })
                  }
                >
                  <Icon path={mdiAccountMultipleCheck} size={1} />
                </IconButton>
              </abbr>
              <abbr title="Bỏ chọn tất cả">
                <IconButton onClick={evt => setSelectedMembers([])}>
                  <Icon path={mdiAccountMultipleCheck} size={1} />
                </IconButton>
              </abbr>
              <abbr title="Thêm các thành viên được chọn">
                <IconButton>
                  <Icon path={mdiAccountMultiplePlus} size={1} />
                </IconButton>
              </abbr>
            </Banner>
            <ListContainer>
              {members.map(room => (
                <UserFreeRoomList
                  room={room}
                  key={get(room, 'id')}
                  selectedMembers={selectedMembers}
                  onSelectMember={handleSelectMember}
                />
              ))}
            </ListContainer>
          </>
        }
        right={
          <>
            <Header color="gray" uppercase bold>
              Thành viên đã tham gia
            </Header>
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
                      <CustomAvatar src={get(member, 'avatar')} alt="avatar" />
                    </MiddleTableCell>
                    <UserTableCell>
                      <span>{get(member, 'name', '')}</span>
                      <br />
                      <small>{get(member, 'email', '')}</small>
                    </UserTableCell>
                    <MiddleTableCell>
                      {get(member, 'group_permission_name', '')}
                    </MiddleTableCell>
                    <MiddleTableCell>
                      {get(member, 'roles', '')}
                    </MiddleTableCell>
                    <MiddleTableCell>
                      {get(member, 'join_task_status_code', '')}
                    </MiddleTableCell>
                    <MiddleTableCell></MiddleTableCell>
                  </TableRow>
                ))}
              </StyledTableBody>
            </Table>
          </>
        }
      />
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    memberProject: state.project.memberProject
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberSetting);
