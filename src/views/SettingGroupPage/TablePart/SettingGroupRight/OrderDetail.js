import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import queryString from 'query-string';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import kendo from '@progress/kendo-ui';
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

const OrderDetail = props => {
  const { t } = useTranslation();
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

  const handleExport = () => {
    const fileName = `order-wp-kh${orderItem.code}.pdf`;
    window.convertToPdf(kendo, fileName);
  };
  if (props.isLoading) return <LoadingBox />;
  return (
    <div className="order-detail-container">
      <div className="col-sm-7 has-border-right detail-left">
        <ExportPDF orderItem={orderItem} isCreate={false} />
      </div>

      {/* <div className="divider-vertical" /> */}
      <div className="other-info-order-detail">
        <div className="UserInfo_right_header d-flex justify-content-center align-items-center">
          <p className="order-title">{t('IDS_WP_OTHER_INFO')}</p>
        </div>
        {!isEmpty(orderItem) && (
          <div className="detail-right-bottom">
            <p className="title-item">{t('IDS_WP_CREATOR')}</p>

            <div className="creator-item">
              <div className="creator-info">
                <h2>{orderItem.user_create.name}</h2>
                <p>
                  {t('IDS_WP_CREATE_ORDER_EVERY_DAY')} {orderItem.create_at}
                </p>
              </div>
              <img
                src={`${orderItem.user_create.avatar}`}
              />
            </div>

            <p className="title-item">{t('IDS_WP_STATUS')}</p>
            <p>{orderItem.packet_user.status_name}</p>
            <p className="title-item">{t('IDS_WP_EXPIRE_DATE')}</p>
            {new Date() > new Date(orderItem.packet_user.expire_at) ? (
              <p className="red-text">{orderItem.packet_user.expire_at}</p>
            ) : (
              <p>{orderItem.packet_user.expire_at}</p>
            )}
            <p className="title-item">{t('IDS_WP_PAYMENT')}</p>
            <p>{orderItem.status_payment}</p>
            <p className="title-item">{t('IDS_WP_BILL')}</p>
            <p>{orderItem.bill_status}</p>

            <Button
              variant="outlined"
              className="download-btn"
              onClick={handleExport}
            >
              <Icon path={mdiFilePdf} size={1.2} color="#f37c00" />
              &nbsp; &nbsp;{t('IDS_WP_DOWNLOAD_BILL')}
            </Button>
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
