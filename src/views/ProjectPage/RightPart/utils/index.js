import classNames from "classnames";
import React, { useRef } from "react";
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
    default:
      return null;
  }

  // eslint-disable-next-line no-unreachable
  return <div>{data?.value}</div>;
};

const ColumnNumber = ({
  value: defaultValue = "",
  position_format = 1,
  format = "",
  ...props
}) => {
  const [value, setValue] = React.useState(defaultValue);
  const [isFocus, setIsFocus] = React.useState(false);
  const refValue = useRef(defaultValue);

  const _handleChange = (e) => {
    setValue(e.target.value);
    if (!isFocus) refValue.current = e.target.value;
  };

  const _handleBlur = (e) => {
    setIsFocus(false);
    e.target.closest(".td")?.classList?.remove("focus");
    if (isNaN(e.target.value)) setValue(refValue.current);
  };

  const _handleFocus = (e) => {
    e.target.closest(".td").classList.add("focus");
    setIsFocus(true);
  };

  const finalValue = () => {
    if (!isFocus)
      return `${position_format === 1 ? format : ""} ${value} ${
        position_format === 2 && format
      }`;
    return value;
  };

  return (
    <InputColumn
      className={classNames({
        canHide: !String(value).length,
        textRight: position_format === 2,
      })}
      onChange={_handleChange}
      onBlur={_handleBlur}
      onFocus={_handleFocus}
      placeholder="—"
      value={finalValue()}
    />
  );
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
