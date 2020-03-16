import React from 'react';

import ColorChip from 'components/ColorChip';
import RoleMemberModal from '../RoleMemberModal';
import Icon from '@mdi/react';
import { mdiPlusCircleOutline } from '@mdi/js';
import { IconButton } from '@material-ui/core';

let listData = []

function MemberRole() {

  const [openRoleModal, setOpenRoleModal] = React.useState(false)
  // console.log("listData...", listData);
  if (listData) {
    listData.map((item, key) => {
      return (
        <div key={key}>
          {
            item &&
            <ColorChip color='grey' badge label={item} size='small' style={{ borderRadius: '2px', margin: '2px' }} />
          }
        </div>
      )
    })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {listData}
      <IconButton style={{ float: 'right' }}
        size='small'
        onClick={() => {
          // handleClose()
          setOpenRoleModal(true)
        }}
      >

        <Icon path={mdiPlusCircleOutline} size={1} style={{ fill: '#b0b0b0' }} />
      </IconButton>
      <RoleMemberModal

        isOpen={openRoleModal}
        setOpen={setOpenRoleModal}
        setListData={data => { listData = data }}
      />
    </div>
  )
}

export default MemberRole