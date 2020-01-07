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
import { sortGroupTask } from '../../../../actions/groupTask/sortGroupTask';
import CreateGroupTask from '../../Modals/CreateGroupTask';
 
const Banner = styled.div`
  padding: 15px;
`;

const StyledPrimary = styled(Primary)`
  font-weight: 500;
`;

function GroupTaskSlide({ handleSubSlide, listGroupTask, doSortGroupTask, }) {
  
  const { setProjectId } = React.useContext(ProjectContext);
  const { projectId } = useParams();

  const { data: { groupTasks }, loading, error } = listGroupTask;

  const [taskGroups, setTaskGroups] = React.useState([]);
  const [searchPatern, setSearchPatern] = React.useState('');

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setProjectId(projectId);
  }, [setProjectId, projectId]);

  React.useEffect(() => {
    setTaskGroups(
      filter(
        groupTasks, 
        groupTask => get(groupTask, 'name', '').toLowerCase().includes(searchPatern.toLowerCase())
      )
    );
  }, [groupTasks, searchPatern]);

  function onDragEnd(result) {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
    doSortGroupTask({
      groupTaskId: draggableId,
      sortIndex: destination.index,
    });
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
            tooltip: 'Quay lại',
          }}
          rightAction={{
            iconPath: mdiPlus,
            onClick: () => setOpen(true),
            tooltip: 'Thêm nhóm công việc',
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
          <CreateGroupTask open={open} setOpen={setOpen} />
        </LeftSideContainer>
      )}
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    listGroupTask: state.groupTask.listGroupTask,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doSortGroupTask: ({ groupTaskId, sortIndex }) => dispatch(sortGroupTask({ groupTaskId, sortIndex })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupTaskSlide);
