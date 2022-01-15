import classNames from "classnames";
import ColumnNumber from "components/WPReactTable/components/ColumnNumber";
import ColumnOptions from "components/WPReactTable/components/ColumnOptions";
import React from "react";
import styled from "styled-components";

export const getTaskToTable = (data) => {
  // console.log(data);
};

export const convertFieldsToTable = (data) => {
  return data.map((item) => ({
    ...item,
    Header: item.name,
    Cell: (props) => <CellRender props={props} />,
  }));
};

const CellRender = ({ props }) => {
  const data = props?.row?.original?.data[props.column.id] || {};
  if (props.row.depth === 0) return null;

  switch (data?.data_type) {
    case 1:
      return (
        <InputColumn
          className={classNames({ canHide: !!!data?.value })}
          placeholder="—"
          defaultValue={data?.value || ""}
        />
      );
    case 2:
      return <ColumnNumber {...data} />;
    case 3:
      // console.log(data);
      return <ColumnOptions {...data} />;
    default:
      return null;
  }

  // eslint-disable-next-line no-unreachable
  return <div>{data?.value}</div>;
};

const InputColumn = styled.input`
  height: 100%;
  border: 0;
  outline: 0;
  border-radius: 0;
  border-width: 0;
  box-sizing: border-box;
  background-color: transparent;
  width: 100%;

  &.canHide {
    visibility: hidden;
  }
  &.textRight {
    text-align: right;
  }
`;
