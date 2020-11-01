import React from "react";
import Scrollbars from 'components/Scrollbars';
import { Container as DragContainer, Draggable } from "react-smooth-dnd";
import KanbanColumn, { ColumnHeader, Container as ColumnContainer } from './KanbanColumn';
import LoadingOverlay from "components/LoadingOverlay";
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

class KanbanBoard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startX: null,
      startScrollX: null
    };
  }

  render() {
    const {
      tasks,
      loading,
      handleColumnDrop,
      handleItemDrop,
      handleOpenModal,
      placeholderProps,
      projectId,
    } = this.props;

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
        <Scrollbars
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
                  />
                </Draggable>))}
                <NewGroupTaskDiv
                  onClick={() => handleOpenModal('CREATE_GROUPTASK')}
                >
                  {'+ Thêm giai đoạn'}
                </NewGroupTaskDiv>
            </DragContainer>
          </Container>
        </Scrollbars>
      </LoadingOverlay>
    );
  }
}

export default KanbanBoard;
