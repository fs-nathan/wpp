import classNames from "classnames";
import React from "react";
import styled from "styled-components";

export function getStyle({ draggableStyle, virtualStyle, isDragging }) {
  const combined = {
    ...virtualStyle,
    ...draggableStyle,
  };

  return combined;
}

export function getStyleClone({ draggableStyle, virtualStyle, isDragging }) {
  const combined = {
    ...virtualStyle,
    ...draggableStyle,
  };

  return {
    ...combined,
    width: isDragging ? draggableStyle.width : combined.width,
    left: isDragging ? combined.left : combined.left + 20,
  };
}

const ItemClone = ({ provided, item, style, isDragging }) => {
  return (
    <StyledItem
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      style={getStyleClone({
        draggableStyle: provided.draggableProps.style,
        virtualStyle: style,
        isDragging,
      })}
      className={classNames({ "is-dragging": isDragging })}
    >
      <span>{item.name}</span>
    </StyledItem>
  );
};

const StyledItem = styled.div`
  background-color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
  text-align: left;
  width: 120px;
  color: #fff !important;
  user-select: none;

  &.is-dragging {
    z-index: 300 !important;
    border: 1px solid #edeae9;
    padding: 0 4px 0 24px;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    min-width: 1px;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: 420px;
    position: sticky;
    z-index: 3;
    left: 0px;
    max-width: 420px;

    span {
      color: #666;
      display: -webkit-inline-box;
      display: -webkit-inline-flex;
      display: -ms-inline-flexbox;
      display: inline-flex;
      margin-left: 8px;
      font-weight: 400 !important;
      padding-left: 50px;
    }

    user-select: none;
  }
`;

export default ItemClone;
