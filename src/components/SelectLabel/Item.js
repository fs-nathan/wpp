import React from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Draggable } from "react-beautiful-dnd";
import {
  WPSelectIconSelect,
  WPSelectInput,
  WPSelectItem,
  WPSelectItemLeft,
  WPSelectItemLeftChildren,
  WPSelectItemRight,
  WPSelectItemRightIcon,
  WPSelectRowNameContainer,
} from "./styles";

const getItemStyle = (isDragging, draggableStyle, customStyle = {}) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  ...draggableStyle,
  ...customStyle,
});

const Item = ({
  item,
  index,
  isShowList,
  onClick = () => {},
  onRemove = () => {},
}) => {
  const refInput = React.useRef(null);

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <WPSelectItem>
            <WPSelectItemLeft>
              <WPSelectItemLeftChildren>
                <WPSelectRowNameContainer>
                  <div
                    {...provided.dragHandleProps}
                    className="select-icon-drag"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <DragIndicatorIcon style={{ fill: "#6d6e6f" }} />
                  </div>
                  <WPSelectIconSelect
                    color={item.color}
                    onClick={(e) => onClick(e, item)}
                  />
                  <WPSelectInput
                    ref={refInput}
                    data-id={item._id}
                    defaultValue={item.name}
                    placeholder="Type an option name"
                    disabled={isShowList}
                  />
                </WPSelectRowNameContainer>
              </WPSelectItemLeftChildren>
            </WPSelectItemLeft>
            <WPSelectItemRight>
              {!isShowList && (
                <WPSelectItemRightIcon onClick={() => onRemove(item.id)}>
                  <svg
                    className="MiniIcon XMiniIcon"
                    focusable="false"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.4,12l7.5-7.5c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L4.5,3.1c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l7.5,7.5l-7.5,7.5 c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l7.5-7.5l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12z" />
                  </svg>
                </WPSelectItemRightIcon>
              )}
            </WPSelectItemRight>
          </WPSelectItem>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(Item);
