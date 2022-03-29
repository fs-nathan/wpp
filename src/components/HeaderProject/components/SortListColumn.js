import { ListItemIcon, ListItemText, Switch } from "@material-ui/core";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { FixedSizeList, areEqual } from "react-window";
import { listColumns } from "actions/columns/listColumns";
import { isArray } from "lodash";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const marginBottom = 4;
const marginTop = 4;
const marginLeft = 15;
const marginRight = 5;

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

function getStyle({ provided, style, isDragging }) {
  const combined = {
    ...style,
    ...provided.draggableProps.style,
    width: 335,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#fff",
  };

  const withSpacing = {
    ...combined,
    height: isDragging
      ? combined.height
      : combined.height - (marginBottom + marginTop),
    width: isDragging
      ? combined.width
      : combined.width - (marginLeft + marginRight),
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
  };
  return withSpacing;
}

function Item({ provided, item, style, isDragging }) {
  return (
    <StyledItem
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      style={getStyle({ provided, style, isDragging })}
      className={`item ${isDragging ? "is-dragging" : ""}`}
    >
      <ListItemIcon style={{ minWidth: "20px" }}>
        <StyledIconDrag />
      </ListItemIcon>
      <ListItemText primary={item.name} style={{ color: "#1e1f21" }} />
      <AntSwitch
        defaultChecked={item.is_show}
        style={{ marginRight: 5 }}
        inputProps={{ "aria-label": "ant design" }}
      />
    </StyledItem>
  );
}

// Recommended react-window performance optimisation: memoize the row render function
// Things are still pretty fast without this, but I am a sucker for making things faster
const Row = React.memo(function Row(props) {
  const { data: items, index, style } = props;
  const item = items[index];
  return (
    <Draggable draggableId={item.id} index={index} key={item.id}>
      {(provided) => <Item provided={provided} item={item} style={style} />}
    </Draggable>
  );
}, areEqual);

const SortListColumn = React.forwardRef((props, ref) => {
  const { projectId } = useParams();
  const fields = useSelector(({ columns }) => columns?.listColumns?.data || []);
  const [items, setItems] = useState(fields);
  const dispatch = useDispatch();

  React.useImperativeHandle(ref, () => ({ _addColumns }));

  React.useEffect(() => {
    setItems(fields);
  }, [fields]);

  const _addColumns = (dataColumn) => {
    if (!dataColumn) return;
    /* Dispatching an action to the Redux store. */
    dispatch(listColumns({ project_id: projectId }));
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) return;

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(newItems);
  };

  if (!isArray(items)) return null;
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="droppable_sorting"
        mode="virtual"
        renderClone={(provided, snapshot, rubric) => (
          <Item
            provided={provided}
            isDragging={snapshot.isDragging}
            item={items[rubric.source.index]}
          />
        )}
      >
        {(provided) => (
          <FixedSizeList
            height={500}
            width={350}
            maxWidth={330}
            itemCount={items.length}
            itemSize={55}
            outerRef={provided.innerRef}
            itemData={items}
            style={{ paddingTop: "10px", height: "auto" }}
          >
            {Row}
          </FixedSizeList>
        )}
      </Droppable>
    </DragDropContext>
  );
});

export const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const StyledIconDrag = styled(DragIndicatorIcon)`
  width: 18px;
  height: 18px;
  fill: #6d6e6f;
`;

const StyledItem = styled.div`
  box-shadow: rgb(237 234 233) 0px 0px 0px 1px,
    rgb(109 110 111 / 8%) 0px 1px 4px 0px;
  box-sizing: border-box;
  border-radius: 8px;
  font-size: 30px;
  user-select: none;
  padding-right: 5px;

  /* center align text */
  display: flex;
  justify-content: center;
  align-items: center;
  background: "#fff";

  &.is-dragging {
    height: 37px;
  }
`;

export default SortListColumn;
