import React from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Icon from '@mdi/react';
import { mdiAccountGroup, mdiChevronLeft, mdiDragVertical } from '@mdi/js';
import { connect } from 'react-redux';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import CustomAvatar from '../../../../components/CustomAvatar';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import { StyledList, StyledListItem, Primary, Secondary } from '../../../../components/CustomList';
import CustomListItem from './CustomListItem';
import { ListItemText } from '@material-ui/core';
import { filter, get, } from 'lodash';
import SearchInput from '../../../../components/SearchInput';
import { Context as ProjectContext } from '../../index';

const Banner = styled.div`
  padding: 15px;
`;

const StyledPrimary = styled(Primary)`
  font-weight: 500;
`;

function TaskGroupSlide({ handleSubSlide, memberProject, }) {
  
  const { setProjectId } = React.useContext(ProjectContext);
  const { projectId } = useParams();
  const [searchPatern, setSearchPatern] = React.useState('');

  const { data: { membersAdded, }, error, loading } = memberProject;
  const [members, setMembers] = React.useState([]);
  
  React.useEffect(() => {
    setProjectId(projectId);
  }, [setProjectId, projectId]);

  React.useEffect(() => {
    setMembers(
      filter(
        membersAdded, 
        member => get(member, 'name', '').toLowerCase().includes(searchPatern.toLowerCase())
      )
    );
  }, [membersAdded, searchPatern]);

  function onDragEnd(result) {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
  }

  return (
    <React.Fragment>
      {error !== null && (<ErrorBox />)}
      {error === null && (
        <LeftSideContainer
          title='Thành viên dự án'
          leftAction={{
            iconPath: mdiChevronLeft,
            onClick: () => handleSubSlide(0),
          }}
          rightAction={{
            iconPath: mdiAccountGroup,
            onClick: () => null,
          }}
          loading={{
            bool: loading,
            component: () => <LoadingBox />
          }}
        >
          <Banner>
            <SearchInput 
              fullWidth 
              placeholder='Tìm thành viên'
              value={searchPatern}
              onChange={evt => setSearchPatern(evt.target.value)}
            />  
          </Banner>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={'member-list'}>
              {provided => (
                <StyledList
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <StyledListItem
                    to={`#`}
                    component={Link}
                  >
                    <div>
                      <Icon path={mdiDragVertical} size={1} color={'rgba(0, 0, 0, 0)'}/>
                    </div>
                    <CustomAvatar style={{ width: 40, height: 40, }} alt='avatar' />
                    <ListItemText 
                      primary={
                        <StyledPrimary>Tất cả</StyledPrimary>  
                      }
                      secondary={
                        <Secondary>
                          {members.reduce((sum, member) => sum += get(member, 'tasks', []).length, 0)} việc
                        </Secondary>
                      }
                    />
                  </StyledListItem>
                  {members.map((member, index) => (
                    <CustomListItem key={get(member, 'id')} member={member} index={index} />  
                  ))}
                  {provided.placeholder}
                </StyledList>
              )}
            </Droppable>
          </DragDropContext>
        </LeftSideContainer>
      )}
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    memberProject: state.project.memberProject,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskGroupSlide);
