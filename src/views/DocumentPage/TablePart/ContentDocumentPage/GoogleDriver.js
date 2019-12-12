import React, { useEffect, useState } from 'react';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableSortLabel,
  Button
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiAccountPlusOutline, mdiShieldAccount } from '@mdi/js';
import ColorTypo from '../../../../components/ColorTypo';
import MoreAction from '../../../../components/MoreAction/MoreAction';
import './ContentDocumentPage.scss';
import {
  StyledTableHeadCell,
  StyledTableBodyCell,
  FullAvatar
} from '../DocumentComponent/TableCommon';
import { FileType } from '../../../../components/FileType';
import LoadingBox from '../../../../components/LoadingBox';

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
  const [isLoading, setIsLoading] = React.useState(false);
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
      setIsLoading(true);
      let tranformData = [];
      setListData(tranformData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const moreAction = [
    { icon: mdiAccountPlusOutline, text: 'Chia sẻ', type: 'share' }
  ];
  if (isLoading) {
    return <LoadingBox />;
  }
  return (
    <React.Fragment>
      {!isLogged && <LoginGoogleDriver onLogin={handleLoginGoogle} />}
      {isLogged && (
        <Table>
          <TableHead>
            <TableRow className="table-header-row">
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
            </TableRow>
          </TableHead>
          <TableBody>
            {listData.map(item => {
              return (
                <TableRow className="table-body-row" key={item.id}>
                  <StyledTableBodyCell align="center" width="5%">
                    <FullAvatar src={FileType(item.type)} />
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
                    <MoreAction actionList={moreAction} item={item} />
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </React.Fragment>
  );
};

export default GoogleDriver;
