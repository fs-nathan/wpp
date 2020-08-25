import get from 'lodash/get';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getLinkTabPart, searchLink } from '../../../../../actions/taskDetail/taskDetailActions';
import SearchInput from '../../../../../components/SearchInput';
import { taskIdSelector } from '../../../selectors';
import NoDataPlaceHolder from '../../NoDataPlaceHolder';
import LinkBox from './LinkBox';
import './styles.scss';

const LinkContainer = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);
  const links = useSelector(state => state.taskDetail.media.links);
  const file = useSelector(state => state.taskDetail.media.file);
  const image = useSelector(state => state.taskDetail.media.image);
  const isNoData = (get(links, 'links.length', 0) + get(file, 'files.length', 0) + get(image, 'images.length', 0)) === 0;

  useEffect(() => {
    dispatch(getLinkTabPart({ taskId }));
  }, [dispatch, taskId])

  const searchLinkTabPart = (e) => {
    dispatch(searchLink(e.target.value))
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
          className="MediaContainer--search"
          fullWidth
          placeholder={t('LABEL_CHAT_TASK_NHAP_TU_KHOA_LINK')}
          onChange={e => searchLinkTabPart(e)}
        />
        <LinkBox {...props} />
      </React.Fragment>
  );
}

export default LinkContainer;