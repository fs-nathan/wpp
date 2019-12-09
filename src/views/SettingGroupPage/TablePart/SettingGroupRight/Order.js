import React, { useState, Fragment } from 'react';
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
          {data.map((row, index) => (
            <TableRow
              key={index}
              onClick={() =>
                props.history.push({
                  pathname: Routes.SETTING_GROUP_ORDER,
                  search: `?oderId=${row.id}`
                })
              }
              className="table-row-item cursor-pointer"
            >
              <TableCell
                className="table-cell-item body"
                component="th"
                scope="row"
              >
                {index + 1}
              </TableCell>
              <TableCell className="table-cell-item body" align="center">
                <Avatar
                  alt="Remy Sharp"
                  src={image.avatar_user}
                  className="avatar-order"
                />
              </TableCell>
              <TableCell className="table-cell-item body" align="center">
                {row.createdDate}
              </TableCell>
              <TableCell className="table-cell-item body" align="center">
                {row.orderCode}
              </TableCell>
              <TableCell className="table-cell-item body" align="center">
                {row.pack}
              </TableCell>
              <TableCell className="table-cell-item body" align="center">
                {row.accountConnect}
              </TableCell>
              <TableCell className="table-cell-item body" align="center">
                {row.storage}
              </TableCell>
              <TableCell className="table-cell-item body" align="center">
                {row.expire}
              </TableCell>
              <TableCell className="table-cell-item body" align="center">
                {row.activeDate}
              </TableCell>
              <TableCell className="table-cell-item body" align="center">
                {row.expireDate}
              </TableCell>
              <TableCell className="table-cell-item body" align="center">
                {row.activeDateNo}
              </TableCell>
              <TableCell className="table-cell-item body" align="center">
                {row.status}
              </TableCell>
              <TableCell className="table-cell-item body" align="center">
                {row.invoice}
              </TableCell>
              <TableCell className="table-cell-item body" align="center">
                {row.price}
              </TableCell>
              <TableCell className="table-cell-item body" align="center">
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
              </TableCell>
            </TableRow>
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
