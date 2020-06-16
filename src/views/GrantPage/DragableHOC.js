import { mdiDragVerticalVariant } from "@mdi/js";
import Icon from "@mdi/react";
import moment from "moment";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { connect } from "react-redux";
import { changeRowHover, scrollGantt } from "../../actions/gantt";
import MonthHeader from "./MonthHeader";
import Timeline from "./TimeLine";
let timeoutId;
let timeNotWorkUnit = 0;
function GanttChart({
  minLeft,
  setDataSource,
  setProcessDatasource,
  fetchTimeNotWork,
  girdInstance,
  timeNotWork = [],
  start,
  end,
  scrollGantt,
  visibleGantt,
  dataSource,
  monthArray,
  daysRender,
  showFullChart,
  heightTable,
  rowHover,
  renderFullDay,
  scrollGanttFlag,
  widthTable,
}) {
  const dragRef = useRef();
  const scrollRef = useRef();
  const ganttRef = useRef();
  const scrollTimeLineRef = useRef();
  const [left, setLeft] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [showResizeIcon, setShowResizeIcon] = useState(false);
  const [currentX, setcurrentX] = useState(0);
  const [drag, setDrag] = useState(false);
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
    if (scrollRef.current && scrollGanttFlag) {
      const widthFromNowLayer =
        new moment(Date.now()).diff(start, girdInstance.unit) + 1;
      scrollRef.current.scrollLeft = widthFromNowLayer * 48 - 500;
      scrollGantt(false);
    }
  }, [scrollGanttFlag]);
  const defaultLeft = minLeft + widthTable;
  const b = left ? { left: showFullChart ? minLeft : left } : {};
  let maxWidth;
  if (renderFullDay) {
    maxWidth = (end.diff(start, girdInstance.unit) + 1) * 48;
  }
  const timeline = useMemo(
    () =>
      dataSource.map((item, index) => {
        if (!visibleGantt.total && item.isTotalDuration) return null;
        if (!item.show && !item.isGroupTask) return null;
        const startDate = moment(item.start_time, girdInstance.formatString);
        const endDate = moment(item.end_time, girdInstance.formatString);
        const startPosition = Math.ceil(
          startDate.diff(start, girdInstance.unit, true)
        );
        const endPosition = endDate.diff(startDate, girdInstance.unit) + 1;
        return (
          <React.Fragment>
            <div
              key={item.id}
              onMouseEnter={() => {
                if (!window.scrollTimeline) {
                  const divs = document.getElementsByClassName(
                    "ant-table-row ant-table-row-level-0"
                  );
                  if (!divs[index]) return;
                  divs[index].style.backgroundColor = "#fffae6";
                }
              }}
              onMouseLeave={() => {
                if (!window.scrollTimeline) {
                  const divs = document.getElementsByClassName(
                    "ant-table-row ant-table-row-level-0"
                  );
                  if (!divs[index]) return;
                  divs[index].style.backgroundColor = dataSource[index].isTotalDuration || dataSource[index].isGroupTask ? "#fafafa" : "#fff";
                }
              }}
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
                canEdit={item.can_edit}
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
      }),
    [dataSource, girdInstance, start, visibleGantt, rowHover]
  );
  const renderTimeNotWork = useMemo(() => (
    <div style={{ position: "absolute" }}>
      <div style={{ position: "relative" }}>
        {timeNotWork.map((item) => (
          <div
            style={{
              background: "#fafafa",
              position: "absolute",
              width: 48,
              height: dataSource.length * 37,
              left:
                new moment(
                  `${item.date}/${item.month}/${item.year}${
                  item.hour ? " " + item.hour : ""
                  }`,
                  `DD/MM/YYYY${item.hour ? " HH" : ""}`
                ).diff(start, girdInstance.unit) * 48,
            }}
          ></div>
        ))}
      </div>
    </div>
  ));
  const widthFromNowLayer =
    new moment(Date.now()).diff(start, girdInstance.unit) + 1;
  const renderMonthHeader = useMemo(
    () => (
      <MonthHeader
        scrollWidth={scrollWidth}
        daysRender={daysRender}
        allMonth={monthArray}
        startTimeProject={start}
        dataSource={dataSource}
        leftHeader={leftHeader}
        leftTable={leftTable}
      />
    ),
    [
      scrollWidth,
      daysRender,
      monthArray,
      start,
      dataSource,
      leftHeader,
      leftTable,
    ]
  );
  const offSetLeftGanttContainer = document.getElementById("offset-gantt-container") && document.getElementById("offset-gantt-container").getBoundingClientRect() ? document.getElementById("offset-gantt-container").getBoundingClientRect().left : 0
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
        }}
      >
        <Icon path={mdiDragVerticalVariant} size={1} />
      </div>
       <div
        id="gantt--scroll-top_virtual"
        onScroll={(e) => {
          if (!window.scrollTable && !window.scrollTimeline) {
            window.scrollTimelineVitural = true;
            const tableBody = document.getElementsByClassName(
              "ant-table-body"
            )[0];
            const timelineContainer = document.getElementsByClassName(
              "gantt--timeline--container"
            )[0];
            const scrollVirtual = document.getElementById(
              "gantt--scroll-top_virtual"
            );
            scrollVirtual.scrollTop = e.target.scrollTop
            const timelineContainerRelative = document.getElementsByClassName(
              " gantt--timeline--container__relative"
            )[0];
            timelineContainerRelative.scrollTop = e.target.scrollTop;
            timelineContainer.scrollTop = e.target.scrollTop;
            tableBody.scrollTop = e.target.scrollTop;
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(
              () => (window.scrollTimeline = false),
              100
            );
          }
        }}
        style={{
          height: heightTable - 50
        }} className="gantt--virtual__scroll">
        <div style={{
          height: dataSource.length * 37
        }}></div>
      </div>
      <div
        ref={ganttRef}
        id="offset-gantt-container"
        style={{
          width: renderFullDay
            ? maxWidth
            : showFullChart
              ? window.innerWidth - 80 - minLeft
              : left
                ? window.innerWidth - 80 - left
                : window.innerWidth - 80 - defaultLeft,
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
          id="drag-width-gantt-container"
        ></div>
        <div
          ref={scrollRef}
          className={
            visibleGantt.fromNowLayer
              ? `gantt-chart__container scroll-gantt`
              : "gantt-chart__container"
          }
          id="gantt-container-scroll"
          style={{
            height: heightTable,
          }}
          onScroll={(e) => {
            if (window.scrollTable || window.scrollTimeline || window.scrollTimelineVitural) return;
            if (!e.target.scrollTop) {
              const fetchNewTimeNotWork =
                Math.floor(e.target.scrollLeft / (700 * 48)) !==
                timeNotWorkUnit;
              if (fetchNewTimeNotWork) {
                timeNotWorkUnit = Math.floor(e.target.scrollLeft / (700 * 48));
                const fromDate = new moment(start).add(
                  700 * timeNotWorkUnit,
                  girdInstance.unit
                );
                const toDate = new moment(fromDate).add(700, girdInstance.unit);
                fetchTimeNotWork(
                  fromDate.format("YYYY-MM-DD"),
                  toDate.format("YYYY-MM-DD")
                );
              }
              if (Math.floor(e.target.scrollLeft / 48) !== scrollWidth) {
                const newScrollWidth = Math.floor(e.target.scrollLeft / 48);
                setScrollWidth(newScrollWidth);
                setLeftHeader(newScrollWidth * 48);
                setLeftTable(
                  Math.floor(e.target.scrollLeft / (48 * 7)) * 48 * 7
                );
              } else {
                const newScrollWidth = Math.floor(e.target.scrollLeft / 48);
                setLeftHeader(newScrollWidth * 48);
                setScrollWidth(newScrollWidth);
                setLeftTable(
                  Math.floor(e.target.scrollLeft / (48 * 7)) * 48 * 7
                );
              }
            }
          }}
        >
          {visibleGantt.fromNowLayer && (
            <div
              className="gantt--fromNowLayer__container"
              style={{
                width: widthFromNowLayer * 48,
              }}
            >
              <div
                className="gantt--fromNowLayer__background"
                style={{
                  width: widthFromNowLayer * 48,
                }}
              ></div>
              <div className="gantt--fromNowLayer__text">
                <div>Hôm nay</div>
                <div>{new moment().format("DD/MM/YYYY")}</div>
              </div>
            </div>
          )}
          <div
            style={{
              borderRight: "2px solid #e8e8e8",
              zIndex: 2,
            }}
          >
            {renderMonthHeader}
            <div
              style={{
                height: heightTable - 69,
              }}
              onScroll={(e) => {
                if (!window.scrollTable && !window.scrollTimelineVitural) {
                  window.scrollTimeline = true;
                  const tableBody = document.getElementsByClassName(
                    "ant-table-body"
                  )[0];
                  const scrollVirtual = document.getElementById(
                    "gantt--scroll-top_virtual"
                  );
                  scrollVirtual.scrollTop = e.target.scrollTop
                  tableBody.scrollTop = e.target.scrollTop;
                  if (timeoutId) clearTimeout(timeoutId);
                  timeoutId = setTimeout(
                    () => (window.scrollTimeline = false),
                    100
                  );
                }
              }}
              ref={scrollTimeLineRef}
              className="gantt--timeline--container"
            >
              <div
                className="gantt--timeline--container__relative"
                style={{
                  position: "relative",
                  height: heightTable - 69,
                  overflowY: "scroll",
                  overflowX: "hidden",
                  zIndex: 1000
                }}
              >
                <div>{renderTimeNotWork}</div>
                {timeline}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapDispatchToProps = {
  changeRowHover,
  scrollGantt,
};
const mapStateToProps = (state) => ({
  showFullChart: state.gantt.showFullChart,
  showHeader: state.gantt.showHeader,
  rowHover: state.gantt.rowHover,
  renderFullDay: state.gantt.renderFullDay,
  scrollGanttFlag: state.gantt.scrollGanttFlag,
  visibleGantt: state.gantt.visible.gantt,
  girdInstance: state.gantt.girdInstance,
  girdType: state.gantt.girdType,
});
export default connect(mapStateToProps, mapDispatchToProps)(GanttChart);
