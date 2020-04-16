import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteProject } from '../../../../actions/project/deleteProject';
import AlertModal from '../../../../components/AlertModal';
import { CustomEventDispose, CustomEventListener, DELETE_PROJECT } from '../../../../constants/events.js';
import EditProjectModal from '../../../ProjectGroupPage/Modals/EditProject';
import { routeSelector } from '../../../ProjectGroupPage/selectors';
import { Context as ProjectContext } from '../../index';
import ProjectDetailPresenter from './presenters';
import { projectSelector } from './selectors';

function ProjectDetail({
  project, route,
  doDeleteProject,
}) {

  const { setProjectId } = React.useContext(ProjectContext);
  const { projectId } = useParams();
  const history = useHistory();

  React.useEffect(() => {
    setProjectId(projectId);
  }, [setProjectId, projectId]);

  React.useEffect(() => {
    const historyPushHandler = () => {
      history.push(route);
    };

    CustomEventListener(DELETE_PROJECT, historyPushHandler);

    return () => {
      CustomEventDispose(DELETE_PROJECT, historyPushHandler);
    };
  }, [history, projectId, route]);

  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [updateProps, setUpdateProps] = React.useState({});
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case 'UPDATE': {
        setOpenUpdate(true);
        setUpdateProps(props);
        return;
      }
      case 'ALERT': {
        setOpenAlert(true);
        setAlertProps(props);
        return;
      }
      default: return;
    }
  }

  return (
    <>
      <ProjectDetailPresenter
        project={project} route={route}
        handleDeleteProject={(project) =>
          doDeleteProject({ projectId: get(project, 'id') })
        }
        handleOpenModal={doOpenModal}
      />
      <EditProjectModal
        open={openUpdate}
        setOpen={setOpenUpdate}
        {...updateProps}
      />
      <AlertModal
        open={openAlert}
        setOpen={setOpenAlert}
        {...alertProps}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    project: projectSelector(state),
    route: routeSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doDeleteProject: ({ projectId }) => dispatch(deleteProject({ projectId }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectDetail);
