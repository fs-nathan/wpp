import React, { useState, Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import './SettingGroupRight.scss';
import { Routes } from '../../../../constants/routes';
import LoadingBox from '../../../../components/LoadingBox';
import {
  actionGetOrder,
  orderService,
  orderDeleteService,
  extentOrderService,
  actionChangeLoading
} from '../../../../actions/setting/setting';
import AlertModal from '../../../../components/AlertModal';
import { isEmpty } from '../../../../helpers/utils/isEmpty';

let dataSave = [];
const Order = props => {
  const [alert, setAlert] = useState(false);
  const [alertExtend, setExtend] = useState(false);
  const [order_id, setOrderId] = useState(null);
  const { t } = useTranslation();
  const handleFetchData = async () => {
    try {
      props.actionChangeLoading(true);
      const { data } = await orderService();
      dataSave = [...data.orders];
      props.actionGetOrder(data.orders);
      props.actionChangeLoading(false);
    } catch (err) {
      props.actionChangeLoading(false);
    }
  };
  const handleSearchData = () => {
    const { searchText } = props;
    let listResult = [];
    if (!isEmpty(searchText)) {
      listResult = dataSave.filter(
        el =>
          (!isEmpty(el.code) &&
            el.code.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) ||
          (!isEmpty(el.active_at) &&
            el.active_at.toLowerCase().indexOf(searchText.toLowerCase()) !==
              -1) ||
          (!isEmpty(el.expire_at) &&
            el.expire_at.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
      );
    } else {
      listResult = [...dataSave];
    }
    props.actionGetOrder(listResult);
  };
  useEffect(() => {
    handleSearchData();
    // eslint-disable-next-line
  }, [props.searchText]);
  useEffect(() => {
    handleFetchData(); // eslint-disable-next-line
  }, []);
  const handleDeleteOrder = async () => {
    try {
      await orderDeleteService({ order_id });
      handleFetchData();
    } catch (err) {}
  };
  const handleExtendOrder = async () => {
    try {
      await extentOrderService({ order_id });
      handleFetchData();
    } catch (err) {}
  };
  if (props.isLoading) return <LoadingBox />;
  // const showPrice = price => {
  //   return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  // };
  return (
    <Fragment>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="table-cell-item head">No</TableCell>
            <TableCell className="table-cell-item head" align="center">
              Người tạo
            </TableCell>
            <TableCell className="table-cell-item head" align="center">
              Ngày tạo
            </TableCell>
            <TableCell className="table-cell-item head" align="center">
              Mã đơn hàng
            </TableCell>
            <TableCell className="table-cell-item head" align="center">
              Gói sản phẩm
            </TableCell>
            <TableCell className="table-cell-item head" align="center">
              Tài khoản kết nối
            </TableCell>
            <TableCell className="table-cell-item head" align="center">
              Dung lượng lưu trữ
            </TableCell>
            <TableCell className="table-cell-item head" align="center">
              Thời gian sử dụng
            </TableCell>
            <TableCell className="table-cell-item head" align="center">
              Ngày kích hoạt
            </TableCell>
            <TableCell className="table-cell-item head" align="center">
              Ngày hết hạn
            </TableCell>
            <TableCell className="table-cell-item head" align="center">
              Thời gian còn lại
            </TableCell>
            <TableCell className="table-cell-item head" align="center">
              Trạng thái
            </TableCell>
            <TableCell className="table-cell-item head" align="center">
              Hóa đơn
            </TableCell>
            <TableCell className="table-cell-item head" align="center">
              Giá trị (VND)
            </TableCell>
            <TableCell className="table-cell-item head" align="center">
              Hoạt động
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.orders.reverse().map((row, idx) => (
            <Fragment key={idx}>
              <TableRow
                onClick={() =>
                  props.history.push({
                    pathname: Routes.SETTING_GROUP_ORDER,
                    search: `?order_id=${row.id}`
                  })
                }
                className="table-body-row"
              >
                <TableCell rowSpan={row.packets.length + 1} className="cus-cel">
                  {idx + 1}
                </TableCell>
                <TableCell rowSpan={row.packets.length + 1}>
                  <Avatar
                    alt="Remy Sharp"
                    src={row.user_create.avatar}
                    className="avatar-order"
                  />
                </TableCell>
                <TableCell rowSpan={row.packets.length + 1} className="cus-cel">
                  {row.created_at}
                </TableCell>
                <TableCell
                  rowSpan={row.packets.length + 1}
                  className="cus-cel code-oder"
                >
                  {row.code}
                </TableCell>
              </TableRow>
              {row.packets.map((el, index) => (
                <TableRow key={index} className="table-body-row">
                  <TableCell className="table-cell-item body" align="center">
                    {el.name}
                  </TableCell>
                  <TableCell className="table-cell-item body" align="center">
                    {el.number_user}
                  </TableCell>
                  <TableCell className="table-cell-item body" align="center">
                    {el.size}
                  </TableCell>
                  <TableCell className="table-cell-item body" align="center">
                    {el.day_use ? `${el.day_use} Ngày` : ''}
                  </TableCell>
                  <TableCell className="table-cell-item body" align="center">
                    {row.active_at}
                  </TableCell>
                  <TableCell className="table-cell-item body" align="center">
                    {el.expire_at}
                  </TableCell>
                  <TableCell className="table-cell-item body" align="center">
                    {el.day_remain ? `${el.day_remain} Ngày` : ''}
                  </TableCell>
                  <TableCell className="table-cell-item body" align="center">
                    {el.status_name}
                  </TableCell>
                  {index === 0 ? (
                    <TableCell rowSpan={row.packets.length + 1} align="center">
                      {row.bill_status}
                    </TableCell>
                  ) : null}
                  {index === 0 ? (
                    <TableCell rowSpan={row.packets.length + 1} align="center">
                      {row.price}
                    </TableCell>
                  ) : null}
                  {index === 0 ? (
                    <TableCell rowSpan={row.packets.length + 1} align="center">
                      {el.activeDateNo ? (
                        <Button
                          className="action-btn extend"
                          onClick={e => {
                            e.stopPropagation();
                            setOrderId(row.id);
                            setExtend(true);
                          }}
                        >
                          Gia hạn
                        </Button>
                      ) : (
                        <Button
                          className="action-btn delete"
                          onClick={e => {
                            e.stopPropagation();
                            setOrderId(row.id);
                            setAlert(true);
                          }}
                        >
                          Xóa
                        </Button>
                      )}
                    </TableCell>
                  ) : null}
                </TableRow>
              ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>
      <AlertModal
        open={alert}
        setOpen={setAlert}
        content={t('views.user_page.left_part.department_info.alert_content')}
        onConfirm={handleDeleteOrder}
      />
      <AlertModal
        open={alertExtend}
        setOpen={setExtend}
        content={'Bạn muốn gia hạn đơn hàng?'}
        onConfirm={handleExtendOrder}
      />
    </Fragment>
  );
};

export default connect(
  state => ({
    orders: state.setting.orders,
    isLoading: state.setting.isLoading,
    searchText: state.documents.searchText,
    settingGroupType: null
  }),
  {
    actionChangeLoading,
    actionGetOrder
  }
)(withRouter(Order));
