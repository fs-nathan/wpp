import { filter, get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import CreateProjectCalendar from "../../CalendarPage/views/Modals/CreateProjectCalendar";
import CalendarProjectLeftPartPresenter from './presenter';
import './style.scss';

function CalendarProjectLeftPart({
  groupSchedules
}) {
  const [openCreate, setOpenCreate] = React.useState(false);
  const [searchPattern, setSearchPattern] = React.useState('');
  const [filterdGroupSchedules, setFilterdGroupSchedules] = React.useState(groupSchedules);

  function doOpenModal(type, props) {
    switch (type) {
      case 'CREATE': {
        setOpenCreate(true);
        return;
      }
      case 'DELETE': {
        return;
      }
      default: return;
    }
  }

  React.useEffect(() => {
    let filtered = filter(groupSchedules.data, schedule => get(schedule, 'name', '').toLowerCase().includes(searchPattern.toLowerCase()));
    setFilterdGroupSchedules({
      ...groupSchedules,
      data: filtered
    });
  }, [searchPattern, groupSchedules])

  return (
    <>
      <CalendarProjectLeftPartPresenter
        groupSchedules={filterdGroupSchedules}
        handleOpenModal={doOpenModal}
        searchPattern={searchPattern}
        handleSearchPattern={value => setSearchPattern(value)}
      />
      <CreateProjectCalendar
        open={openCreate}
        setOpen={setOpenCreate}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {

  };
};

export default connect(mapStateToProps)(CalendarProjectLeftPart);