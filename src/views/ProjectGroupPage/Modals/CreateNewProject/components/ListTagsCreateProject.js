import { makeStyles } from "@material-ui/core";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import ItemTag from "./ItemTag";
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
    _addTag: (tag) =>
      setTags((prevState) => {
        if (tags.length > 3) return;
        if (prevState.some((item) => item.id === tag.id)) return prevState;
        return [...prevState, tag];
      }),
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

const useStyles = makeStyles({
  wrapper: {
    width: "100%",
    color: "#666",
    fontWeight: 500,
  },
  wrapperList: {},
});
