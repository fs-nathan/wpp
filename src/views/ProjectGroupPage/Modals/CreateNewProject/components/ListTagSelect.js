import { Card, makeStyles, Popover } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import { listProjectLabel } from "actions/projectLabels/listProjectLabels";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MAX_LENGTH_LABEL = 3;

export const ListTagSelect = ({
  title = "Thêm lựa chọn",
  onSelect = () => {},
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const _handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const _handleClosePopover = (event) => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className={classes.wrapperAdd} onClick={_handleOpenPopover}>
        <AddIcon sx={{ fontSize: 18 }} />
        <p> {title}</p>
      </div>

      <ListTag
        anchorEl={anchorEl}
        onClose={_handleClosePopover}
        onSelect={onSelect}
      />
    </div>
  );
};

const ListTag = ({
  anchorEl,
  activeColor = "red",
  onSelect = () => {},
  onClose = () => {},
}) => {
  const classes = useStyles();
  const [tags, setTags] = useState([]);
  const labelsProject = useSelector(
    ({ projectLabels }) => projectLabels.listProjectLabels
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setTags(labelsProject?.data?.projectLabels || []);
  }, [labelsProject]);

  useEffect(() => {
    if (labelsProject.firstTime) dispatch(listProjectLabel());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Card className={classes.wrapperTagList}>
        {tags.map((item) => {
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
});
