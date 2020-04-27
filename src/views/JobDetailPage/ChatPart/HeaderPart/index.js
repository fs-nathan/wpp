import { Avatar, FormControl, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';
import { getMemberTask, getMemberTaskService } from 'actions/chat/chat';
import fakeAvatar from 'assets/avatar.jpg';
import clsx from 'clsx';
import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './styles.scss';
// Fake data
const tabs = ['Chat', 'Table', 'Gantt'];
const tabSelected = tabs[0];
const images = [fakeAvatar, fakeAvatar, fakeAvatar, fakeAvatar, fakeAvatar];

// Some override style of google material components
const useStyles = makeStyles({
  wrapRowAvatar: {
    paddingBottom: '0 !important'
  },
  smallAvatar: { width: 25, height: 25 }
});

const TabForm = props => {
  const [value, setValue] = React.useState(tabSelected);
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
          <FormControlLabel
            className={clsx("chatHeader--tabLabel", { "chatHeader--tabLabel__selected": value === label })}
            key={idx}
            value={label}
            control={<Radio />}
            label={label}
            checked={value === label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

const renderAvatars = props => {
  const { styles, images = [] } = props;
  let showImages = images;
  const imgNum = 3;
  const plusImage = images.length - imgNum;
  if (plusImage > 0) {
    showImages = images.slice(0, imgNum);
  }
  const getAvatar = ({ number, src }) => {
    return (
      <Grid item xs={6}>
        {number ? (
          <Avatar className="header-chat-avatar">{number}</Avatar>
        ) : (
            <Avatar className="header-chat-avatar" src={src} />
          )}
      </Grid>
    );
  };
  return (
    <div className="wrap-avatars">
      {showImages.map(({ avatar }, i) =>
        <Avatar key={i} className={clsx(`chatHeader--avatar${showImages.length}_${i + 1}`,
          { [`chatHeader--avatar${showImages.length}_${i + 1}_plus`]: (plusImage > 0) }
        )} src={avatar} />
      )}
      {
        (plusImage > 0) &&
        <Avatar className="header-chat-avatar chatHeader--avatar_plus">{plusImage}</Avatar>
      }
    </div>
  );
};

const HeaderPart = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const members = useSelector(state => state.taskDetail.taskMember.member)
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
        <Typography className="chatHeader--title">Thảo Luận</Typography>
        <TabForm tabs={tabs} />
      </div>
      <IconButton className="chatHeader--button" onClick={openSearch}>
        <Icon path={mdiMagnify} size={1.2} className="job-detail-icon" />
      </IconButton>
    </div>
  );
};
export default withRouter(HeaderPart);
