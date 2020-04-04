import { filter, get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { sortProjectGroup } from '../../../../actions/projectGroup/sortProjectGroup';
import CreateProjectGroup from '../../Modals/CreateProjectGroup';
import { routeSelector } from '../../selectors';
import ProjectGroupListPresenter from './presenters';
import { groupsSelector } from './selectors';

function ProjectList({
  groups, route,
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
        groups={newGroups} route={route}
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
    route: routeSelector(state),
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
