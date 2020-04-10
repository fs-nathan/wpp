import { filter, get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { sortProjectGroup } from '../../../../actions/projectGroup/sortProjectGroup';
import CreateProjectGroup from '../../Modals/CreateProjectGroup';
import { routeSelector, viewPermissionsSelector } from '../../selectors';
import ProjectGroupListPresenter from './presenters';
import { groupsSelector } from './selectors';

function ProjectList({
  groups, route, viewPermissions,
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
        if (get(viewPermissions.permissions, 'manage_group_project', false)) {
          setOpenCreate(true);
        }
        return;
      }
      default: return;
    }
  }

  return (
    <>
      <ProjectGroupListPresenter
        groups={newGroups} route={route} canModify={get(viewPermissions.permissions, 'manage_group_project', false)}
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
    viewPermissions: viewPermissionsSelector(state),
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
