import IconButton from '@material-ui/core/IconButton';
import { mdiClose, mdiDrag } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { searchProject } from '../../../../../actions/taskDetail/taskDetailActions';
import SearchInput from '../../../../../components/SearchInput';
import { actionVisibleDrawerMessage } from "actions/system/system";
import './styles.scss';


function ListProjectHeader() {
  const { t } = useTranslation();
  // console.log("setShow::::", setShow);
  const dispatch = useDispatch();

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
          color={'#00000000'}
          className="job-detail-icon"
        />
        <div>{t('LABEL_CHAT_TASK_DANH_SACH_DU_AN')}</div>
        <IconButton className="listProjectHeader--button" onClick={() => dispatch(actionVisibleDrawerMessage({ type: "", anchor: 'left' }))}>
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