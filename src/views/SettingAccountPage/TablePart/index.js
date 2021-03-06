import React from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { isEmpty } from '../../../helpers/utils/isEmpty';
import ColorTypo from '../../../components/ColorTypo';
import HeaderButtonGroup from './HeaderButtonGroup';
import SettingInfo from '../TablePart/SettingAccountRight/SettingInfo';
import ChangePassword from '../TablePart/SettingAccountRight/ChangePassword';
import NotificationWorkPlus from '../TablePart/SettingAccountRight/NotificationWorkPlus';
import NotificationWorkPlusDetail from '../TablePart/SettingAccountRight/NotificationWorkPlusDetail';
import '../SettingAccount.scss';
import { SETTING_ACCOUNT, SETTING_GROUP } from '../../../constants/constants';
import { RightHeader } from '../../DocumentPage/TablePart/DocumentComponent/TableCommon';
import TimeAndLanguage from '../../SettingGroupPage/TablePart/SettingGroupRight/TimeAndLanguage';
import Notification from '../../SettingGroupPage/TablePart/SettingGroupRight/Notification';

const TablePart = props => {
  const { t } = useTranslation();
  const type = props.match.params.type;
  const search = props.location.search;
  const isNotiDetail =
    type === SETTING_ACCOUNT.NOTIFICATION_WORKPLUS && !isEmpty(search);

  const getContentSettingAccount = () => {
    switch (type) {
      case SETTING_ACCOUNT.INFO:
        return <SettingInfo />;
      case SETTING_ACCOUNT.CHANGE_PASSWORD:
        return <ChangePassword />;
      case SETTING_ACCOUNT.NOTIFICATION_WORKPLUS: {
        if (isEmpty(search)) {
          return <NotificationWorkPlus />;
        }
        return <NotificationWorkPlusDetail />;
      }
      case SETTING_GROUP.LANGUAGE:
        return <TimeAndLanguage />;
      case SETTING_GROUP.NOTIFICATION:
        return <Notification />;
      default:
        return <SettingInfo />;
    }
  };
  const getHeader = () => {
    const type = props.match.params.type;
    const search = props.location.search;
    switch (type) {
      case SETTING_ACCOUNT.INFO:
        return t('IDS_WP_ACCOUNT_INFO');
      case SETTING_ACCOUNT.CHANGE_PASSWORD:
        return t('IDS_WP_ACCOUNT_INFO');
      case SETTING_ACCOUNT.NOTIFICATION_WORKPLUS:
        if (isEmpty(search)) {
          return t('IDS_WP_NOTICE_WORKPLUS');
        }
        return t('IDS_WP_NOTICE_DETAIl');
      case SETTING_GROUP.LANGUAGE:
        return t('IDS_WP_SETUP_SOFTWARE');
      case SETTING_GROUP.NOTIFICATION:
        return t('IDS_WP_SETTING_NOTI');
      default:
        return '';
    }
  };
  return (
    <div className="header-setting-container">
      <div className="header-setting">
        <ColorTypo className="header-title">{getHeader()}</ColorTypo>
        {isNotiDetail && (
          <RightHeader>
            <HeaderButtonGroup />
          </RightHeader>
        )}
      </div>
      <div className="setting-right-content">
        <Scrollbars autoHide autoHideTimeout={500}>
          {getContentSettingAccount()}
        </Scrollbars>
      </div>
    </div>
  );
};

export default withRouter(TablePart);
