import { IconButton } from '@material-ui/core';
import { mdiPlusCircle } from '@mdi/js';
import Icon from '@mdi/react';
import { getRole } from 'actions/taskDetail/taskDetailActions';
import ColorChip from 'components/ColorChip';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { currentColorSelector } from 'views/JobDetailPage/selectors';
import RoleMemberModal from '../RoleMemberModal';

function MemberRole({ roles, memberId }) {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const groupActiveColor = useSelector(currentColorSelector)
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
      <IconButton
        className="memberPermission--button"
        size='small'
        onClick={onClickAdd}
      >
        <Icon path={mdiPlusCircle} size={'1.2rem'} color={groupActiveColor || '#03a9f4'} />
        &nbsp;
        {t('LABEL_CHAT_TASK_THEM')}
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