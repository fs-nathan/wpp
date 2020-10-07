import { createProject } from 'actions/project/createProject';
import { listProject } from 'actions/project/listProject';
import { listProjectGroup } from 'actions/projectGroup/listProjectGroup';
import { useTimes } from 'components/CustomPopover';
import { get } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { localOptionSelector } from '../../selectors';
import CreateNewProjectPresenter from './presenters';
import { groupsSelector } from './selectors';

function CreateNewProject({
  open, setOpen,
  groups, work_types,
  doCreateProject,
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
    });
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

  return (
    <CreateNewProjectPresenter
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
      groups={groups}
      work_types={work_types}
      handleCreateProject={({ name, description, projectGroupId, priority, currency,work_type }) =>
        doCreateProject({ name, description, projectGroupId, priority, currency,work_type })
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
    doCreateProject: ({ name, description, projectGroupId, priority, currency, work_type }) => dispatch(createProject({ name, description, projectGroupId, priority, currency,work_type })),
    doListProjectGroup: (options, quite) => dispatch(listProjectGroup(options, quite)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateNewProject);
