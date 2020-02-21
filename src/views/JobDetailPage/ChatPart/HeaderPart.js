import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import colors from '../../../helpers/colorPalette';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Typography,
  Avatar,
  Grid,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import fakeAvatar from '../../../assets/avatar.jpg';
import {
  getMemberTaskService,
  getMemberTask
} from '../../../actions/chat/chat';

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
const ProjectText = styled(Typography)`
  font-size: 24px;
  font-weight: 500;
`;

const TabLabel = styled(FormControlLabel)`
  color: ${props => (props.checked ? colors['blue'][0] : colors['gray'][0])};
  width: auto;
  margin-left: 0;
  margin-right: 10px;
  padding: 5px 0;
  & > span:first-child {
    display: none;
  }
`;

const ButtonIcon = styled(IconButton)`
  &:hover {
    background: none;
  }
  & > span > svg {
    &:hover {
      fill: #03b000;
    }
  }
`;

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
          <TabLabel
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
  const { styles, images } = props;
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

const renderRoomDescription = props => {
  return (
    <div className="wrap-room-description">
      <ProjectText>Thảo Luận</ProjectText>
      <TabForm tabs={tabs} />
    </div>
  );
};

const renderFunctionBar = props => {
  return (
    <ButtonIcon>
      <Icon path={mdiMagnify} size={1.2} className="job-detail-icon" />
    </ButtonIcon>
  );
};

const HeaderPart = props => {
  const classes = useStyles();
  useEffect(() => {
    fetchMemberlist();
    // eslint-disable-next-line
  }, []);
  const fetchMemberlist = async () => {
    try {
      const { data } = await getMemberTaskService(
        queryString.parse(props.location.search).task_id
      );
      props.getMemberTask(data.members);
    } catch (error) {}
  };
  return (
    <div className="container-header">
      {renderAvatars({ styles: classes, images: props.members })}
      {renderRoomDescription(props)}
      {renderFunctionBar(props)}
      {/* <WrapNotification>
                {renderNotify(props)}
            </WrapNotification> */}
    </div>
  );
};
export default connect(
  state => ({
    members: state.chat.members
  }),
  { getMemberTask }
)(withRouter(HeaderPart));
