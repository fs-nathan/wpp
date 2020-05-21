import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { mdiPlusCircle } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { currentColorSelector } from 'views/JobDetailPage/selectors';
import PermissionMemberModal from '../PermissionMemberModal';

function MemberPermission({ permission, memberId }) {
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
      {!permission ?
        <IconButton style={{ float: 'right' }}
          size='small'
          onClick={openSelectPermissionModal}
        >
          <Icon path={mdiPlusCircle} size={1} color={groupActiveColor || '#03a9f4'} />
          &nbsp;
          {t('LABEL_CHAT_TASK_GAN_QUYEN')}
        </IconButton>
        :
        <Button
          className="memberPermission--button"
          onClick={openSelectPermissionModal}
        >
          {permission.name}<ArrowDropDownIcon />
        </Button>
      }
      <PermissionMemberModal permission={permission}
        memberId={memberId}
        isOpen={openPriorityModal} setOpen={setOpenPriorityModal} />
    </div>
  )
}
export default MemberPermission