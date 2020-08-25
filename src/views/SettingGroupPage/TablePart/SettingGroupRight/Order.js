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
import { actionToast } from '../../../../actions/system/system';
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

  const handleToast = (type, message) => {
    props.actionToast(type, message);
    setTimeout(() => props.actionToast(null, ''), 2000);
  };
  const handleDeleteOrder = async () => {
    try {
      await orderDeleteService({ order_id });
      handleToast('success', t('IDS_WP_DELETE_ORDER_SUCCESS'));
      handleFetchData();
    } catch (error) {
      handleToast('error', error.message);
    }
  };
  const handleExtendOrder = async () => {
    try {
      await extentOrderService({ order_id });
      handleToast('success', t('IDS_WP_RENEWAL_ORDER_SUCCESS'));
      handleFetchData();
    } catch (error) {
      handleToast('error', error.message);
    }
  };
  if (props.isLoading) return <LoadingBox />;
  // const showPrice = price => {
  //   return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  // };
  const getColorStatus = status => {
    if (status === 0) return '#e37112';
    if (status === 1) return '#13b045';
    if (status === 2) return '#fb3b00';
  };
  const checkDisable = status => {
    if (status === 0) return false;
    if (status === 1) return true;
    if (status === 2) return true;
  };
  return (
    <Fragment>
      <Table className="table-oder">
        <TableHead>
          <TableRow>
            <TableCell className="table-cell-item head">No</TableCell>
            <TableCell className="table-cell-item head" align="center">
              {t('IDS_WP_CREATOR')}
            </TableCell>
            <TableCell className="table-cell-item head" align="center">
              {t('IDS_WP_CREATE_DATE')}
            </TableCell>
            <TableCell className="table-cell-item head" align="center">
              {t('IDS_WP_ORDER_CODE')}
            </TableCell>
            <TableCell className="table-cell-item head" align="center">
              {t('IDS_WP_PRODUCT_PACKAGE')}
            </TableCell>
            <TableCell className="table-cell-item head" align="center">
              {t('IDS_WP_ACCOUNT_CONNECT')}
            </TableCell>
            <TableCell className="table-cell-item head" align="center">
              {t('IDS_WP_STORAGE')}
            </TableCell>
            <TableCell className="table-cell-item head" align="center">
              {t('IDS_WP_USE_TIME')}
            </TableCell>
            <TableCell className="table-cell-item head" align="center">
              {t('IDS_WP_ACTIVED_DATE')}
            </TableCell>
            <TableCell className="table-cell-item head" align="center">
              {t('IDS_WP_EXPIRE_DATE')}
            </TableCell>
            <TableCell className="table-cell-item head" align="center">
              {t('IDS_WP_TIME_REMAINING')}
            </TableCell>
            <TableCell className="table-cell-item head" align="center">
              {t('IDS_WP_STATUS_CONDITION')}
            </TableCell>
            <TableCell className="table-cell-item head" align="center">
              {t('IDS_WP_BILL')}
            </TableCell>
            <TableCell className="table-cell-item head" align="center">
              {t('IDS_WP_VALUE_VND')}
            </TableCell>
            <TableCell className="table-cell-item head" align="center">
              {t('IDS_WP_ACTION')}
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
                    {el.day_use ? `${el.day_use} ${t('IDS_WP_DAY')}` : ''}
                  </TableCell>
                  <TableCell className="table-cell-item body" align="center">
                    {row.active_at}
                  </TableCell>
                  <TableCell className="table-cell-item body" align="center">
                    {el.expire_at}
                  </TableCell>
                  <TableCell className="table-cell-item body" align="center">
                    {el.day_remain ? `${el.day_remain} ${t('IDS_WP_DAY')}` : ''}
                  </TableCell>
                  <TableCell className="table-cell-item body" align="center">
                    <span style={{ color: getColorStatus(el.status_code) }}>
                      {el.status_name}
                    </span>
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
                          {t('IDS_WP_RENEWAL')}
                        </Button>
                      ) : (
                        !checkDisable(el.status_code) && (
                          <Button
                            className={`action-btn delete ${
                              checkDisable(el.status_code) ? 'disabled' : ''
                            }`}
                            disabled={checkDisable(el.status_code)}
                            onClick={e => {
                              e.stopPropagation();
                              setOrderId(row.id);
                              setAlert(true);
                            }}
                          >
                            {t('IDS_WP_DELETE')}
                          </Button>
                        )
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
        content={t('IDS_WP_ALERT_CONTENT')}
        onConfirm={handleDeleteOrder}
      />
      <AlertModal
        open={alertExtend}
        setOpen={setExtend}
        content={t('IDS_WP_RENEWAL_ORDER_CONFIRM')}
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
    actionGetOrder,
    actionToast
  }
)(withRouter(Order));
