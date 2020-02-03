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
import { isEmpty } from '../../../../helpers/utils/isEmpty';

const NotificationWorkPlus = props => {
  const handleFetchData = async () => {
    try {
      const { data } = await getNotificationService();
      props.actionGetNotification(data.notifications || []);
    } catch (err) {}
  };
  useEffect(() => {
    handleFetchData(); // eslint-disable-next-line
  }, []);
  const bgColor = props.colors.find(item => item.selected === true);

  return (
    <div className="notification-container">
      {!isEmpty(props.notification) &&
        props.notification.map((el, index) => (
          <div className="notification-group" key={index}>
            <li className="title-list" style={{ color: bgColor.color }}>
              Tháng {el.time}
            </li>
            <Table aria-label="simple table" className="table-notification">
              <TableBody>
                {!isEmpty(el.notifications) &&
                  el.notifications.map((row, idx) => (
                    <TableRow
                      key={idx}
                      onClick={() => {
                        props.history.push({
                          pathname: Routes.SETTING_ACCOUNT_NOTIFI,
                          search: `?${row.id}`
                        });
                      }}
                      className="notification-row-item cursor-pointer"
                    >
                      <TableCell component="th" scope="row" width="15%">
                        {row.created_at}
                      </TableCell>
                      <TableCell align="left" width="75%">
                        {row.title}&nbsp;&nbsp;
                        <span className={`action-btn ${row.type}`}>
                          <span>{row.type}</span>
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
    notification: state.system.notification,
    colors: state.setting.colors
  }),
  { actionGetNotification }
)(withRouter(NotificationWorkPlus));
