import {
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import styled from "styled-components";

const ColumnOptionsList = ({
  anchorEl,
  selected = null,
  options = [],
  isDisplayEditField = true,
  isRenderNullField = true,
  onClose = () => {},
  onEdit = () => {},
  onSelect = () => {},
}) => {
  const open = Boolean(anchorEl);

  const _handleSelect = (el) => {
    onSelect(el);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      onClick={onClose}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "start" }}
      transformOrigin={{ vertical: "top", horizontal: "start" }}
    >
      {isRenderNullField && (
        <MenuItem
          style={{ width: 200, color: "#6d6e6f", height: 35 }}
          onClick={() => _handleSelect(null)}
        >
          <StyledIconSelected
            selected={!selected?._id}
            xs={{ color: "#6d6e6f" }}
          />
          <Typography>—</Typography>
        </MenuItem>
      )}
      {options?.map((item, index) => (
        <MenuItem
          key={index}
          title={item.name}
          style={{ width: 200, height: 35 }}
          onClick={() => _handleSelect(item)}
        >
          <StyledIconSelected selected={selected?._id === item._id} />
          <StyledTypo nowrap color={item.color}>
            {item.name}
          </StyledTypo>
        </MenuItem>
      ))}
      <div style={{ marginBottom: 5 }} />
      {isDisplayEditField && (
        <div>
          <Divider light />
          <WrapperMenuItem>
            <MenuItem
              onClick={onEdit}
              style={{ width: "100%", marginTop: 5, height: 35 }}
            >
              <ListItemIcon style={{ minWidth: 20 }}>
                <EditIcon />
              </ListItemIcon>
              <span style={{ marginLeft: "5px" }}>Chỉnh sửa</span>
            </MenuItem>
          </WrapperMenuItem>
        </div>
      )}
    </Menu>
  );
};

const StyledIconSelected = styled(DoneIcon)`
  margin-right: 10px;
  color: #6d6e6f;
  visibility: ${({ selected }) => (selected ? "visible" : "hidden")};
`;
const WrapperMenuItem = styled.div`
  display: "flex";
  align-items: "center";
  cursor: "pointer";
  color: "#6d6e6f";
  border-top: "1px solid#e8ecee";
`;
const StyledTypo = styled(Typography)`
  background: ${(props) => props.color};
  border-radius: 10px;
  box-sizing: border-box;
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  display: block;
  font-size: 12px;
  font-weight: 400;
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  padding: 0 8px;
  text-align: left;
  white-space: nowrap;
  color: #fff;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export default ColumnOptionsList;
