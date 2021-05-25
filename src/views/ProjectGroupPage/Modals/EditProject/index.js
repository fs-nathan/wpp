import { detailProject } from 'actions/project/detailProject';
import { listProject } from 'actions/project/listProject';
import { updateProject } from 'actions/project/updateProject';
import { listProjectGroup } from 'actions/projectGroup/listProjectGroup';
import { useTimes } from 'components/CustomPopover';
import { get } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { localOptionSelector } from '../../selectors';
import EditProjectPresenter from './presenters';
import { groupsSelector } from './selectors';

function EditProject({
  curProject = null,
  open, setOpen,
  groups,
  doUpdateProject,
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
    <EditProjectPresenter
      curProject={curProject}
      projectGroupId={curProject ? (curProject.project_group ? curProject.project_group.id : curProject.group_project_id) : null}
      projectGroupName={curProject ? (curProject.project_group ? curProject.project_group.name : curProject.group_project_name) : ""}
      workType={curProject ? curProject.work_type : 0}
      timeRange={timeRange}
      doReload={() =>
        doReload({
          groupProject: projectGroupId,
          timeStart: get(timeRange, 'timeStart')
            ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD')
            : undefined,
          timeEnd: get(timeRange, 'timeEnd')
            ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD')
            : undefined,
        }, get(curProject, 'id'))
      }
      open={open} setOpen={setOpen}
      groups={groups}
      handleEditProject={({ name, description, projectGroupId, priority, currency, workType  }) =>
        doUpdateProject({ projectId: get(curProject, 'id'), name, description, projectGroupId, priority, currency, work_type: workType })
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
    doReload: (options, projectId) => {
      options !== null && dispatch(listProject(options, true));
      dispatch(detailProject({ projectId }, true));
    },
    doUpdateProject: ({ projectId, name, description, projectGroupId, priority, currency, work_type }) => dispatch(updateProject({ projectId, name, description, projectGroupId, priority, currency, work_type })),
    doListProjectGroup: (options,quite) => dispatch(listProjectGroup(options, quite)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProject);