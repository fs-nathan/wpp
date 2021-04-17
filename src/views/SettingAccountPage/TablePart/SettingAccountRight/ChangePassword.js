import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { actionChangePassword } from '../../../../actions/account';
import { actionToast } from '../../../../actions/system/system';
import './SettingAccountRight.scss';

const ChangePassword = props => {
  const { t } = useTranslation();
  const handleChangePassword = async e => {
    e.preventDefault();
    try {
      const { elements } = e.target;
      const result = {
        current_password: elements.current_password.value,
        new_password: elements.new_password.value,
        re_password: elements.re_password.value
      };
      const data = await actionChangePassword(result);
      localStorage.setItem("token", data.data.accessToken);
      handleToast('success', t('IDS_WP_CHANGE_PASSWORD_SUCCESS'));
    } catch (error) {
      handleToast('error', error.message);
    }
  };
  const handleToast = (type, message) => {
    props.actionToast(type, message);
    setTimeout(() => props.actionToast(null, ''), 2000);
  };
  return (
    <div className="change-password">
      <form onSubmit={handleChangePassword}>
        <div className="item-change-password">
          <TextField
            id="current_password"
            type="password"
            label={t('IDS_WP_OLD_PASSWORD')}
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            className="style-input-text"
          />
        </div>
        <div className="item-change-password">
          <TextField
            id="new_password"
            type="password"
            label={t('IDS_WP_NEW_PASSWORD')}
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            className="style-input-text"
          />
        </div>
        <div className="item-change-password">
          <TextField
            id="re_password"
            type="password"
            label={t('IDS_WP_RE_INPUT_NEW_PASSWORD')}
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            className="style-input-text"
          />
        </div>
        <div className="text-notification">
          <span className="text-noti title">{t('IDS_WP_CAUTION')}:</span>
          <span className="text-noti">
            &nbsp; {t('IDS_WP_PASSWORD_VALIDATE_DES')}
          </span>
        </div>
        <div className="block-action">
          <Button
            variant="contained"
            className="btn-action none-boxshadow"
            type="submit"
          >
            {t('IDS_WP_UPDATE')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default connect(
  state => ({
    toast: state.system.toast
  }),
  { actionToast }
)(withRouter(ChangePassword));
