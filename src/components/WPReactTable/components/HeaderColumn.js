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

const reducer = (prevState, newState) => {
  if (typeof newState === "object") return { ...prevState, ...newState };
  if (typeof newState === "function") return newState(prevState);
  return false;
};

const initialState = { openMenu: false, anchorEl: null };

const HeaderColumn = ({
  column,
  isSticky = false,
  isLastColumn = false,
  onAddNewColumns = () => {},
}) => {
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

  const _handleEditField = (event) => {};
  const _handleHideField = (event) => {};
  const _handleDeleteField = (event) => {};

  return (
    <HeaderColumnWrapper
      {...column.getHeaderProps()}
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
      </LeftStructure>

      {!isLastColumn && (
        <ResizeDiv
          {...column.getResizerProps()}
          isResizing={column.isResizing}
        />
      )}

      <Menu
        style={{ marginTop: "42px" }}
        id="menu-appbar"
        anchorEl={state.anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={Boolean(state.anchorEl)}
        onClose={_handleCloseMenu}
      >
        <StyledMenuItem onClick={_handleEditField} style={{ marginBottom: 5 }}>
          <Typography textAlign="center">Chỉnh sửa trường</Typography>
        </StyledMenuItem>
        <Divider />

        <StyledMenuItem onClick={_handleCloseMenu} style={{ marginTop: 5 }}>
          <StyledListItemIcon>
            <UpgradeIcon />
          </StyledListItemIcon>
          <Typography textAlign="center">Lọc tăng dần</Typography>
        </StyledMenuItem>

        <StyledMenuItem onClick={_handleCloseMenu}>
          <StyledListItemIcon transform>
            <UpgradeIcon />
          </StyledListItemIcon>
          <Typography textAlign="center">Lọc giảm dần</Typography>
        </StyledMenuItem>

        <StyledMenuItem onClick={_handleCloseMenu} style={{ marginBottom: 5 }}>
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
  border-right: 1px solid #edeae9;
  border-top: 1px solid #edeae9;
  display: flex;
  flex: 1 0 auto;
  justify-content: space-between;
  z-index: 0;
  margin: 0;
  color: #6d6e6f;
  margin-right: -1px;
  position: relative;

  &[data-sticky-td="true"] {
    z-index: 3;
  }
`;
const LeftStructure = styled.div`
  cursor: pointer;
  align-items: stretch;
  color: #666;
  display: flex;
  flex: 1 0 auto;
  font-size: 12px;
  padding-left: 24px;
  padding-right: 0;
  height: 100%;
  position: relative;
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
  z-index: 100;

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

export default React.memo(HeaderColumn);
