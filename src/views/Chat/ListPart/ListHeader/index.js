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

  return (
    <div className="chat-left-top">
      <b>{t('Work message')}</b>
      <span>{t('IDS_WP_VIEW_ALL_ACTION')}</span>
    </div>
  );
}

function ListHeader(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const searchListTask = e => {
    dispatch(searchTask(e.target.value));
  };

  return (
    <div>
      <div className="list-header">
        <ListHeaderSelect {...props} />
        <div className="header-bottom-box header-bottom-box-chat">
          <SearchInput
            placeholder={t('LABEL_CHAT_TASK_TIM_CONG_VIEC_TRONG_DU_AN')}
            style={{ height: 'auto' }}
            onChange={e => searchListTask(e)}
          />
        </div>
      </div>
    </div >
  );
}

export default ListHeader;
