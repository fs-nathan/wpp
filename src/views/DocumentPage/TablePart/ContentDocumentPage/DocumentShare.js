import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Table, TableRow, TableHead, TableBody } from '@material-ui/core';
// import { useTranslation } from 'react-i18next';
import {
  mdiAccountPlusOutline,
  mdiDownloadOutline,
  mdiContentCopy
} from '@mdi/js';
import {
  selectDocumentItem,
  resetListSelectDocument,
  actionFetchListDocumentShare
} from '../../../../actions/documents';
import {
  StyledTableHeadCell,
  StyledTableBodyCell,
  FullAvatar,
  selectItem,
  selectAll,
  GreenCheckbox,
  selectAllRedux,
  selectItemRedux
} from '../DocumentComponent/TableCommon';
import ColorTypo from '../../../../components/ColorTypo';
import MoreAction from '../../../../components/MoreAction/MoreAction';
import { FileType } from '../../../../components/FileType';
import LoadingBox from '../../../../components/LoadingBox';
import { isEmpty } from '../../../../helpers/utils/isEmpty';
import './ContentDocumentPage.scss';

const DocumentShare = props => {
  const { isLoading, listDocumentShareToMe: listData } = props;
  const [selected, setSelected] = useState([]);
  // const { t } = useTranslation();

  useEffect(() => {
    fetDataDocumentShareToMe(); // eslint-disable-next-line
  }, []);
  useEffect(() => {
    return () => {
      props.resetListSelectDocument();
    }; // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (isEmpty(props.selectedDocument)) setSelected([]);
    // eslint-disable-next-line
  }, [props.selectedDocument]);
  const fetDataDocumentShareToMe = (params = {}, quite = false) => {
    props.actionFetchListDocumentShare(params, quite);
  };
  const handleSelectAllClick = e => {
    setSelected(selectAll(e, listData));
    props.selectDocumentItem(selectAllRedux(e, listData));
  };
  const isSelected = id => selected.indexOf(id) !== -1;
  const handleSelectItem = item => {
    setSelected(selectItem(selected, item.id));
    props.selectDocumentItem(selectItemRedux(props.selectedDocument, item));
  };
  const moreAction = [
    { icon: mdiAccountPlusOutline, text: 'Chia sẻ', type: 'share' },
    { icon: mdiContentCopy, text: 'Copy Link', type: 'copy' },
    {
      icon: mdiDownloadOutline,
      text: 'Tải xuống',
      type: 'download',
      action: () => {}
    }
  ];
  if (isLoading) {
    return <LoadingBox />;
  }
  return (
    <Fragment>
      <Table>
        <TableHead>
          <TableRow className="table-header-row">
            <StyledTableHeadCell>
              <GreenCheckbox
                onChange={handleSelectAllClick}
                checked={selected.length === listData.length}
                indeterminate={
                  selected.length > 0 && selected.length < listData.length
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
          {listData.map(file => {
            const isItemSelected = isSelected(file.id);
            return (
              <TableRow className="table-body-row" key={file.id}>
                <StyledTableBodyCell>
                  <GreenCheckbox
                    checked={isItemSelected}
                    onChange={e => handleSelectItem(file)}
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
    </Fragment>
  );
};

export default connect(
  state => ({
    selectedDocument: state.documents.selectedDocument,
    listDocumentShareToMe: state.documents.listDocumentShareToMe
  }),
  {
    selectDocumentItem,
    resetListSelectDocument,
    actionFetchListDocumentShare
  }
)(DocumentShare);
