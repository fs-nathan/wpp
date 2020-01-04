import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { get, filter } from 'lodash';
import { mdiPlus } from '@mdi/js';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiDragVertical } from '@mdi/js';
import { ListItemText } from '@material-ui/core';
import LoadingBox from '../../../../components/LoadingBox';
import SearchInput from '../../../../components/SearchInput';
import CustomAvatar from '../../../../components/CustomAvatar';
import ErrorBox from '../../../../components/ErrorBox';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import CreateProjectGroup from '../../Modals/CreateProjectGroup';
import { StyledList, StyledListItem, Primary, Secondary } from '../../../../components/CustomList';
import CustomListItem from './CustomListItem';
import { connect } from 'react-redux';
import { listProjectGroup } from '../../../../actions/projectGroup/listProjectGroup';
import { sortProjectGroup } from '../../../../actions/projectGroup/sortProjectGroup';
import './style.scss';

const Banner = ({ className = '', ...props }) => 
  <div 
    className={`view_ProjectGroup_List___banner ${className}`}
    {...props}
  />;

const StyledPrimary = ({ className = '', ...props }) => 
  <Primary 
    className={`view_ProjectGroup_List___primary ${className}`}
    {...props}
  />;

function ProjectList({ listProjectGroup, doSortProjectGroup, }) {

  const location = useLocation();
  const { data: { projectGroups: _projectGroups }, error: listProjectGroupError, loading: listProjectGroupLoading } = listProjectGroup;
  const [openModal, setOpenModal] = React.useState(false);
  const [searchPatern, setSearchPatern] = React.useState('');

  const loading = listProjectGroupLoading;
  const error = listProjectGroupError;

  const projectGroups = filter(_projectGroups, projectGroup => get(projectGroup, 'name', '').toLowerCase().includes(searchPatern.toLowerCase()));

  function onDragEnd(result) {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if ( 
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
    doSortProjectGroup({
      projectGroupId: draggableId,
      sortIndex: destination.index,
    });
  }

  return (
    <>
      {error !== null && <ErrorBox />}
      {error === null && (
        <LeftSideContainer
          title='Nhóm dự án'
          rightAction={{
            iconPath: mdiPlus,
            onClick: () => setOpenModal(true),
            tooltip: 'Thêm nhóm dự án',
          }}
          loading={{
            bool: loading,
            component: () => <LoadingBox />,
          }}
        >
          <Banner>
            <SearchInput 
              fullWidth 
              placeholder='Tìm nhóm dự án'
              value={searchPatern}
              onChange={evt => setSearchPatern(evt.target.value)}
            />  
          </Banner>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='project-group-list'>
              {provided => (
                <StyledList
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <StyledListItem
                    to={`${location.pathname}`}
                    component={Link}
                  >
                    <div>
                      <Icon path={mdiDragVertical} size={1} color={'rgba(0, 0, 0, 0)'}/>
                    </div>
                    <CustomAvatar style={{ height: 50, width: 50, }} alt='avatar' />
                    <ListItemText 
                      primary={
                        <StyledPrimary>Tất cả</StyledPrimary>  
                      }
                      secondary={
                        <Secondary>{projectGroups.reduce((sum, projectGroup) => sum + get(projectGroup, 'number_project', 0), 0)} dự án</Secondary>
                      }
                    />
                  </StyledListItem>
                  {projectGroups.map((projectGroup, index) => (
                    <CustomListItem key={index} projectGroup={projectGroup} index={index} />
                  ))}
                  {provided.placeholder}
                  <StyledListItem
                    to={`${location.pathname}`}
                    component={Link}
                  >
                    <div>
                      <Icon path={mdiDragVertical} size={1} color={'rgba(0, 0, 0, 0)'}/>
                    </div>
                    <CustomAvatar style={{ height: 50, width: 50, }} alt='avatar' />
                    <ListItemText 
                      primary={
                        <StyledPrimary>Chưa phân loại</StyledPrimary>  
                      }
                      secondary={
                        <Secondary>0 dự án</Secondary>
                      }
                    />
                  </StyledListItem>
                </StyledList>
              )}
            </Droppable>
          </DragDropContext>
          <CreateProjectGroup open={openModal} setOpen={setOpenModal} />
        </LeftSideContainer>
      )}
    </>
  )
}

const mapStateToProps = state => {
  return {
    listProjectGroup: state.projectGroup.listProjectGroup,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doListProjectGroup: (quite) => dispatch(listProjectGroup(quite)),
    doSortProjectGroup: ({ projectGroupId, sortIndex }) => dispatch(sortProjectGroup({ projectGroupId, sortIndex })),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectList);
