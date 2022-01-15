import classNames from "classnames";
import ColumnNumber from "components/WPReactTable/components/ColumnNumber";
import ColumnOptions from "components/WPReactTable/components/ColumnOptions";
import React from "react";

export const getTaskToTable = (data) => {
  // console.log(data);
};

export const convertFieldsToTable = (data) => {
  return data.map((item) => {
    return {
      ...item,
      Header: item.name,
      Cell: (props) => <CellRender dataType={item.data_type} props={props} />,
    };
  });
};

const CellRender = ({ dataType, props }) => {
  const data = props?.row?.original?.data[props.column.id] || {};
  if (props.row.depth === 0) return null;

  switch (dataType) {
    case 1:
    case 2:
      return <ColumnNumber {...data} />;
    case 3:
      return <ColumnOptions {...data} />;
    default:
      return null;
  }

  // eslint-disable-next-line no-unreachable
  return <div>{data?.value}</div>;
};
