import {CircularProgress, IconButton, Menu, MenuItem, Badge, Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {mdiAccountArrowRight, mdiAccountCog, mdiAccountPlus, mdiAtomVariant, mdiDotsVertical, mdiLock, mdiShareVariant} from '@mdi/js';
import Icon from '@mdi/react';
import { actionToast } from 'actions/system/system';
import { actionGetInfor, actionLockUser, actionUnLockUser } from 'actions/user/detailUser';
import { listUserOfGroup } from 'actions/user/listUserOfGroup';
import {find, get, isNil} from 'lodash';
import React from 'react';
import {useTranslation} from 'react-i18next';
import { connect, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import CustomAvatar from '../../../../components/CustomAvatar';
import CustomBadge from '../../../../components/CustomBadge';
import CustomTable from '../../../../components/CustomTable';
import {LightTooltip, TooltipWrapper} from '../../../../components/LightTooltip';
import LoadingBox from '../../../../components/LoadingBox';
import {Container, LinkSpan, SettingContainer, SubTitle} from '../../../../components/TableComponents';
import {DRAWER_TYPE} from '../../../../constants/constants';
import './style.scss';

const TooltipBody = ({ className = '', state, ...props }) =>
  <div
    className={`view_Department_AllUserTalbe___tooltip-${state === 0 ? 'private' : 'public'} ${className}`}
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

function TooltipRole({user}){
  const {t} = useTranslation();
  const getRole = get(user, 'user_type') ;
  function handleRender(){
   switch (getRole) {
     case 3:
       
       return (
        <LightTooltip
        placement='top'
        title={
          <TooltipBody state={0}>
            <small style={{color: '#f1af36', fontSize: '13px'}}>{t('IDS_WP_USERS_TABLE_COLUMS_ROLE_MEMBER_TOOLTIP')}</small>
          </TooltipBody>
        }
      >
        <TooltipWrapper>
          <div style={{color: "#fff", backgroundColor: '#f1af36',textAlign: 'center', padding: '5px'}}>
            {t('DMH.VIEW.PGP.LEFT.INFO.MEMBER.TITLE')}
          </div>
        </TooltipWrapper>
      </LightTooltip>
       )
       case 1:
       
        return (
          <LightTooltip
      placement='top'
      title={
        <TooltipBody state={0}>
          <small style={{color: '#0ed216', fontSize: '13px'}}>{t('IDS_WP_USERS_TABLE_COLUMS_ROLE_MASTER_TOOLTIP')}</small>
        </TooltipBody>
      }
    >
      <TooltipWrapper>
        <div style={{background: '#0ed216', color: '#fff', textAlign: 'center', padding: '5px'}}>
          {t('IDS_WP_USERS_TABLE_COLUMS_ROLE_MASTER')}
        </div>
      </TooltipWrapper>
    </LightTooltip>
        )
     default:
       return (
<LightTooltip
      placement='top'
      title={
        <TooltipBody state={0}>
          <small style={{color: '#950eda', fontSize: '13px'}}>{t('IDS_WP_USERS_TABLE_COLUMS_ROLE_INTERNAL_TOOLTIP')}</small>
        </TooltipBody>
      }
    >
      <TooltipWrapper>
        <div style={{color:'#fff', backgroundColor : '#950eda',textAlign: 'center', padding: '5px'}}>
          {t('IDS_WP_USERS_TABLE_COLUMS_ROLE_INTERNAL')}
        </div>
      </TooltipWrapper>
    </LightTooltip>
       )

   }
  }
  return (
    <>
    {handleRender()}
     </>
  )
}

function StateBadge({ user }) {

  const { t } = useTranslation();
  
  return (
    get(user, 'is_lock', true) === true ? <Icon path={mdiLock} size={1} color={'rgb(103 98 98 / 70%)'} />:

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
  handleOpenModal,
  handleVisibleDrawerMessage,
  inforUser
}) {
  const { t } = useTranslation();
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [publicPrivateDisabled, setPublicPrivateDisabled] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch()
  function doOpenMenu(anchorEl, user) {
    setMenuAnchorEl(anchorEl);
    setUser(user);
    dispatch(actionGetInfor(user?.id));
  }
 
  const handleLockAccount = async () => {
    try {
       const {data} = await actionLockUser({account_id: user.id});
       if(data.state){
         handleToast('success', t('SNACK_MUTATE_SUCCESS'));
         setMenuAnchorEl(null);
         dispatch(listUserOfGroup(true))
       }
    } catch (error) {
       handleToast('error', t('SNACK_MUTATE_FAIL'));
    }
  }
  const handleToast = (type, message) => {
    dispatch(actionToast(type, message));
    setTimeout(() => {
      dispatch(actionToast('', null));
    }, 2000);
  }
  const handleUnLockAccount = async() => {
    try {
      const {data} = await actionUnLockUser({account_id: user.id});
      if(data.state){
        handleToast('success', t('SNACK_MUTATE_SUCCESS'));
        setMenuAnchorEl(null);
        dispatch(listUserOfGroup(true));
      }
   } catch (error) {
    handleToast('error', t('SNACK_MUTATE_FAIL'));
  }
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
          mainAction: canModify ? {          
            icon: mdiShareVariant,
            onClick: () => handleOpenModal('CREATE_ACCOUNT'),
          } : null,
          addmember: canModify || null,
          filter: {
            label: t('IDS_WP_ALL')
          },
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
          }] : null,
          grouped: {
            bool: true,
            id: 'id',
            label: (room) => get(room, 'name'),
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
            bool: (rooms.firstTime === false) && (rooms.rooms.length === 0),
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
          field: (user) => <TooltipRole user={user} />,
          align: 'left',
          width: '10%',
        }, {
          label: t('DMH.VIEW.DP.RIGHT.UT.STATE.TITLE'),
          field: (user) => <StateBadge user={user} />,
          align: 'center',
          width: '10%',
        }, canModify ? {
          label: () => <IconButton disabled>
            <Icon path={mdiAccountPlus} size={1} color={'rgba(0, 0, 0, 0.7)'} />
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
        className="more_menu"
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
         <div className="menu_icon"><Icon path={mdiAtomVariant} size={1} color={'rgba(0, 0, 0, 0.7)'}/></div> <div className="menu_label">{t('DMH.VIEW.DP.RIGHT.UT.STATE.CHANGE')}</div>
        </MenuItem>
        {/* <MenuItem onClick={() => {
          handleOpenModal('PERMISSION_SETTING', {
            curUserId: get(user, 'id'),
            roomId: null,
          });
          setMenuAnchorEl(null);
        }}>
          <div className="menu_icon"></div> <div className="menu_label">{t('DMH.VIEW.DP.RIGHT.UT.PERMISSION')}</div>
        </MenuItem> */}
        <MenuItem onClick={()=> {
          handleOpenModal('SETTING_MEMBER', {
            user,
            roomId: null
          })
        }}>
        <div className="menu_icon"><Icon path={mdiAccountCog} size={1} color={'rgba(0, 0, 0, 0.7)'} /></div> <div className="menu_label">{t('IDS_WP_SETTING_MEMBER')}</div>
        </MenuItem>
        <MenuItem>
        <div className="menu_icon"><Icon path={mdiLock} size={1} color={'rgba(0, 0, 0, 0.7)'} /></div> <div>
          <p className="menu_label">{t('IDS_WP_LOCK_MEMBER')}</p>
          <p className="menu_note">{t('IDS_WP_LOCK_MEMBER_NOTE')}</p>
          <Button variant="contained" color="primary" className="menu_btn-lock" onClick={!inforUser?.userInfor?.is_lock ? handleLockAccount: handleUnLockAccount}>{!inforUser?.userInfor?.is_lock ? t('IDS_WP_LOCk'):t('IDS_WP_UNLOCK')}</Button>
        </div>
        </MenuItem>
        {!(get(user, 'is_owner_group', false) || get(user, 'is_me', false)) && (
          <MenuItem >
            <div className="menu_icon"><Icon path={mdiAccountArrowRight} size={1} color={'rgba(0, 0, 0, 0.7)'} /></div> 
            <div>
              <p className="menu_label">{t('DMH.VIEW.DP.RIGHT.UT.LEAVE')}</p>
              <p className="menu_note">{t('IDS_WP_DELETE_MEMBER')}</p>
              <Button variant="contained" color="primary" className="menu_btn_out-group" onClick={() => {
            handleOpenModal('ALERT', {
              roomId: null,
              selectedUser: user,
            });
            setMenuAnchorEl(null);
          }}>{t('DMH.VIEW.DP.RIGHT.UT.LEAVE')}</Button>
            </div>
          </MenuItem>
         )}
      </Menu>
    </Container>
  )
}
const mapStateToProps = (state) => {
  return {
    inforUser: state.user.detailUser,
  };
};
export default connect(mapStateToProps)(AllUsersTable);
