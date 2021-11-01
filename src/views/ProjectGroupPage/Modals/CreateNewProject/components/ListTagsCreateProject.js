import { Card, makeStyles, Popover } from "@material-ui/core";
import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";
import CircleIcon from "@mui/icons-material/Circle";
import CloseIcon from "@mui/icons-material/Close";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ListTagSelect } from "./ListTagSelect";

export const ListTagsCreateProject = () => {
  const classes = useStyles();
  const refListSelected = useRef(null);
  const _selectTag = (tag) => {
    refListSelected.current._addTag(tag);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.wrapperList}>
          <ListTagSelected ref={refListSelected} />
        </div>
        <ListTagSelect title="Thêm lựa chọn" onSelect={_selectTag} />
      </div>
    </>
  );
};

const ListTagSelected = forwardRef((props, ref) => {
  const [tags, setTags] = useState([]);

  useImperativeHandle(ref, () => ({
    _addTag: (tag) => setTags((prevState) => [...prevState, tag]),
    _getValue: () => tags,
  }));

  const _deleteTag = (id) => {
    setTags((prevState) => [...prevState].filter((item) => item.id !== id));
  };

  const _editTag = (id, data = {}) => {
    setTags((prevState) => {
      const newState = [...prevState];
      const index = newState.findIndex((item) => item.id === id);
      newState[index] = { ...newState[index], ...data };
      return newState;
    });
  };

  return tags.map((item, index) => {
    return (
      <ItemTag key={index} onDelete={_deleteTag} onEdit={_editTag} {...item} />
    );
  });
});

const ItemTag = ({
  id,
  name,
  color,
  onDelete = () => {},
  onEdit = () => {},
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const _handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const _handleClosePopover = (event) => {
    setAnchorEl(null);
  };

  const _handleEdit = (data) => {
    onEdit(id, { ...data });
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
          <p>{name}</p>
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
  wrapper: {
    width: "100%",
    color: "#666",
    fontWeight: 500,
  },
  wrapperList: {},
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
});
