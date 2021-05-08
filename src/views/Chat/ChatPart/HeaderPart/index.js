import { Avatar, FormControl, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
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
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { updateNameGroupChat } from "actions/chat/chat";
import { getTaskDetailTabPart } from 'actions/taskDetail/taskDetailActions';
import get from 'lodash/get';
import { CircularProgress } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AddMemberModal from 'views/Chat/ListPart/ListHeader/AddMemberModal';


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

const renderAvatars = props => {
  const { images = [] } = props;
  let showImages = images;
  const imgNum = 3;
  const plusImage = images.length - imgNum;
  if (plusImage > 0) {
    showImages = images.slice(0, imgNum);
  }
  return (
    <div className={`wrap-avatars wrap-avatars-${showImages.length}`}>
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

function RenderMemberOnline({number_member}){
  const { t } = useTranslation();
  return (
    <div className="message-people-online">
      <PersonOutlineIcon classes={{root: "mpo-icon-people"}} />
      <span className="mpo-number-people">{number_member}</span>
      <div className="mpo-active">
        <FiberManualRecordIcon classes={{root: "mpo-icon-circle"}} />
        <span className="mpo-label-online">{t('LABEL_ONLINE')}</span>
      </div>
    </div>
  )
}

const HeaderPart = props => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  // const members = useSelector(state => state.taskDetail.taskMember.defaultMember)
  const task = useSelector(state => state.taskDetail.detailTask.taskDetails);
  const userId = useSelector(state => state.system.profile.id);
  const [nameInput, setNameInput] = React.useState(task ? task.name : "");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEditName, setIsEditName] = React.useState(false);
  const appColor = useSelector(currentColorSelector)
  const [openAddModal, setOpenAddModal] = React.useState(false);

  const {
    update_task
  } = get(task, 'permissions', {});
  React.useEffect(() => {
    if (task.name) {
      setNameInput(task.name)
    }
  }, [task.name]);
  const members = task.members ? (task.person_chat_type == 1 ? task.members.filter(m => m.id !== userId) : task.members) : []
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

  const handleUpdateGroupName = async () => {
    setIsLoading(true)
      try {
        await updateNameGroupChat({ task_id: task.id, name: nameInput });
        setIsEditName(false)
        dispatch(getTaskDetailTabPart({ taskId: task.id }));
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
  }

  return (
    <div className="container-header">
      {renderAvatars({ styles: classes, images: members })}
      <div className="wrap-room-description">
        <Typography className="chatHeader--title">
          {
            !isEditName ?
            <React.Fragment>
              {task.name}
              <div className="edit-name-task-on-head-chat">
                {
                  update_task && task.person_chat_type == 2 &&
                  <EditIcon
                    className="step-hover-edit"
                    style={{background: appColor}}
                    onClick={() => {
                      setNameInput(task.name);
                      setIsEditName(true);
                    }}
                  />
                }
              </div>
            </React.Fragment> :
            <div className="el-edit-name-group-chat">
              <input type="text" value={nameInput} onChange={e => setNameInput(e.target.value)} />
              {
                isLoading ?
                <CircularProgress size={20} classes={{root: "icon-spin-update-name"}} /> :
                <React.Fragment>
                  <CheckCircleIcon className="step-action step-save" onClick={() => handleUpdateGroupName()} />
                  <CancelIcon className="step-action step-cancel" onClick={() => setIsEditName(false)} />
                </React.Fragment>
              }
            </div>
          }
        </Typography>
        <RenderMemberOnline number_member={members.length} />
      </div>
      {
        task.person_chat_type == 2 &&
        <abbr title={t('LABEL_CHAT_TASK_THEM_THANH_VIEN')}>
          <IconButton className="chatHeader--button" onClick={() => setOpenAddModal(true)}>
            <PersonAddIcon style={{fontSize: "25px"}}/>
          </IconButton>
        </abbr>
      }
      <abbr title={t('LABEL_CHAT_TASK_TIM_KIEM')}>
        <IconButton className="chatHeader--button" onClick={openSearch}>
          <Icon path={mdiMagnify} size={1.2} className="job-detail-icon" />
        </IconButton>
      </abbr>
      {
        task.person_chat_type == 2 && openAddModal &&
        <AddMemberModal isOpen={openAddModal} setOpen={setOpenAddModal} />
      }
    </div>
  );
};
export default withRouter(HeaderPart);
