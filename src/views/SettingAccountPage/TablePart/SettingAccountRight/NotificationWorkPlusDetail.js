import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import './SettingAccountRight.scss';
import { getNotificationDetailService } from '../../../../actions/account';
import { actionChangeLoading } from '../../../../actions/setting/setting';
import { isEmpty } from '../../../../helpers/utils/isEmpty';
import LoadingBox from '../../../../components/LoadingBox';

const NotificationWorkPlusDetail = props => {
  const { t } = useTranslation();
  const [notiItem, setNoti] = useState({});
  const handleFetchData = async () => {
    try {
      props.actionChangeLoading(true);
      const { data } = await getNotificationDetailService(
        queryString.parse(props.location.search).id
      );
      setNoti(data.notification);
      props.actionChangeLoading(false);
    } catch (err) {
      props.actionChangeLoading(false);
    }
  };
  useEffect(() => {
    handleFetchData(); // eslint-disable-next-line
  }, [props.location.search]);
  if (props.isLoading) return <LoadingBox />;
  if (isEmpty(notiItem)) return '';
  return (
    <div className="work-plus-detail">
      <div className="header-work-plus-detail">
        <span className="text-header">{notiItem.title}</span>
      </div>
      <div className="status-date-work-plus-detail">
        <span className="status-text">{notiItem.type_name}</span>
        <span className="date-text">{notiItem.created_at}</span>
        <span className="devider"></span>
        <span className="view-text">
          {notiItem.number_view} {t('IDS_WP_VIEW')}
        </span>
      </div>
      <div className="content-work-plus-detail">
        <div className="des-text" dangerouslySetInnerHTML={{__html: notiItem.content}}></div>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    isLoading: state.setting.isLoading,
    notiItem: {
      created_at: '08/10/2019',
      title: 'Abc',
      content: 'Cập nhật module Đề xuất - Phê duyệt trên hệ thống WorkPlus',
      type_name: 'success',
      btnText: 'Bình thường',
      id: '0012'
    }
  }),
  { actionChangeLoading }
)(withRouter(NotificationWorkPlusDetail));
