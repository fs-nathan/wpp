import { IconButton } from '@material-ui/core';
import { mdiPlusCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { getRole } from 'actions/taskDetail/taskDetailActions';
import ColorChip from 'components/ColorChip';
import React from 'react';
import { useDispatch } from 'react-redux';
import RoleMemberModal from '../RoleMemberModal';


function MemberRole({ roles, memberId }) {
  const dispatch = useDispatch();
  const [openRoleModal, setOpenRoleModal] = React.useState(false);

  function onClickAdd() {
    setOpenRoleModal(true)
    dispatch(getRole())
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {roles.map((item, key) => (
        <ColorChip key={item.id} color='grey' badge label={item.name} size='small' style={{ borderRadius: '2px', margin: '2px' }} />
      )
      )}
      <IconButton style={{ float: 'right' }}
        size='small'
        onClick={onClickAdd}
      >
        <Icon path={mdiPlusCircleOutline} size={1} style={{ fill: '#b0b0b0' }} />
      </IconButton>
      <RoleMemberModal
        roles={roles}
        memberId={memberId}
        isOpen={openRoleModal}
        setOpen={setOpenRoleModal}
      />
    </div>
  )
}

export default MemberRole