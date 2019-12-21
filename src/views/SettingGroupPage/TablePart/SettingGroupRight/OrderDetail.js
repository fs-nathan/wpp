import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import Pdf from 'react-to-pdf';
import { mdiFilePdf } from '@mdi/js';
import Icon from '@mdi/react';
import './SettingGroupRight.scss';
import ExportPDF from '../../../../components/ExportPDF/ExportPDF';
import {
  orderDetailService,
  actionChangeLoading
} from '../../../../actions/setting/setting';
import { isEmpty } from '../../../../helpers/utils/isEmpty';
import LoadingBox from '../../../../components/LoadingBox';

const ref = React.createRef();
const OrderDetail = props => {
  const options = { orientation: 'p', unit: 'px', format: [640, 890] };
  const [orderItem, setOrder] = useState({});
  const handleFetchData = async () => {
    try {
      props.actionChangeLoading(true);
      const { data } = await orderDetailService(
        queryString.parse(props.location.search)
      );
      setOrder(data.order);
      props.actionChangeLoading(false);
    } catch (err) {
      props.actionChangeLoading(false);
    }
  };
  useEffect(() => {
    handleFetchData(); // eslint-disable-next-line
  }, []);
  if (props.isLoading) return <LoadingBox />;
  return (
    <div className="order-detail-container">
      <div className="col-sm-7 has-border-right detail-left" ref={ref}>
        <ExportPDF orderItem={orderItem} isCreate={false} />
      </div>
      {/* <div className="divider-vertical" /> */}
      <div className="other-info-order-detail">
        <div className="UserInfo_right_header d-flex justify-content-center align-items-center">
          <p className="order-title">THÔNG TIN KHÁC</p>
        </div>
        {!isEmpty(orderItem) && (
          <div className="detail-right-bottom">
            <p className="title-item">Người tạo</p>

            <div className="creator-item">
              <div className="creator-info">
                <h2>{orderItem.user_create.name}</h2>
                <p>Tạo đơn hàng ngày {orderItem.create_at}</p>
              </div>
              <img
                src={`https://storage.googleapis.com${orderItem.user_create.avatar}`}
                alt=""
              />
            </div>

            <p className="title-item">Tình trạng</p>
            <p>{orderItem.packet_user.status_name}</p>
            <p className="title-item">Ngày hết hạn</p>
            {new Date() > new Date(orderItem.packet_user.expire_at) ? (
              <p className="red-text">{orderItem.packet_user.expire_at}</p>
            ) : (
              <p>{orderItem.packet_user.expire_at}</p>
            )}
            <p className="title-item">Thanh toán</p>
            <p>{orderItem.status_payment}</p>
            <p className="title-item">Hóa đơn</p>
            <p>{orderItem.bill_status}</p>
            <Pdf
              targetRef={ref}
              filename={`order-wp-kh${orderItem.code}.pdf`}
              options={options}
              x={0.5}
              y={0.5}
            >
              {({ toPdf }) => (
                <Button
                  variant="outlined"
                  className="download-btn"
                  onClick={toPdf}
                >
                  <Icon path={mdiFilePdf} size={1.2} color="#f37c00" />
                  &nbsp; &nbsp;Tải đơn hàng về máy
                </Button>
              )}
            </Pdf>
          </div>
        )}
      </div>
    </div>
  );
};

export default connect(
  state => ({
    isLoading: state.setting.isLoading,
    settingGroupType: null
  }),
  {
    actionChangeLoading
  }
)(withRouter(OrderDetail));
