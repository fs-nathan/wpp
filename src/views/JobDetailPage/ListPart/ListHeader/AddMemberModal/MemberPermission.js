import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { mdiPlusCircle } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { currentColorSelector } from 'views/JobDetailPage/selectors';
import PermissionMemberModal from '../PermissionMemberModal';
import './styles.scss';

function MemberPermission({ group_permission, id, is_admin }) {
  const { t } = useTranslation()
  const groupActiveColor = useSelector(currentColorSelector)
  const [openPriorityModal, setOpenPriorityModal] = React.useState(false);
  // if (props.master) {
  //     return (
  //         <div style={{ color: '#fd7e14', padding: '0 30px' }}>{props.label}</div>
  //     )
  // }
  function openSelectPermissionModal() {
    setOpenPriorityModal(true)
  }

  return (
    <div className="memberPermission">
      {is_admin ? <Button
        className={clsx("memberPermission--button", { 'memberPermission--button__owner': is_admin })}
        onClick={openSelectPermissionModal}
      >
        {t('LABEL_CHAT_TASK_CHU_CONG_VIEC')}
      </Button> : (!group_permission ?
        <IconButton
          className="memberPermission--button"
          size='small'
          onClick={openSelectPermissionModal}
        >
          <Icon path={mdiPlusCircle} size={'1.2rem'} color={groupActiveColor || '#03a9f4'} />
          &nbsp;
          {t('LABEL_CHAT_TASK_GAN_QUYEN')}
        </IconButton>
        :
        <Button
          className={clsx("memberPermission--button", { 'memberPermission--button__owner': is_admin })}
          onClick={openSelectPermissionModal}
        >
          {group_permission.name}<ArrowDropDownIcon />
        </Button>)
      }
      <PermissionMemberModal
        permission={group_permission}
        memberId={id}
        is_admin={is_admin}
        isOpen={openPriorityModal} setOpen={setOpenPriorityModal} />
    </div>
  )
}
export default MemberPermission