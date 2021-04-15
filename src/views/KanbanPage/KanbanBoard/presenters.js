import React from "react";
import Scrollbars from 'components/Scrollbars';
import { Container as DragContainer, Draggable } from "components/react-smooth-dnd";
import KanbanColumn from './KanbanColumn';
import LoadingOverlay from "components/LoadingOverlay";
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';
import './style.scss';

const Container = ({ className = '', isDraggingOver, innerRef, ...props }) =>
  <div 
    ref={innerRef} 
    className={`view_KanbanBoard___container ${className}`} 
    {...props} 
  />;

const NewGroupTaskDiv = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanBoard___new-grouptask ${className}`} 
    {...props} 
  />;

const BoardScrollbars = ({ className = '', ...props }) =>
  <Scrollbars 
    className={`view_KanbanBoard___board-scrollbars ${className}`} 
    {...props} 
  />;


function KanbanBoard(props) {

  const { t } = useTranslation();

  const {
    tasks,
    loading,
    handleColumnDrop,
    handleItemDrop,
    handleOpenModal,
    placeholderProps,
    projectId,
    workType,
    canManageGroupTask
  } = props;

  const stageName = workType === 2 ? t("IDS_WP_PHASE") : t("LABEL_CHAT_TASK_NHOM_VIEC");

  return (
    <LoadingOverlay
      active={loading}
      spinner
      fadeSpeed={0}
      style={{
        height: "100%",
        zIndex: "999",
      }}
    >
      <BoardScrollbars
        autoHide
        autoHideTimeout={500}
      >
        <Container>
          <DragContainer 
            onDrop={dropResult => handleColumnDrop(dropResult.removedIndex, dropResult.addedIndex, dropResult.payload)}
            getChildPayload={index => get(tasks, `[${index}]`, {})}
            orientation='horizontal'
            dragClass="view_KanbanColumn___container-drag"
            dropClass="view_KanbanColumn___container-drop"
            dragHandleSelector='[data-custom-drag-handle="column-handle"]'
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: 'view_KanbanColumn___container-preview'
            }}
          >
            {tasks.map((groupTask, index) => (
              <Draggable
                key={get(groupTask, 'id')}
              >
                <KanbanColumn 
                  groupTask={groupTask}
                  key={index}
                  index={index}
                  handleOpenModal={handleOpenModal}
                  placeholderProps={placeholderProps}
                  projectId={projectId}
                  handleItemDrop={handleItemDrop}
                  stageName={stageName}
                />
              </Draggable>))}
          </DragContainer>
          {
            canManageGroupTask ?
            (
              <NewGroupTaskDiv
                onClick={() => handleOpenModal('CREATE_GROUPTASK')}
              >
                {`+ ${t("IDS_WP_ADD")} ${stageName}`}
              </NewGroupTaskDiv>
            ) :
            (
              <div></div>
            )
          }
        </Container>
      </BoardScrollbars>
    </LoadingOverlay>
  );
}

export default KanbanBoard;
