import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

import { actionVisibleDrawerMessage } from '../../actions/system/system';

import './Drawer.scss';

const HeaderDrawer = props => {
  const { t } = useTranslation();
  const {
    actionVisibleDrawerMessage,
    title,
    subHeader,
    anchorDrawer,
    activeTab,
    handleChangeTab,
    numberNotView
  } = props;
  return (
    <React.Fragment>
      <div className={`header-drawer ${title ? '' : 'none-border'}`}>
        <span className="text-header">{title}</span>
        <span
          className="btn-close"
          onClick={() =>
            actionVisibleDrawerMessage({ type: '', anchor: anchorDrawer })
          }
        >
          <Icon path={mdiClose} size={1.2} color="#ccc" />
        </span>
      </div>
      {subHeader && (
        <span className="tab-drawer">
          <Button
            className={`cus-btn ${activeTab === 'recent' ? 'active' : ''}`}
            variant="text"
            onClick={() => handleChangeTab('recent')}
            disableTouchRipple
          >
            {t('IDS_WP_RECENT')}
          </Button>
          <Badge
            badgeContent={numberNotView > 100 ? '99+' : numberNotView}
            color="error"
            className={`bag-cus ${numberNotView ? 'none-view' : ''}`}
          >
            <Button
              className={`cus-btn btn-unread ${
                activeTab === 'notView' ? 'active' : ''
              }`}
              variant="text"
              disableTouchRipple
              onClick={() => handleChangeTab('notView')}
            >
              {title} {t('IDS_WP_UNREAD')}
            </Button>
          </Badge>

          {/* {numberNotView > 0 && <span className="badges">{numberNotView}</span>} */}
        </span>
      )}
    </React.Fragment>
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
)(HeaderDrawer);
