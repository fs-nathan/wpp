import React from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Icon from '@mdi/react';
import { mdiPlus, mdiChevronLeft, mdiDragVertical } from '@mdi/js';
import { connect } from 'react-redux';
import { Context as ProjectContext } from '../../index';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import { StyledList, StyledListItem, Primary, Secondary } from '../../../../components/CustomList';
import CustomListItem from './CustomListItem';
import { ListItemText } from '@material-ui/core';
import { filter, get, } from 'lodash';
import SearchInput from '../../../../components/SearchInput';

const Banner = styled.div`
  padding: 15px;
`;

const StyledPrimary = styled(Primary)`
  font-weight: 500;
`;

function ProjectMemberSlide({ handleSubSlide, listTask, }) {
  
  const { setProjectId } = React.useContext(ProjectContext);
  const { projectId } = useParams();

  const { data: { tasks }, loading: listTaskLoading, error: listTaskError } = listTask;
  const loading = listTaskLoading;
  const error = listTaskError;

  const [taskGroups, setTaskGroups] = React.useState([]);
  const [searchPatern, setSearchPatern] = React.useState('');

  React.useEffect(() => {
    setProjectId(projectId);
  }, [setProjectId, projectId]);

  React.useEffect(() => {
    setTaskGroups(filter(tasks, (task) => get(task, 'id') === 'default' || get(task, 'name', '').toLowerCase().includes(searchPatern.toLowerCase())));
  }, [tasks, searchPatern]);

  function onDragEnd(result) {
    const { source, destination } = result;
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
          title='Nhóm công việc'
          leftAction={{
            iconPath: mdiChevronLeft,
            onClick: () => handleSubSlide(0),
          }}
          rightAction={{
            iconPath: mdiPlus,
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
              placeholder='Tìm nhóm công việc'
              value={searchPatern}
              onChange={evt => setSearchPatern(evt.target.value)}
            />  
          </Banner>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={'task-group-list'}>
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
                    <ListItemText 
                      primary={
                        <StyledPrimary>Tất cả</StyledPrimary>  
                      }
                      secondary={
                        <Secondary>
                          {taskGroups.reduce((sum, taskGroup) => sum += get(taskGroup, 'tasks', []).length, 0)} việc
                        </Secondary>
                      }
                    />
                  </StyledListItem>
                  {filter(taskGroups, taskGroup => get(taskGroup, 'id') !== 'default').map((taskGroup, index) => (
                    <CustomListItem key={get(taskGroup, 'id')} taskGroup={taskGroup} index={index} />  
                  ))}
                  {provided.placeholder}
                  <StyledListItem
                    component={Link}
                    to={`#`}
                  >
                    <div>
                      <Icon path={mdiDragVertical} size={1} color={'rgba(0, 0, 0, 0)'}/>
                    </div>
                    <ListItemText 
                      primary={
                        <StyledPrimary>Mặc định</StyledPrimary>  
                      }
                      secondary={
                        <Secondary>
                          {filter(taskGroups, taskGroup => get(taskGroup, 'id') === 'default').reduce((sum, taskGroup) => sum += get(taskGroup, 'tasks', []), 0)} việc
                        </Secondary>
                      }
                    />
                  </StyledListItem>
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
    listTask: state.task.listTask,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectMemberSlide);
