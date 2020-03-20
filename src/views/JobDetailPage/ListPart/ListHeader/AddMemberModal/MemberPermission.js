import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Icon from '@mdi/react';
import { mdiPlusCircleOutline } from '@mdi/js';
import IconButton from '@material-ui/core/IconButton';
import PriorityMemberModal from '../PriorityMemberModal';

function MemberPermission({ permission, memberId }) {
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
          <Icon path={mdiPlusCircleOutline} size={1} style={{ fill: '#b0b0b0' }} />
        </IconButton>
        :
        <Button
          className="memberPermission--button"
          onClick={openSelectPermissionModal}
        >
          {permission.name}<ArrowDropDownIcon />
        </Button>
      }
      <PriorityMemberModal permission={permission}
        memberId={memberId}
        isOpen={openPriorityModal} setOpen={setOpenPriorityModal} />
    </div>
  )
}
export default MemberPermission