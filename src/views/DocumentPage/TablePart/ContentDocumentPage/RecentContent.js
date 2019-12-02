import React, { useEffect } from 'react';
import { Table, TableHead } from '@material-ui/core';
// import TableBodyRow from '../TableMain/TableBodyRow';
import TableHeaderRow from '../TableMain/TableHeaderRow';

// import { getDocumentRecently } from './ContentDocumentAction';

import { RECENT_TAB } from '../../../../constants/documentTab';
import './ContentDocumentPage.scss';

const RecentContent = () => {
  useEffect(() => {
    fetDataRecentDocument();
  }, []);
  const fetDataRecentDocument = async () => {
    // const {data} = await getDocumentRecently()
  };
  return (
    <Table>
      <TableHead>
        <TableHeaderRow activeTabId={RECENT_TAB.id} />
      </TableHead>
    </Table>
  );
};

export default RecentContent;
