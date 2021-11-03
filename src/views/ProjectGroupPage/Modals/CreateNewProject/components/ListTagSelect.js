import { Card, makeStyles, Popover } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import { listProjectLabel } from "actions/projectLabels/listProjectLabels";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemTag from "./ItemTag";

export const ListTagSelect = ({
  title = "Thêm lựa chọn",
  onSelect = () => {},
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [tags, setTags] = useState([]);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [currentNewName, setCurrentNewName] = useState("");
  const refTarget = useRef(null);
  const dispatch = useDispatch();

  const labelsProject = useSelector(
    ({ projectLabels }) => projectLabels.listProjectLabels
  );

  useEffect(() => {
    setTags(labelsProject?.data?.projectLabels || []);
  }, [labelsProject]);

  useEffect(() => {
    if (labelsProject.firstTime) dispatch(listProjectLabel());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _handleOpenPopover = () => {
    setIsAddingTag(true);
  };

  const _handleClosePopover = (event) => {
    setAnchorEl(null);
    setIsAddingTag(false);
  };

  const _handleFocus = (event) => {
    setAnchorEl(refTarget.current);
  };

  const _handleChange = (event) => {
    const value = event.target.value;
    setCurrentNewName(value);
    setTags(() => {
      const data = labelsProject?.data?.projectLabels || [];
      if (!value.length) return data;
      return [...data].filter((item) => item.name.toLowerCase().match(value));
    });
  };

  return (
    <div ref={refTarget}>
      {isAddingTag ? (
        <ItemTag
          color="red"
          id="null"
          isNewTag
          name={currentNewName}
          onFocus={_handleFocus}
          onChange={_handleChange}
        />
      ) : (
        <div className={classes.wrapperAdd} onClick={_handleOpenPopover}>
          <AddIcon sx={{ fontSize: 18 }} />
          <p> {title}</p>
        </div>
      )}

      <ListTag
        listTags={tags}
        anchorEl={anchorEl}
        currentNewName={currentNewName}
        onClose={_handleClosePopover}
        onSelect={onSelect}
      />
    </div>
  );
};

const ListTag = ({
  anchorEl,
  activeColor = "red",
  currentNewName = "",
  listTags = [],
  onSelect = () => {},
  onClose = () => {},
}) => {
  const classes = useStyles();

  const _handleSelect = (item) => {
    onSelect(item);
    onClose();
  };

  return (
    <Popover
      id="list-color-label"
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      disableAutoFocus={true}
      disableEnforceFocus={true}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Card className={classes.wrapperTagList}>
        {listTags.map((item) => {
          return (
            <div
              key={item.id}
              className={classes.itemTag}
              style={{ background: item.color }}
              onClick={() => _handleSelect(item)}
            >
              {item.name}
            </div>
          );
        })}
        {currentNewName && (
          <p
            style={{
              cursor: "pointer",
              color: "rgb(0, 118, 243)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <AddIcon sx={{ fontSize: 18 }} />
            Tạo nhãn cho "{currentNewName}"
          </p>
        )}
      </Card>
    </Popover>
  );
};

const useStyles = makeStyles({
  wrapperAdd: {
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
  },
  wrapperTagList: {
    padding: 15,
    display: "flex",
    flexDirection: "column",
    width: 300,
  },
  itemTag: {
    marginBottom: 10,
    padding: 10,
    background: "black",
    borderRadius: 15,
    color: "#fff",
    fontWeight: 500,
    cursor: "pointer",
  },
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
});
