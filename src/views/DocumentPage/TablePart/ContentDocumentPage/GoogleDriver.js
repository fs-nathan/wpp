import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableSortLabel,
  Button
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiAccountPlusOutline, mdiShieldAccount } from '@mdi/js';
import ColorTypo from '../../../../components/ColorTypo';
import { actionFetchMyDocument } from './ContentDocumentAction';
import MoreAction from '../../../../components/MoreAction/MoreAction';
import './ContentDocumentPage.scss';
import {
  StyledTableHeadRow,
  StyledTableHeadCell,
  StyledTableBodyCell,
  StyledTableBodyRow,
  FullAvatar,
  getIconByType,
  WrapAvatar
} from '../DocumentComponent/TableCommon';

const LoginGoogleDriver = props => {
  return (
    <div className="google-driver-container">
      <Icon path={mdiShieldAccount} size={10} color={'#5695e9'} />
      <div className="description">
        Chia sẻ file từ Google Driver của bạn với các thành viên một cách nhanh
        chóng và an toàn.
      </div>
      <div className="btn-action">
        <Button
          variant="contained"
          className="btn-signin"
          onClick={props.onLogin}
        >
          Đăng nhập
        </Button>
      </div>
    </div>
  );
};
const GoogleDriver = () => {
  const [listData, setListData] = useState([]);
  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    if (isLogged) {
      fetchMyDocument();
    }
    // eslint-disable-next-line
  }, []);

  const handleLoginGoogle = () => {
    fetchMyDocument();
    setLogged(true);
  };

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

  const moreAction = [
    { icon: mdiAccountPlusOutline, text: 'Chia sẻ', type: 'share' }
  ];

  return (
    <React.Fragment>
      {!isLogged && <LoginGoogleDriver onLogin={handleLoginGoogle} />}
      {isLogged && (
        <Table>
          <TableHead>
            <StyledTableHeadRow>
              <StyledTableHeadCell align="center" width="5%">
                Loại
              </StyledTableHeadCell>
              <StyledTableHeadCell align="left">
                <TableSortLabel
                  active={true}
                  // direction={order}
                  // onClick={createSortHandler(headCell.id)}
                >
                  Tên
                </TableSortLabel>
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
              return (
                <StyledTableBodyRow key={item.id}>
                  <StyledTableBodyCell align="center" width="5%">
                    <WrapAvatar>
                      <FullAvatar src={getIconByType(item.type)} />
                    </WrapAvatar>
                  </StyledTableBodyCell>
                  <StyledTableBodyCell align="left">
                    <ColorTypo color="black">{item.name}</ColorTypo>
                  </StyledTableBodyCell>
                  <StyledTableBodyCell align="center" width="20%">
                    <ColorTypo color="black">{item.updated_at || ''}</ColorTypo>
                  </StyledTableBodyCell>
                  <StyledTableBodyCell align="center" width="10%">
                    <ColorTypo color="black">{item.size || '-'}</ColorTypo>
                  </StyledTableBodyCell>
                  {item.type !== 'folder' && (
                    <MoreAction actionList={moreAction} item={item}/>
                  )}
                </StyledTableBodyRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </React.Fragment>
  );
};

export default GoogleDriver;
