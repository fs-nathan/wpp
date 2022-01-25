import ColumnNumber from "components/WPReactTable/components/ColumnNumber";
import ColumnOptions from "components/WPReactTable/components/ColumnOptions";
import React from "react";

export const convertFieldsToTable = (data, onOpenEditColumnModal) => {
  const result = [];
  data.forEach((item) => {
    if (item.id !== "pfd-name") {
      result.push({
        ...item,
        minWidth: 150,
        maxWidth: 480,
        Header: item.name,
        Cell: (props) => {
          return (
            <CellRender
              idType={item.id}
              nameType={item.name}
              optionsType={item.options}
              dataType={item.data_type}
              onOpenEditColumnModal={onOpenEditColumnModal}
              {...props}
            />
          );
        },
      });
    }
  });

  return result;
};

const CellRender = ({
  dataType,
  idType,
  nameType,
  optionsType = [],
  row,
  onOpenEditColumnModal = () => {},
  ...props
}) => {
  const taskId = row?.original?.id;
  const data = row?.original?.data[props.column.id] || {};

  if (row.depth === 0) return null;

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
          taskId={taskId}
          idType={idType}
          nameType={nameType}
          dataType={dataType}
          optionsType={optionsType}
          onEdit={onOpenEditColumnModal}
          {...data}
        />
      );
    default:
      return null;
  }

  // eslint-disable-next-line no-unreachable
  return <div>{data?.value}</div>;
};
