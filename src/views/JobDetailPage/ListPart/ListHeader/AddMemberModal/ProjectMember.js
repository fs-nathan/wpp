import React from 'react';
import Button from '@material-ui/core/Button';

import styled from 'styled-components';
import { ListItem, Avatar, } from '@material-ui/core';
import ColorTypo from 'components/ColorTypo';

import { useSelector, useDispatch } from 'react-redux';
import { createMember } from 'actions/taskDetail/taskDetailActions';

const StyledListItem = styled(ListItem)`
  display: flex;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 8px;
  }
  & > *:last-child {
    margin-left: auto;
  }
`;

const AddButton = styled(Button)`
    border: 1px solid #e2e2e2;
    padding: 0 5px;
    color: gray;
    font-weight: 400;
    border-radius: 2px;
    &&:hover {
        color: #fff;
        background: #10c401;
    }
`

function ProjectMember(props) {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);

  function onClickAdd() {
    dispatch(createMember({ task_id: taskId, member_id: props.id }))
    console.log('hello', props)
  }
  return (
    <StyledListItem>
      <Avatar src={props.avatar} alt='avatar' />
      <div>
        <ColorTypo bold fontSize>{props.name}</ColorTypo>
        <ColorTypo>{props.email}</ColorTypo>
        <ColorTypo color="orange">{props.label}</ColorTypo>
      </div>
      {/* <Chip
              bold="true"
              label="Thêm"
              onClick={props.valueContext.createMemberToTask}
          /> */}
      <AddButton onClick={onClickAdd}>Thêm</AddButton>
    </StyledListItem>
  )
}

export default ProjectMember