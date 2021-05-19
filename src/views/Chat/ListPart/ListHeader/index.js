import { IconButton, Typography } from '@material-ui/core';
import { mdiChevronDown, mdiPlus, mdiSettingsOutline } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { searchTask } from '../../../../actions/taskDetail/taskDetailActions';
import SearchInput from '../../../../components/SearchInput';
import '../ListPart.scss';
import { get } from 'lodash';
import { viewAllMessage } from "actions/chat/threadChat";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { currentColorSelector } from 'views/Chat/selectors';
import CreateGroupChat from '../../CreateGroupChat'

const HeaderText = styled(Typography)`
  width: 315px;
  font-weight: 500;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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


function ListHeaderSelect({ setShow }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  function handleViewAllMessage() {
    dispatch(viewAllMessage())
  }

  return (
    <div className="chat-left-top">
      <b>{t('Messages')}</b>
      <span onClick={handleViewAllMessage}>{t('IDS_WP_VIEW_ALL_ACTION')}</span>
    </div>
  );
}

function ListHeader(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const appColor = useSelector(currentColorSelector)
  const [isOpenCreateGroupChat, setOpenCreateGroupChat] = React.useState(false)

  const searchListTask = e => {
    dispatch(searchTask(e.target.value));
  };

  function openCreateGroupChat(stateOpen = false) {
    setOpenCreateGroupChat(stateOpen)
  }

  return (
    <div>
      <div className="list-header list-header-chat">
        <ListHeaderSelect {...props} />
        <div className="header-bottom-box header-bottom-box-chat">
          <SearchInput
            placeholder={t('LABEL_SEARCH')}
            style={{ height: 'auto' }}
            onChange={e => searchListTask(e)}
          />
          <GroupAddIcon style={{fontSize: "26px", marginRight: "15px", color: appColor}} title={t("THREAD_CHAT_CREATE_GROUP_CHAT")} onClick={() => openCreateGroupChat(true)} />
        </div>
      </div>
      <CreateGroupChat
        isOpen={isOpenCreateGroupChat}
        setOpen={openCreateGroupChat}
      />
    </div >
  );
}

export default ListHeader;
