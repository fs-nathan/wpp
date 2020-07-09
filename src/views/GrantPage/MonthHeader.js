import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

const MonthHeader = ({
  girdInstance,
  allMonth,
  visibleGantt,
  timelineColor,
  daysRender,
  scrollWidth,
  dataSource,
  leftHeader = 0,
  leftTable,
  heightTable
}) => {
  const [countDay, setCountDay] = useState(daysRender.length);
  const [countTask, setCountTask] = useState(dataSource.length);
  const [table, setTable] = useState([]);
  const containerRef = useRef();
  useEffect(() => {
    console.log("daysRender.length", daysRender.length)
    setCountDay(daysRender.length);
  }, [daysRender.length]);
  useEffect(() => {
    setCountTask(dataSource.length);
  }, [dataSource.length]);

  const month = allMonth.map((item) => (
    <div
      className="gantt--parent-header"
      style={{
        width: item.width,
      }}
    >
      {item.text}
    </div>
  ));
  const day = daysRender.map((item, index) => (
    <div className="gantt--child-header">
      {new moment(item)
        .add(scrollWidth, girdInstance.unit)
        .format(girdInstance.formatChild)}
    </div>
  ));
  const createTable = (axisX, axisY) => {
    let tempTable = [];
    for (let i = 0; i < axisX; i++) {
      let children = [];
      for (let j = 0; j < axisY + girdInstance.addUnit; j++) {
        let backgroud = {};
        children.push(
          <div
            key={`${i}-${j}`}
            style={{
              border: `0.2px solid ${timelineColor.gridTable}`,
              padding: "8.5px 0px",
              width: 35,
              ...backgroud,
            }}
          >
            <div
              style={{
                width: 47,
                height: 20,
              }}
            ></div>
          </div>
        );
      }
      tempTable.push(
        <div style={{ height: 37, display: "flex" }}>{children}</div>
      );
    }
    return tempTable;
  };
  useEffect(() => {
    setTable(createTable(countTask, countDay));
  }, [countTask, countDay, timelineColor]);
  return (
    <React.Fragment>
      <div ref={containerRef} style={{ display: "flex" }}>
        {month}
      </div>
      <div
        style={{
          width: containerRef.current && containerRef.current.clientWidth,
          height: dataSource.length * 37,
        }}
        className="gantt-grid-background"
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            left: leftHeader,
            zIndex: 1001,
          }}
        >
          {day}
        </div>
        <div
          id="gantt_table_grid"
          style={{
            position: "absolute",
            marginLeft: 1,
            marginTop: 23.8,
            left: leftTable,
            overflow: 'scroll',
            height: heightTable - 50
          }}
        >
          {visibleGantt.gridTable && table}
        </div>
      </div>
      <div></div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  girdInstance: state.gantt.girdInstance,
  visibleGantt: state.gantt.visible.gantt,
  timelineColor: state.gantt.timelineColor,
});
export default connect(mapStateToProps)(MonthHeader);
