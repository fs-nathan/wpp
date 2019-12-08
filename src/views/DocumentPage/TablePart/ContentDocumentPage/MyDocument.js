import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  IconButton
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiSwapVertical } from '@mdi/js';
import { useTranslation } from 'react-i18next';
import {
  mdiAccountPlusOutline,
  mdiFolderMove,
  mdiPencilOutline,
  mdiDownloadOutline,
  mdiTrashCanOutline
} from '@mdi/js';
import ColorTypo from '../../../../components/ColorTypo';
import { actionFetchMyDocument } from './ContentDocumentAction';
import { openDocumentDetail } from '../../../../actions/system/system';
import {
  selectDocumentItem,
  resetListSelectDocument
} from '../../../../actions/documents';
import MoreAction from '../../../../components/MoreAction/MoreAction';
import AlertModal from '../../../../components/AlertModal';
import './ContentDocumentPage.scss';
import {
  StyledTableHeadCell,
  StyledTableBodyCell,
  FullAvatar,
  CustomAvatar,
  selectItem,
  selectAll,
  GreenCheckbox
} from '../DocumentComponent/TableCommon';
import { FileType } from '../../../../components/FileType';

const MyDocument = props => {
  const [listData, setListData] = useState([]);
  const [alert, setAlert] = useState(false);
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchMyDocument();
  }, []);

  useEffect(() => {
    return () => {
      props.resetListSelectDocument();
    }; // eslint-disable-next-line
  }, []);

  const fetchMyDocument = async () => {
    try {
      const { data } = await actionFetchMyDocument();
      let tranformData = [];
      if (data.folders && data.folders.length > 0) {
        tranformData = data.folders.map(item => ({ ...item, type: 'folder' }));
      }
      if (data.documents && data.documents.length > 0) {
        tranformData = tranformData.concat(data.documents);
      }
      console.log(tranformData);
      setListData(tranformData);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectAllClick = e => {
    setSelected(selectAll(e, listData));
    props.selectDocumentItem(selectAll(e, listData));
  };

  const handleSelectItem = id => {
    setSelected(selectItem(selected, id));
    props.selectDocumentItem(selectItem(selected, id));
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  const moreAction = [
    { icon: mdiAccountPlusOutline, text: 'Chia sẻ', type: 'share' },
    { icon: mdiFolderMove, text: 'Di chuyển tới', type: 'move' },
    { icon: mdiPencilOutline, text: 'Đổi tên', type: 'change' },
    { icon: mdiDownloadOutline, text: 'Tải xuống', action: () => {} },
    { icon: mdiTrashCanOutline, text: 'Xóa', action: () => setAlert(true) }
  ];

  return (
    <React.Fragment>
      <Table>
        <TableHead>
          <TableRow className="table-header-row">
            <StyledTableHeadCell>
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
            <StyledTableHeadCell align="center" width="5%" />
            <StyledTableHeadCell align="left" width="30%">
              <div>
                Tên
                <IconButton size="small">
                  <Icon path={mdiSwapVertical} size={1.2} color="#8d8d8d" />
                </IconButton>
              </div>
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="10%">
              Chủ sở hữu
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="20%">
              Chia sẻ
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="20%">
              Sửa đổi lần cuối
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="10%">
              Kích cỡ tệp
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="5%" />
          </TableRow>
        </TableHead>
        <TableBody>
          {listData.map(item => {
            const isItemSelected = isSelected(item.id);
            return (
              <TableRow className="table-body-row" key={item.id}>
                <StyledTableBodyCell>
                  <GreenCheckbox
                    checked={isItemSelected}
                    onChange={e => handleSelectItem(item.id)}
                  />
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="5%">
                  <FullAvatar src={FileType(item.type)} />
                </StyledTableBodyCell>
                <StyledTableBodyCell align="left" width="30%">
                  <ColorTypo color="black">{item.name}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="10%">
                  {item.owner && item.owner.avatar && (
                    <CustomAvatar src={item.owner.avatar} />
                  )}
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="20%">
                  {item.shared_member &&
                    item.shared_member.length > 0 &&
                    item.shared_member.map(
                      (shareMember, idx) =>
                        shareMember.avatar && (
                          <CustomAvatar src={shareMember.avatar} key={idx} />
                        )
                    )}
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="20%">
                  <ColorTypo color="black">{item.updated_at || ''}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="10%">
                  <ColorTypo color="black">{item.size || '-'}</ColorTypo>
                </StyledTableBodyCell>
                {item.type !== 'folder' ? (
                  <MoreAction actionList={moreAction} item={item} />
                ) : (
                  <StyledTableBodyCell align="center" width="5%" />
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <AlertModal
        open={alert}
        setOpen={setAlert}
        content={t('views.user_page.left_part.department_info.alert_content')}
        onConfirm={() => console.log('ok')}
      />
    </React.Fragment>
  );
};

export default connect(
  state => ({
    selectedDocument: state.documents.selectedDocument
  }),
  {
    selectDocumentItem,
    resetListSelectDocument,
    openDocumentDetail
  }
)(MyDocument);
