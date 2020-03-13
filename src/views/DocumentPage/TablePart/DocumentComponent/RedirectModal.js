import React from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import '../DocumentPage.scss';
import ModalCommon from './ModalCommon';
import { DialogContent } from './TableCommon';
import { Routes } from '../../../../constants/routes';

const RedirectModal = props => {
  const { t } = useTranslation();
  const bgColor = props.colors.find(item => item.selected === true);
  return (
    <ModalCommon
      title={t('IDS_WP_TITLE_DOWNLOAD_DOCUMENT')}
      onClose={props.onClose}
      footerAction={[]}
    >
      <DialogContent dividers className="dialog-content redirect-modal">
        <p className="redirect-text">
          {t('IDS_WP_SELECT_A_DOCUMENT')} <b>{t('IDS_WP_MY_DOCUMENT')}</b>{' '}
          {t('IDS_WP_FOR_SAVE_BEFORE')}
        </p>
        <Button
          variant="outlined"
          className="redirect-btn"
          onClick={() => {
            props.history.push(Routes.DOCUMENT_ME);
            props.onClose();
          }}
          style={{
            background: bgColor.color,
            borderColor: bgColor.color,
            color: '#fff'
          }}
        >
          {t('IDS_WP_GO_TO_MY_DOCUMENT')}
        </Button>
      </DialogContent>
    </ModalCommon>
  );
};

export default connect(
  state => ({
    colors: state.setting.colors
  }),
  {}
)(withRouter(RedirectModal));
