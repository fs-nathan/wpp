import { ListItemIcon, ListItemText, Menu, MenuItem } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArticleIcon from "@mui/icons-material/Article";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import FunctionsIcon from "@mui/icons-material/Functions";
import PercentIcon from "@mui/icons-material/Percent";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import TagIcon from "@mui/icons-material/Tag";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import classNames from "classnames";
import React, { useRef } from "react";
import styled from "styled-components";
import AddColumnModal from "./AddColumnModal";

const HeadingColumn = ({
  column,
  selectedSort,
  isSticky = false,
  isLastColumn = false,
  onSort = () => {},
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (key) => {
    onSort(key, column.id);
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
            {selectedSort && selectedSort.idSort === column.id && (
              <>
                {selectedSort.key === "ASC" ? (
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
        style={{ marginTop: "45px" }}
      >
        <MenuItem
          onClick={() => handleSelect("ASC")}
          style={{ color: selectedSort?.key === "ASC" ? "#666" : "#333" }}
        >
          <ListItemIcon
            style={{
              minWidth: 25,
            }}
          >
            <UpgradeIcon />
          </ListItemIcon>
          <ListItemText>S???p x???p t??ng d???n</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => handleSelect("DECS")}
          style={{ color: selectedSort?.key === "DECS" ? "#666" : "#333" }}
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
          <ListItemText>S???p x???p gi???m d???n</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => handleSelect(null)}
          style={{ color: !selectedSort ? "#666" : "#333" }}
        >
          <ListItemIcon style={{ minWidth: 25 }}>
            <SearchOffIcon />
          </ListItemIcon>
          <ListItemText>Hu??? s???p x???p</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export const AddHeading = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const refModal = useRef(null);
  const open = Boolean(anchorEl);

  const handleOpenModal = (type, data = {}) => {
    refModal.current._open(type, { ...data });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div {...props} style={{ marginLeft: -24 }}>
      <AddColumnModal
        ref={refModal}
        onAddColumns={props.props.onAddNewColumns}
      />

      <StyledAddIcon className="wp-wrapper-button" onClick={handleClick}>
        <AddIcon />
      </StyledAddIcon>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        style={{ marginTop: "42px" }}
      >
        <ListItemText style={{ padding: "6px 18px", fontWeight: "bold" }}>
          Th??m tr?????ng d??? li???u
        </ListItemText>

        {OPTIONS_ADD_COLUMN.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => handleOpenModal(item.type, item.data)}
            {...item}
          >
            <ListItemIcon style={{ minWidth: 25 }}>
              <item.icon />
            </ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export const OPTIONS_ADD_COLUMN = [
  {
    icon: () => <ArrowCircleDownIcon />,
    text: "Danh s??ch ch???n",
    type: "list",
  },
  {
    icon: () => <FormatColorTextIcon />,
    text: "D??? li???u v??n b???n",
    type: "text",
  },
  {
    icon: () => <TagIcon />,
    text: "Con s???",
    type: "number",
    data: { defaultFormat: "number" },
  },
  {
    icon: () => <PercentIcon />,
    text: "Ph???n tr??m",
    type: "number",
    data: { defaultFormat: "percent" },
  },
  {
    icon: () => <AttachMoneyIcon />,
    text: "Ti???n t???",
    type: "number",
    data: { defaultFormat: "vnd" },
  },
  {
    icon: () => <FunctionsIcon />,
    text: "C??ng th???c",
    type: "number",
    data: { defaultFormat: "hash" },
  },
  {
    icon: () => <ArticleIcon />,
    text: "Ch???n t??? th?? vi???n",
    type: "library",
    data: { defaultFormat: "number" },
  },
];

const StyledAddIcon = styled.div`
  margin-right: 0;
  height: 100%;
  visibility: visible !important;
`;

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
  width: calc(100% - 42px);
  cursor: pointer;
  color: #666;
  display: flex;
  flex: 1 0 auto;
  font-size: 12px;
  padding-right: 0;
  position: relative;
  z-index: 0;
  align-items: center;
  .wp-wrapper-button {
    visibility: hidden;
  }
  &:hover {
    color: #151b26;
    fill: #151b26;
    .wp-wrapper-button {
      visibility: visible;
    }
  }
`;

const HeaderColumnWrapper = styled.div`
  align-items: center;
  border: 1px solid #e8ecee;
  border-bottom: 0;
  box-sizing: border-box;
  color: #151b26;
  cursor: pointer;
  display: inline-flex !important;
  fill: #151b26;
  flex: 0 0 auto;
  font-size: 12px;
  justify-content: space-between;
  margin-right: -1px;
  padding: 0 8px;
  position: relative;
  background: #f1f2f4;
  &.isSticky {
    position: sticky !important;
  }
  &:hover {
    background-color: #f9f8f8;
  }
`;

const Heading = styled.div`
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default HeadingColumn;
