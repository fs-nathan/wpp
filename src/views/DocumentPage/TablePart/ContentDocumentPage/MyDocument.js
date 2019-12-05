import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Table,
  TableHead,
  TableBody,
  TableSortLabel
} from '@material-ui/core';
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
import MoreAction from '../../../../components/MoreAction/MoreAction';
import AlertModal from '../../../../components/AlertModal';
import './ContentDocumentPage.scss';
import {
  StyledTableHeadRow,
  StyledTableHeadCell,
  StyledTableBodyCell,
  StyledTableBodyRow,
  FullAvatar,
  getIconByType,
  WrapAvatar,
  selectItem,
  selectAll,
  GreenCheckbox
} from '../DocumentComponent/TableCommon';

const MyDocument = () => {
  const [listData, setListData] = useState([]);
  const [alert, setAlert] = useState(false);
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchMyDocument();
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
  };

  const handleSelectItem = id => {
    setSelected(selectItem(selected, id));
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  const moreAction = [
    { icon: mdiAccountPlusOutline, text: 'Chia sẻ', type: 'share' },
    { icon: mdiFolderMove, text: 'Di chuyển tới', type: 'move' },
    { icon: mdiPencilOutline, text: 'Đổi tên', type: 'change' },
    { icon: mdiDownloadOutline, text: 'Tải xuống', action: () => {} },
    { icon: mdiTrashCanOutline, text: 'Xóa', action: () => setAlert(true) }
  ];

  const getIconAvatar = (url, idx = 0) => {
    return (
      <Avatar
        key={idx}
        src={url}
        alt="avatar"
        style={{ width: 35, height: 35, margin: 'auto' }}
      />
    );
  };

  return (
    <React.Fragment>
      <Table>
        <TableHead>
          <StyledTableHeadRow>
            <StyledTableHeadCell>
              {listData.length > 0 && (
                <GreenCheckbox
                  onChange={handleSelectAllClick}
                  checked={selected.length === listData.length}
                  indeterminate={
                    selected.length > 0 && selected.length < listData.length
                  }
                />
              )}
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="5%" />
            <StyledTableHeadCell align="left" width="30%">
              <TableSortLabel
                active={true}
                // direction={order}
                // onClick={createSortHandler(headCell.id)}
              >
                Tên
              </TableSortLabel>
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
          </StyledTableHeadRow>
        </TableHead>
        <TableBody>
          {listData.map(item => {
            const isItemSelected = isSelected(item.id);
            return (
              <StyledTableBodyRow key={item.id}>
                <StyledTableBodyCell>
                  <GreenCheckbox
                    checked={isItemSelected}
                    onChange={e => handleSelectItem(item.id)}
                  />
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="5%">
                  <WrapAvatar>
                    <FullAvatar src={getIconByType(item.type)} />
                  </WrapAvatar>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="left" width="30%">
                  <ColorTypo color="black">{item.name}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="10%">
                  {(item.owner &&
                    item.owner.avatar &&
                    getIconAvatar(
                      `https://storage.googleapis.com${item.owner.avatar}`
                    )) ||
                    ''}
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="20%">
                  {(item.shared_member &&
                    item.shared_member.length > 0 &&
                    item.shared_member.map((shareMember, idx) => {
                      if (shareMember.avatar) {
                        return getIconAvatar(
                          `https://storage.googleapis.com${shareMember.avatar}`,
                          idx
                        );
                      }
                      return '';
                    })) ||
                    ''}
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
              </StyledTableBodyRow>
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

export default MyDocument;
