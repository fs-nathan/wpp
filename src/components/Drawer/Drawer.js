import React from 'react';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import { DRAWER_TYPE } from '../../constants/constants';
import { isEmpty } from '../../helpers/utils/isEmpty';
import { actionVisibleDrawerMessage } from '../../actions/system/system';
import DrawerSupport from './DrawerContentComponent/DrawerSupport';
import DrawerMessage from './DrawerContentComponent/DrawerMessage';
import DrawerNotification from './DrawerContentComponent/DrawerNotification';
import DrawerGroupAcount from './DrawerContentComponent/DrawerGroupAcount';
import DrawerSetting from './DrawerContentComponent/DrawerSetting';
import DrawerNewGroup from './DrawerContentComponent/DrawerNewGroup';
import './Drawer.scss';

const generateContent = typeDrawer => {
  switch (typeDrawer) {
    case DRAWER_TYPE.SUPPORT:
      return <DrawerSupport />;
    case DRAWER_TYPE.MESSAGE:
      return <DrawerMessage />;
    case DRAWER_TYPE.NOTIFICATION:
      return <DrawerNotification />;
    case DRAWER_TYPE.GROUP_ACCOUNT:
      return <DrawerGroupAcount />;
    case DRAWER_TYPE.SETTING:
      return <DrawerSetting />;
    case DRAWER_TYPE.JOIN_NEW_GROUP:
      return <DrawerNewGroup />;
    default:
      return '';
  }
};
const DrawerComponent = props => {
  const { typeDrawer, actionVisibleDrawerMessage, anchorDrawer } = props;
  return (
    <Drawer
      anchor={anchorDrawer}
      open={!isEmpty(typeDrawer)}
      onClose={() =>
        actionVisibleDrawerMessage({
          type: '',
          anchor: anchorDrawer
        })
      }
      className={`Drawer-Compenent ${
        anchorDrawer === 'right' ? 'anchor-drawer-right' : 'anchor-drawer-top'
      }`}
    >
      {generateContent(typeDrawer)}
    </Drawer>
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
)(DrawerComponent);
