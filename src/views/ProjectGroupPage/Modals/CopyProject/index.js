import { copyProject } from 'actions/project/copyProject';
import { listProject } from 'actions/project/listProject';
import { listProjectGroup } from 'actions/projectGroup/listProjectGroup';
import { getListBasicProject } from 'actions/project/listProject';
import { filter, get, map } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { localOptionSelector } from '../../selectors';
import CopyProjectPresenter from './presenters';
import { groupsSelector } from './selectors';

function CopyProject({
  open, setOpen,
  doCopyProject,
  doListProjectGroup,
  projectGroupId = undefined,
}) {

  const [groupsOriginal, setGroupsOriginal] = React.useState([])
  const [groups, setGroups] = React.useState([])
  const [searchPatern, setSearchPatern] = React.useState('');

  const fetchListProject = async () => {
    try {
      const res = await getListBasicProject()
      setGroupsOriginal(res.data.projects)
      setGroups(filterData(res.data.projects))
    } catch(e) {
      console.log(e)
    }
  }

  React.useEffect(() => {
    if (open) {
      fetchListProject()
    }
  }, [open]);

  React.useEffect(() => {
    if (open) {
      setGroups(filterData(groupsOriginal))
    }
  }, [searchPatern]);

  const filterData = (inputGroups = []) => {
    return map(inputGroups, (projectGroup) => {
      const ownedProjects = filter(
        projectGroup.projects,
        project => get(project, 'name').toLowerCase().includes(searchPatern.toLowerCase())
      );
      return {
        ...projectGroup,
        projects: ownedProjects,
      };
    });
  }

  return (
    <CopyProjectPresenter
      open={open} setOpen={setOpen}
      projectGroupId={projectGroupId}
      searchPatern={searchPatern} setSearchPatern={setSearchPatern}
      groups={groups}
      handleCopyProject={(projectId, name, description, startDate, isCopyMember, workType, workGroup) =>
        doCopyProject({
          projectId: projectId === 'default' ? null : projectId,
          name,
          description,
          startDate,
          isCopyMember,
          workType,
          workGroup
        })
      }
    />
  )
}

const mapStateToProps = state => {
  return null
}

const mapDispatchToProps = dispatch => {
  return {
    doListProjectGroup: (options, quite) => dispatch(listProjectGroup(options, quite)),
    doCopyProject: ({ projectId, name, description, startDate, isCopyMember, workType, workGroup }) => dispatch(copyProject({ projectId, name, description, startDate, isCopyMember, workType, workGroup })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CopyProject);
