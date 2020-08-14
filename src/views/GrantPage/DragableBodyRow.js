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
  dataSource,
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
  return (
    <tr
      id={dataSource[index] && dataSource[index].id}
      ref={ref}
      onMouseEnter={() => {
        if (!window.scrollTable) {
          const divs = document.getElementsByClassName(
            "gantt--top-timeline-tr"
          );
          if (!divs.length) return
          divs[index].style.backgroundColor = "#fffae6";
          const divss = document.getElementsByClassName(
            "ant-table-row ant-table-row-level-0"
          );
          divss[index].style.backgroundColor = "#fffae6";
          const divsss = document.getElementById(
            `icon__${dataSource[index].id}`
          );
          if (!divsss) return;
          divsss.style.backgroundColor = "#fffae6";

        }
      }}
      onMouseLeave={() => {
        const divs = document.getElementsByClassName("gantt--top-timeline-tr");
        if (!divs.length) return
        divs[index].style.backgroundColor = "";
        const divss = document.getElementsByClassName(
          "ant-table-row ant-table-row-level-0"
        );
        if (!divss[index]) return;
        divss[index].style.backgroundColor = dataSource[index].isTotalDuration || dataSource[index].isGroupTask ? "#fafafa" : "";
        const divsss = document.getElementById(
          `icon__${dataSource[index].id}`
        );
        if (!divsss) return;
        divsss.style.backgroundColor = dataSource[index].isTotalDuration || dataSource[index].isGroupTask ? "#fafafa" : "#fff";
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
