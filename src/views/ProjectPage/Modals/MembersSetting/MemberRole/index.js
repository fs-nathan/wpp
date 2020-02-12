import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  FormControl, FormControlLabel, FormGroup, Checkbox, Button
} from '@material-ui/core';
import CustomModal from '../../../../../components/CustomModal';
import RoleManagerModal from '../../../../DepartmentPage/Modals/RoleManager';
import { addProjectRoleToMember } from '../../../../../actions/project/addProjectRoleToMember';
import { removeProjectRoleFromMember } from '../../../../../actions/project/removeProjectRoleFromMember';
import { connect } from 'react-redux';
import { get, find, remove } from 'lodash';
import './style.scss';

function MemberRole({ 
  open, setOpen, 
  colors,
  addProjectRoleToMember, removeProjectRoleFromMember,
  curMemberId = null, listUserRole, memberProject,
  doRemoveProjectRoleFromMember, doAddProjectRoleToMember 
}) {

  const { projectId } = useParams();
  const bgColor = colors.find(item => item.selected === true);
  const { data: { membersAdded, } } = memberProject;
  const { data: { userRoles } } = listUserRole;
  const { loading: addLoading} = addProjectRoleToMember;
  const { loading: removeLoading } = removeProjectRoleFromMember;
  const loading = addLoading || removeLoading; 
  const [openRoleManager, setOpenRoleManager] = React.useState(false);
  const [memberRoles, setMemberRoles] = React.useState([]);

  React.useEffect(() => {
    setMemberRoles(
      get(
        find(membersAdded, { id: curMemberId, }), 
        'roles', 
        []
      )
    ); //eslint-disable-next-line
  }, [curMemberId]);

  function handleUpdateRoleOfMember(curRole) {
    if (memberRoles.map(role => get(role, 'id')).includes(get(curRole, 'id'))) {
      doRemoveProjectRoleFromMember({
        projectId,
        memberId: curMemberId,
        roleId: get(curRole, 'id'),
      });
      setMemberRoles(oldRes => {
        let newRes = oldRes;
        remove(newRes, { id: get(curRole, 'id') });
        return newRes;
      });
    } else {
      doAddProjectRoleToMember({
        projectId,
        memberId: curMemberId,
        roleId: get(curRole, 'id'),
      });
      setMemberRoles(oldRes => [...oldRes, curRole]);
    }
  }

  return (
    <React.Fragment>
      <CustomModal
        title={`Vai trò thành viên`}
        open={open}
        setOpen={setOpen}
        confirmRender={null}
        cancleRender={evt => "Thoát"}
      >
        <FormControl 
          component="fieldset"
          fullWidth
        >
          <FormGroup>
            {userRoles.map(userRole => (
              <FormControlLabel
                key={get(userRole, 'id')}
                control={
                  <Checkbox 
                    disabled={loading}
                    checked={
                      memberRoles
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
          onClick={evt => setOpenRoleManager(true)}
        >
          Quản lý vai trò
        </Button>
      </CustomModal>
      <RoleManagerModal 
        open={openRoleManager}
        setOpen={setOpenRoleManager}
      />
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    colors: state.setting.colors,
    listUserRole: state.userRole.listUserRole,
    memberProject: state.project.memberProject,
    addProjectRoleToMember: state.project.addProjectRoleToMember,
    removeProjectRoleFromMember: state.project.removeProjectRoleFromMember,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doAddProjectRoleToMember: ({ projectId, memberId, roleId }) => dispatch(addProjectRoleToMember({ projectId, memberId, roleId })),
    doRemoveProjectRoleFromMember: ({ projectId, memberId, roleId }) => dispatch(removeProjectRoleFromMember({ projectId, memberId, roleId })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MemberRole);
