import React from 'react';
import { sortUser } from '../../../../actions/user/sortUser';
import { publicMember } from '../../../../actions/user/publicMember';
import { privateMember } from '../../../../actions/user/privateMember';
import { banUserFromGroup } from '../../../../actions/user/banUserFromGroup';
import { connect } from 'react-redux';
import AlertModal from '../../../../components/AlertModal';
import { get } from 'lodash';
import TitleManagerModal from '../../Modals/TitleManager';
import RoleManagerModal from '../../Modals/RoleManager';
import LevelManagerModal from '../../Modals/LevelManager';
import MajorManagerModal from '../../Modals/MajorManager';
import LogoManagerModal from '../../Modals/LogoManager';
import TableSettingsModal from '../../Modals/TableSettings';
import PermissionSettingsModal from '../../Modals/PermissionSettings';
import CreateAccountModal from '../../Modals/CreateAccount';
import './style.scss';
import {
  roomsSelector,
  maxUserSelector, 
  hasRequirementSelector 
} from './selectors';
import AllUsersTablePresenter from './presenters';

function AllUsersTable({ 
  rooms, maxUser, hasRequirement,
  doSortUser,
  expand, handleExpand, handleSubSlide,
  doPublicMember, doPrivateMember,
  doBanUserFromGroup, 
}) {

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
        setOpenTitle(true);
        return;
      }
      case 'ROLE': {
        setOpenRole(true);
        return;
      }
      case 'LEVEL': {
        setOpenLevel(true);
        return;
      }
      case 'MAJOR': {
        setOpenMajor(true);
        return;
      }
      case 'LOGO': {
        setOpenLogo(true);
        return;
      }
      case 'TABLE_SETTING': {
        setOpenTableSetting(true);
        return;
      }
      case 'CREATE_ACCOUNT': {
        setOpenCreateAccount(true);
        return;
      }
      case 'PERMISSION_SETTING': {
        setOpenPermissionSetting(true);
        return;
      }
      case 'ALERT': {
        setOpenAlert(true);
        setAlertProps(props);
        return;
      }
      default: return;
    }
  }

  return (
    <>
      <AllUsersTablePresenter 
        rooms={rooms} maxUser={maxUser} hasRequirement={hasRequirement}
        expand={expand} handleExpand={handleExpand} handleSubSlide={handleSubSlide}
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
    rooms: roomsSelector(state),
    maxUser: maxUserSelector(state),
    hasRequirement: hasRequirementSelector(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doSortUser: ({ roomId, userId, sortIndex }) => dispatch(sortUser({ roomId, userId, sortIndex })),
    doPublicMember: ({ userId }) => dispatch(publicMember({ userId })),
    doPrivateMember: ({ userId }) => dispatch(privateMember({ userId })),
    doBanUserFromGroup: ({ userId }) => dispatch(banUserFromGroup({ userId })),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllUsersTable);