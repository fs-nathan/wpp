import { ListItemIcon, ListItemText, Menu, MenuItem } from "@material-ui/core";
import PercentIcon from "@mui/icons-material/Percent";
import AddIcon from "@mui/icons-material/Add";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArticleIcon from "@mui/icons-material/Article";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import FunctionsIcon from "@mui/icons-material/Functions";
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
          <ListItemText>Sắp xếp tăng dần</ListItemText>
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
          <ListItemText>Sắp xếp giảm dần</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => handleSelect(null)}
          style={{ color: !selectedSort ? "#666" : "#333" }}
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

export const AddHeading = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const refModal = useRef(null);
  const open = Boolean(anchorEl);

  const handleOpenModal = () => {
    refModal.current._open();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div {...props}>
      <AddColumnModal ref={refModal} />
      <AddIcon onClick={handleClick} />
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
        <ListItemText style={{ padding: "6px 18px", fontWeight: "bold" }}>
          Thêm trường dữ liệu
        </ListItemText>

        {OPTIONS_ADD_COLUMN.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => handleOpenModal(item.type)}
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
    text: "Danh sách chọn",
    type: "list",
  },
  {
    icon: () => <FormatColorTextIcon />,
    text: "Dữ liệu văn bản",
    type: "text",
  },
  {
    icon: () => <TagIcon />,
    text: "Con số",
    type: "number",
  },
  {
    icon: () => <PercentIcon />,
    text: "Phần trăm",
    type: "percent",
  },
  {
    icon: () => <AttachMoneyIcon />,
    text: "Tiền tệ",
    type: "currency",
  },
  {
    icon: () => <FunctionsIcon />,
    text: "Công thức",
    type: "hash",
  },
  {
    icon: () => <ArticleIcon />,
    text: "Chọn từ thư viện",
    type: "library",
  },
];

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
