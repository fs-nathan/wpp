import { useTranslation } from 'react-i18next';
import React from 'react';
import { useDispatch } from 'react-redux';
import { searchFile } from '../../../../../actions/taskDetail/taskDetailActions';
import FileBox from './FileBox';
import SearchInput from '../../../../../components/SearchInput';

const FileContainer = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const searchFileTabPart = (e) => {
    dispatch(searchFile(e.target.value))
  }
  return (
    <React.Fragment>
      <SearchInput
        fullWidth
        placeholder={t('LABEL_CHAT_TASK_NHAP_TU_KHOA_FILE')}
        onChange={e => searchFileTabPart(e)}
      />
      <FileBox {...props} />
    </React.Fragment>
  );
}

export default FileContainer