import React from 'react';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import Button from '@material-ui/core/Button';

import { actionVisibleDrawerMessage } from '../../actions/system/system';

import './Drawer.scss';

const HeaderDrawer = props => {
  const { actionVisibleDrawerMessage, title, subHeader, anchorDrawer } = props;
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
          <Icon path={mdiClose} size={1.2} />
        </span>
      </div>
      {subHeader && (
        <span className="tab-drawer">
          <Button className="cus-btn" color="primary" variant="text">
            Gần đây
          </Button>
          <Button className="cus-btn btn-unread" variant="text">
            {title} chưa đọc
          </Button>
          <span className="badges">5+</span>
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
