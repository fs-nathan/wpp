import React from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";

export const COLUMNS_TASK_TABLE = [
  {
    Header: "Tên công việc",
    accessor: "name",
    headerClassName: "sticky",
    minWidth: 420,
    maxWidth: 620,
    sticky: "left",
  },
  {
    Header: "Trạng thái",
    accessor: "status",
  },
  {
    Header: "Bắt đầu",
    accessor: "start",
  },
  {
    Header: "Kết thúc",
    accessor: "end",
  },
  {
    Header: (props) => <AddColumnHeader {...props} />,
    accessor: "add",
  },
];

const AddColumnHeader = () => {
  return (
    <>
      <AddIcon />
    </>
  );
};
