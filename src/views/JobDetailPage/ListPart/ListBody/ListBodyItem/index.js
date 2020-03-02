import React from 'react';
import { ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import styled from 'styled-components';
import clsx from 'classnames';
import Icon from '@mdi/react';
import { mdiPin } from '@mdi/js';
import SimpleDonutChart from '../../../../../components/SimpleDonutChart';
import ColorTypo from '../../../../../components/ColorTypo';
import ColorChip from '../../../../../components/ColorChip';
import Chip from '@material-ui/core/Chip';
import { WrapperContext } from '../../../index';

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
  const {avatar, ...rest} = props
  return (
    <div className="container-content-lbd">
      <div title={props.name}>
        <Avatar src={avatar} alt="avatar" />
        <ColorTypo color="#7a869a">{props.content}</ColorTypo>
      </div>
      <div>
        <ChipMes
          label={'N'}
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
  const { history, chooseTask, getTaskDetailByTaskId } = React.useContext(
    WrapperContext
  );
  // console.log({value})

  function onClickItem() {
    chooseTask(props.id);
    getTaskDetailByTaskId(props.id);
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
        <SimpleDonutChart percentDone={props.complete} />
      </ListItemAvatar>
      <JobUnit {...props} />
    </div>
  );
}

export default ListBodyItem;
