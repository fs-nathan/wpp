import { Checkbox, ListItemText } from '@material-ui/core';
import { Primary, StyledList, StyledListItem } from 'components/CustomList';
import CustomModal from 'components/CustomModal';
import SearchInput from 'components/SearchInput';
import { COPY_GROUP_TASK, CustomEventDispose, CustomEventListener, GET_ALL_GROUP_TASK, LIST_GROUP_TASK } from 'constants/events';
import { find, get, remove } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './style.scss';

const CustomListItem = ({ className = '', ...props }) =>
  <StyledListItem
    className={`view_Project_CopyGroupTask_Modal___list-item ${className}`}
    {...props}
  />;

const StyledPrimary = ({ className = '', isSelected, ...props }) =>
  <Primary
    className={`${isSelected
      ? 'view_Project_CopyGroupTask_Modal___primary-selected'
      : 'view_Project_CopyGroupTask_Modal___primary'} ${className}`}
    {...props}
  />;

function CopyGroupTask({
  open, setOpen,
  fetchChart,
  searchPattern, setSearchPattern,
  groupTasks, handleCopyGroupTask,
  doReload, projectId, timeRange,
}) {

  const [selectedGroupTasks, setSelectedGroupTasks] = React.useState([]);
  const [activeLoading, setActiveLoading] = React.useState(false);
  const [activeMask, setActiveMask] = React.useState(-1);
  const { t } = useTranslation();

  React.useEffect(() => {
    setActiveLoading((activeMask === 3 || activeMask === -1) ? false : true);
    if (activeMask === 3) {
      setOpen(false);
      if (fetchChart) fetchChart(false, true)
    }
    // eslint-disable-next-line
  }, [activeMask]);

  React.useEffect(() => {
    const fail = () => {
      setActiveMask(-1);
    };
    CustomEventListener(COPY_GROUP_TASK.SUCCESS, doReload);
    CustomEventListener(COPY_GROUP_TASK.FAIL, fail);
    return () => {
      CustomEventDispose(COPY_GROUP_TASK.SUCCESS, doReload);
      CustomEventDispose(COPY_GROUP_TASK.FAIL, fail);
      CustomEventListener(COPY_GROUP_TASK.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [projectId, timeRange]);

  React.useEffect(() => {
    const success = bit => () => {
      setActiveMask(oldMask => oldMask | (1 << bit));
    };
    const fail = () => {
      setActiveMask(-1);
    };
    CustomEventListener(LIST_GROUP_TASK.SUCCESS, success(0));
    CustomEventListener(GET_ALL_GROUP_TASK.SUCCESS, success(1));
    CustomEventListener(LIST_GROUP_TASK.FAIL, fail);
    CustomEventListener(GET_ALL_GROUP_TASK.FAIL, fail);
    return () => {
      CustomEventListener(LIST_GROUP_TASK.SUCCESS, success(0));
      CustomEventListener(GET_ALL_GROUP_TASK.SUCCESS, success(1));
      CustomEventListener(LIST_GROUP_TASK.FAIL, fail);
      CustomEventListener(GET_ALL_GROUP_TASK.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [projectId, timeRange]);

  return (
    <React.Fragment>
      <CustomModal
        title={t("DMH.VIEW.PP.MODAL.COPY.TITLE")}
        open={open}
        setOpen={setOpen}
        canConfirm={selectedGroupTasks.length > 0}
        onConfirm={() => {
          handleCopyGroupTask(selectedGroupTasks);
          setActiveMask(0);
        }}
        onCancle={() => setOpen(false)}
        loading={groupTasks.loading}
        activeLoading={activeLoading}
        manualClose={true}
      >
        <SearchInput
          fullWidth
          placeholder={t("DMH.VIEW.PP.MODAL.COPY.SEARCH")}
          value={searchPattern}
          onChange={evt => setSearchPattern(evt.target.value)}
        />
        <div style={{ marginBottom: "10px" }} />
        <StyledList
          component="nav"
        >
          {groupTasks.groupTasks.map(groupTask => (
            <CustomListItem
              key={get(groupTask, 'id')}
              onClick={() => setSelectedGroupTasks(prevSelectedGroupTasks => {
                let selectedGroupTasks = [...prevSelectedGroupTasks];
                if (find(selectedGroupTasks, { id: get(groupTask, 'id') })) {
                  remove(selectedGroupTasks, { id: get(groupTask, 'id') });
                } else {
                  selectedGroupTasks = [...selectedGroupTasks, groupTask];
                }
                return selectedGroupTasks;
              })}>
              <ListItemText
                primary={
                  <StyledPrimary
                    isSelected={find(selectedGroupTasks, { id: get(groupTask, 'id') })}
                  >
                    <Checkbox
                      color='primary'
                      checked={find(selectedGroupTasks, { id: get(groupTask, 'id') }) !== undefined}
                    />
                    <span>{get(groupTask, 'name', '')}</span>
                  </StyledPrimary>
                }
              />
            </CustomListItem>
          ))}
        </StyledList>
      </CustomModal>
    </React.Fragment>
  )
}

export default CopyGroupTask;
