import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
// import { isEmpty } from '../../../../helpers/utils/isEmpty';
import { Routes } from '../../../../constants/routes';

import './SettingAccountRight.scss';
import {
  getNotificationService,
  actionGetNotification
} from '../../../../actions/account';

const data = [
  {
    title: 'Tháng 12/2019',
    content: [
      {
        date: '05/12/2019',
        description:
          'Nâng cấp module quản lý văn thư lưu trữ trên hệ thống WorkPlus',
        type: 'danger',
        btnText: 'Quan trọng',
        id: '0001'
      },
      {
        date: '01/12/2019',
        description: 'Cập nhật thông tin thanh toán đơn hàng WorkPlus',
        type: 'success',
        btnText: 'Bình thường',
        id: '0002'
      }
    ]
  },
  {
    title: 'Tháng 10/2019',
    content: [
      {
        date: '11/10/2019',
        description: 'Bảo mật tài khoản WorkPlus thông qua cảnh báo email',
        type: 'danger',
        btnText: 'Quan trọng',
        id: '0011'
      },
      {
        date: '08/10/2019',
        description:
          'Cập nhật module Đề xuất - Phê duyệt trên hệ thống WorkPlus',
        type: 'success',
        btnText: 'Bình thường',
        id: '0012'
      }
    ]
  }
];
const NotificationWorkPlus = props => {
  const handleFetchData = async () => {
    try {
      const { data } = await getNotificationService();
      if (data.data) props.actionGetNotification(data.notifications);
    } catch (err) {}
  };
  useEffect(() => {
    handleFetchData(); // eslint-disable-next-line
  }, []);
  return (
    <div className="notification-container">
      {data.map((el, index) => (
        <div className="notification-group" key={index}>
          <li className="title-list">{el.title}</li>
          <Table aria-label="simple table" className="table-notification">
            <TableBody>
              {el.content.map((row, idx) => (
                <TableRow
                  key={idx}
                  onClick={() => {
                    props.history.push({
                      pathname: Routes.SETTING_ACCOUNT_NOTIFI,
                      search: `?${row.id}`
                    });
                  }}
                  className="cursor-pointer"
                >
                  <TableCell component="th" scope="row" width="15%">
                    {row.date}
                  </TableCell>
                  <TableCell align="left" width="75%">
                    {row.description}&nbsp;&nbsp;
                    <span className={`action-btn ${row.type}`}>
                      <span>{row.btnText}</span>
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default connect(
  state => ({
    notification: state.system.notification
  }),
  { actionGetNotification }
)(withRouter(NotificationWorkPlus));
