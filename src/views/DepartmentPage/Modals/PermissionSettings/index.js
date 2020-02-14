import React from 'react';
import PermissionSettingsPresenter from './presenters';

function PermissionSettings({ open, setOpen }) {
  return (
    <PermissionSettingsPresenter 
      open={open}
      setOpen={setOpen}
    />
  )
}

export default PermissionSettings;
