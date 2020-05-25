import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { connect } from "react-redux";
import { changeRowHover } from "../../actions/gantt";

const type = "DragbleBodyRow";

const DragableBodyRow = ({
  index,
  canDrag,
  moveRow,
  className,
  style,
  ...restProps
}) => {
  const ref = React.useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? " drop-over-downward" : " drop-over-upward",
      };
    },
    drop: (item) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      onMouseEnter={() => {
        if (!window.scrollTable) restProps.changeRowHover(index);
      }}
      onMouseLeave={() => {
        if (!window.scrollTable) restProps.changeRowHover(-1);
      }}
      className={`${className}${isOver ? dropClassName : ""}`}
      style={{ ...style }}
      {...restProps}
    />
  );
};

const mapDispatchToProps = {
  changeRowHover,
};
export default connect(null, mapDispatchToProps)(DragableBodyRow);
