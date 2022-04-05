import { Popover } from "@material-ui/core";
import Item from "components/SelectLabel/Item";
import { uniqueId } from "lodash";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
  ButtonAddMore,
  ItemSelectColor,
  WPSelectList,
  WPWrapperSelectList,
  WrapperSelectColor,
  WrapperWPSelectLabel,
} from "./styles";

const DEFAULT_LIST_COLORS = [
  "red",
  "blue",
  "#ff7511",
  "#ffa800",
  "#ffd100",
  "#ace60f",
  "#19db7e",
  "#00d4c8",
  "#48dafd",
  "#0064fb",
  "#6457f9",
  "#9f46e4",
  "#ff78ff",
  "#ff4ba6",
  "#ff93af",
  "#5a7896",
];

const DEFAULT_SELECT = [
  { id: uniqueId(), name: "Lựa chọn 1", color: DEFAULT_LIST_COLORS[0] },
  { id: uniqueId(), name: "Lựa chọn 2", color: DEFAULT_LIST_COLORS[1] },
];

const WPSelectLabel = forwardRef(
  (
    {
      isEditForm = false,
      isShowList = false,
      defaultSelect = isEditForm ? [] : DEFAULT_SELECT,
    },
    ref
  ) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [itemSelect, setItemSelect] = React.useState({});
    const [listSelect, setListSelect] = React.useState(defaultSelect);
    const refForm = useRef(null);

    useImperativeHandle(ref, () => ({ _getValue }));

    React.useEffect(() => {
      isShowList && setListSelect(defaultSelect);
    }, [defaultSelect, isShowList]);

    const _getValue = () => {
      const result = [];
      const elements = refForm.current.elements;
      for (let index = 0; index < elements.length; index++) {
        const id = elements[index].getAttribute("data-id");
        const data = {
          name: elements[index].value,
          color: listSelect[index]["color"],
        };
        if (isEditForm && id) data["id"] = id;
        result.push(data);
      }

      return result;
    };

    const _handleAddMore = () => {
      setListSelect((list) => {
        let isSetted = false;
        const newList = [...list];
        const newItem = {
          id: uniqueId(),
          name: "Type an option name",
          color: DEFAULT_LIST_COLORS[0],
        };

        DEFAULT_LIST_COLORS.forEach((item) => {
          if (!list.some((el) => el.color === item) && !isSetted) {
            newItem["color"] = item;
            isSetted = true;
          }
        });

        return [...newList, newItem];
      });
    };

    const handleClick = (event, item) => {
      if (isShowList) return;
      setAnchorEl(event.currentTarget);
      setItemSelect(item);
    };

    const _handleRemove = (id) => {
      setListSelect((list) => [...list].filter((item) => item.id !== id));
    };

    const _handleSelect = (color) => {
      setListSelect((list) => {
        const newList = [...list];
        const indexUpdate = newList.findIndex(({ id }) => id === itemSelect.id);
        newList[indexUpdate] = { ...newList[indexUpdate], color };
        return newList;
      });
      setAnchorEl(null);
    };

    const _handleDragEnd = (result) => {
      // dropped outside the list
      if (!result.destination) return;

      setListSelect((listSelect) =>
        reorder(listSelect, result.source.index, result.destination.index)
      );
    };

    return (
      <>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          disableRestoreFocus
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={() => setAnchorEl(null)}
          elevation={1}
        >
          <WrapperSelectColor>
            {DEFAULT_LIST_COLORS.map((item) => (
              <ItemSelectColor
                key={item}
                color={item}
                onClick={() => _handleSelect(item)}
              >
                {itemSelect.color === item && (
                  <svg
                    className="MiniIcon--small MiniIcon ColorPickerCell-checkIcon DeprecatedSmallCheckMiniIcon"
                    focusable="false"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9.5,18.2c-0.4,0.4-1,0.4-1.4,0l-3.8-3.8C4,14,4,13.4,4.3,13s1-0.4,1.4,0l3.1,3.1l8.6-8.6c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4 L9.5,18.2z" />
                  </svg>
                )}
              </ItemSelectColor>
            ))}
          </WrapperSelectColor>
        </Popover>

        <WrapperWPSelectLabel isShowList={isShowList}>
          <WPWrapperSelectList>
            <WPSelectList ref={refForm} onSubmit={(e) => e.preventDefault()}>
              <DragDropContext onDragEnd={_handleDragEnd}>
                <Droppable droppableId="droppable-list-options">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {listSelect.map((item, index) => (
                        <Item
                          key={item.id}
                          index={index}
                          item={item}
                          isShowList={isShowList}
                          onClick={handleClick}
                          onRemove={_handleRemove}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              {!isShowList && (
                <ButtonAddMore onClick={_handleAddMore}>
                  + Add an option
                </ButtonAddMore>
              )}
            </WPSelectList>
          </WPWrapperSelectList>
        </WrapperWPSelectLabel>
      </>
    );
  }
);

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default WPSelectLabel;
