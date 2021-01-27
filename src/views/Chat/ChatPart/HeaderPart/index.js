import { Avatar, FormControl, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';
import { getMemberTask, getMemberTaskService } from 'actions/chat/chat';
import fakeAvatar from 'assets/avatar.jpg';
import clsx from 'clsx';
import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { currentColorSelector } from 'views/JobDetailPage/selectors';
import './styles.scss';
import NavigatorMenu from "components/NavigatorMenu";

const StyledFormControlLabel = styled(FormControlLabel)`
  & .MuiTypography-root {
    background-color: ${props => props.checked ? props.groupActiveColor : '#f2f2f2'};
    color: ${props => props.checked ? '#fff' : '#8b8b8b'};
  }
  &:hover .MuiTypography-root {
    background-color: ${props => props.groupActiveColor};
    color: #fff;
  }
`;
// Fake data
const tabs = ['Table', 'Gantt', 'Chat'];
const tabSelected = tabs[2];

// Some override style of google material components
const useStyles = makeStyles({
  wrapRowAvatar: {
    paddingBottom: '0 !important'
  },
  smallAvatar: { width: 25, height: 25 }
});

const TabForm = props => {
  const history = useHistory()
  const gridSettings = useSelector(state => state.chat.gridSettings)
  const projectId = useSelector(state => state.taskDetail.commonTaskDetail.activeProjectId);
  const [value, setValue] = React.useState(tabSelected);
  const groupActiveColor = useSelector(currentColorSelector)

  function onClickLabel(value) {
    const { url = '' } = gridSettings.find(({ name }) => name === value) || {};
    return () => {
      history.push(`${url}/${projectId}`)
    }
  }

  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="position"
        name="position"
        value={value}
        onChange={event => setValue(event.target.value)}
        row
      >
        {props.tabs.map((label, idx) => (
          <StyledFormControlLabel
            className={clsx("chatHeader--tabLabel", { "chatHeader--tabLabel__selected": value === label })}
            key={idx}
            value={label}
            control={<Radio />}
            label={label}
            groupActiveColor={groupActiveColor}
            checked={value === label}
            onClick={onClickLabel(label)}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

const renderAvatars = props => {
  const { images = [] } = props;
  let showImages = images;
  const imgNum = 3;
  const plusImage = images.length - imgNum;
  if (plusImage > 0) {
    showImages = images.slice(0, imgNum);
  }
  return (
    <div className="wrap-avatars">
      {showImages.map(({ avatar }, i) =>
        <Avatar key={i} className={clsx(`chatHeader--avatar${showImages.length}_${i + 1}`,
          { [`chatHeader--avatar${showImages.length}_${i + 1}_plus`]: (plusImage > 0) }
        )} src={avatar} />
      )}
      {
        (plusImage > 0) &&
        <Avatar className="header-chat-avatar chatHeader--avatar_plus">{`+${plusImage}`}</Avatar>
      }
    </div>
  );
};

const HeaderPart = props => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const members = useSelector(state => state.taskDetail.taskMember.defaultMember)
  useEffect(() => {
    const fetchMemberlist = async () => {
      try {
        const { data } = await getMemberTaskService(
          queryString.parse(props.location.search).task_id
        );
        dispatch(getMemberTask(data.members));
      } catch (error) { }
    };
    fetchMemberlist();
    // eslint-disable-next-line
  }, []);

  function openSearch() {
    props.setShowSearch(true)
  }

  return (
    <div className="container-header">
      {renderAvatars({ styles: classes, images: members })}
      <div className="wrap-room-description">
        <Typography className="chatHeader--title">{t('LABEL_CHAT_TASK_THAO_LUAN')}</Typography>
        {/* <TabForm tabs={tabs} /> */}
        <NavigatorMenu />
      </div>
      <abbr title={t('LABEL_CHAT_TASK_TIM_KIEM')}>
        <IconButton className="chatHeader--button" onClick={openSearch}>
          <Icon path={mdiMagnify} size={1.2} className="job-detail-icon" />
        </IconButton>
      </abbr>
    </div>
  );
};
export default withRouter(HeaderPart);
