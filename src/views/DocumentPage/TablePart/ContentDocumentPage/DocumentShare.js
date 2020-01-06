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
  CustomAvatar,
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
import ShareDocumentModal from '../DocumentComponent/ShareDocumentModal';

const DocumentShare = props => {
  const { isLoading } = props;
  const [listData, setListData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [visible, setVisible] = useState(false);
  const [itemActive, setItemActive] = useState({});
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

  useEffect(() => {
    setListData(props.listDocumentShareToMe);
    // eslint-disable-next-line
  }, [props.listDocumentShareToMe]);

  useEffect(() => {
    const dataUpdate = handleSearchData(
      props.searchText,
      props.listDocumentShareToMe
    );
    setListData(dataUpdate);
    // eslint-disable-next-line
  }, [props.searchText]);

  const handleSearchData = (valueSearch, listData) => {
    let listResult = [];
    if (!isEmpty(valueSearch)) {
      listResult = listData.filter(
        el => el.name.toLowerCase().indexOf(valueSearch.toLowerCase()) !== -1
      );
    } else {
      listResult = listData;
    }
    return listResult;
  };

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
      <Table stickyHeader>
        <TableHead>
          <TableRow className="table-header-row">
            <StyledTableHeadCell align="center" width="3%">
              <GreenCheckbox
                onChange={handleSelectAllClick}
                checked={
                  listData.length > 0 && selected.length === listData.length
                }
                indeterminate={
                  selected.length > 0 && selected.length < listData.length
                }
              />
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="5%">
              Loại
            </StyledTableHeadCell>
            <StyledTableHeadCell align="left">Tên tài liệu</StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="20%">
              Chia sẻ
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="10%">
              Ngày chia sẻ
            </StyledTableHeadCell>
            <StyledTableHeadCell align="left" width="15%">
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
              <TableRow
                className={`table-body-row ${isItemSelected ? 'selected' : ''}`}
                key={file.id}
              >
                <StyledTableBodyCell width="3%">
                  <GreenCheckbox
                    checked={isItemSelected}
                    onChange={e => handleSelectItem(file)}
                  />
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="5%">
                  <FullAvatar src={FileType(file.type)} />
                </StyledTableBodyCell>
                <StyledTableBodyCell align="left">
                  <ColorTypo color="black">{file.name}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="20%">
                  {!isEmpty(file.users_shared) &&
                    file.users_shared.map(
                      (shareMember, idx) =>
                        shareMember.avatar && (
                          <CustomAvatar
                            src={shareMember.avatar}
                            key={idx}
                            onClick={() => {
                              setVisible(true);
                              setItemActive(file);
                            }}
                          />
                        )
                    )}
                  {/* {file.users_shared && (
                    <CustomAvatar
                      src={file.users_shared.avatar}
                      onClick={() => {
                        setVisible(true);
                        setItemActive(file);
                      }}
                    />
                  )} */}
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="10%">
                  <ColorTypo color="black">{file.date}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="left" width="15%">
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
      {visible && (
        <ShareDocumentModal
          onClose={() => {
            setVisible(false);
            setItemActive({});
          }}
          item={itemActive}
        />
      )}
    </Fragment>
  );
};

export default connect(
  state => ({
    selectedDocument: state.documents.selectedDocument,
    listDocumentShareToMe: state.documents.listDocumentShareToMe,
    searchText: state.documents.searchText
  }),
  {
    selectDocumentItem,
    resetListSelectDocument,
    actionFetchListDocumentShare
  }
)(DocumentShare);
