import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteProjectGroup } from '../../../../actions/projectGroup/deleteProjectGroup';
import AlertModal from '../../../../components/AlertModal';
import { CustomEventDispose, CustomEventListener, DELETE_PROJECT_GROUP } from '../../../../constants/events.js';
import { Context as ProjectGroupContext } from '../../index';
import CreateProjectGroup from '../../Modals/CreateProjectGroup';
import MembersDetail from '../../Modals/MembersDetail';
import { routeSelector, viewPermissionsSelector } from '../../selectors';
import ProjectGroupDetailPresenter from './presenters';
import { groupSelector } from './selectors';

function ProjectGroupDetail({
  group, route, viewPermissions,
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
      history.push(route);
    };

    CustomEventListener(DELETE_PROJECT_GROUP, historyPushHandler);

    return () => {
      CustomEventDispose(DELETE_PROJECT_GROUP, historyPushHandler);
    };
    //eslint-disable-next-line
  }, [history, projectGroupId]);

  function doOpenModal(type, props) {
    switch (type) {
      case 'UPDATE': {
        if (get(viewPermissions.permissions, 'manage_project_group', false)) {
          setOpenCreate(true);
          setCreateProps(props);
        }
        return;
      }
      case 'MEMBER': {
        if (get(viewPermissions.permissions, 'manage_project_group', false)) {
          setOpenMember(true);
          setMemberProps(props);
        }
        return;
      }
      case 'ALERT': {
        if (get(viewPermissions.permissions, 'manage_project_group', false)) {
          setOpenAlert(true);
          setAlertProps(props);
        }
        return;
      }
      default: return;
    }
  }

  return (
    <>
      <ProjectGroupDetailPresenter
        group={group} route={route} canModify={get(viewPermissions.permissions, 'manage_project_group', false)}
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
    route: routeSelector(state),
    viewPermissions: viewPermissionsSelector(state),
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
