import {Avatar, IconButton, ListItem} from '@material-ui/core';
import {mdiDotsVertical} from '@mdi/js';
import Icon from '@mdi/react';
import {detailUser} from 'actions/user/detailUser';
import compact from 'lodash/compact';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import './styles.scss';
import * as images from '../../../../../assets/index';
import {
  threadChatCreatePrivate,
  threadChatCreatePrivateReset
} from "../../../../../actions/taskDetail/taskDetailActions";
import {get, isNil} from "lodash";
import {useHistory} from "react-router-dom";

const ButtonIcon = styled(IconButton)`
  &:hover {
    background: none;
  }
  & > span > svg {
    &:hover {
      fill: #03b000;
    }
  }
`
const StyledListItem = styled(ListItem)`
    padding : 7px 0;
    &:hover .styled-menu-member {
      opacity: 1;
    }
`

const MemberListItem = ({
  id, name, avatar,
  room, position, group_permission,
  handleClickOptionModal, is_admin, is_in_group,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const privateChatData = useSelector(state => state.taskDetail.createPrivateChat.data);
  const userId = useSelector((state) => state.system.profile.id);

  const handleClick = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    handleClickOptionModal();
  }

  const handleClickDetail = (evt) => {
    evt.stopPropagation();
    dispatch(detailUser({ userId: id }))
  };

  function handleCreatePrivateChat(evt) {
    evt.stopPropagation();
    dispatch(threadChatCreatePrivate({memberID: id}));
  }
  React.useEffect(() => {
    if(!isNil(get(privateChatData, "task_id"))) {
      history.push(`/chats?task_id=${get(privateChatData, "task_id")}`);
      dispatch(threadChatCreatePrivateReset());
    }
  }, [privateChatData, history, dispatch]);
  return (
    <React.Fragment>
      <StyledListItem className="memberItem">
        <Avatar className="memberItem--avatar" src={avatar} alt='avatar' onClick={handleClickDetail} />
        <div className="memberItem--textWrap" onClick={handleClickDetail}>
          <div className="memberItem--name">
            {name}
            {is_admin &&
              <div className="memberItem--admin">
                Admin
              </div>
            }
            {!is_in_group &&
              <div className="memberItem--left">
                {t('LABEL_CHAT_TASK_DA_ROI_NHOM')}
              </div>
            }
          </div>
          <div className="memberItem--department">
            {group_permission && group_permission.name}
          </div>
          <div className="memberItem--role">
            {compact([room, position]).join(' - ')}
          </div>
        </div>

        {is_in_group && id !== userId &&
          <div className={"memberItem--menuButton buttonChat"} onClick={(evt) => handleCreatePrivateChat(evt)}>
            <img src={images.messeger} width={20} height={20} alt={""}/>
          </div>
        }
        <ButtonIcon
          className="memberItem--menuButton"
          size='small' onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
          <Icon path={mdiDotsVertical} size={1} />
        </ButtonIcon>
      </StyledListItem>
    </React.Fragment>
  );
}

export default MemberListItem