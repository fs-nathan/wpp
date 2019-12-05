import React, { useState, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
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
import * as image from '../../../../assets';
import { Routes } from '../../../../constants/routes';
// import { actionSettingGroup } from "../../../actions/setting";
import AlertModal from '../../../../components/AlertModal';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'rgb(237, 237, 237)',
    fontWeight: 500,
    fontSize: 12
  },
  body: { fontSize: 12, padding: 10 }
}))(TableCell);
const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const data = [
  {
    creater: '',
    createdDate: '01/09/2019',
    orderCode: '30-CeZ8',
    pack: '10-USER',
    accountConnect: 10,
    storage: '10GB',
    expire: '180 ngày',
    activeDate: '22/09/2019',
    expireDate: '22/03/2020',
    activeDateNo: 65,
    status: 'Hoạt động',
    invoice: 'Đã xuất',
    price: '3.000.000',
    id: '001'
  },
  {
    creater: '',
    createdDate: '01/09/2019',
    orderCode: '30-CeZ8',
    pack: '10-USER',
    accountConnect: 10,
    storage: '10GB',
    expire: '180 ngày',
    activeDate: '22/09/2019',
    expireDate: '22/03/2020',
    activeDateNo: 0,
    status: 'Kết thúc',
    invoice: 'Đã xuất',
    price: '3.000.000',
    id: '002'
  }
];
const Order = props => {
  const [alert, setAlert] = useState(false);
  const { t } = useTranslation();
  return (
    <Fragment>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell align="center">Người tạo</StyledTableCell>
            <StyledTableCell align="center">Ngày tạo</StyledTableCell>
            <StyledTableCell align="center">Mã đơn hàng</StyledTableCell>
            <StyledTableCell align="center">Gói sản phẩm</StyledTableCell>
            <StyledTableCell align="center">Tài khoản kết nối</StyledTableCell>
            <StyledTableCell align="center">Dung lượng lưu trữ</StyledTableCell>
            <StyledTableCell align="center">Thời gian sử dụng</StyledTableCell>
            <StyledTableCell align="center">Ngày kích hoạt</StyledTableCell>
            <StyledTableCell align="center">Ngày hết hạn</StyledTableCell>
            <StyledTableCell align="center">Thời gian còn lại</StyledTableCell>
            <StyledTableCell align="center">Trạng thái</StyledTableCell>
            <StyledTableCell align="center">Hóa đơn</StyledTableCell>
            <StyledTableCell align="center">Giá trị (VND)</StyledTableCell>
            <StyledTableCell align="center">Hoạt động</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <StyledTableRow
              key={index}
              onClick={() =>
                props.history.push({
                  pathname: Routes.SETTING_GROUP_ORDER,
                  search: `?oderId=${row.id}`
                })
              }
              className="cus-row"
            >
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Avatar
                  alt="Remy Sharp"
                  src={image.avatar_user}
                  className="avatar-order"
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.createdDate}
              </StyledTableCell>
              <StyledTableCell align="center">{row.orderCode}</StyledTableCell>
              <StyledTableCell align="center">{row.pack}</StyledTableCell>
              <StyledTableCell align="center">
                {row.accountConnect}
              </StyledTableCell>
              <StyledTableCell align="center">{row.storage}</StyledTableCell>
              <StyledTableCell align="center">{row.expire}</StyledTableCell>
              <StyledTableCell align="center">{row.activeDate}</StyledTableCell>
              <StyledTableCell align="center">{row.expireDate}</StyledTableCell>
              <StyledTableCell align="center">
                {row.activeDateNo}
              </StyledTableCell>
              <StyledTableCell align="center">{row.status}</StyledTableCell>
              <StyledTableCell align="center">{row.invoice}</StyledTableCell>
              <StyledTableCell align="center">{row.price}</StyledTableCell>
              <StyledTableCell align="center">
                {row.activeDateNo > 0 ? (
                  <Button className="action-btn extend">Gia hạn</Button>
                ) : (
                  <Button
                    className="action-btn delete"
                    onClick={e => {
                      e.stopPropagation();
                      setAlert(true);
                    }}
                  >
                    Xóa
                  </Button>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <AlertModal
        open={alert}
        setOpen={setAlert}
        content={t('views.user_page.left_part.department_info.alert_content')}
        onConfirm={() => console.log('ok')}
      />
    </Fragment>
  );
};

export default connect(
  state => ({
    // settingGroupType: state.settingReducer.settingGroupType,
    settingGroupType: null
  }),
  {
    // actionSettingGroup
  }
)(withRouter(Order));
