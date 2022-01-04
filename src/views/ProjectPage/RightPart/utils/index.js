import styled from "styled-components";
import React from "react";

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
      return <InputColumn placeholder="—" defaultValue={data?.value || ""} />;
    case 2:
      return <ColumnNumber {...data} />;
    default:
      return null;
  }

  // eslint-disable-next-line no-unreachable
  return <div>{data?.value}</div>;
};

const ColumnNumber = ({ value }) => {
  return (
    <WrapperColumn>
      <InputColumn placeholder="—" defaultValue={value || ""} />
    </WrapperColumn>
  );
};

const InputColumn = styled.input`
  height: 100%;
  border: 0;
  outline: 0;
  padding: 0 7px;
  border-radius: 0;
  border-width: 0;
  box-sizing: border-box;
  background-color: transparent;
  &:focus {
    background-color: #fff;
  }
`;
const WrapperColumn = styled.div`
  margin-right: -1px;
  background-color: #fff;
  border: 1px solid #edeae9;
  box-sizing: border-box;
  padding: 0 8px;
  z-index: 0;
  align-items: center;
  display: flex;
  height: 37px;
  overflow: hidden;
`;
