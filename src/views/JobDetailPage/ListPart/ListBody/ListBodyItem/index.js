import { Avatar, ListItemAvatar, ListItemText } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import { mdiPin } from '@mdi/js';
import Icon from '@mdi/react';
import { chooseTask, getTaskDetailTabPart, showTab } from 'actions/taskDetail/taskDetailActions';
import clsx from 'classnames';
import ColorChip from 'components/ColorChip';
import ColorTypo from 'components/ColorTypo';
import SimpleDonutChart from 'components/SimpleDonutChart';
import get from 'lodash/get';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

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

const badgeState = label => {
  let color;
  switch (label) {
    case 'Waiting':
      color = 'orangelight';
      break;
    case 'Doing':
      color = 'indigolight';
      break;
    case 'Complete':
      color = 'light-green';
      break;
    case 'Expired':
      color = 'redlight';
      break;
    case 'Stop':
      color = 'redlight';
      break;
    default:
      color = 'redlight';
  }

  return <BadgeItem color={color} badge label={label} size="small" />;
};
function JobName(props) {
  return (
    <div className="name-container-lbd" variant="space-between">
      <ColorTypo bold>{props.title}</ColorTypo>
      <div>
        <IconPin
          color={'#6e6e6e'}
          path={mdiPin}
          size={0.8}
          {...props}
          isghim={props.isghim.toString()}
        />
        {badgeState(props.label)}
      </div>
    </div>
  );
}

function JobContent(props) {
  const { avatar, notify = 1, ...rest } = props
  return (
    <div className="container-content-lbd">
      <div title={props.name}>
        <Avatar src={avatar} alt="avatar" />
        <ColorTypo color="#7a869a">{props.content}</ColorTypo>
      </div>
      <div>
        <ChipMes
          label={notify}
          size="small"
          {...rest}
          notification={props.notification.toString()}
        />
        <div>{props.time}</div>
      </div>
    </div>
  );
}

function JobUnit(props) {
  return (
    <ListItemText disableTypography>
      <JobName
        title={props.name}
        label={props.status_name}
        isghim={props.is_ghim}
      />
      <JobContent
        time={props.updated_time}
        avatar={props.chat.user_create_avatar}
        content={props.chat.content}
        notification={props.new_chat}
        name={props.chat.user_create_name}
      />
    </ListItemText>
  );
}

function ListBodyItem(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const groupActiveColor = useSelector(state => get(state, 'system.profile.group_active.color'))
  // console.log({value})

  function onClickItem() {
    dispatch(chooseTask(props.id));
    dispatch(getTaskDetailTabPart({ taskId: props.id }));
    dispatch(showTab(0))
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
      <JobUnit {...props} />
    </div>
  );
}

export default ListBodyItem;
