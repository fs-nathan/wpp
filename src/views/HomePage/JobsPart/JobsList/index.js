import React from 'react';
import { List } from '@material-ui/core';
import JobListItem from './JobListItem';
import JobListSubHeader from './JobListSubHeader';

function JobsList() {
  return (
    <List>
      <JobListSubHeader subHeader='Công việc đến hạn' />
      <JobListItem />
      <JobListItem />
      <JobListSubHeader subHeader='Công việc quá hạn' />
      <JobListItem />
      <JobListItem />
      <JobListSubHeader subHeader='Công việc đang chờ' />
      <JobListItem />
      <JobListItem />
    </List>
  )
}

export default JobsList;
