import ColumnDateSelect from "components/WPReactTable/components/ColumnDateSelect";
import ColumnMembers from "components/WPReactTable/components/ColumnMembers";
import ColumnNumber from "components/WPReactTable/components/ColumnNumber";
import ColumnOptions from "components/WPReactTable/components/ColumnOptions";
import ColumnStatusTask from "components/WPReactTable/components/ColumnStatusTask";
import React from "react";
import { useTranslation } from "react-i18next";
import { COLUMNS_TASK_TABLE } from "../constant/Columns";

export const convertFieldsToTable = (
  data,
  onOpenEditColumnModal,
  handleReload = () => {}
) => {
  const result = [];

  console.log("@Pham_Tinh_Console:", data);
  data.forEach((item) => {
    if (
      item.id !== "pfd-name" &&
      item.id !== "name" &&
      item.id !== "add-column" &&
      item.is_show
    ) {
      result.push({
        ...item,
        minWidth: 150,
        maxWidth: 480,
        Header: (props) => {
          return <RenderHeader name={item.name} {...props} />;
        },
        Cell: (props) => {
          return (
            <CellRender
              idType={item.id}
              nameType={item.name}
              optionsType={item.options}
              dataType={item.data_type}
              onOpenEditColumnModal={onOpenEditColumnModal}
              handleReload={handleReload}
              {...props}
            />
          );
        },
      });
    }
  });

  return [
    COLUMNS_TASK_TABLE[0],
    ...result,
    COLUMNS_TASK_TABLE[COLUMNS_TASK_TABLE.length - 1],
  ];
};

const RenderHeader = ({ name, ...props }) => {
  const { t } = useTranslation();
  return t(name);
};

const CellRender = ({
  dataType,
  idType,
  nameType,
  optionsType = [],
  row,
  onOpenEditColumnModal = () => {},
  handleReload = () => {},
  ...props
}) => {
  const taskId = row?.original?.id;
  const data = row?.original?.data[props.column.id] || {};

  if (row.depth === 0) return null;

  // eslint-disable-next-line default-case
  switch (idType) {
    case "pfd-priority":
      return (
        <ColumnOptions
          taskId={taskId}
          idType={idType}
          nameType={nameType}
          dataType={dataType}
          isDisplayEditField={false}
          isRenderNullField={false}
          optionsType={[
            { id: 1, _id: 1, name: "Thấp", value: 0, color: "#03C30B" },
            { id: 2, _id: 2, name: "Trung bình", value: 1, color: "#FF9800" },
            { id: 3, _id: 3, name: "Cao", value: 2, color: "#ff0000" },
          ]}
          isDisplay
          onEdit={onOpenEditColumnModal}
          {...data}
        />
      );
    case "pfd-member":
      return (
        <ColumnMembers
          value={data.value}
          taskId={taskId}
          dataCell={data}
          isGetDataUser
        />
      );
    case "pfd-time-start":
    case "pfd-time-end":
      return (
        <ColumnDateSelect
          value={data.value}
          taskId={taskId}
          dataCell={row?.original}
          handleReload={handleReload}
        />
      );
    case "pfd-status":
      return (
        <ColumnStatusTask
          statusCode={data.option_value}
          fieldLabel={data.field_label}
          taskId={taskId}
          complete={row.original.complete}
        />
      );
  }

  // eslint-disable-next-line default-case
  switch (dataType) {
    case 1:
    case 2:
      return (
        <ColumnNumber
          taskId={taskId}
          idType={idType}
          dataType={dataType}
          {...(props?.column || {})}
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
  }

  return <div>{data?.value}</div>;
};
