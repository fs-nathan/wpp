import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TablePagination
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import {
  mdiAccountPlusOutline,
  mdiDownloadOutline,
  mdiTrashCanOutline
} from '@mdi/js';

// import { getDocumentShareFromMe } from './ContentDocumentAction';
import {
  selectDocumentItem,
  resetListSelectDocument
} from '../../../../actions/documents';
import AlertModal from '../../../../components/AlertModal';
import { FileType } from '../../../../components/FileType';

import {
  StyledTableHeadCell,
  StyledTableBodyCell,
  FullAvatar,
  selectItem,
  selectAll,
  GreenCheckbox
} from '../DocumentComponent/TableCommon';

import ColorTypo from '../../../../components/ColorTypo';
import MoreAction from '../../../../components/MoreAction/MoreAction';

import './ContentDocumentPage.scss';

const DocumentShareFromMe = props => {
  const [data] = useState([
    {
      id: '1111',
      content: 20,
      name: 'Dự án thiết kế website Phúc An',
      type: 'folder',
      location: 'Văn Thư',
      size: '10.3 Kb',
      date: '02/02/2019',
      userShare: 'Tra Quoc Huy',
      userCreate: 'Cao Văn Hưng'
    }
  ]);
  const [page] = useState(0);
  const [rowsPerPage] = useState(10);
  const [alert, setAlert] = useState(false);
  const [selected, setSelected] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetDataRecentDocument();
  }, []);
  useEffect(() => {
    return () => {
      props.resetListSelectDocument();
    };
    // eslint-disable-next-line
  }, []);
  const fetDataRecentDocument = async () => {
    // const { data } = await getDocumentShareFromMe();
  };
  const handleSelectAllClick = e => {
    setSelected(selectAll(e, data));
    props.selectDocumentItem(selectAll(e, data));
  };
  const isSelected = id => selected.indexOf(id) !== -1;
  const handleSelectItem = id => {
    setSelected(selectItem(selected, id));
    props.selectDocumentItem(selectItem(selected, id));
  };
  const moreAction = [
    { icon: mdiAccountPlusOutline, text: 'Chia sẻ', type: 'share' },
    { icon: mdiDownloadOutline, text: 'Tải xuống', action: () => {} },
    { icon: mdiTrashCanOutline, text: 'Xóa', action: () => setAlert(true) }
  ];
  const handleChangePage = () => {};
  return (
    <Fragment>
      <Table>
        <TableHead>
          <TableRow className="table-header-row">
            <StyledTableHeadCell>
              <GreenCheckbox
                onChange={handleSelectAllClick}
                checked={selected.length === data.length}
                indeterminate={
                  selected.length > 0 && selected.length < data.length
                }
              />
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="5%">
              Loại
            </StyledTableHeadCell>
            <StyledTableHeadCell align="left" width="30%">
              Tên tài liệu
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="10%">
              Ngày chia sẻ
            </StyledTableHeadCell>
            <StyledTableHeadCell align="left" width="20%">
              Người được chia sẻ
            </StyledTableHeadCell>
            <StyledTableHeadCell align="left" width="20%">
              Chủ sở hữu
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="10%">
              Kích thước
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="5%" />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(file => {
            const isItemSelected = isSelected(file.id);
            return (
              <TableRow className="table-body-row" key={file.id}>
                <StyledTableBodyCell>
                  <GreenCheckbox
                    checked={isItemSelected}
                    onChange={e => handleSelectItem(file.id)}
                  />
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="5%">
                  <FullAvatar src={FileType(file.type)} />
                </StyledTableBodyCell>
                <StyledTableBodyCell align="left" width="30%">
                  <ColorTypo color="black">{file.name}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="10%">
                  <ColorTypo color="black">{file.date}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="left" width="20%">
                  <ColorTypo color="black">{file.userShare}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="left" width="20%">
                  <ColorTypo color="black">{file.userCreate}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="10%">
                  <ColorTypo color="black">{file.size}</ColorTypo>
                </StyledTableBodyCell>
                <MoreAction actionList={moreAction} item={file} />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={1}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        // onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <AlertModal
        open={alert}
        setOpen={setAlert}
        content={t('views.user_page.left_part.department_info.alert_content')}
        onConfirm={() => console.log('ok')}
      />
    </Fragment>
  );
};

export default connect(
  state => ({
    selectedDocument: state.documents.selectedDocument
  }),
  {
    selectDocumentItem,
    resetListSelectDocument
  }
)(DocumentShareFromMe);
