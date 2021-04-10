import {Avatar, ListItemAvatar, ListItemText} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import {mdiPin} from '@mdi/js';
import Icon from '@mdi/react';
import {viewChat} from 'actions/chat/chat';
import {showTab} from 'actions/taskDetail/taskDetailActions';
import clsx from 'classnames';
import ColorChip from 'components/ColorChip';
import ColorTypo from 'components/ColorTypo';
import SimpleDonutChart from 'components/SimpleDonutChart';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {currentColorSelector, makeSelectIsCanView} from 'views/JobDetailPage/selectors';
import {lastJobSettingKey} from '../../ListHeader/CreateJobSetting';

const BadgeItem = styled(ColorChip)`
  font-weight: 600;
  border-radius: 3px !important;
`;
const IconPin = styled(Icon)`
  display: ${props => (props.isghim === 'true' ? 'block' : 'none')};
`;
const ChipMes = styled(Chip)`
  border-radius: 10px;
  width: auto;
  height: auto;
  color: white;
  background-color: red;
  font-weight: 500;
  margin-right: 5px;
  display: ${props => (props.notification ? 'flex' : 'none')};
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

function getStatusName(status_code) {
  if (status_code === 0)
    return "LABEL_CHAT_TASK_DANG_CHO"
  if (status_code === 1)
    return "LABEL_CHAT_TASK_DANG_LAM"
  if (status_code === 2)
    return "LABEL_CHAT_TASK_HOAN_THANH"
  if (status_code === 3)
    return "LABEL_CHAT_TASK_DA_QUA_HAN"
  if (status_code === 4)
    return "LABEL_CHAT_TASK_TAM_DUNG"
}

function getStatusCode(status_code, complete) {
  if (complete === 100)
    return 2;
  if (status_code === 3)
    return 3;
  if (status_code === 4)
    return 4;
  if (complete === 0)
    return 0;
  return 1;
}

function JobName(props) {
  const { t } = useTranslation();
  const { isghim = '', new_chat, ...rest } = props
  return (
    <div className="name-container-lbd" variant="space-between">
      <ColorTypo bold={new_chat > 0}>{props.title}</ColorTypo>
      <div>
        <IconPin
          color={'#6e6e6e'}
          path={mdiPin}
          size={0.8}
          {...rest}
          isghim={isghim.toString()}
        />
        <BadgeItem color={getBadgeColor(props.status_code)} badge
          label={t(getStatusName(props.status_code))} size="small" />
      </div>
    </div>
  );
}

function JobContent(props) {
  const { avatar, content, name, notification = 0, time } = props
  return (
    <div className="container-content-lbd">
      <div title={name}>
        <Avatar src={avatar} alt="avatar" />
        <ColorTypo color="#7a869a">{content}</ColorTypo>
      </div>
      <div>
        <ChipMes
          label={notification > 99 ? '99+' : notification}
          size="small"
          notification={notification}
        />
        <div>{time}</div>
      </div>
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
        new_chat={new_chat}
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
  const isLoading = useSelector(state => state.chat.isLoading)
  const userId = useSelector((state) => state.system.profile.id);
  const url = new URL(window.location.href);
  const taskId = url.searchParams.get("task_id");
  const key = `${userId}:${lastJobSettingKey}`;
  const type = localStorage.getItem(key)
  const isCanView = useSelector(makeSelectIsCanView(type, taskId));

  function onClickItem() {
    if (isLoading) return;
    dispatch(showTab(0))
    const { pathname } = history.location;
    const path = pathname.split('?')[0]
    history.push({ pathname: path, search: `?task_id=${props.id}` });
    if (isCanView) {
      dispatch(viewChat(taskId))
    }
  }

  const fillColor = props.complete === 100 ? '#00e690' : '#eee';
  return (
    <div
      className={clsx("container-lbd", {
        "container-lbd__selected": props.isSelected
      })}
      onClick={onClickItem}
    >
      <ListItemAvatar style={{ padding: '0 0 0 10px' }}>
        <SimpleDonutChart color={'#ff9800'} circleColor={fillColor} percentDone={props.complete} />
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
