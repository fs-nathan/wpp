import { getRequirementJoinGroup } from 'actions/groupUser/getRequirementJoinGroup';
import { listPosition } from 'actions/position/listPosition';
import { detailRoom } from 'actions/room/detailRoom';
import { getUserOfRoom } from 'actions/room/getUserOfRoom';
import { actionVisibleDrawerMessage } from 'actions/system/system';
import { banUserFromGroup } from 'actions/user/banUserFromGroup';
import { privateMember } from 'actions/user/privateMember';
import { publicMember } from 'actions/user/publicMember';
import { sortUser } from 'actions/user/sortUser';
import AlertModal from 'components/AlertModal';
import { ACCEPT_REQUIREMENT_USER_JOIN_GROUP, BAN_USER_FROM_GROUP, CustomEventDispose, CustomEventListener, INVITE_USER_JOIN_GROUP, REJECT_REQUIREMENT_USER_JOIN_GROUP, SORT_USER } from 'constants/events';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
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
import DepartmentUsersTablePresenter from './presenters';
import { hasRequirementSelector, publicPrivatePendingsSelector, roomSelector } from './selectors';

function DepartmentUsersTable({
  room, hasRequirement, publicPrivatePendings, route, viewPermissions,
  expand, handleExpand,
  doSortUser,
  doPublicMember, doPrivateMember,
  doBanUserFromGroup,
  doActionVisibleDrawerMessage,
  doListPosition,
  doGetRequirementJoinGroup,
  doDetailRoom,
  doGetUserOfRoom,
}) {

  React.useEffect(() => {
    if (get(viewPermissions.permissions, 'can_modify', false)) {
      doGetRequirementJoinGroup();
      const doGetRequirementJoinGroupHandler = () => {
        doGetRequirementJoinGroup(true);
      };
      CustomEventListener(ACCEPT_REQUIREMENT_USER_JOIN_GROUP, doGetRequirementJoinGroupHandler);
      CustomEventListener(REJECT_REQUIREMENT_USER_JOIN_GROUP, doGetRequirementJoinGroupHandler);
      return () => {
        CustomEventDispose(ACCEPT_REQUIREMENT_USER_JOIN_GROUP, doGetRequirementJoinGroupHandler);
        CustomEventDispose(REJECT_REQUIREMENT_USER_JOIN_GROUP, doGetRequirementJoinGroupHandler);
      }
    }
    // eslint-disable-next-line
  }, [viewPermissions]);

  const [id, setId] = React.useState(null);
  const { departmentId } = useParams();

  React.useEffect(() => {
    setId(departmentId);
  }, [departmentId]);

  React.useEffect(() => {
    if (id !== null && id !== 'default') {
      doDetailRoom({ roomId: id });
    }
    // eslint-disable-next-line
  }, [id]);

  React.useEffect(() => {
    if (id !== null) {
      doGetUserOfRoom({ roomId: id });
      const reloadGetUserOfRoom = () => {
        doGetUserOfRoom({ roomId: id });
      }
      CustomEventListener(SORT_USER, reloadGetUserOfRoom);
      CustomEventListener(INVITE_USER_JOIN_GROUP, reloadGetUserOfRoom);
      CustomEventListener(BAN_USER_FROM_GROUP, reloadGetUserOfRoom);
      return () => {
        CustomEventDispose(SORT_USER, reloadGetUserOfRoom);
        CustomEventDispose(INVITE_USER_JOIN_GROUP, reloadGetUserOfRoom);
        CustomEventDispose(BAN_USER_FROM_GROUP, reloadGetUserOfRoom);
      }
    }
    // eslint-disable-next-line
  }, [id]);

  React.useEffect(() => {
    doListPosition();
    // eslint-disable-next-line
  }, []);

  const [openTitle, setOpenTitle] = React.useState(false);
  const [openRole, setOpenRole] = React.useState(false);
  const [openLevel, setOpenLevel] = React.useState(false);
  const [openMajor, setOpenMajor] = React.useState(false);
  const [openLogo, setOpenLogo] = React.useState(false);
  const [openTableSetting, setOpenTableSetting] = React.useState(false);
  const [openCreateAccount, setOpenCreateAccount] = React.useState(false);
  const [openPermissionSetting, setOpenPermissionSetting] = React.useState(false);
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
        if (get(viewPermissions.permissions, 'can_modify', false)) setOpenPermissionSetting(true);
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
      <DepartmentUsersTablePresenter
        room={room} hasRequirement={hasRequirement} publicPrivatePendings={publicPrivatePendings}
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
      <PermissionSettingsModal open={openPermissionSetting} setOpen={setOpenPermissionSetting} />
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
    room: roomSelector(state),
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
    doGetUserOfRoom: ({ roomId }, quite) => dispatch(getUserOfRoom({ roomId }, quite)),
    doDetailRoom: ({ roomId }, quite) => dispatch(detailRoom({ roomId }, quite)),
    doListPosition: (quite) => dispatch(listPosition(quite)),
    doGetRequirementJoinGroup: (quite) => dispatch(getRequirementJoinGroup(quite)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DepartmentUsersTable);
