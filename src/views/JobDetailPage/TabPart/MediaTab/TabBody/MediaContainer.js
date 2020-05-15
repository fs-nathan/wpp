import { getImage, searchImage } from 'actions/taskDetail/taskDetailActions';
import SearchInput from 'components/SearchInput';
import get from 'lodash/get';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { taskIdSelector } from 'views/JobDetailPage/selectors';
import NoDataPlaceHolder from '../../NoDataPlaceHolder';
import MediaBox from './MediaBox';

const MediaContainer = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);
  const image = useSelector(state => state.taskDetail.media.image);
  const isNoData = get(image, 'images.length', 0) === 0;

  useEffect(() => {
    dispatch(getImage({ taskId }));
  }, [dispatch, taskId])

  const searchImagesTabPart = (e) => {
    dispatch(searchImage(e.target.value))
  }

  return (
    isNoData ? <NoDataPlaceHolder
      src="/images/no-files.png"
      title={t('LABEL_CHAT_TASK_CHUA_CO_TAI_LIEU')}
    ></NoDataPlaceHolder>
      :
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