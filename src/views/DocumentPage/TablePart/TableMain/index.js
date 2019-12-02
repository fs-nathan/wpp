import React from 'react';
import { Table, TableHead, TableBody } from '@material-ui/core';
import TableBodyRow from './TableBodyRow';
import TableHeaderRow from './TableHeaderRow';

const TableMain = props => {
  const { data } = props;
  return (
    <Table>
      <TableHead>
        <TableHeaderRow {...props} />
      </TableHead>
      {data.columnOrder.map((columnId, index) => {
        const column = data.columns[columnId];
        const docs = column.tasksId.map(taskId => data.docs[taskId]);
        return (
          <TableBody key={index}>
            {docs.map((doc, idx) => (
              <TableBodyRow key={doc.id} doc={doc} index={idx} {...props} />
            ))}
          </TableBody>
        );
      })}
    </Table>
  );
};

export default TableMain;
