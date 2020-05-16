import get from 'lodash/get';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getFileTabPart, getImage, getLinkTabPart, searchFile } from '../../../../../actions/taskDetail/taskDetailActions';
import SearchInput from '../../../../../components/SearchInput';
import { taskIdSelector } from '../../../selectors';
import NoDataPlaceHolder from '../../NoDataPlaceHolder';
import FileBox from './FileBox';
import './styles.scss';

const FileContainer = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);
  const file = useSelector(state => state.taskDetail.media.file);
  const isNoData = get(file, 'files.length', 0) === 0;

  useEffect(() => {
    dispatch(getImage({ taskId }));
    dispatch(getFileTabPart({ taskId }));
    dispatch(getLinkTabPart({ taskId }));
  }, [dispatch, taskId])

  const searchFileTabPart = (e) => {
    dispatch(searchFile(e.target.value))
  }

  return (
    isNoData ?
      <NoDataPlaceHolder
        src="/images/no-files.png"
        title={t('LABEL_CHAT_TASK_CHUA_CO_TAI_LIEU')}
      />
      :
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