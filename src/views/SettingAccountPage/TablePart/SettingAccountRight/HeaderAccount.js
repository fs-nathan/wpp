import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Icon from '@mdi/react';
import { mdiStar } from '@mdi/js';
import { SETTING_ACCOUNT } from '../../../constants/constant';
import './SettingAccountRight.scss';
import { actionSettingGroup } from '../../../actions/setting';
import SearchIcon from '../../../assets/search-ic.jpg';

const getTitleHeader = groupType => {
  const { t } = useTranslation();
  switch (groupType) {
    case SETTING_ACCOUNT.INFO:
      return t('IDS_WP_ACCOUNT_INFO');
    case SETTING_ACCOUNT.CHANGE_PASSWORD:
      return t('IDS_WP_CHANGE_PASSWORD');
    case SETTING_ACCOUNT.NOTIFICATION_WORKPLUS:
      return t('IDS_WP_NOTIFICATION_WORKPLUS');
    case SETTING_ACCOUNT.NOTIFICATION_WORKPLUS_DETAIL:
      return t('IDS_WP_NOTICE_DETAIl');
    default:
      return '';
  }
};
const HeaderAccount = props => {
  const { settingAccountType } = props;
  const openSearchModal = () => {};
  return (
    <div className="SettingAccountHeader MainRight__action d-sm-flex justify-content-between align-items-center">
      <div className="ml-3 mb-2 message-title">
        <Icon path={mdiStar} size={1} color="#31b586" />
        <strong className="ml-2 text-green">
          {getTitleHeader(settingAccountType)}
        </strong>
      </div>
      {settingAccountType === SETTING_ACCOUNT.NOTIFICATION_WORKPLUS && (
        <div className="search ml-4 pt-1 right-header-account">
          <input
            name="search-job"
            type="text"
            className="form-control"
            id="inputSearch"
            onClick={openSearchModal}
            placeholder={t('IDS_WP_SEARCH_NOTICE')}
            style={{ backgroundImage: `url(${SearchIcon})` }}
          />
        </div>
      )}
    </div>
  );
};

export default connect(
  state => ({
    settingAccountType: state.settingReducer.settingAccountType
  }),
  { actionSettingGroup }
)(HeaderAccount);
