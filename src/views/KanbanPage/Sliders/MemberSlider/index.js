import React from 'react';
import FilterSliderPresenter from './presenters';
import { connect } from 'react-redux';
import { memberFilterSelector, memberSearchStrSelector, membersSelector } from './selectors';
import { actionVisibleDrawerMessage } from "actions/system/system";
import { setMemberFilter, searchMember } from "actions/kanban/setting";
import { includes, remove, get } from 'lodash';

function FilterSlider({
  doCloseSlider,
  doSetMemberFitler, doSearchMember,
  memberFilter, memberSearchStr,
  members,
  handleOpenModal,
}) {

  React.useEffect(() => {
    const initialMemberFilter = members
      .map(member => get(member, 'id', ''))
    doSetMemberFitler(initialMemberFilter);
  }, [members]);

  const handleMemberFilterChange = (value, all = false) => {
    if (all) {
      const newMemberFilter = members
        .map(member => get(member, 'id', '__dummy__'))
        .filter(member => member !== '__dummy__');
      doSetMemberFitler(value ? newMemberFilter : []);
    } else {
      const newMemberFilter = Array.from(memberFilter);
      if (includes(newMemberFilter, value)) {
        remove(newMemberFilter, member => member === value);
      } else {
        newMemberFilter.push(value);
      }
      doSetMemberFitler(newMemberFilter);
    }
  };

  const handleSearchMember = value => { 
    doSearchMember(value);
  }

  return (
    <FilterSliderPresenter 
      members={members}
      memberFilter={memberFilter} setMemberFilter={handleMemberFilterChange}
      memberSearchStr={memberSearchStr} setMemberSearchStr={handleSearchMember}
      handleCloseClick={doCloseSlider}
      handleOpenModal={handleOpenModal}
    />
  );
}

const mapStateToProps = state => ({
  memberFilter: memberFilterSelector(state),
  memberSearchStr: memberSearchStrSelector(state),
  members: membersSelector(state),
});


const mapDispatchToProps = dispatch => ({
  doCloseSlider: () => dispatch(actionVisibleDrawerMessage({ type: "", anchor: 'right' })),
  doSetMemberFitler: member => dispatch(setMemberFilter(member)),
  doSearchMember: searchStr => dispatch(searchMember(searchStr)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterSlider);