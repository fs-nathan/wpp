import React from 'react';
import {
  ListItemText, Checkbox,
} from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import SearchInput from '../../../../components/SearchInput';
import { StyledList, StyledListItem, Primary } from '../../../../components/CustomList';
import { get, find, remove } from 'lodash';
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
  searchPatern, setSearchPatern,
  groupTasks, 
  handleCopyGroupTask,
}) {

  const [selectedGroupTasks, setSelectedGroupTasks] = React.useState([]);

  return (
    <React.Fragment>
      <CustomModal
        title={`Sao chép nhóm công việc`}
        open={open}
        setOpen={setOpen}
        canConfirm={selectedGroupTasks.length > 0}
        onConfirm={() => handleCopyGroupTask(selectedGroupTasks)}
        loading={groupTasks.loading}
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