import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Context as ProjectContext } from '../../index';
import { filter, get, } from 'lodash';
import AlertModal from '../../../../components/AlertModal';
import { sortGroupTask } from '../../../../actions/groupTask/sortGroupTask';
import { deleteGroupTask } from '../../../../actions/groupTask/deleteGroupTask';
import CreateGroupTask from '../../Modals/CreateGroupTask';
import UpdateGroupTask from '../../Modals/UpdateGroupTask';
import GroupTaskSlidePresenter from './presenters';
import { groupTasksSelector } from './selectors';

function GroupTaskSlide({ 
  handleSubSlide, 
  groupTasks, 
  doSortGroupTask, doDeleteGroupTask, 
}) {
  
  const { setProjectId } = React.useContext(ProjectContext);
  const { projectId } = useParams();

  const [searchPatern, setSearchPatern] = React.useState('');
  
  const newGroupTasks = {
    ...groupTasks,
    groupTasks: filter(
      groupTasks.groupTasks,
      groupTask => get(groupTask, 'name').toLowerCase().includes(searchPatern.toLowerCase()),
    )
  }

  React.useEffect(() => {
    setProjectId(projectId);
  }, [setProjectId, projectId]);

  const [openCreate, setOpenCreate] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [updateProps, setUpdateProps] = React.useState({});
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case 'CREATE': {
        setOpenCreate(true);
        return;
      }
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
      <GroupTaskSlidePresenter 
        handleSubSlide={handleSubSlide}
        searchPatern={searchPatern} setSearchPatern={setSearchPatern}
        groupTasks={newGroupTasks} 
        handleSortGroupTask={(groupTaskId, sortIndex) => 
          doSortGroupTask({ groupTaskId, sortIndex })
        }
        handleDeleteGroupTask={groupTask => 
          doDeleteGroupTask({ groupTaskId: get(groupTask, 'id') })
        }
        handleOpenModal={doOpenModal}
      />
      <AlertModal
        open={openAlert}
        setOpen={setOpenAlert}
        {...alertProps}
      />
      <CreateGroupTask 
        open={openCreate} 
        setOpen={setOpenCreate} 
      />
      <UpdateGroupTask 
        open={openUpdate} 
        setOpen={setOpenUpdate}
        {...updateProps} 
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    groupTasks: groupTasksSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doSortGroupTask: ({ groupTaskId, sortIndex }) => dispatch(sortGroupTask({ groupTaskId, sortIndex })),
    doDeleteGroupTask: ({ groupTaskId }) => dispatch(deleteGroupTask({ groupTaskId })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupTaskSlide);
