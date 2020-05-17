import { mdiTriangle } from "@mdi/js";
import Icon from "@mdi/react";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { ResizableBox } from "react-resizable";
import "./test.css";

const Circle = ({ left, show }) => (
  <div
    style={{
      left,
      backgroundColor: show ? "#fafafa" : "transparent",
      border: `1px solid ${show ? "rgba(59, 59, 59, 0.25)" : "transparent"}`,
    }}
    className="gantt-dot-circle"
  ></div>
);

const TimeLine = ({
  startPosition,
  isTotalDuration,
  setProcessDatasource,
  girdInstance,
  endPosition,
  canEdit,
  index,
  setDataSource,
  dataSource,
  startDate,
  endDate,
  timelineColor,
  visibleGantt,
  isGroupTask,
}) => {
  const totalTimeRef = useRef();
  const refProcess = useRef();
  const refFirstResize = useRef();
  const [left, setLeft] = useState(null);
  const [resizeWidth, setResizeWidth] = useState(0);
  const [width, setWidth] = useState(endPosition * 48);
  const [showResize, setShowResize] = useState(false);
  const [widthProcess, setWidthProcess] = useState(dataSource[index].complete);
  const [startDateText, setStartDateText] = useState(new moment(startDate));
  const [endDateText, setEndDateText] = useState(new moment(endDate));
  const [a, setA] = useState(0);
  const [dragFirstResize, setDragFirstResize] = useState(false);
  const [widthComplete, setWidthComplete] = useState(
    (dataSource[index].complete * width) / 100
  );
  const [drag, setDrag] = useState(0);
  let offsetLeft = 0;
  if (totalTimeRef.current) {
    offsetLeft = totalTimeRef.current.offsetLeft;
  }
  useEffect(() => {
    setWidthComplete((dataSource[index].complete * width) / 100);
  }, [width]);
  useEffect(() => {
    setStartDateText(new moment(startDate));
  }, [startDate, girdInstance]);
  useEffect(() => {
    setWidthProcess(dataSource[index].complete);
  }, [dataSource, girdInstance]);
  useEffect(() => {
    setEndDateText(new moment(endDate));
  }, [endDate, girdInstance]);
  useEffect(() => {
    setLeft(startPosition * 48);
  }, [startPosition, dataSource, girdInstance]);
  useEffect(() => {
    setWidth(endPosition * 48);
  }, [endPosition, dataSource, resizeWidth, startPosition, girdInstance]);
  const handleMouseMove = (e) => {
    console.log("vo day", dragFirstResize);
    if (!drag) return;
    if (dragFirstResize) {
      handleMouseMoveFirst(e);
      return;
    }
    const newPosition = e.pageX - a > 0 ? e.pageX - a : 0;
    const amountUnitAdd = (newPosition - startPosition * 48) / 48;

    const roundAmountUnitAdd =
      amountUnitAdd > 0
        ? Math.ceil(amountUnitAdd - 1, girdInstance.unit)
        : Math.round(amountUnitAdd - 1, girdInstance.unit);
    setStartDateText(
      new moment(startDate).add(roundAmountUnitAdd, girdInstance.unit)
    );
    setEndDateText(
      new moment(endDate).add(roundAmountUnitAdd, girdInstance.unit)
    );
    setLeft(newPosition);
    e.stopPropagation();
    e.preventDefault();
  };
  const handleMouseMoveFirst = (e) => {
    if (!drag && !dragFirstResize) return;
    const newPosition = e.pageX - a > 0 ? e.pageX - a : 0;
    if (dragFirstResize) {
      const newWidth = width - (newPosition - left);
      setWidth(newWidth);
      setWidthComplete((dataSource[index].complete * newWidth) / 100);
    }
    const amountUnitAdd = (newPosition - startPosition * 48) / 48;
    const roundAmountUnitAdd =
      amountUnitAdd > 0
        ? Math.floor(amountUnitAdd, girdInstance.unit)
        : Math.floor(amountUnitAdd, girdInstance.unit);
    setStartDateText(
      new moment(startDate).add(roundAmountUnitAdd, girdInstance.unit)
    );
    if (!dragFirstResize)
      setEndDateText(
        new moment(endDate).add(roundAmountUnitAdd, girdInstance.unit)
      );
    setLeft(newPosition);
    e.stopPropagation();
    e.preventDefault();
  };
  const handleMouseDown = (e) => {
    e.preventDefault();
    if (isGroupTask || isTotalDuration || !canEdit) return;
    const className = e.target.className;
    if (
      !className.indexOf ||
      className.indexOf("react-resizable-handle") !== -1 ||
      className.indexOf("gantt-dot-circle") !== -1 ||
      className.indexOf("container-icon-drag-duration") !== -1
    )
      return;
    setDrag(true);
    setA(e.pageX - offsetLeft);
  };
  const handleMouseUp = (e) => {
    e.preventDefault();
    if (!drag && !dragFirstResize) return;
    const surplus = left % 48;
    const newLeft = left - surplus;
    const newWidth = dragFirstResize ? (width + left - newLeft) / 48 : width;
    // setLeft(newLeft)
    // if(dragFirstResize){
    //     setWidth(width + left - newLeft)
    // }
    setDrag(false);
    setDragFirstResize(false);
    handleChange(newLeft / 48, (left + width) / 48);
  };
  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  });
  const handleResizeStop = (e, node) => {
    if (isGroupTask || isTotalDuration || !canEdit) return;
    const newResizeWidth = node.size.width;
    if (newResizeWidth === width) return;
    const add = newResizeWidth > width ? 1 : 0;
    const end = (newResizeWidth - (newResizeWidth % 48)) / 48 + left / 48;
    handleChange(left / 48, end + add);
  };
  const handleProcessResize = (e, node) => {
    const currentProcessWidth = node.size.width;
    const newProcess = Math.ceil((currentProcessWidth / width) * 100);
    setWidthProcess(newProcess);
  };
  const handleProcessResizeStop = (e, node) => {
    const currentProcessWidth = node.size.width;
    const newProcess = Math.ceil((currentProcessWidth / width) * 100);
    console.log(newProcess);
    setProcessDatasource(newProcess, index);
  };
  const handleChange = (start, end) => {
    setDataSource(index, start, end);
  };
  const handleResizeWidth = (e, node) => {
    if (isGroupTask || isTotalDuration || !canEdit) return;
    const newResizeWidth = node.size.width;
    const amountUnitAdd = (newResizeWidth - width) / 48;
    const roundAmountUnitAdd =
      amountUnitAdd > 0
        ? Math.ceil(amountUnitAdd, girdInstance.unit)
        : Math.round(amountUnitAdd, girdInstance.unit);
    setWidthComplete((dataSource[index].complete * newResizeWidth) / 100);
    setEndDateText(
      new moment(endDate).add(roundAmountUnitAdd, girdInstance.unit)
    );
  };
  const b = left ? { left } : {};
  const styleWidthGroupTask = isGroupTask ? { style: { width } } : {};
  if (isGroupTask && !visibleGantt.group) return null;
  if (
    !isGroupTask &&
    !isTotalDuration &&
    !isTotalDuration &&
    !visibleGantt.task
  )
    return null;
  if (isTotalDuration && !visibleGantt.total) return null;
  return (
    <React.Fragment>
      <div
        ref={totalTimeRef}
        //   onMouseOver={() => {
        //     setDrag(false)
        // }}
        onMouseLeave={() => {
          setShowResize(false);
        }}
        onMouseEnter={() => {
          setShowResize(true);
        }}
        // onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMoveFirst}
        style={{
          display: "flex",
          cursor:
            !isGroupTask && !isTotalDuration && canEdit ? "move" : "default",
          width: "fit-content",
          top: "50%",
          transform: "translateY(-50%)",
          position: "absolute",
          ...b,
        }}
      >
        {visibleGantt.date && (
          <p className="gantt--start-timeline">
            {isGroupTask
              ? startDate.format("DD/MM/YYYY")
              : startDateText.format("DD/MM/YYYY")}
          </p>
        )}
        <ResizableBox
          minConstraints={[48, 0]}
          className="container-resizable"
          {...styleWidthGroupTask}
          lockAspectRatio={
            !isGroupTask && !isTotalDuration && canEdit ? false : true
          }
          handle={() => (
            <span
              className={
                !isGroupTask &&
                !isTotalDuration &&
                canEdit &&
                `resize-width react-resizable-handle`
              }
            >
              {!isGroupTask && !isTotalDuration && (
                <Circle show={showResize} left={9} />
              )}
            </span>
          )}
          onResizeStop={handleResizeStop}
          onResize={handleResizeWidth}
          width={width}
        >
          <div
            ref={refFirstResize}
            onMouseDown={(e) => {
              setDrag(true);
              setDragFirstResize(true);
              setA(e.pageX - offsetLeft);
            }}
            className="resize-width"
            // onMouseUp={handleMouseUpFirstResize}
          >
            {!isGroupTask && !isTotalDuration && canEdit && (
              <Circle show={showResize} left={-15} />
            )}
          </div>
          <div
            style={{
              background: isTotalDuration
                ? timelineColor.total
                : isGroupTask
                ? timelineColor.group
                : timelineColor.task,
            }}
            className="gantt--time-task"
          ></div>
        </ResizableBox>
        {visibleGantt.date && (
          <p className="gantt--end-timeline">
            {endDateText.format("DD/MM/YYYY")}
          </p>
        )}
        {visibleGantt.name && (
          <p className="gantt--name-timeline">{dataSource[index].name}</p>
        )}
      </div>
      <div
        //  onMouseOver={() => {
        //     setDrag(false)
        // }}
        onMouseLeave={() => setShowResize(false)}
        onMouseEnter={() => {
          setShowResize(true);
        }}
        // onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        style={{
          display: "flex",
          top: "50%",
          transform: "translateY(-50%)",
          position: "absolute",
          cursor:
            !isGroupTask && !isTotalDuration && !isTotalDuration && canEdit
              ? "move"
              : "default",
          ...b,
        }}
      >
        {visibleGantt.duration && (
          <ResizableBox
            onResize={handleProcessResize}
            onResizeStop={handleProcessResizeStop}
            minConstraints={[0, 0]}
            maxConstraints={[width, width]}
            width={widthComplete}
            handle={() => (
              <span
                // style ={{
                //     display: showResize ? 'block' : 'none'
                // }}
                className={`resize-duration react-resizable-handle`}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {!isGroupTask && !isTotalDuration && canEdit && (
                  <span className="container-icon-drag-duration">
                    <span>
                      <Icon
                        style={{ fill: showResize ? "#d1cfcf" : "transparent" }}
                        width={10}
                        path={mdiTriangle}
                      />
                    </span>
                  </span>
                )}
              </span>
            )}
          >
            <div
              style={{ background: timelineColor.duration }}
              className="gantt--duration-task"
              ref={refProcess}
            >
              <div className="duration-text-gantt">
                {visibleGantt.numberDuration && widthProcess + "%"}
              </div>
            </div>
          </ResizableBox>
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  timelineColor: state.gantt.timelineColor,
  visibleGantt: state.gantt.visible.gantt,
  girdInstance: state.gantt.girdInstance,
});

export default connect(mapStateToProps)(TimeLine);