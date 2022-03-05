import {
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import classNames from "classnames";
import React, { useReducer } from "react";
import styled from "styled-components";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

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
  zIndex = 0,
  length = 0,
  isSticky = false,
  isFirstColumn = false,
  isLastColumn = false,
  onHideColumn = () => {},
  onEditColumn = () => {},
  onDeleteColumn = () => {},
  onSortColumn = () => {},
  onAddNewColumns = () => {},
}) => {
  /* The above code is creating a state and dispatch function. */
  const [state, dispatchState] = useReducer(reducer, initialState);

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
    onSortColumn(column.id, valueSort);
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
        isLastColumn={isLastColumn}
        isOpening={Boolean(state.anchorEl)}
      >
        <Heading className={classNames({ "not-add-column": !isLastColumn })}>
          {column.render("Header", { onAddNewColumns })}
        </Heading>

        {!isLastColumn && (
          <StyledWrapperButton
            className={classNames("wp-wrapper-button", {
              active: Boolean(state.anchorEl),
            })}
            onClick={_handleOpenMenu}
          >
            <KeyboardArrowDownRoundedIcon />
          </StyledWrapperButton>
        )}
        {!isLastColumn && (
          <ResizeDiv
            {...column.getResizerProps()}
            isResizing={column.isResizing}
          />
        )}
      </LeftStructure>

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
          <>
            <StyledMenuItem
              onClick={_handleEditField}
              style={{ marginBottom: 5 }}
            >
              <Typography textAlign="center">Chỉnh sửa trường</Typography>
            </StyledMenuItem>
            <Divider />
          </>
        )}

        <StyledMenuItem onClick={() => _handleSort(1)} style={{ marginTop: 5 }}>
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

        <StyledMenuItem onClick={_handleHideField} style={{ marginTop: 5 }}>
          <Typography textAlign="center">Ẩn trường</Typography>
        </StyledMenuItem>

        <StyledMenuItem isDelete onClick={_handleDeleteField}>
          <Typography textAlign="center">Xoá trường</Typography>
        </StyledMenuItem>
      </Menu>
    </HeaderColumnWrapper>
  );
};

const StyledMenuItem = styled(MenuItem)`
  color: ${(props) => (props.isDelete ? "#f44336" : "#1e1f21")};
  width: 200px;
  height: 35px;
  ${(props) => {
    if (props.isActive) return { backgroundColor: "rgba(0, 0, 0, 0.08)" };
  }}

  p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: calc(100% - 30px);
  }
`;

const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 25px;
  text-align: left;
  color: #1e1f21;

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
  align-items: center;
  background-color: #f1f2f4;
  box-shadow: 0 0 0 1px #edeae9;
  display: flex;
  flex: 1 0 auto;
  justify-content: space-between;
  z-index: 0;
  margin: 0;
  color: #6d6e6f;
  z-index: ${(props) => props.zIndex};
  &[data-sticky-td="true"] {
    z-index: ${(props) => props.zIndex + 3}!important;
  }
`;
const LeftStructure = styled.div`
  cursor: pointer;
  color: #666;
  display: flex;
  flex: 1 0 auto;
  font-size: 12px;
  padding-left: 24px;
  padding-right: 0;
  height: 100%;
  position: relative;
  z-index: 0;
  align-items: center;

  border-right: ${(props) => (props.isLastColumn ? "0" : "1px solid #e8ecee")};
  justify-content: ${({ isLastColumn }) =>
    isLastColumn ? "center" : "space-between"};

  .wp-wrapper-button {
    visibility: ${({ isOpening }) => (isOpening ? "visible" : "hidden")};
  }

  &:hover {
    background-color: #f6f8f9;
    color: #151b26;
    fill: #151b26;
    .wp-wrapper-button {
      visibility: visible;
    }
  }
`;

const ResizeDiv = styled.div`
  height: 100%;
  position: absolute;
  right: -5px;
  top: 0;
  width: 10px;
  z-index: 9999999;

  &:hover {
    background: #008ce3;
    &:after {
      content: "";
    }
  }
  &:after {
    content: none;
    position: absolute;
    height: 100vh;
    background: ${(props) => (!props.isResizing ? "#008ce3" : "#008ce3")};
    width: 1px;
    left: 4px;
    z-index: 3;
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
  margin-left: 10px;
  margin-right: 5px;
`;

export default HeaderColumn;
