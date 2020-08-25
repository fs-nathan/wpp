import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { actionVisibleDrawerMessage } from '../../actions/system/system';
import { Routes } from '../../constants/routes';
import { DRAWER_TYPE } from '../../constants/constants';
import './Drawer.scss';

const FooterDrawer = props => {
  const { t } = useTranslation();
  const closeDrawer = () => {
    if (props.typeDrawer === DRAWER_TYPE.MESSAGE) {
      props.history.push({
        pathname: Routes.MESSAGE_ALL
      });
    } else {
      props.history.push({
        pathname: Routes.NOTICE_ALL
      });
    }
    props.actionVisibleDrawerMessage({
      type: '',
      anchor: props.anchorDrawer
    });
  };
  // const { actionVisibleDrawerMessage, typeDrawer } = this.props;
  return (
    <div className="footer-drawer">
      <Button
        className="footer-btn cus-btn"
        color="primary"
        variant="text"
        disableTouchRipple
        onClick={closeDrawer}
      >
        {t('IDS_WP_VIEW_ALL')}
      </Button>
      <Button
        className="footer-btn cus-btn"
        color="primary"
        variant="text"
        disableTouchRipple
        onClick={props.handleViewAll}
      >
        {t('IDS_WP_VIEW_ALL_ACTION')}
      </Button>
    </div>
  );
};

export default connect(
  state => ({
    typeDrawer: state.system.typeDrawer,
    anchorDrawer: state.system.anchorDrawer
  }),
  {
    actionVisibleDrawerMessage
  }
)(withRouter(FooterDrawer));
