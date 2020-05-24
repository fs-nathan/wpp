import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

const MonthHeader = ({
  girdInstance,
  allMonth,
  daysRender,
  scrollWidth,
  dataSource,
  leftHeader = 0,
  leftTable,
}) => {
  const [countDay, setCountDay] = useState(daysRender.length);
  const [countTask, setCountTask] = useState(dataSource.length);
  const [table, setTable] = useState([]);
  const containerRef = useRef();
  useEffect(() => {
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
  console.log(leftHeader, scrollWidth);
  const createTable = (axisX, axisY) => {
    let tempTable = [];
    for (let i = 0; i < axisX; i++) {
      let children = [];
      for (let j = 0; j < axisY; j++) {
        let backgroud = {};
        if ((j + 1) % 7 === 0 || (j + 2) % 7 === 0)
          backgroud = {
            backgroundColor: "#fafafa",
          };
        children.push(
          <td
            key={`${i}-${j}`}
            style={{
              border: "0.2px solid #fcfcfc",
              padding: "8.5px 0px",
              ...backgroud,
            }}
          >
            <div
              style={{
                width: 47,
                height: 20,
              }}
            ></div>
          </td>
        );
      }
      tempTable.push(<tr style={{ height: 37 }}>{children}</tr>);
    }
    return tempTable;
  };
  useEffect(() => {
    setTable(createTable(countTask, countDay));
  }, [countTask]);
  return (
    <React.Fragment>
      <div ref={containerRef} style={{ display: "flex" }}>
        {month}
      </div>
      <div
        style={{
          width: containerRef.current && containerRef.current.clientWidth,
        }}
        className="gantt-grid-background"
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            left: leftHeader,
            borderLeft: "2px solid #e8e8e8",
          }}
        >
          {day}
        </div>
        <div
          style={{
            position: "absolute",
            marginTop: 22.5,
            left: leftTable,
          }}
        >
          {table}
        </div>
      </div>
      <div></div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  girdInstance: state.gantt.girdInstance,
});
export default connect(mapStateToProps)(MonthHeader);
