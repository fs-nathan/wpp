import { mdiDragVerticalVariant } from "@mdi/js";
import Icon from "@mdi/react";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { changeRowHover } from "../../actions/gantt";
import MonthHeader from "./MonthHeader";
import Timeline from "./TimeLine";

function GanttChart({
  minLeft,
  setDataSource,
  setProcessDatasource,
  girdInstance,
  start,
  showHeader,
  end,
  changeRowHover,
  dataSource,
  monthArray,
  daysRender,
  showFullChart,
  rowHover,
  renderFullDay,
  widthTable,
}) {
  const dragRef = useRef();
  const ganttRef = useRef();
  const [left, setLeft] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [showResizeIcon, setShowResizeIcon] = useState(false);
  const [currentX, setcurrentX] = useState(0);
  const [drag, setDrag] = useState(false);
  const [heightChart, setHeightChart] = useState(600);
  const [leftHeader, setLeftHeader] = useState(0);
  const [leftTable, setLeftTable] = useState(0);
  let offsetLeft = 0;
  const handleMouseMove = (e) => {
    if (drag) {
      const nextPosX = e.clientX - currentX;
      if (nextPosX < minLeft) return;
      setLeft(e.clientX - currentX);
    }
    e.stopPropagation();
    e.preventDefault();
  };
  const handleMouseDown = (e) => {
    if (dragRef.current) {
      const dragLeft = dragRef.current.offsetLeft;
      const grantLeft = ganttRef.current.offsetLeft;
      offsetLeft = dragLeft + grantLeft;
    }
    setDrag(true);
    setcurrentX(e.clientX - offsetLeft);
    e.stopPropagation();
    e.preventDefault();
  };
  const handleMouseUp = (e) => {
    setDrag(false);
    e.stopPropagation();
    e.preventDefault();
  };
  useEffect(() => {
    if (drag) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });
  useEffect(() => {
    if (ganttRef.current) {
      setHeightChart(window.innerHeight - ganttRef.current.offsetTop);
    }
  }, [showHeader]);
  const defaultLeft = minLeft + widthTable;
  const b = left ? { left: showFullChart ? minLeft : left } : {};
  let maxWidth;
  if (renderFullDay) {
    maxWidth = (end.diff(start, girdInstance.unit) + 1) * 48;
  }
  const timeline = dataSource.map((item, index) => {
    console.log("endPosition");

    const startDate = moment(item.start_time, girdInstance.formatString);
    const endDate = moment(item.end_time, girdInstance.formatString);
    const startPosition = Math.ceil(
      startDate.diff(start, girdInstance.unit, true)
    );
    const endPosition = endDate.diff(startDate, girdInstance.unit) + 1;
    console.log(moment.duration(endDate.diff(startDate)).asMonths());
    console.log(endPosition);
    return (
      <React.Fragment>
        <div
          key={item.id}
          onMouseEnter={() => changeRowHover(index)}
          onMouseLeave={() => changeRowHover(-1)}
          className="gantt--top-timeline-tr"
          style={{
            position: "relative",
            padding: "8.5px 0px",
            display: "flex",
            backgroundColor: rowHover === index ? "#fffae6" : "",
          }}
        >
          <div className="gantt--top-timeline"></div>
          <Timeline
            setProcessDatasource={setProcessDatasource}
            isTotalDuration={item.isTotalDuration}
            isGroupTask={item.isGroupTask}
            key={item.id + "1"}
            setDataSource={setDataSource}
            startDate={startDate}
            endDate={endDate}
            key={item.id}
            dataSource={dataSource}
            index={index}
            startPosition={startPosition}
            endPosition={endPosition}
          />
        </div>
      </React.Fragment>
    );
  });
  return (
    <React.Fragment>
      <div
        onMouseUp={() => {
          setDrag(false);
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowResizeIcon(true)}
        onMouseLeave={() => setShowResizeIcon(false)}
        className="icon-resize-gantt-chart"
        style={{
          left: showFullChart ? minLeft : defaultLeft,
          ...b,
          display: showResizeIcon ? "block" : "none",
          height: heightChart,
        }}
      >
        <Icon path={mdiDragVerticalVariant} size={1} />
      </div>
      <div
        ref={ganttRef}
        style={{
          width: renderFullDay
            ? maxWidth
            : showFullChart
            ? window.innerWidth - minLeft
            : left
            ? window.innerWidth - left
            : window.innerWidth - defaultLeft,
          position: "absolute",
          left: showFullChart ? minLeft : defaultLeft,
          overflow: "hidden",
          background: "white",
          ...b,
        }}
      >
        <div
          ref={dragRef}
          onMouseUp={() => {
            setDrag(false);
          }}
          onMouseLeave={() => setShowResizeIcon(false)}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setShowResizeIcon(true)}
          style={{
            width: showResizeIcon ? "7px" : "3px",
            cursor: "col-resize",
            position: "absolute",
            zIndex: 10,
            backgroundColor: "#e8e8e8",
            height: "100%",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            height: heightChart,
            overflow: "scroll",
            width: "100%",
          }}
          onScroll={(e) => {
            if (Math.floor(e.target.scrollLeft / 48) !== scrollWidth) {
              const newScrollWidth = Math.floor(e.target.scrollLeft / 48);
              setScrollWidth(newScrollWidth);
            } else {
              setLeftHeader(e.target.scrollLeft % 48);
              console.log(e.target.scrollLeft);
              setLeftTable(e.target.scrollLeft % (7 * 48));
            }
          }}
        >
          <div
            style={{
              borderRight: "2px solid #e8e8e8",
            }}
          >
            <MonthHeader
              scrollWidth={scrollWidth}
              daysRender={daysRender}
              allMonth={monthArray}
              startTimeProject={start}
              dataSource={dataSource}
              leftHeader={leftHeader}
              leftTable={leftTable}
            />
            <div className="gantt--timeline--container">{timeline}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapDispatchToProps = {
  changeRowHover,
};
const mapStateToProps = (state) => ({
  showFullChart: state.gantt.showFullChart,
  showHeader: state.gantt.showHeader,
  rowHover: state.gantt.rowHover,
  renderFullDay: state.gantt.renderFullDay,
  girdInstance: state.gantt.girdInstance,
});
export default connect(mapStateToProps, mapDispatchToProps)(GanttChart);
