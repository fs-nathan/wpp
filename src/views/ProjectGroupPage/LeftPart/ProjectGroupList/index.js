import React from 'react';
import { get, filter } from 'lodash';
import CreateProjectGroup from '../../Modals/CreateProjectGroup';
import { connect } from 'react-redux';
import { sortProjectGroup } from '../../../../actions/projectGroup/sortProjectGroup';
import { groupsSelector } from './selectors';
import ProjectGroupListPresenter from './presenters';

function ProjectList({ 
  groups, 
  doSortProjectGroup, 
}) {

  const [searchPatern, setSearchPatern] = React.useState('');

  const newGroups = {
    ...groups,
    groups: filter(groups.groups, projectGroup => get(projectGroup, 'name', '').toLowerCase().includes(searchPatern.toLowerCase())),
  }

  const [openCreate, setOpenCreate] = React.useState(false);

  function doOpenModal(type, props) {
    switch (type) {
      case 'CREATE': {  
        setOpenCreate(true);
        return;
      }
      default: return;
    }
  }

  return (
    <>
      <ProjectGroupListPresenter 
        groups={newGroups}
        searchPatern={searchPatern} setSearchPatern={setSearchPatern}
        handleSortProjectGroup={(projectGroupId, sortIndex) => doSortProjectGroup({ projectGroupId, sortIndex })} 
        handleOpenModal={doOpenModal}
      />
      <CreateProjectGroup open={openCreate} setOpen={setOpenCreate} />
    </>
  )
}

const mapStateToProps = state => {
  return {
    groups: groupsSelector(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doSortProjectGroup: ({ projectGroupId, sortIndex }) => dispatch(sortProjectGroup({ projectGroupId, sortIndex })),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectList);
