import ColumnNumber from "components/WPReactTable/components/ColumnNumber";
import ColumnOptions from "components/WPReactTable/components/ColumnOptions";
import React from "react";

export const convertFieldsToTable = (data) => {
  return data.map((item) => {
    return {
      ...item,
      Header: item.name,
      Cell: (props) => (
        <CellRender
          idType={item.id}
          optionsType={item.options}
          dataType={item.data_type}
          props={props}
        />
      ),
    };
  });
};

const CellRender = ({ dataType, idType, optionsType = [], props }) => {
  const taskId = props?.row?.original?.id;
  const data = props?.row?.original?.data[props.column.id] || {};

  if (props.row.depth === 0) return null;

  switch (dataType) {
    case 1:
    case 2:
      return (
        <ColumnNumber
          taskId={taskId}
          idType={idType}
          dataType={dataType}
          optionsType={optionsType}
          {...data}
        />
      );
    case 3:
      return (
        <ColumnOptions
          idType={idType}
          dataType={dataType}
          optionsType={optionsType}
          {...data}
        />
      );
    default:
      return null;
  }

  // eslint-disable-next-line no-unreachable
  return <div>{data?.value}</div>;
};
