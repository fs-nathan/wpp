import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import './NoticeModal.scss';
import { Routes } from '../../constants/routes';
import * as images from '../../assets';
import { actionVisibleDrawerMessage } from '../../actions/system/system';

const GroupModal = props => {
  const { t } = useTranslation();
  const { groupDetail: inforGroup } = props;

  const closeNoticeModal = () => {
    if (props.onClose) props.onClose();
    if (props.typeDrawer) {
      props.actionVisibleDrawerMessage({
        type: '',
        anchor: props.anchorDrawer
      });
    }
  };

  return (
    <Dialog
      maxWidth="md"
      className="group-modal-container"
      onClose={closeNoticeModal}
      aria-labelledby="customized-dialog-title"
      open={props.visibleGroupModal}
    >
      <MuiDialogTitle
        disableTypography
        id="customized-dialog-title"
        className="title-dialog"
      >
        <Typography variant="h6">{t('IDS_WP_GROUP_INFO')}</Typography>
        <IconButton aria-label="close" onClick={closeNoticeModal}>
          <CloseIcon />
        </IconButton>
      </MuiDialogTitle>
      <MuiDialogContent dividers className="content-modal">
        <div className="block-image-cover">
          <img
            alt=""
            src={inforGroup.cover || images.cover_default}
            className="img-cover"
          />
          <div className="block-image-logo">
            <img
              alt=""
              src={inforGroup.logo || images.avatar_default_120}
              className="img-logo"
            />
          </div>
        </div>
        <div className="block-info">
          <div>
            <span className="block-name">{inforGroup.name}</span>
          </div>
          <div>
            <span className="block-email">ID: {inforGroup.code}</span>
          </div>
        </div>
      </MuiDialogContent>
      <MuiDialogActions className="footer-modal">
        <Button
          onClick={() => {
            props.history.push(Routes.SETTING_GROUP_INFO);
            closeNoticeModal();
          }}
        >
          {t('IDS_WP_EDIT_GROUP_INFO')}
        </Button>
      </MuiDialogActions>
    </Dialog>
  );
};

export default connect(
  state => ({
    visibleNoticeModal: state.system.visibleNoticeModal,
    typeDrawer: state.system.typeDrawer,
    anchorDrawer: state.system.anchorDrawer,
    groupDetail: state.setting.groupDetail
  }),
  { actionVisibleDrawerMessage }
)(withRouter(GroupModal));
