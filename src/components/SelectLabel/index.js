import { Popover } from "@material-ui/core";
import React, { useRef, forwardRef, useImperativeHandle } from "react";
import {
  ButtonAddMore,
  ItemSelectColor,
  WPSelectIconSelect,
  WPSelectInput,
  WPSelectItem,
  WPSelectItemLeft,
  WPSelectItemLeftChildren,
  WPSelectItemRight,
  WPSelectItemRightIcon,
  WPSelectList,
  WPSelectRowNameContainer,
  WPSelectRowTarget,
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
  { id: "1", name: "Lựa chọn 1", color: DEFAULT_LIST_COLORS[0] },
  { id: "2", name: "Lựa chọn 2", color: DEFAULT_LIST_COLORS[1] },
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
    const refInput = useRef(null);
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
          id: list.length + 1,
          name: "",
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

      setTimeout(() => {
        refInput.current.focus();
      }, 100);
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
              {listSelect.map((item) => (
                <WPSelectRowTarget key={item.id}>
                  <WPSelectItem>
                    <WPSelectItemLeft>
                      <WPSelectItemLeftChildren>
                        <WPSelectRowNameContainer>
                          <WPSelectIconSelect
                            color={item.color}
                            onClick={(e) => handleClick(e, item)}
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
                        <WPSelectItemRightIcon
                          onClick={() => _handleRemove(item.id)}
                        >
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
                </WPSelectRowTarget>
              ))}

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

export default WPSelectLabel;
