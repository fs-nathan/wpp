import { Avatar, ListItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { createMember } from 'actions/taskDetail/taskDetailActions';
import ColorTypo from 'components/ColorTypo';
import once from 'lodash/once';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';

function ProjectMember(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);

  function onClickAdd() {
    dispatch(createMember({ task_id: taskId, member_id: props.id }))
    // console.log('hello', props)
  }
  return (
    <ListItem className="projectMemberItem">
      <Avatar src={props.avatar} alt='avatar' />
      <div>
        <ColorTypo bold fontSize>{props.name}</ColorTypo>
        <ColorTypo>{props.email}</ColorTypo>
        <ColorTypo color="orange">{props.label}</ColorTypo>
      </div>
      <Button className="projectMemberItem--button" onClick={once(onClickAdd)}>{t('LABEL_CHAT_TASK_THEM')}</Button>
    </ListItem>
  )
}

export default ProjectMember