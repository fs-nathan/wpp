import { Badge, CircularProgress, IconButton, Menu, MenuItem } from '@material-ui/core';
import { mdiAccountPlus, mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';
import { find, get, isNil } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import CustomAvatar from '../../../../components/CustomAvatar';
import CustomBadge from '../../../../components/CustomBadge';
import CustomTable from '../../../../components/CustomTable';
import { LightTooltip, TooltipWrapper } from '../../../../components/LightTooltip';
import LoadingBox from '../../../../components/LoadingBox';
import { Container, LinkSpan, SettingContainer, SubTitle } from '../../../../components/TableComponents';
import { DRAWER_TYPE } from '../../../../constants/constants';
import './style.scss';

const TooltipBody = ({ className = '', state, ...props }) =>
  <div
    className={`view_Department_AllUserTalbe___tooltip-${state === 0 ? 'private' : 'public'} ${className}`}
    {...props}
  />

const NewUserBadge = ({ className = '', ...props }) =>
  <Badge
    className={`view_Department_AllUserTalbe___user-badge ${className}`}
    {...props}
  />

const PermissionButton = ({
  handleOpenMenu,
}) => {
  return (
    <SettingContainer onClick={evt => evt.stopPropagation()}>
      <IconButton
        aria-controls="simple-menu" aria-haspopup="true"
        onClick={evt => handleOpenMenu(evt.currentTarget)}
        size='small'
      >
        <Icon path={mdiDotsVertical} size={1} color='rgba(0, 0, 0, 0.7)' />
      </IconButton>
    </SettingContainer>
  );
}

function StateBadge({ user }) {

  const { t } = useTranslation();

  return (
    get(user, 'state', 0) === 0
      ? (
        <LightTooltip
          placement='top'
          title={
            <TooltipBody state={0}>
              <div>
                <span>{t('DMH.VIEW.DP.RIGHT.UT.STATE.TITLE')}:</span>
                <span>{t('DMH.VIEW.DP.RIGHT.UT.STATE.PRI.NAME')}</span>
              </div>
              <small>{t('DMH.VIEW.DP.RIGHT.UT.STATE.PRI.DESC')}</small>
            </TooltipBody>
          }
        >
          <TooltipWrapper>
            <CustomBadge color='#ec1000'>
              {t('DMH.VIEW.DP.RIGHT.UT.STATE.PRI.NAME')}
            </CustomBadge>
          </TooltipWrapper>
        </LightTooltip>
      )
      : (
        <LightTooltip
          placement='top'
          title={
            <TooltipBody state={1}>
              <div>
                <span>{t('DMH.VIEW.DP.RIGHT.UT.STATE.TITLE')}:</span>
                <span>{t('DMH.VIEW.DP.RIGHT.UT.STATE.PUB.NAME')}</span>
              </div>
              <small>{t('DMH.VIEW.DP.RIGHT.UT.STATE.PUB.DESC')}</small>
            </TooltipBody>
          }
        >
          <TooltipWrapper>
            <CustomBadge color='#48bb78'>
              {t('DMH.VIEW.DP.RIGHT.UT.STATE.PUB.NAME')}
            </CustomBadge>
          </TooltipWrapper>
        </LightTooltip>
      )
  );
}

function AllUsersTable({
  rooms, maxUser, hasRequirement, publicPrivatePendings, route, canModify,
  expand, handleExpand,
  handleSortUser,
  handleChangeState,
  handleBanUserFromGroup,
  handleOpenModal,
  handleVisibleDrawerMessage,
}) {

  const history = useHistory();
  const { t } = useTranslation();
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [publicPrivateDisabled, setPublicPrivateDisabled] = React.useState(false);

  function doOpenMenu(anchorEl, user) {
    setMenuAnchorEl(anchorEl);
    setUser(user);
  }

  React.useEffect(() => {
    setPublicPrivateDisabled(!isNil(
      find(publicPrivatePendings.pendings, pending => pending === get(user, 'id'))
    ));
  }, [publicPrivatePendings, user]);

  return (
    <Container>
      <CustomTable
        options={{
          title: t('DMH.VIEW.DP.RIGHT.UT.TITLE'),
          subTitle: () =>
            <SubTitle>
              {t('DMH.VIEW.DP.RIGHT.UT.NUM_MEMBER_AUT', {
                total: rooms.rooms.reduce((sum, room) => sum += get(room, 'number_member', 0), 0),
                max: maxUser,
              })}
            </SubTitle>,
          subActions: canModify ? [{
            label: t('DMH.VIEW.DP.RIGHT.UT.ADD_USER'),
            icon: () => hasRequirement
              ? <NewUserBadge badgeContent={'N'}>
                <Icon path={mdiAccountPlus} size={1} color={'rgba(0, 0, 0, 0.54)'} />
              </NewUserBadge>
              : <Icon path={mdiAccountPlus} size={1} color={'rgba(0, 0, 0, 0.54)'} />,
            onClick: () => {
              handleVisibleDrawerMessage({
                type: DRAWER_TYPE.ADD_USER,
                anchor: 'left'
              })
            },
            noExpand: true,
          }] : [],
          mainAction: canModify ? {
            label: t('DMH.VIEW.DP.RIGHT.UT.ADD_ACC'),
            onClick: () => handleOpenModal('CREATE_ACCOUNT'),
          } : null,
          expand: {
            bool: expand,
            toggleExpand: () => handleExpand(!expand),
          },
          moreMenu: canModify ? [{
            label: t('DMH.VIEW.DP.MODAL.TITLE.TITLE'),
            onClick: () => handleOpenModal('TITLE'),
          }, {
            label: t('DMH.VIEW.DP.MODAL.LEVEL.TITLE'),
            onClick: () => handleOpenModal('LEVEL'),
          }, {
            label: t('DMH.VIEW.DP.MODAL.MAJOR.TITLE'),
            onClick: () => handleOpenModal('MAJOR'),
          }, {
            label: t('DMH.VIEW.DP.RIGHT.UT.TABLE_SETTING'),
            onClick: () => handleOpenModal('TABLE_SETTING'),
          }] : null,
          grouped: {
            bool: true,
            id: 'id',
            label: (room) => get(room, 'id') === 'Default' ? t('DMH.VIEW.DP.RIGHT.UT.DEFAULT') : get(room, 'name'),
            item: 'users',
          },
          row: {
            id: 'id',
            onClick: (user) => null,
          },
          draggable: canModify ? {
            bool: true,
            onDragEnd: result => {
              const { source, destination, draggableId } = result;
              if (!destination) return;
              if (
                destination.droppableId === source.droppableId &&
                destination.index === source.index
              ) return;
              handleSortUser(
                destination.droppableId,
                draggableId,
                destination.index
              );
            },
          } : {
              bool: false
            },
          loading: {
            bool: rooms.loading,
            component: () => <LoadingBox />,
          },
          noData: {
          },
        }}
        columns={[{
          label: '',
          field: (user) => <CustomAvatar style={{ width: 35, height: 35 }} src={get(user, 'avatar')} alt='avatar' />,
          align: 'left',
          width: '5%',
        }, {
          label: t('DMH.VIEW.DP.RIGHT.UT.LABEL.NAME'),
          field: (user) => <LinkSpan
            onClick={evt => history.push(`${route}/${get(user, 'id')}`)}
          >{get(user, 'name', '')}</LinkSpan>,
          align: 'left',
          width: '14%',
        }, {
          label: t('DMH.VIEW.DP.RIGHT.UT.LABEL.POS'),
          field: 'position',
          align: 'left',
          width: '10%',
        }, {
          label: t('DMH.VIEW.DP.RIGHT.UT.LABEL.B_DAY'),
          field: (user) => get(user, 'birthday'),
          align: 'left',
          width: '10%',
        }, {
          label: t('DMH.VIEW.DP.RIGHT.UT.LABEL.GENDER'),
          field: 'gender',
          align: 'left',
          width: '10%',
        }, {
          label: t('DMH.VIEW.DP.RIGHT.UT.LABEL.EMAIL'),
          field: 'email',
          align: 'left',
          width: '15%',
        }, {
          label: t('DMH.VIEW.DP.RIGHT.UT.LABEL.PHONE'),
          field: 'phone',
          align: 'left',
          width: '10%',
        }, {
          label: t('DMH.VIEW.DP.RIGHT.UT.LABEL.ROLE'),
          field: 'role',
          align: 'left',
          width: '10%',
        }, {
          label: t('DMH.VIEW.DP.RIGHT.UT.STATE.TITLE'),
          field: (user) => <StateBadge user={user} />,
          align: 'center',
          width: '10%',
        }, canModify ? {
          label: () => <IconButton disabled>
            <Icon path={mdiAccountPlus} size={1} color={'rgba(0, 0, 0, 0)'} />
          </IconButton>,
          field: (user) => <PermissionButton
            handleOpenMenu={currentTarget =>
              doOpenMenu(
                currentTarget,
                user,
              )
            }
          />,
          align: 'center',
          width: '5%',
        } : undefined]}
        data={rooms.rooms}
      />
      <Menu
        id="simple-menu"
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={() => setMenuAnchorEl(null)}
        transformOrigin={{
          vertical: -30,
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => {
          handleChangeState(user);
          setMenuAnchorEl(null);
        }}
          disabled={publicPrivateDisabled}
        >
          {publicPrivateDisabled &&
            <CircularProgress
              size={16}
              className="margin-circular"
              color="white"
            />}
          {t('DMH.VIEW.DP.RIGHT.UT.STATE.CHANGE')}
        </MenuItem>
        <MenuItem onClick={() => {
          handleOpenModal('PERMISSION_SETTING');
          setMenuAnchorEl(null);
        }}>
          {t('DMH.VIEW.DP.RIGHT.UT.PERMISSION')}
        </MenuItem>
        <MenuItem onClick={() => {
          handleOpenModal('ALERT', {
            content: t('DMH.VIEW.DP.RIGHT.UT.ALERT'),
            onConfirm: () => handleBanUserFromGroup(user),
          });
          setMenuAnchorEl(null);
        }}>
          {t('DMH.VIEW.DP.RIGHT.UT.LEAVE')}
        </MenuItem>
      </Menu>
    </Container>
  )
}

export default AllUsersTable;
