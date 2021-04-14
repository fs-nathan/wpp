import { List } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { searchLocation } from '../../../../../actions/taskDetail/taskDetailActions';
import SearchInput from '../../../../../components/SearchInput';
import CustomListItem from './CustomListItem';

const WrapList = styled(List)`
  & > div {
    padding: 0
  }
  & > li {
    padding: 5px 0;
    display: block;
    & > *:last-child {
      min-width: auto !important;
    }
  }
`

const LocationShareBox = ({ isMe, handleClickLocation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const searchLocationTabPart = (e) => {
    dispatch(searchLocation(e.target.value))
  }
  return (
    <React.Fragment>
      <SearchInput
        placeholder={t('LABEL_CHAT_TASK_NHAP_TU_KHOA')}
        fullWidth
        onChange={e => searchLocationTabPart(e)}
      />
      <WrapList subheader={<li />}>
        <CustomListItem isMe={isMe} handleClickLocation={handleClickLocation} />
      </WrapList>
    </React.Fragment>
  );
}

export default LocationShareBox