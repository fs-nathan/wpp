import { mdiDragVerticalVariant } from "@mdi/js";
import Icon from "@mdi/react";
import moment from "moment";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
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
  timelineColor,
  filterExportPdf,
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
  renderFullDay,
  scrollGanttFlag,
  widthTable,
  handleResizeTable,
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
  const { t } = useTranslation();
  let offsetLeft = 0;
  const handleMouseMove = (e) => {
    if (drag) {
      const nextPosX = e.clientX - currentX;
      if (nextPosX < minLeft) return;
      setLeft(e.clientX - currentX);
      handleResizeTable(e.clientX - currentX);
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
    // handleResize(e.clientX - offsetLeft);
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
    if (renderFullDay) {
      setLeftHeader(0);
      scrollRef.current.scrollLeft = 0;
      setLeftTable(0);
      setScrollWidth(0);
    }
  }, [renderFullDay]);
  useEffect(() => {
    if (scrollRef.current && scrollGanttFlag) {
      const widthFromNowLayer =
        new moment(Date.now()).diff(start, girdInstance.unit) + 1;
      scrollRef.current.scrollLeft = widthFromNowLayer * 30 - 500;
      scrollGantt(false);
    }
  }, [scrollGanttFlag]);
  const defaultLeft = minLeft + widthTable;
  const b = left ? { left: showFullChart ? minLeft : left } : {};
  let maxWidth;
  if (renderFullDay) {
    maxWidth = (end.diff(start, girdInstance.unit) + 1) * 30;
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
                const divs = document.getElementById(item.id);
                if (!divs) return;
                divs.style.backgroundColor = "#fffae6";
                const divss = document.getElementsByClassName(
                  "gantt--top-timeline-tr"
                );
                divss[index].style.backgroundColor = "#fffae6";
                const divsss = document.getElementById(`icon__${item.id}`);
                if (!divsss) return;
                divsss.style.backgroundColor = "#fffae6";
              }}
              onMouseOut={() => {
                const divs = document.getElementById(item.id);
                if (!divs) return;
                divs.style.backgroundColor =
                  item.isTotalDuration || item.isGroupTask ? "#fafafa" : "#fff";
                const divss = document.getElementsByClassName(
                  "gantt--top-timeline-tr"
                );
                divss[index].style.backgroundColor = "";
                const divsss = document.getElementById(`icon__${item.id}`);
                if (!divsss) return;
                divsss.style.backgroundColor = "#fff";
              }}
              className="gantt--top-timeline-tr"
              style={{
                position: "relative",
                padding: "8.5px 0px",
                display: "flex",
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
                dataSource={dataSource}
                index={index}
                startPosition={startPosition}
                endPosition={endPosition}
              />
            </div>
          </React.Fragment>
        );
      }),
    [dataSource, girdInstance, start, visibleGantt]
  );
  const renderTimeNotWork = useMemo(() => {
    return (
      <div style={{ position: "absolute" }}>
        <div style={{ position: "relative" }}>
          {visibleGantt.timeNotWork &&
            timeNotWork.map((item) => (
              <div
                style={{
                  background: timelineColor.timeNotWork,
                  position: "absolute",
                  width: 30,
                  height: dataSource.length * 32 - 2,
                  left:
                    new moment(
                      `${item.date}/${item.month}/${item.year}${
                        item.hour ? " " + item.hour : ""
                      }`,
                      `DD/MM/YYYY${item.hour ? " HH" : ""}`
                    ).diff(start, girdInstance.unit) * 30,
                }}
              ></div>
            ))}
        </div>
      </div>
    );
  }, [visibleGantt, timelineColor, timeNotWork, dataSource.length]);
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
        heightTable={heightTable}
      />
    ),
    [
      scrollWidth,
      heightTable,
      daysRender,
      monthArray,
      start,
      dataSource,
      leftHeader,
      leftTable,
    ]
  );
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
      {
        <div
          id="gantt--scroll-top_virtual"
          onScroll={(e) => {
            if (!window.scrollTable && !window.scrollTimeline) {
              window.scrollTimelineVitural = true;
              const tableBody =
                document.getElementsByClassName("ant-table-body")[0];
              const timelineContainer = document.getElementsByClassName(
                "gantt--timeline--container"
              )[0];
              const scrollVirtual = document.getElementById(
                "gantt--scroll-top_virtual"
              );
              const gridTable = document.getElementById("gantt_table_grid");
              gridTable.scrollTop = e.target.scrollTop;
              scrollVirtual.scrollTop = e.target.scrollTop;
              const timelineContainerRelative = document.getElementsByClassName(
                " gantt--timeline--container__relative"
              )[0];
              timelineContainerRelative.scrollTop = e.target.scrollTop;
              timelineContainer.scrollTop = e.target.scrollTop;
              tableBody.scrollTop = e.target.scrollTop;
              if (timeoutId) clearTimeout(timeoutId);
              timeoutId = setTimeout(
                () => (window.scrollTimelineVitural = false),
                100
              );
            }
          }}
          style={{
            height:
              dataSource.length * 32 > heightTable - 69
                ? heightTable - 69
                : dataSource.length * 32,
          }}
          className="gantt--virtual__scroll"
        >
          <div
            style={{
              height: dataSource.length * 32,
            }}
          ></div>
        </div>
      }
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
            height: renderFullDay ? dataSource.length * 32 + 50 : heightTable,
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
            height: renderFullDay ? dataSource.length * 32 + 50 : heightTable,
          }}
          onScroll={(e) => {
            if (e.target.scrollLeft + 16 >= e.target.scrollWidth) {
              e.target.scrollLeft = e.target.scrollWidth - 16;
              return;
            }
            if (
              window.scrollTable ||
              window.scrollTimeline ||
              window.scrollTimelineVitural
            )
              return;
            if (!e.target.scrollTop) {
              const fetchNewTimeNotWork =
                Math.floor(e.target.scrollLeft / (700 * 30)) !==
                  timeNotWorkUnit && visibleGantt.timeNotWork;
              if (fetchNewTimeNotWork) {
                timeNotWorkUnit = Math.floor(e.target.scrollLeft / (700 * 30));
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
              if (Math.floor(e.target.scrollLeft / 30) !== scrollWidth) {
                const newScrollWidth = Math.floor(e.target.scrollLeft / 30);
                setScrollWidth(newScrollWidth);
                setLeftHeader(newScrollWidth * 30);
                setLeftTable(
                  Math.floor(e.target.scrollLeft / (30 * 7)) * 30 * 7
                );
              } else {
                const newScrollWidth = Math.floor(e.target.scrollLeft / 30);
                setLeftHeader(newScrollWidth * 30);
                setScrollWidth(newScrollWidth);
                setLeftTable(
                  Math.floor(e.target.scrollLeft / (30 * 7)) * 30 * 7
                );
              }
            }
          }}
        >
          {!(
            Date.now() - end.toDate().getTime() > 0 ||
            Date.now() - start.toDate().getTime() < 0
          ) &&
            !(
              renderFullDay &&
              (new moment(filterExportPdf.start).diff(new moment()) > 0 ||
                new moment(filterExportPdf.end).diff(new moment()) <= 0)
            ) &&
            visibleGantt.fromNowLayer && (
              <div
                className="gantt--fromNowLayer__container"
                style={{
                  width:
                    Date.now() - end.toDate().getTime() > 0 ||
                    Date.now() - start.toDate().getTime() < 0
                      ? document.getElementById("getWidthContainer")
                          ?.scrollWidth
                      : widthFromNowLayer * 30,
                  height: renderFullDay
                    ? dataSource.length * 32 + 50
                    : dataSource.length * 32 + 50 > heightTable
                    ? heightTable
                    : dataSource.length * 32 + 50,
                }}
              >
                <div
                  className="gantt--fromNowLayer__background"
                  style={{
                    width:
                      Date.now() - end.toDate().getTime() > 0 ||
                      Date.now() - start.toDate().getTime() < 0
                        ? document.getElementById("getWidthContainer")
                            ?.scrollWidth
                        : widthFromNowLayer * 30,
                    height: renderFullDay
                      ? dataSource.length * 32 + 50
                      : dataSource.length * 32 + 50 > heightTable
                      ? heightTable
                      : dataSource.length * 32 + 50,
                  }}
                ></div>
                {!(
                  Date.now() - end.toDate().getTime() > 0 ||
                  Date.now() - start.toDate().getTime() < 0
                ) && (
                  <div className="gantt--fromNowLayer__text">
                    <div>{t("GANTT_TODAY_LABEL")}</div>
                    <div>{new moment().format("DD/MM/YYYY")}</div>
                  </div>
                )}
              </div>
            )}
          <div
            id="getWidthContainer"
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
                  const tableBody =
                    document.getElementsByClassName("ant-table-body")[0];
                  const scrollVirtual = document.getElementById(
                    "gantt--scroll-top_virtual"
                  );
                  const gridTable = document.getElementById("gantt_table_grid");
                  gridTable.scrollTop = e.target.scrollTop;
                  scrollVirtual.scrollTop = e.target.scrollTop;
                  if (tableBody) tableBody.scrollTop = e.target.scrollTop;
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
                  height:
                    dataSource.length * 32 > heightTable - 69
                      ? heightTable - 69
                      : dataSource.length * 32,
                  overflowY: "scroll",
                  overflowX: "hidden",
                  zIndex: 1000,
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
  timelineColor: state.gantt.timelineColor,
  showHeader: state.gantt.showHeader,
  renderFullDay: state.gantt.renderFullDay,
  scrollGanttFlag: state.gantt.scrollGanttFlag,
  filterExportPdf: state.gantt.filterExportPdf,
  visibleGantt: state.gantt.visible.gantt,
  girdInstance: state.gantt.girdInstance,
  girdType: state.gantt.girdType,
});
export default connect(mapStateToProps, mapDispatchToProps)(GanttChart);
