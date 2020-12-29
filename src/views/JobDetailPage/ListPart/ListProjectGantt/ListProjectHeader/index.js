import IconButton from '@material-ui/core/IconButton';
import { mdiClose, mdiDrag } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { searchProject } from '../../../../../actions/taskDetail/taskDetailActions';
import SearchInput from '../../../../../components/SearchInput';
import './styles.scss';


function ListProjectHeader({ setShow }) {
  const { t } = useTranslation();
  // console.log("setShow::::", setShow);
  const dispatch = useDispatch();

  const closeListProject = () => {
    setShow(false);
  };

  const searchListProject = e => {
    const keyword = e.target.value
    dispatch(searchProject(keyword))
  };

  return (
    <div className="listProjectHeader" >
      <div className="listProjectHeader--header">
        <Icon
          path={mdiDrag}
          size={1}
          color={'#000000'}
          className="job-detail-icon"
        />
        <div>{t('WORK_LIST')}</div>
        <IconButton className="listProjectHeader--button" onClick={closeListProject}>
          <Icon path={mdiClose} size={1} className="job-detail-icon" />
        </IconButton>
      </div>
      <SearchInput
        placeholder={t('LABEL_CHAT_TASK_TIM_DU_AN')}
        onChange={searchListProject}
      />
    </div>
  );
}

export default ListProjectHeader;