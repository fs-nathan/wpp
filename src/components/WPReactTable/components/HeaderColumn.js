import {
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography
} from "@material-ui/core";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import classNames from "classnames";
import { apiService } from "constants/axiosInstance";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT
} from "constants/snackbarController";
import React, { useReducer } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { default as NestedMenuItem } from "./NestedMenu";
import ResizeHeaderDiv from "./ResizeDiv";

/**
 * It takes the previous state and the new state as arguments. If the new state is an object, it
 * returns a new object containing the previous state and the new state. If the new state is a
 * function, it returns the result of calling the function with the previous state as an argument.
 * Otherwise, it returns false.
 * @returns The object that is being returned is the new state.
 */
const reducer = (prevState, newState) => {
  if (typeof newState === "object") return { ...prevState, ...newState };
  if (typeof newState === "function") return newState(prevState);
  return false;
};

const initialState = { openMenu: false, anchorEl: null };

const HeaderColumn = ({
  column,
  projectId,
  zIndex = 0,
  length = 0,
  isSticky = false,
  isFirstColumn = false,
  isLastColumn = false,
  selectedSort = null,
  scrollTableHeight,
  typeMenu = "group",
  onHideColumn = () => {},
  onEditColumn = () => {},
  onDeleteColumn = () => {},
  onSortColumn = () => {},
  onAddNewColumns = () => {},
}) => {
  const { t } = useTranslation();

  /* The above code is creating a state and dispatch function. */
  const [state, dispatchState] = useReducer(reducer, initialState);
  const isDuration = column.id === "pfd-duration";

  /**
   * When the user clicks on the user icon, the function sets the anchorElUser variable to the current
   * target of the click event.
   */
  const _handleOpenMenu = (event) => {
    dispatchState({ anchorEl: event.currentTarget });
  };

  /**
   * The function sets the anchorEl state to null.
   */
  const _handleCloseMenu = () => {
    dispatchState({ anchorEl: null });
  };

  /**
   * This function is called when the user clicks the edit button.
   */
  const _handleEditField = () => {
    dispatchState(initialState);
    onEditColumn(column.data_type, {
      dataType: column.data_type,
      idType: column.id,
      name: column.name,
      optionsType: column.options || [],
    });
  };

  /**
   * When the user clicks the "Hide" button, the column is hidden and the state is updated.
   */
  const _handleHideField = () => {
    dispatchState(initialState);
    onHideColumn(column.id);
  };

  /**
   * This function is called when the user clicks the delete button.
   */
  const _handleDeleteField = () => {
    dispatchState(initialState);
    onDeleteColumn({ project_field_id: column.id });
  };

  /**
   * This function is called when the user clicks on a column header.
   * It sets the state of the table to the initial state, and then calls the onSortColumn function with
   * the column id and the value of the sort.
   */
  const _handleSort = (valueSort) => {
    dispatchState(initialState);
    switch (typeMenu) {
      case "group":
        onSortColumn(column.id, valueSort);
        break;
      case "default":
        onSortColumn(valueSort, column.id);
        break;
      default:
        break;
    }
  };

  const renderMenu = () => {
    switch (typeMenu) {
      case "group":
        return (
          <Menu
            id="menu-appbar"
            anchorEl={state.anchorEl}
            open={Boolean(state.anchorEl)}
            onClose={_handleCloseMenu}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "start" }}
            transformOrigin={{ vertical: "top", horizontal: "start" }}
          >
            {!column.is_default && (
              <div>
                <StyledMenuItem
                  onClick={_handleEditField}
                  style={{ marginBottom: 5 }}
                >
                  <Typography textAlign="center">Chỉnh sửa trường</Typography>
                </StyledMenuItem>
                <Divider />
              </div>
            )}

            <StyledMenuItem
              onClick={() => _handleSort(1)}
              style={{ marginTop: 5 }}
            >
              <StyledListItemIcon>
                <UpgradeIcon />
              </StyledListItemIcon>
              <Typography textAlign="center">Lọc tăng dần</Typography>
            </StyledMenuItem>

            <StyledMenuItem onClick={() => _handleSort(2)}>
              <StyledListItemIcon transform>
                <UpgradeIcon />
              </StyledListItemIcon>
              <Typography textAlign="center">Lọc giảm dần</Typography>
            </StyledMenuItem>

            <StyledMenuItem
              onClick={() => _handleSort(0)}
              style={{ marginBottom: 5 }}
            >
              <StyledListItemIcon>
                <SearchOffIcon />
              </StyledListItemIcon>
              <Typography textAlign="center">Huỷ sắp xếp</Typography>
            </StyledMenuItem>

            <Divider />

            {ALIGN_SUBMENU.map((item, index) => {
              const { id, name, children, icon } = item;
              return (
                <NestedMenuItem
                  key={id}
                  id={id}
                  name={name}
                  icon={icon}
                  isFirstColumn={index === 0}
                  activeKey="value"
                  isAlignItem={true}
                  activeValue={column?.alignment || null}
                  onClick={_handleSetAlign}
                  childrenItems={children}
                />
              );
            })}

            {isDuration &&
              DURATION_SUBMENU.map((item, index) => {
                const { id, name, children } = item;
                return (
                  <NestedMenuItem
                    key={id}
                    id={id}
                    name={name}
                    isFirstColumn={index === 0}
                    activeKey="value"
                    activeValue={column?.duration_show || null}
                    onClick={_handleSetDuration}
                    isAlignItem={false}
                    childrenItems={children}
                  />
                );
              })}

            <StyledMenuItem onClick={_handleHideField} style={{ marginTop: 5 }}>
              <Typography textAlign="center">Ẩn trường</Typography>
            </StyledMenuItem>

            <StyledMenuItem isDelete onClick={_handleDeleteField}>
              <Typography textAlign="center">Xoá trường</Typography>
            </StyledMenuItem>
          </Menu>
        );
      case "default":
        return (
          <Menu
            id="menu-appbar"
            anchorEl={state.anchorEl}
            open={Boolean(state.anchorEl)}
            onClose={_handleCloseMenu}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "start" }}
            transformOrigin={{ vertical: "top", horizontal: "start" }}
          >
            {LIST_SORT_MENU.map((item) => (
              <StyledMenuItem onClick={() => _handleSort(item.value)}>
                <StyledListItemIcon transform={item.isTransform}>
                  {item.icon}
                </StyledListItemIcon>
                <Typography textAlign="center">{t(item.name)}</Typography>
              </StyledMenuItem>
            ))}
          </Menu>
        );
      default:
        break;
    }
  };

  const renderSelectedSort = (selectedSort) => {
    if (
      !selectedSort ||
      typeMenu !== "default" ||
      selectedSort.idSort !== column.id
    ) {
      return null;
    }
    const iconSort = LIST_SORT_MENU.find(({ value }) => {
      return value === selectedSort.key;
    });
    if (!iconSort) return null;
    return (
      <StyledListItemIcon transform={iconSort.isTransform}>
        {iconSort.icon}
      </StyledListItemIcon>
    );
  };

  const _handleSetAlign = async (alignment) => {
    try {
      await apiService({
        url: "/project-field/set-alignment",
        method: "POST",
        data: {
          project_field_id: column.id,
          alignment: alignment,
          project_id: projectId,
        },
      });
      SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    } catch (error) {
      SnackbarEmitter(SNACKBAR_VARIANT.ERROR, error.message);
    }
  };

  const _handleSetDuration = async (type) => {
    try {
      await apiService({
        url: "/project/update-duration-show-type",
        method: "POST",
        data: {
          type,
          project_field_id: column.id,
          project_id: projectId,
        },
      });
      SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    } catch (error) {
      SnackbarEmitter(SNACKBAR_VARIANT.ERROR, error.message);
    }
  };

  return (
    <HeaderColumnWrapper
      {...column.getHeaderProps()}
      zIndex={isFirstColumn ? length + 3 : zIndex}
      isFirstColumn={isFirstColumn}
      isLastColumn={isLastColumn}
      className={classNames({ isSticky })}
    >
      <LeftStructure
        isFirstColumn={isFirstColumn}
        isLastColumn={isLastColumn}
        isOpening={Boolean(state.anchorEl)}
        isDefaultMenu={typeMenu === "default"}
      >
        <Heading className={classNames({ "not-add-column": !isLastColumn })}>
          {column.render("Header", { onAddNewColumns })}
        </Heading>

        {renderSelectedSort(selectedSort)}

        {!isLastColumn && (
          <StyledWrapperButton
            className={classNames("wp-wrapper-button", {
              active: Boolean(state.anchorEl),
            })}
            isDefaultMenu={typeMenu === "default"}
            onClick={_handleOpenMenu}
          >
            <KeyboardArrowDownRoundedIcon />
          </StyledWrapperButton>
        )}
      </LeftStructure>

      {!isLastColumn && (
        <ResizeHeaderDiv
          column={column}
          scrollTableHeight={scrollTableHeight}
        />
      )}

      {renderMenu()}
    </HeaderColumnWrapper>
  );
};

