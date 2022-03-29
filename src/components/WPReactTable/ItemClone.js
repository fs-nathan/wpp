import React from "react";
import styled from "styled-components";

export function getStyle({ draggableStyle, virtualStyle, isDragging }) {
  // If you don't want any spacing between your items
  // then you could just return this.
  // I do a little bit of magic to have some nice visual space
  // between the row items
  const combined = {
    ...virtualStyle,
    ...draggableStyle,
  };

  return combined;
}

const ItemClone = ({ provided, item, style, isDragging }) => {
  return (
    <StyledItem
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      style={getStyle({
        draggableStyle: provided.draggableProps.style,
        virtualStyle: style,
        isDragging,
      })}
      className={`item ${isDragging ? "is-dragging" : ""}`}
    >
      {item.text}
    </StyledItem>
  );
};

const StyledItem = styled.div`
  background: #333851;
  border: 1px solid mediumpurple;
  box-sizing: border-box;
  border-radius: 2px;
  color: #cdd5ee;
  font-size: 30px;
  user-select: none;

  /* center align text */
  display: flex;
  justify-content: center;
  align-items: center;

  &.is-dragging {
    background: #515b7d;
    border-color: #08ff08;
    box-shadow: 0px 0px 2px rgb(8, 58, 30), 0px 0px 10px MediumSeaGreen;
  }
`;

export default ItemClone;
