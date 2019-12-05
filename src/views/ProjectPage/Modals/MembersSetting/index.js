import React from 'react';
import styled from 'styled-components';
import { 
  ListItemText, ListSubheader,
} from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import ColorTypo from '../../../../components/ColorTypo';
import SearchInput from '../../../../components/SearchInput';
import { connect } from 'react-redux';
import { StyledList, StyledListItem, Primary, Secondary } from '../../../../components/CustomList';
import { get } from 'lodash';
import Icon from '@mdi/react';
import { mdiChevronDown, mdiChevronUp, } from '@mdi/js';

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

function UserFreeRoomList({ room }) {

  const [expand, setExpand] = React.useState(true);

  return (
    <StyledList
      component="nav"
      aria-labelledby={`list-subheader-${get(room, 'id')}`}
      subheader={
        <StyledListSubheader component="div" id={`list-subheader-${get(room, 'id')}`} 
          onClick={evt => setExpand(prev => !prev)}
        >
          {get(room, 'users', []).length > 0 && <Icon path={expand ? mdiChevronDown : mdiChevronUp} size={1} />}
          <ColorTypo>{get(room, 'name', '')}</ColorTypo>
        </StyledListSubheader>
      }
    >
      {expand && get(room, 'users', []).map(user => (
        <CustomListItem key={get(user, 'id')}>
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
        </CustomListItem>
      ))}
    </StyledList>
  );
}

function MemberSetting({ open, setOpen, memberProject, }) {

  const { data: { membersAdded, membersFree, } } = memberProject;

  const [searchPatern, setSearchPatern] = React.useState('');
  
  

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
            <SearchInput 
              fullWidth 
              placeholder='Tìm thành viên'
              value={searchPatern}
              onChange={evt => setSearchPatern(evt.target.value)}
            />  
            <ListContainer>
              {membersFree.map(room => (
                <UserFreeRoomList
                  room={room}
                  key={get(room, 'id')}
                />
              ))}
            </ListContainer>
          </>
        }
        right={
          <>
            
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
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MemberSetting);