const DURATION_SUBMENU = [
  {
    id: 1,
    name: "pfd-duration",
    children: [
      { id: 0, name: "hour", value: 0 },
      { id: 1, name: "day", value: 1 },
      { id: 2, name: "week", value: 2 },
      { id: 3, name: "month", value: 3 },
      { id: 4, name: "quater", value: 4 },
      { id: 5, name: "year", value: 5 },
    ],
  },
];

const ALIGN_SUBMENU = [
  {
    id: 1,
    name: "align_item",
    children: [
      { id: 0, name: "left", value: 1, icon: <FormatAlignLeftIcon /> },
      { id: 1, name: "center", value: 2, icon: <FormatAlignCenterIcon /> },
      { id: 2, name: "right", value: 3, icon: <FormatAlignRightIcon /> },
    ],
  },
];

const LIST_SORT_MENU = [
  {
    id: "ASC",
    name: "sort_asc",
    value: "ASC",
    icon: <UpgradeIcon />,
    isTransform: false,
  },
  {
    id: "DECS",
    name: "sort_decs",
    value: "DECS",
    icon: <UpgradeIcon />,
    isTransform: true,
  },
  {
    id: "cancel_sort",
    name: "cancel_sort",
    value: null,
    icon: <SearchOffIcon />,
    isTransform: false,
  },
];

