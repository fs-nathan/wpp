import { useTranslation } from 'react-i18next';
import React from 'react';
import MediaBox from './MediaBox';
import { useDispatch } from 'react-redux';
import { searchImage } from '../../../../../actions/taskDetail/taskDetailActions';
import SearchInput from '../../../../../components/SearchInput';

const MediaContainer = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const searchImagesTabPart = (e) => {
    dispatch(searchImage(e.target.value))
  }
  return (
    <React.Fragment>
      <SearchInput
        fullWidth
        placeholder={t('LABEL_CHAT_TASK_NHAP_NGAY_DANG')}
        onChange={e => searchImagesTabPart(e)}
      />
      <MediaBox {...props} />
    </React.Fragment>
  );
}

export default MediaContainer