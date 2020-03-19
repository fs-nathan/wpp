import React from 'react';
import { 
  FormControl, FormControlLabel, FormGroup, Checkbox, Button
} from '@material-ui/core';
import CustomModal from '../../../../../components/CustomModal';
import { get } from 'lodash';
import './style.scss';

function MemberRole({ 
  open, setOpen, 
  curMember, 
  bgColor, userRoles, updateMemberRole,
  handleUpdateRoleOfMember, handleOpenModal,
}) {

  const [roles, setRoles] = React.useState([]);

  React.useEffect(() => {
    if (curMember) setRoles(get(curMember, 'roles', []));
  }, [curMember]);

  
  return (
    <CustomModal
      title={`Vai trò thành viên`}
      open={open}
      setOpen={setOpen}
      confirmRender={null}
      cancleRender={evt => "Thoát"}
      loading={userRoles.loading}
    >
      <FormControl 
        component="fieldset"
        fullWidth
      >
        <FormGroup>
          {userRoles.userRoles.map(userRole => (
            <FormControlLabel
              key={get(userRole, 'id')}
              control={
                <Checkbox 
                  disabled={updateMemberRole.loading}
                  checked={
                    roles
                      .map(role => get(role, 'id'))
                      .includes(get(userRole, 'id'))
                  } 
                  onChange={evt => handleUpdateRoleOfMember(userRole)} 
                  value={get(userRole, 'name', '')} 
                />}
              label={get(userRole, 'name', '')}
            />
          ))}
        </FormGroup>
      </FormControl>
      <Button 
        style={{
          backgroundColor: bgColor.color,
          color: 'white',
        }}
        onClick={evt => handleOpenModal('ROLE')}
      >
        Quản lý vai trò
      </Button>
    </CustomModal>
  )
}

export default MemberRole;