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
      <Grid container spacing={1} justify="center" alignItems="center">
        <Grid container xs={12} item classes={{ item: styles.wrapRowAvatar }}>
          {images.length > 0 && getAvatar({ src: images[0].avatar })}
          {images.length > 1 && getAvatar({ src: images[1].avatar })}
        </Grid>
        <Grid container item xs={12}>
          {images.length > 2 && getAvatar({ src: images[2].avatar })}
          {images.length === 4 && getAvatar({ src: images[3].avatar })}
          {images.length > 4 && getAvatar({ number: images.length - 3 })}
        </Grid>
      </Grid>
    </div>
  );
};

const HeaderPart = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const members = useSelector(state => state.chat.members)
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
  return (
    <div className="container-header">
      {renderAvatars({ styles: classes, images: members })}
      <div className="wrap-room-description">
        <Typography className="chatHeader--title">Thảo Luận</Typography>
        <TabForm tabs={tabs} />
      </div>
      <IconButton className="chatHeader--button">
        <Icon path={mdiMagnify} size={1.2} className="job-detail-icon" />
      </IconButton>
    </div>
  );
};
export default withRouter(HeaderPart);
