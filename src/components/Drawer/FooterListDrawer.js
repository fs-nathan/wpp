import React from 'react';
import Icon from '@mdi/react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionVisibleDrawerMessage } from '../../actions/system/system';
import './Drawer.scss';
import { TOKEN, REFRESH_TOKEN, DRAWER_TYPE } from '../../constants/constants';
import { Routes } from '../../constants/routes';
import {
  TIME_FILTER_TYPE_OFFER_BY_DEPARTMENT_VIEW,
  TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW,
  TIME_FILTER_TYPE_OFFER_BY_PROJECT_VIEW,
} from '../../views/OfferPage/contants/localStorage';

const FooterListDrawer = props => {
  const closeDrawer = url => {
    if (url === Routes.LOGIN) {
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      localStorage.removeItem(TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW);
      localStorage.removeItem(TIME_FILTER_TYPE_OFFER_BY_PROJECT_VIEW);
      localStorage.removeItem(TIME_FILTER_TYPE_OFFER_BY_DEPARTMENT_VIEW);
    }
    props.actionVisibleDrawerMessage({
      type: '',
      anchor: props.anchorDrawer
    });
  };

  const { actionList, typeDrawer } = props;
  return (
    <div className="footer-list-drawer">
      {actionList.map((el, index) => (
        <div className={`button-item ${el.classname}`} key={index}>
          <Link
            to={el.url}
            onClick={() => closeDrawer(el.url)}
            className={`text-btn ${
              typeDrawer === DRAWER_TYPE.SUPPORT ? 'support-text' : ''
            }`}
          >
            {el.icon && <Icon path={el.icon} size={1} color="#5a5a5a" />}
            <span className="name-text">{el.name}</span>
          </Link>
        </div>
      ))}
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
)(FooterListDrawer);
