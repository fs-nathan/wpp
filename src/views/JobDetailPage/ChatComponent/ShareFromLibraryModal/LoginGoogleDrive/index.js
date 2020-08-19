import { Button } from '@material-ui/core';
import { mdiShieldAccount } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './styles.scss';

const LoginGoogleDrive = props => {
  const { t } = useTranslation();
  return (
    <div className="google-driver-container">
      <Icon path={mdiShieldAccount} size={10} color={'#5695e9'} />
      <div className="description">
        {t('IDS_WP_SHARE_FILE_FROM_GOOGLE_DRIVE')}
      </div>
      <div className="btn-action">
        <Button
          variant="contained"
          className="btn-signin"
          onClick={props.onLogin}
        >
          {t('IDS_WP_LOGIN')}
        </Button>
      </div>
    </div>
  );
};

export default LoginGoogleDrive