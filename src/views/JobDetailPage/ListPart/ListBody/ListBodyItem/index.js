import { Avatar, ListItemAvatar, ListItemText } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import { mdiPin } from '@mdi/js';
import Icon from '@mdi/react';
import { loadChat } from 'actions/chat/chat';
import { chooseTask, getTaskDetailTabPart, showTab } from 'actions/taskDetail/taskDetailActions';
import clsx from 'classnames';
import ColorChip from 'components/ColorChip';
import ColorTypo from 'components/ColorTypo';
import SimpleDonutChart from 'components/SimpleDonutChart';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { currentColorSelector } from 'views/JobDetailPage/selectors';

const BadgeItem = styled(ColorChip)`
  font-weight: 600;
  border-radius: 3px !important;
`;
const IconPin = styled(Icon)`
  display: ${props => (props.isghim === 'true' ? 'block' : 'none')};
`;
const ChipMes = styled(Chip)`
  display: ${props => (props.notification === 'true' ? 'block' : 'none')};
`;

const getBadgeColor = status_code => {
  switch (status_code) {
    case 0:
      return 'orangelight';
    case 1:
      return 'indigolight';
    case 2:
      return 'light-green';
    case 3:
      return 'redlight';
    case 4:
      return 'dark-gray';
    default:
      return 'redlight';
  }
};

function JobName(props) {
  const { isghim = '', isNewChat, ...rest } = props
  return (
    <div className="name-container-lbd" variant="space-between">
      <ColorTypo bold={isNewChat}>{props.title}</ColorTypo>
      <div>
        <IconPin
          color={'#6e6e6e'}
          path={mdiPin}
          size={0.8}
          {...rest}
          isghim={isghim.toString()}
        />
        <BadgeItem color={getBadgeColor(props.status_code)} badge label={props.label} size="small" />
      </div>
    </div>
  );
}

function JobContent(props) {
  const { avatar, notify, notification = '', ...rest } = props
  return (
    <div className="container-content-lbd">
      <div title={props.name}>
        <Avatar src={avatar} alt="avatar" />
        <ColorTypo color="#7a869a">{props.content}</ColorTypo>
      </div>
      {notification && <div>
        <ChipMes
          label={'N'}
          size="small"
          {...rest}
          notification={notification.toString()}
        />
        <div>{props.time}</div>
      </div>}
    </div>
  );
}

function JobUnit(props) {
  const {
    chat = {},
    name,
    status_name,
    status_code,
    new_chat,
    is_ghim,
    updated_time,
  } = props;
  return (
    <ListItemText disableTypography>
      <JobName
        title={name}
        label={status_name}
        status_code={status_code}
        isNewChat={new_chat}
        isghim={is_ghim}
      />
      <JobContent
        time={updated_time}
        avatar={chat.user_create_avatar}
        content={chat.content}
        notification={new_chat}
        name={chat.user_create_name}
      />
    </ListItemText>
  );
}

function ListBodyItem(props) {
  const {
    chat = {},
    name,
    status_name,
    status_code,
    new_chat,
    is_ghim,
    updated_time,
  } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const groupActiveColor = useSelector(currentColorSelector)
  // console.log({ props })

  function onClickItem() {
    dispatch(chooseTask(props.id));
    dispatch(getTaskDetailTabPart({ taskId: props.id }));
    dispatch(showTab(0))
    dispatch(loadChat(props.id))
    // getMemberByTaskId(props.id)
    // getMemberNotAssignedByTaskId(props.id)
    history.push({ search: `?task_id=${props.id}` });
  }

  return (
    <div
      className={clsx("container-lbd", {
        "container-lbd__selected": props.isSelected
      })}
      onClick={onClickItem}
    >
      <ListItemAvatar style={{ padding: '0 0 0 10px' }}>
        <SimpleDonutChart color={groupActiveColor} percentDone={props.complete} />
      </ListItemAvatar>
      <JobUnit {...{
        chat,
        name,
        status_name,
        status_code,
        new_chat,
        is_ghim,
        updated_time,
      }} />
    </div>
  );
}

export default ListBodyItem;
