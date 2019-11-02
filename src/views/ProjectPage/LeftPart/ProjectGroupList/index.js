import React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { get } from 'lodash';
import ColorTypo from '../../../../components/ColorTypo';
import { mdiPlus } from '@mdi/js';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import CreateProjectGroup from '../../Modals/CreateProjectGroup';
import { StyledList } from '../../../../components/CustomList';
import CustomListItem from './CustomListItem';
import { connect } from 'react-redux';
import { listProjectGroup } from '../../../../actions/projectGroup/listProjectGroup';
import { sortProjectGroup } from '../../../../actions/projectGroup/sortProjectGroup';
import { CustomEventListener, CustomEventDispose, CREATE_PROJECT_GROUP, SORT_PROJECT_GROUP } from '../../../../constants/events';

const Banner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 42px;
  background-color: #f4f4f4;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  & > p:first-child {
    font-weight: bold;
  }
`;

function ProjectList({ listProjectGroup, doListProjectGroup, sortProjectGroup, doSortProjectGroup, }) {

  const { data: { projectGroups }, error: listProjectGroupError, loading: listProjectGroupLoading } = listProjectGroup;
  const { error: sortProjectGroupError, loading: sortProjectGroupLoading } = sortProjectGroup;
  const [openModal, setOpenModal] = React.useState(false);

  const loading = listProjectGroupLoading || sortProjectGroupLoading;
  const error = listProjectGroupError || sortProjectGroupError;

  React.useEffect(() => {
    doListProjectGroup();
  }, [doListProjectGroup]);

  React.useEffect(() => {
    const doListProjectGroupHandler = () => {
      doListProjectGroup();
    };

    CustomEventListener(CREATE_PROJECT_GROUP, doListProjectGroupHandler);
    CustomEventListener(SORT_PROJECT_GROUP, doListProjectGroupHandler);

    return () => {
      CustomEventDispose(CREATE_PROJECT_GROUP, doListProjectGroupHandler);
      CustomEventDispose(SORT_PROJECT_GROUP, doListProjectGroupHandler);
    }
  }, [doListProjectGroup]);

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
    <React.Fragment>
      {loading && <LoadingBox />}
      {error !== null && <ErrorBox />}
      {!loading && error === null && (
        <LeftSideContainer
          title='Nhóm dự án'
          rightAction={{
            iconPath: mdiPlus,
            onClick: () => setOpenModal(true),
          }}
        >
          <Banner>
            <ColorTypo bold>Tất cả</ColorTypo>
            &nbsp;
            <ColorTypo>({projectGroups.reduce((sum, cur) => sum + get(cur, 'number_project', 0), 0)} dự án)</ColorTypo>
          </Banner>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='project-group-list'>
              {provided => (
                <StyledList
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {projectGroups.map((projectGroup, index) => (
                    <CustomListItem key={index} projectGroup={projectGroup} index={index} />
                  ))}
                </StyledList>
              )}
            </Droppable>
          </DragDropContext>
          <CreateProjectGroup open={openModal} setOpen={setOpenModal} />
        </LeftSideContainer>
      )}
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    listProjectGroup: state.projectGroup.listProjectGroup,
    sortProjectGroup: state.projectGroup.sortProjectGroup,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doListProjectGroup: () => dispatch(listProjectGroup()),
    doSortProjectGroup: ({ projectGroupId, sortIndex }) => dispatch(sortProjectGroup({ projectGroupId, sortIndex })),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectList);