export const StyledMenuItem = styled(MenuItem)`
  color: ${(props) => (props.isDelete ? "#f44336" : "#333")};
  width: 200px;
  height: 35px;

  p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: calc(100% - 30px);
  }
`;

export const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 25px;
  text-align: left;
  color: rgb(102, 102, 102);

  ${(props) => {
    if (props.transform) {
      return {
        transform: "rotate(180deg)",
        display: "flex",
        "justify-content": "flex-end",
      };
    }
  }}
`;

const HeaderColumnWrapper = styled.div`
  color: #6d6e6f;
  z-index: ${(props) => props?.zIndex || 0};
  align-items: center;
  border: 1px solid #edeae9;
  border-bottom: 0;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex !important;
  flex: 0 0 auto;
  font-size: 12px;
  justify-content: space-between;
  margin-right: -1px;
  padding: 0 8px;
  position: relative;
  background: #f1f2f4;
  &:hover {
    background-color: #f9f8f8;
  }
  &[data-sticky-td="true"] {
    z-index: ${(props) => props.zIndex + 3}!important;
  }
`;
const LeftStructure = styled.div`
  width: calc(100% - 42px);
  cursor: pointer;
  color: #666;
  display: ${(props) => (props.isDefaultMenu ? "grid" : "flex")};
  grid-template-columns: 1fr auto auto;
  flex: 1 0 auto;
  font-size: 12px;
  padding-left: ${(props) => {
    if (props.isFirstColumn) return "5px";
    if (props.isLastColumn) return "24px";
    return 0;
  }}
  padding-right: 0;
  position: relative;
  z-index: 0;
  align-items: center;
  justify-content: ${({ isLastColumn }) =>
    isLastColumn ? "center" : "space-between"};

  .wp-wrapper-button {
    visibility: ${({ isOpening }) => (isOpening ? "visible" : "hidden")};
  }

  &:hover {
    color: #151b26;
    fill: #151b26;
    .wp-wrapper-button {
      visibility: visible;
    }
  }
`;

const Heading = styled.div`
  &.not-add-column {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;
const StyledWrapperButton = styled.div`
  margin-right: 5px;
  margin-left: ${(props) => (props.isDefaultMenu ? "0px" : "10px")};
`;

export default HeaderColumn;
