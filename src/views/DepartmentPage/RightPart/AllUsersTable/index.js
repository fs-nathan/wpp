import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { actionVisibleDrawerMessage } from '../../../../actions/system/system';
import { banUserFromGroup } from '../../../../actions/user/banUserFromGroup';
import { privateMember } from '../../../../actions/user/privateMember';
import { publicMember } from '../../../../actions/user/publicMember';
import { sortUser } from '../../../../actions/user/sortUser';
import AlertModal from '../../../../components/AlertModal';
import { routeSelector } from '../../../MemberPage/selectors';
import CreateAccountModal from '../../Modals/CreateAccount';
import LevelManagerModal from '../../Modals/LevelManager';
import LogoManagerModal from '../../Modals/LogoManager';
import MajorManagerModal from '../../Modals/MajorManager';
import PermissionSettingsModal from '../../Modals/PermissionSettings';
import RoleManagerModal from '../../Modals/RoleManager';
import TableSettingsModal from '../../Modals/TableSettings';
import TitleManagerModal from '../../Modals/TitleManager';
import { viewPermissionsSelector } from '../../selectors';
import AllUsersTablePresenter from './presenters';
import { hasRequirementSelector, maxUserSelector, publicPrivatePendingsSelector, roomsSelector } from './selectors';
import './style.scss';

function AllUsersTable({
  rooms, maxUser, hasRequirement, publicPrivatePendings, route, viewPermissions,
  doSortUser,
  expand, handleExpand,
  doPublicMember, doPrivateMember,
  doBanUserFromGroup,
  doActionVisibleDrawerMessage,
}) {

  const [openTitle, setOpenTitle] = React.useState(false);
  const [openRole, setOpenRole] = React.useState(false);
  const [openLevel, setOpenLevel] = React.useState(false);
  const [openMajor, setOpenMajor] = React.useState(false);
  const [openLogo, setOpenLogo] = React.useState(false);
  const [openTableSetting, setOpenTableSetting] = React.useState(false);
  const [openCreateAccount, setOpenCreateAccount] = React.useState(false);
  const [openPermissionSetting, setOpenPermissionSetting] = React.useState(false);
  const [permissionProps, setPermissionProps] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case 'TITLE': {
        if (get(viewPermissions.permissions, 'can_modify', false)) setOpenTitle(true);
        return;
      }
      case 'ROLE': {
        if (get(viewPermissions.permissions, 'can_modify', false)) setOpenRole(true);
        return;
      }
      case 'LEVEL': {
        if (get(viewPermissions.permissions, 'can_modify', false)) setOpenLevel(true);
        return;
      }
      case 'MAJOR': {
        if (get(viewPermissions.permissions, 'can_modify', false)) setOpenMajor(true);
        return;
      }
      case 'LOGO': {
        if (get(viewPermissions.permissions, 'can_modify', false)) setOpenLogo(true);
        return;
      }
      case 'TABLE_SETTING': {
        if (get(viewPermissions.permissions, 'can_modify', false)) setOpenTableSetting(true);
        return;
      }
      case 'CREATE_ACCOUNT': {
        if (get(viewPermissions.permissions, 'can_modify', false)) setOpenCreateAccount(true);
        return;
      }
      case 'PERMISSION_SETTING': {
        if (get(viewPermissions.permissions, 'can_modify', false)) {
          setOpenPermissionSetting(true);
          setPermissionProps(props);
        }
        return;
      }
      case 'ALERT': {
        if (get(viewPermissions.permissions, 'can_modify', false)) {
          setOpenAlert(true);
          setAlertProps(props);
        }
        return;
      }
      default: return;
    }
  }

  return (
    <>
      <AllUsersTablePresenter
        rooms={rooms} maxUser={maxUser} hasRequirement={hasRequirement} publicPrivatePendings={publicPrivatePendings}
        route={route}
        canModify={get(viewPermissions.permissions, 'can_modify', false)}
        expand={expand} handleExpand={handleExpand}
        handleSortUser={(roomId, userId, sortIndex) => doSortUser({ roomId, userId, sortIndex })}
        handleChangeState={(user) =>
          get(user, 'state', 0) === 0
            ? doPublicMember({
              userId: get(user, 'id'),
            })
            : doPrivateMember({
              userId: get(user, 'id'),
            })
        }
        handleBanUserFromGroup={(user) =>
          doBanUserFromGroup({
            userId: get(user, 'id'),
          })
        }
        handleOpenModal={doOpenModal}
        handleVisibleDrawerMessage={doActionVisibleDrawerMessage}
      />
      <TitleManagerModal open={openTitle} setOpen={setOpenTitle} />
      <RoleManagerModal open={openRole} setOpen={setOpenRole} />
      <LevelManagerModal open={openLevel} setOpen={setOpenLevel} />
      <MajorManagerModal open={openMajor} setOpen={setOpenMajor} />
      <LogoManagerModal open={openLogo} setOpen={setOpenLogo} isSelect={false} />
      <TableSettingsModal open={openTableSetting} setOpen={setOpenTableSetting} />
      <CreateAccountModal open={openCreateAccount} setOpen={setOpenCreateAccount} />
      <PermissionSettingsModal open={openPermissionSetting} setOpen={setOpenPermissionSetting} {...permissionProps} />
      <AlertModal
        open={openAlert}
        setOpen={setOpenAlert}
        {...alertProps}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    rooms: roomsSelector(state),
    maxUser: maxUserSelector(state),
    hasRequirement: hasRequirementSelector(state),
    publicPrivatePendings: publicPrivatePendingsSelector(state),
    route: routeSelector(state),
    viewPermissions: viewPermissionsSelector(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doSortUser: ({ roomId, userId, sortIndex }) => dispatch(sortUser({ roomId, userId, sortIndex })),
    doPublicMember: ({ userId }) => dispatch(publicMember({ userId })),
    doPrivateMember: ({ userId }) => dispatch(privateMember({ userId })),
    doBanUserFromGroup: ({ userId }) => dispatch(banUserFromGroup({ userId })),
    doActionVisibleDrawerMessage: (option) => dispatch(actionVisibleDrawerMessage(option)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllUsersTable);