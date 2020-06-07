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
      console.log(dragIndex < index)
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
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
  console.log(isOver)
  return (
    <tr
      ref={ref}
      onMouseEnter={() => {
        if (!window.scrollTable) {
          const divs = document.getElementsByClassName(
            "gantt--top-timeline-tr"
          );
          divs[index].style.backgroundColor = "#fffae6";
          const divss = document.getElementsByClassName(
            "ant-table-row ant-table-row-level-0"
          );
          divss[index].style.backgroundColor = "#fffae6";
        }
      }}
      onMouseLeave={() => {
        const divs = document.getElementsByClassName("gantt--top-timeline-tr");
        divs[index].style.backgroundColor = "";
        const divss = document.getElementsByClassName(
          "ant-table-row ant-table-row-level-0"
        );
        divss[index].style.backgroundColor = "";
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
