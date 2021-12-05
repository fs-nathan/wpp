import { ListItemIcon, ListItemText, Menu, MenuItem } from "@material-ui/core";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import classNames from "classnames";
import React from "react";
import styled from "styled-components";

const HeadingColumn = ({
  column,
  isSticky = false,
  isLastColumn = false,
  onSort = () => {},
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (key) => {
    setSelected(key);
  };

  return (
    <>
      <HeaderColumnWrapper
        {...column.getHeaderProps()}
        isLastColumn={isLastColumn}
        className={classNames({ isSticky })}
      >
        <LeftStructure isLastColumn={isLastColumn}>
          <Heading>
            {column.render("Header")}

            {selected && (
              <>
                {selected === "ASC" ? (
                  <ListItemIcon style={{ minWidth: 25, marginLeft: 5 }}>
                    <UpgradeIcon />
                  </ListItemIcon>
                ) : (
                  <ListItemIcon
                    style={{
                      minWidth: 25,
                      marginLeft: 5,
                      transform: "rotate(180deg)",
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <UpgradeIcon />
                  </ListItemIcon>
                )}
              </>
            )}
          </Heading>
          <div className="wp-wrapper-button" onClick={handleClick}>
            <ArrowDropDownIcon sx={{ color: "#666" }} />
          </div>
        </LeftStructure>
        {!isLastColumn && (
          <ResizeDiv
            {...column.getResizerProps()}
            isResizing={column.isResizing}
          />
        )}
      </HeaderColumnWrapper>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => handleSelect("ASC")}
          style={{ color: selected === "ASC" ? "#666" : "#333" }}
        >
          <ListItemIcon
            style={{
              minWidth: 25,
            }}
          >
            <UpgradeIcon />
          </ListItemIcon>
          <ListItemText>Sắp xếp tăng dần</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => handleSelect("DECS")}
          style={{ color: selected === "DECS" ? "#666" : "#333" }}
        >
          <ListItemIcon
            style={{
              minWidth: 25,
              transform: "rotate(180deg)",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <UpgradeIcon />
          </ListItemIcon>
          <ListItemText>Sắp xếp giảm dần</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => handleSelect(null)}
          style={{ color: !selected ? "#666" : "#333" }}
        >
          <ListItemIcon style={{ minWidth: 25 }}>
            <SearchOffIcon />
          </ListItemIcon>
          <ListItemText>Huỷ sắp xếp</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

const ResizeDiv = styled.div`
  display: inline-block;
  background: transparent;
  width: 8px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(50%);
  z-index: 3;
  touch-action: none;
  &:hover {
    background: #008ce3;
  }
  &:after {
    content: "";
    position: absolute;
    height: 100vh;
    background: ${(props) => (!props.isResizing ? "transparent" : "#008ce3")};
    width: 1px;
    left: 50%;
    transform: translateX(50%);
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
  margin-right: -1px;
  padding-left: 24px;
  height: 100%;
  position: relative;
  align-items: center;
  border-right: ${(props) => (props.isLastColumn ? "0" : "1px solid #e8ecee")};
  justify-content: space-between;
  .wp-wrapper-button {
    visibility: hidden;
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

const HeaderColumnWrapper = styled.div`
  align-items: stretch;
  background-color: #f1f2f4;
  display: flex;
  flex-direction: column;
  height: 37px;
  left: 0;
  position: absolute;
  border-right: ${(props) => (props.isLastColumn ? "0" : "1px solid #e8ecee")};
  border-bottom: 1px solid #e8ecee;
  &.isSticky {
    position: sticky !important;
  }
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
`;

export default HeadingColumn;
