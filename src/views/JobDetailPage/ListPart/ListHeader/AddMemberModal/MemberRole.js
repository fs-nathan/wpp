import React from 'react';

import ColorChip from 'components/ColorChip';
import RoleMemberModal from '../RoleMemberModal';
import Icon from '@mdi/react';
import { mdiPlusCircleOutline } from '@mdi/js';
import { IconButton } from '@material-ui/core';

function MemberRole({ roles, memberId }) {

  const [openRoleModal, setOpenRoleModal] = React.useState(false);

  function onClickAdd() {
    setOpenRoleModal(true)
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