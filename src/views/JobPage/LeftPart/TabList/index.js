import React from 'react';
import styled from 'styled-components';
import { mdiPlus } from '@mdi/js';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { 
  mdiDragVertical, mdiAccountDetails, 
  mdiAlarm, mdiAlarmOff, mdiTimerSand,
  mdiAccountArrowLeft, mdiAccountArrowRight, mdiAccountSearch,
  mdiRocket, mdiHeartPulse, mdiCoffee,  
} from '@mdi/js';
import { ListItemText } from '@material-ui/core';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import { StyledList, StyledListItem, Primary, Secondary } from '../../../../components/CustomList';
import { map, get } from 'lodash';
import { connect } from 'react-redux';

const StyledPrimary = styled(Primary)`
  font-weight: 500;
`;

const CustomStyledList = styled(StyledList)`
  & > * {
    &:nth-child(1), &:nth-child(4), &:nth-child(7) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
`;

const CustomIcon = styled(Icon)`
  border-radius: 100%;
  padding: 8px;
  background: #eee;
`;

const tabs = [{
  name: 'Công việc của bạn',
  task_count: 0,
  iconPath: mdiAccountDetails,
}, {
  name: 'Đến hạn',
  task_count: 0,
  iconPath: mdiAlarm,
}, {
  name: 'Quá hạn',
  task_count: 0,
  iconPath: mdiAlarmOff,
}, {
  name: 'Đang chờ',
  task_count: 0,
  iconPath: mdiTimerSand,
}, {
  name: 'Được giao',
  task_count: 0,
  iconPath: mdiAccountArrowLeft,
}, {
  name: 'Tôi đề xuất',
  task_count: 0,
  iconPath: mdiAccountArrowRight,
}, {
  name: 'Tôi giám sát',
  task_count: 0,
  iconPath: mdiAccountSearch,
}, {
  name: 'Ưu tiên cao',
  task_count: 0,
  iconPath: mdiRocket,
}, {
  name: 'Ưu tiên trung bình',
  task_count: 0,
  iconPath: mdiHeartPulse,
}, {
  name: 'Ưu tiên thấp',
  task_count: 0,
  iconPath: mdiCoffee,
}];

function ProjectList() {

  const loading = false;
  const error = null;

  return (
    <>
      {error !== null && <ErrorBox />}
      {error === null && (
        <LeftSideContainer
          title='Công việc của bạn'
          loading={{
            bool: loading,
            component: () => <LoadingBox />,
          }}
        >
          <CustomStyledList>
            {map(tabs, (tab, index) => (
              <StyledListItem
                to='#'
                component={Link}
              >
                <div>
                  <Icon path={mdiDragVertical} size={1} color={'rgba(0, 0, 0, 0)'}/>
                </div>
                <CustomIcon path={get(tab, 'iconPath')} size={1.5} color={'rgba(0, 0, 0, 0.54)'} />
                <ListItemText 
                  primary={
                    <StyledPrimary>{get(tab, 'name', '')}</StyledPrimary>  
                  }
                  secondary={
                    <Secondary>{get(tab, 'task_count', 0)} việc</Secondary>
                  }
                /> 
              </StyledListItem>
            ))}
          </CustomStyledList>
        </LeftSideContainer>
      )}
    </>
  )
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectList);
