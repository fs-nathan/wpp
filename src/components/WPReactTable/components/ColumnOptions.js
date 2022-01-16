import {
  Box,
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ColumnOptions = ({ props, value, option_color, onEdit = () => {} }) => {
  const project = props?.row?.original;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState({
    name: value,
    color: option_color,
  });
  const labelsProject = useSelector(
    ({ projectLabels }) => projectLabels.listProjectLabels
  );
  const open = Boolean(anchorEl);

  React.useEffect(() => {
    setSelected({
      name: value,
      color: option_color,
    });
  }, [value, option_color]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const _renderSelected = () => {
    if (!selected)
      return (
        <Typography className="default_tag" style={{ marginLeft: 5 }}>
          —
        </Typography>
      );
    return (
      <Label
        style={{ background: selected.color, maxWidth: 85 }}
        onClick={handleClick}
      >
        {selected.name}
      </Label>
    );
  };

  return (
    <>
      <BoxColLabel onClick={handleClick}>
        {_renderSelected()}
        <KeyboardArrowDownIcon className="icon" xs={{ color: "#6d6e6f" }} />
      </BoxColLabel>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          style={{ width: 200, color: "#6d6e6f" }}
          onClick={() => setSelected(null)}
        >
          <DoneIcon
            style={{
              marginRight: 10,
              color: "#6d6e6f",
              visibility: !selected ? "visible" : "hidden",
            }}
          />
          <Typography>—</Typography>
        </MenuItem>
        {labelsProject.data?.projectLabels?.map((item) => (
          <MenuItem style={{ width: 200 }} onClick={() => setSelected(item)}>
            <DoneIcon
              style={{
                marginRight: 10,
                color: "#6d6e6f",
                visibility: selected?.id === item.id ? "visible" : "hidden",
              }}
            />
            <Typography
              style={{
                background: item.color,
                padding: "5px 15px",
                borderRadius: "15px",
                color: "#fff",
                fontSize: "12px",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
              nowrap
            >
              {item.name}
            </Typography>
          </MenuItem>
        ))}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            color: "#6d6e6f",
            borderTop: "1px solid#e8ecee",
          }}
        >
          <MenuItem
            onClick={() => onEdit(project)}
            style={{ width: "100%", marginTop: 5 }}
          >
            <ListItemIcon style={{ minWidth: 20 }}>
              <EditIcon />
            </ListItemIcon>
            <span style={{ marginLeft: "5px" }}>Chỉnh sửa</span>
          </MenuItem>
        </div>
      </Menu>
    </>
  );
};

const BoxColLabel = styled(Box)`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  .default_tag,
  .icon {
    visibility: hidden;
  }
  &:hover {
    .default_tag,
    .icon {
      visibility: visible;
    }
  }
`;

const Label = styled.div`
  padding: 5px 10px;
  border-radius: 15px;
  color: #fff;
  max-width: 100%;
  margin: 5px 10px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default ColumnOptions;
