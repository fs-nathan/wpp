import React from 'react';
import { useParams } from 'react-router-dom';
import {
  ListItemText, Checkbox,
} from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import SearchInput from '../../../../components/SearchInput';
import { copyGroupTask } from '../../../../actions/groupTask/copyGroupTask';
import { connect } from 'react-redux';
import { StyledList, StyledListItem, Primary } from '../../../../components/CustomList';
import { get, find, remove } from 'lodash';
import Icon from '@mdi/react';
import { mdiCheckCircle, } from '@mdi/js';
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

function CopyGroupTask({ open, setOpen, getAllGroupTask, doCopyGroupTask }) {

  const { projectId } = useParams();
  const { data: { groupTasks: _groupTasks } } = getAllGroupTask;

  const [groupTasks, setGroupTasks] = React.useState([]);
  const [searchPatern, setSearchPatern] = React.useState('');
  const [selectedGroupTasks, setSelectedGroupTasks] = React.useState([]);

  React.useEffect(() => {
    setGroupTasks(_groupTasks.filter(groupTask => 
      get(groupTask, 'name', '').toLowerCase().includes(searchPatern.toLowerCase())
    ));
  }, [_groupTasks, searchPatern]);

  function handleCopyGroupTask() {
    doCopyGroupTask({
      groupTaskId: selectedGroupTasks.map(groupTask => get(groupTask, 'id')),
      projectId,
    })
    setOpen(false);
  }

  return (
    <React.Fragment>
      <CustomModal
        title={`Sao chép nhóm công việc`}
        open={open}
        setOpen={setOpen}
        canConfirm={selectedGroupTasks.length > 0}
        onConfirm={() => handleCopyGroupTask()}
      >
        <SearchInput 
          fullWidth 
          placeholder='Tìm nhóm công việc'
          value={searchPatern}
          onChange={evt => setSearchPatern(evt.target.value)}
        />  
        <StyledList
          component="nav"
        >
          {groupTasks.map(groupTask => (
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

const mapStateToProps = state => {
  return {
    getAllGroupTask: state.groupTask.getAllGroupTask,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doCopyGroupTask: ({ groupTaskId, projectId }) => dispatch(copyGroupTask({ groupTaskId, projectId })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CopyGroupTask);
