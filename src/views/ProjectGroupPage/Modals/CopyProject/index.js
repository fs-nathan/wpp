import { copyProject } from 'actions/project/copyProject';
import { listProject } from 'actions/project/listProject';
import { listProjectGroup } from 'actions/projectGroup/listProjectGroup';
import { useTimes } from 'components/CustomPopover';
import { filter, get, map } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { localOptionSelector } from '../../selectors';
import CopyProjectPresenter from './presenters';
import { groupsSelector } from './selectors';

function CopyProject({
  open, setOpen,
  groups,
  doCopyProject,
  doListProjectGroup,
  doReload,
  projectGroupId = undefined,
  localOption,
}) {

  const times = useTimes();
  const { timeType } = localOption;
  const timeRange = React.useMemo(() => {
    const [timeStart, timeEnd] = times[timeType].option();
    return ({
      timeStart,
      timeEnd,
    })
    // eslint-disable-next-line
  }, [timeType]);

  React.useEffect(() => {
    doListProjectGroup({
      timeStart: get(timeRange, 'timeStart')
        ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD')
        : undefined,
      timeEnd: get(timeRange, 'timeEnd')
        ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD')
        : undefined,
    });
  }, [timeRange]);

  const [searchPatern, setSearchPatern] = React.useState('');

  const newGroups = map(groups.groups, (projectGroup) => {
    const ownedProjects = filter(
      projectGroup.projects,
      project => get(project, 'name').toLowerCase().includes(searchPatern.toLowerCase())
    );
    return {
      ...projectGroup,
      projects: ownedProjects,
    };
  });

  return (
    <CopyProjectPresenter
      open={open} setOpen={setOpen}
      projectGroupId={projectGroupId}
      timeRange={timeRange}
      doReload={() => doReload({
        groupProject: projectGroupId,
        timeStart: get(timeRange, 'timeStart')
          ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD')
          : undefined,
        timeEnd: get(timeRange, 'timeEnd')
          ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD')
          : undefined,
      })}
      searchPatern={searchPatern} setSearchPatern={setSearchPatern}
      groups={newGroups}
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
  return {
    groups: groupsSelector(state),
    localOption: localOptionSelector(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doReload: (options) => dispatch(listProject(options, true)),
    doListProjectGroup: (options, quite) => dispatch(listProjectGroup(options, quite)),
    doCopyProject: ({ projectId, name, description, startDate, isCopyMember, workType, workGroup }) => dispatch(copyProject({ projectId, name, description, startDate, isCopyMember, workType, workGroup })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CopyProject);
