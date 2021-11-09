import { Card, makeStyles, Popover } from "@material-ui/core";
import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";
import CircleIcon from "@mui/icons-material/Circle";
import CloseIcon from "@mui/icons-material/Close";
import { updateProjectLabels } from "actions/projectLabels/editProjectLabels";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const ItemTag = ({
  id,
  name,
  color,
  isNewTag = false,
  onDelete = () => {},
  onEdit = () => {},
  onFocus = () => {},
  onChange = () => {},
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditing, setIsEditing] = useState(isNewTag);
  const refInput = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditing && isNewTag) {
      onFocus();
      refInput.current.focus();
    }
  }, [isEditing, isNewTag, onFocus]);

  const _handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const _handleClosePopover = (event) => {
    setAnchorEl(null);
  };

  const _handleEdit = (data) => {
    onEdit(id, { ...data });
    dispatch(updateProjectLabels({ label_id: id, name, color, ...data }));
  };

  const _handleBlur = () => {
    setIsEditing(false);
    const inputValue = refInput.current.value;
    if (inputValue === name || isNewTag) return;
    onEdit(id, { name: inputValue });
    dispatch(updateProjectLabels({ label_id: id, name: inputValue, color }));
  };

  return (
    <>
      <div className={classes.item}>
        <div className={classes.leftItem}>
          <CircleIcon
            className={classes.icon}
            sx={{ color }}
            onClick={_handleOpenPopover}
          />

          <input
            ref={refInput}
            type="text"
            placeholder="Nhập tên nhãn..."
            className={classes.input}
            style={{ display: isEditing ? "block" : "none" }}
            defaultValue={name}
            onChange={onChange}
            onBlur={_handleBlur}
          />

          <p
            style={{
              width: "100%",
              cursor: "pointer",
              display: !isEditing ? "block" : "none",
            }}
            onClick={() => {
              setIsEditing(true);
              setTimeout(() => {
                refInput.current.focus();
                onFocus();
              }, 0);
            }}
          >
            {name}
          </p>
        </div>
        <div className={classes.rightItem} onClick={() => onDelete(id)}>
          <CloseIcon />
        </div>
      </div>
      <ListColorLabel
        anchorEl={anchorEl}
        activeColor={color}
        onClose={_handleClosePopover}
        onSelect={_handleEdit}
      />
    </>
  );
};

const ListColorLabel = ({
  anchorEl,
  activeColor = "red",
  onSelect = () => {},
  onClose = () => {},
}) => {
  const classes = useStyles();

  const _handleSelect = (color) => {
    onSelect({ color });
    onClose();
  };

  return (
    <Popover
      id="list-color-label"
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Card className={classes.wrapperListColor}>
        {LIST_COLORS.map((color, index) => (
          <div
            key={index}
            className={classes.itemColor}
            style={{ backgroundColor: color }}
            onClick={() => _handleSelect(color)}
          >
            {color === activeColor && (
              <CheckTwoToneIcon
                className={classes.iconColor}
                sx={{ fontSize: 10 }}
              />
            )}
          </div>
        ))}
      </Card>
    </Popover>
  );
};

const LIST_COLORS = [
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

const useStyles = makeStyles({
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 15px",
    borderBottom: "1px solid #e0e0e0",
    "& p": { margin: 0 },
  },
  leftItem: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  rightItem: { cursor: "pointer" },
  icon: { marginRight: 10, cursor: "pointer" },
  wrapperListColor: {
    padding: 15,
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    gridColumnGap: 5,
    gridRowGap: 5,
  },
  itemColor: {
    width: 20,
    height: 20,
    borderRadius: 4,
    position: "relative",
    cursor: "pointer",
    "&:hover": { opacity: 0.8 },
  },
  iconColor: {
    position: "absolute",
    top: "50%",
    left: "50%",
    color: "#fff",
    fontWeight: "bold",
    transform: "translate(-50%, -50%)",
  },
  input: { border: 0, outline: "none", fontWeight: 500, color: "#666" },
});

export default ItemTag;
