import React from 'react';
import StageSettingPresenter from './presenters';
import { connect } from 'react-redux';
import { getManager, getManagerReset } from 'actions/kanban/getManager';
import { updateManagers } from 'actions/kanban/updateManagers';
import { memberProject } from 'actions/project/memberProject';
import { listTask } from 'actions/kanban/listTask';
import { managersSelector, membersSelector, bgColorSelector } from './selectors';
import { get, isNil } from 'lodash';
import AddOfferMemberModal from 'views/JobDetailPage/TabPart/OfferTab/AddOfferMemberModal';

function StageSetting({
  open, setOpen,
  stageName,
  groupTask,
  projectId = null,
  index,
  doGetManager, managers,
  doMemberProject, members,
  doUpdateManagers,
  doReset,
  bgColor,
  doListTask,
}) {

  const [ openAddOfferMember, setOpenAddOfferMember ] = React.useState(false);
  const [ value, setValue ] = React.useState([]);
  const [ activeLoading, setActiveLoading ] = React.useState(false);

  React.useLayoutEffect(() => {
    doReset();
  }, [groupTask, projectId]);

  React.useEffect(() => {
    const value = members.members.reduce((res, member) => {
      if (managers.managers.map(manager => get(manager, 'id')).includes(get(member, 'id'))) {
        return [...res, get(member, 'index')];
      } else return res;
    }, []);
    setValue(value);
  }, [members, managers]);

  React.useEffect(() => {
    if (!isNil(groupTask)) {
      doGetManager({
        groupId: get(groupTask, 'id', '')
      });
    }
    // eslint-disable-next-line
  }, [groupTask]);

  React.useEffect(() => {
    if (!isNil(projectId)) {
      doMemberProject({ projectId });
    }
    // eslint-disable-next-line
  }, [projectId]);

  function doOpenModal(type, props) {
    switch (type) {
      case 'ADD_MANAGER': {
        setOpenAddOfferMember(true);
        return;        
      }
      default: return;
    }
  }

  const handleChangeValue = newValue => {
    const oldValue = Array.from(value);
    let addManagers = [];
    let removeManagers = [];
    members.members.forEach(member => {
      const index = get(member, 'index');
      if (oldValue.includes(index)) {
        if (newValue.includes(index)) {
          return;
        } else {
          removeManagers.push(get(member, 'id'));
        }
      } else {
        if (newValue.includes(index)) {
          addManagers.push(get(member, 'id'));
        } else {
          return;
        }
      }
    });
    doUpdateManagers({
      groupId: get(groupTask, 'id'),
      managersAdded: addManagers,
      managersRemoved: removeManagers,
    });
    setActiveLoading(true);
  };

  return (
    <>
      <StageSettingPresenter 
        open={open} setOpen={setOpen}
        stageName={stageName}
        index={index}
        groupTask={groupTask}
        managers={managers.managers}
        handleOpenModal={doOpenModal}
        loading={managers.loading || members.loading}
        bgColor={bgColor}
        doReload={() => !isNil(projectId) && doListTask({ projectId })}
        activeLoading={activeLoading}
        setActiveLoading={setActiveLoading}
        projectId={projectId}
      />
      <AddOfferMemberModal 
        isOpen={openAddOfferMember}
        setOpen={setOpenAddOfferMember}
        members={members.members}
        value={[...value]}
        disableIndexes={[]}
        onChange={handleChangeValue}
        isUpdate={true}
      />
    </>
  );
}

const mapStateToProps = state => ({
  managers: managersSelector(state),
  members: membersSelector(state),
  bgColor: bgColorSelector(state),
});


const mapDispatchToProps = dispatch => ({
  doGetManager: (option, quite) => dispatch(getManager(option, quite)),
  doUpdateManagers: (option, quite) => dispatch(updateManagers(option, quite)),
  doMemberProject: (option, quite) => dispatch(memberProject(option, quite)),
  doReset: () => dispatch(getManagerReset()),
  doListTask: (option, quite) => dispatch(listTask(option, quite)),
})

export default connect(mapStateToProps, mapDispatchToProps)(StageSetting);