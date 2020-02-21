import React from 'react';
import { get } from 'lodash';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Context as ProjectContext } from '../../index';
import EditProjectModal from '../../../ProjectGroupPage/Modals/EditProject';
import AlertModal from '../../../../components/AlertModal';
import { CustomEventListener, CustomEventDispose, DELETE_PROJECT } from '../../../../constants/events.js';
import { deleteProject } from '../../../../actions/project/deleteProject';
import { projectSelector } from './selectors';
import ProjectDetailPresenter from './presenters';

function ProjectDetail({ 
  project, 
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
      history.push('/projects');
    };

    CustomEventListener(DELETE_PROJECT, historyPushHandler);
    
    return () => {
      CustomEventDispose(DELETE_PROJECT, historyPushHandler);
    };
  }, [history, projectId]);

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
        project={project}
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
