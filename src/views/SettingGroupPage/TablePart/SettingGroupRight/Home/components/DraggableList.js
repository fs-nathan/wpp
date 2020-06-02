import { Box, Checkbox } from "@material-ui/core";
import { mdiDragVertical } from "@mdi/js";
import Icon from "@mdi/react";
import React, { createElement, useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { emptyArray } from "views/JobPage/contants/defaultValue";
const DraggableListDefaultProps = {
  renderListWrapper: (children) => <div>{children}</div>,
  list: ["Lịch tuần", "Tin nổi bật", "Thông kê"],
  children: (id, bindDraggable, bindDragHandle) =>
    bindDraggable(
      <div>
        <Box display="flex" alignItems="center">
          {bindDragHandle(
            <div>
              <Icon path={mdiDragVertical} size={1} color="#8d8d8d" />
            </div>
          )}
          <Checkbox color="primary"></Checkbox>
          <div>{id}</div>
        </Box>
      </div>
    ),
  getId: (item) => item,
};

export const DraggableList = ({
  renderListWrapper = DraggableListDefaultProps.renderListWrapper,
  list = DraggableListDefaultProps.list,
  children = DraggableListDefaultProps.children,
  getId = DraggableListDefaultProps.getId,
  onChange,
}) => {
  const entitiesRef = useRef({});
  const [orderList, setorderList] = useState(emptyArray);
  useEffect(() => {
    const { orderList, entites } = list.reduce(
      (result, value) => {
        const id = getId(value);
        result.entites[id] = value;
        result.orderList.push(id);
        return result;
      },
      {
        orderList: [],
        entites: {},
      }
    );
    entitiesRef.current = entites;
    setorderList(orderList);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  return (
    <DragDropContext
      onDragEnd={(result) => {
        const { destination, source, draggableId } = result;
        if (destination === null) return;
        const newStrings = [...orderList];
        newStrings.splice(source.index, 1);
        newStrings.splice(destination.index, 0, draggableId);
        setorderList(newStrings);
        onChange && onChange(newStrings);
      }}
    >
      <Droppable droppableId={"12312321"}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {renderListWrapper(
              orderList.map((id, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) =>
                    children(
                      entitiesRef.current[id],
                      (element) =>
                        createElement(element.type, {
                          ...element.props,
                          ref: provided.innerRef,
                          ...provided.draggableProps,
                        }),
                      (element) =>
                        createElement(element.type, {
                          ...element.props,
                          ...provided.dragHandleProps,
                        })
                    )
                  }
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
