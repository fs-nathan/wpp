import React from "react";
import { useTable } from "react-table";
import Avatar from "components/CustomAvatar";
import styled from "styled-components";

const TableResultWorking = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Nhân viên",
        accessor: "firstName",
        Cell: () => (
          <WrapperMember>
            <Avatar
              alt="Logo"
              src="https://testapi.workplus.vn/images_default/bt6.png"
              style={{ width: 20, height: 20 }}
            />
            <span>Nguyễn Văn A</span>
          </WrapperMember>
        ),
      },
      {
        Header: "Công việc",
        accessor: "lastName",
      },
      {
        id: "lo2",
        Header: "Đang chờ",
        accessor: "age",
      },
      {
        Header: "Đang làm",
        accessor: "age",
      },
      {
        Header: "Quá hạn",
        accessor: "visits",
      },
      {
        Header: "Hoàn thành",
        accessor: "status",
      },
    ],
    []
  );

  const data = React.useMemo(() => makeData(20), []);
  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  );
};

function Table({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableResultWorking;

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  return {
    firstName: 1,
    lastName: 1,
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status: Math.floor(Math.random() * 100),
  };
};

function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

const WrapperMember = styled.div`
  display: flex;
  align-items: center;
  span {
    display: block;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
  }
`;

const Styles = styled.div`
  overflow-x: auto;
  table {
    margin-top: 10px;
    width: 100%;
    border-spacing: 0;
    overflow-x: auto;

    tr {
      width: 100%;
      th {
        width: 10%;
        border-top: 1px solid rgb(232, 232, 232);
        :first-child {
          width: 50%;
          border-left: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid rgb(232, 232, 232);
      border-right: 1px solid rgb(232, 232, 232);
      text-align: center;
      :last-child {
        border-right: 0;
      }
    }
    th {
      padding: 0.55rem;
    }
  }
`;
