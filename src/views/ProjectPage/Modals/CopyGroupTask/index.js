import React from 'react';
import { useParams } from 'react-router-dom';
import {
  ListItemText,
} from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import SearchInput from '../../../../components/SearchInput';
import { createGroupTask } from '../../../../actions/groupTask/createGroupTask';
import { connect } from 'react-redux';
import { StyledList, StyledListItem, Primary } from '../../../../components/CustomList';
import { get } from 'lodash';
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

function CopyGroupTask({ open, setOpen, getAllGroupTask, doCreateGroupTask }) {

  const { projectId } = useParams();
  const { data: { groupTasks: _groupTasks } } = getAllGroupTask;

  const [groupTasks, setGroupTasks] = React.useState([]);
  const [searchPatern, setSearchPatern] = React.useState('');
  const [selectedGroupTask, setSelectedGroupTask] = React.useState(null);

  React.useEffect(() => {
    setGroupTasks(_groupTasks.filter(groupTask => 
      get(groupTask, 'name', '').toLowerCase().includes(searchPatern.toLowerCase())
    ));
  }, [_groupTasks, searchPatern]);

  function handleCopyGroupTask() {
    doCreateGroupTask({
      projectId,
      name: get(selectedGroupTask, 'name', ''),
    }); 
    setOpen(false);
  }

  return (
    <React.Fragment>
      <CustomModal
        title={`Sao chép nhóm công việc`}
        open={open}
        setOpen={setOpen}
        canConfirm={selectedGroupTask !== null}
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
            <CustomListItem key={get(groupTask, 'id')} onClick={() => setSelectedGroupTask(groupTask)}>
              <ListItemText 
                primary={
                  <StyledPrimary isSelected={get(selectedGroupTask, 'id') === get(groupTask, 'id')}>
                    <Icon path={mdiCheckCircle} size={1} /> 
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
    doCreateGroupTask: ({ projectId, name, description }) => dispatch(createGroupTask({ projectId, name, description })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CopyGroupTask);
