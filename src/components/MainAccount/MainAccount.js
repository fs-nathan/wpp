import React from 'react';
import { useTranslation } from 'react-i18next';
import * as images from '../../assets';
import { Scrollbars } from 'react-custom-scrollbars';
import './MainAccount.scss';

const MainAccount = props => {
  const { t } = useTranslation();
  return (
    <div className="MainAccount">
      <div className="left-content">
        <img className="bg-login" alt="" src={images.bg_login} />
      </div>
      <div className="right-content">
        <Scrollbars autoHide autoHideTimeout={500}>
          <div className="inner-right-content">
            <div className="main-account-container">{props.children}</div>
            <div className="bottom-content">
              <a href="/" className="link-item">
                {t('IDS_WP_HOME')}
              </a>
              <a href="/term" className="link-item">
                {t('IDS_WP_TERM')}
              </a>
              <a href="/document" className="link-item">
                {t('IDS_WP_DOCUMENT')}
              </a>
              <a href="/contact" className="link-item">
                {t('IDS_WP_CONTACT')}
              </a>
            </div>
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};

export default MainAccount;
