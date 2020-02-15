import React from 'react';
import { get } from 'lodash';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Context as ProjectGroupContext } from '../../index';
import { deleteProjectGroup } from '../../../../actions/projectGroup/deleteProjectGroup';
import AlertModal from '../../../../components/AlertModal';
import { CustomEventListener, CustomEventDispose, DELETE_PROJECT_GROUP } from '../../../../constants/events.js';
import CreateProjectGroup from '../../Modals/CreateProjectGroup';
import MembersDetail from '../../Modals/MembersDetail';
import { groupSelector } from './selectors';
import ProjectGroupDetailPresenter from './presenters';

function ProjectGroupDetail({ 
  group, 
  doDeleteProjectGroup,
}) {
  
  const { setProjectGroupId } = React.useContext(ProjectGroupContext);
  const { projectGroupId } = useParams();
  const history = useHistory();
  
  const [openCreate, setOpenCreate] = React.useState(false);
  const [createProps, setCreateProps] = React.useState({});
  const [openMember, setOpenMember] = React.useState(false);
  const [memberProps, setMemberProps] = React.useState({});
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({});
  
  React.useEffect(() => {
    setProjectGroupId(projectGroupId);
  }, [setProjectGroupId, projectGroupId]);

  React.useEffect(() => {
    const historyPushHandler = () => {
      history.push('/projects');
    };

    CustomEventListener(DELETE_PROJECT_GROUP, historyPushHandler);
    
    return () => {
      CustomEventDispose(DELETE_PROJECT_GROUP, historyPushHandler);
    };
  }, [history, projectGroupId]);

  function doOpenModal(type, props) {
    switch (type) {
      case 'UPDATE': {
        setOpenCreate(true);
        setCreateProps(props);
        return;
      }
      case 'MEMBER': {
        setOpenMember(true);
        setMemberProps(props);
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
      <ProjectGroupDetailPresenter 
        group={group}
        handleDeleteProjectGroup={projectGroup => 
          doDeleteProjectGroup({ projectGroupId: get(projectGroup, 'id') })
        } 
        handleOpenModal={doOpenModal}
      />
      <CreateProjectGroup 
        open={openCreate} 
        setOpen={setOpenCreate} 
        {...createProps}  
      />
      <MembersDetail 
        open={openMember} 
        setOpen={setOpenMember} 
        {...memberProps}
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
    group: groupSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doDeleteProjectGroup: ({ projectGroupId }) => dispatch(deleteProjectGroup({ projectGroupId })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectGroupDetail);
