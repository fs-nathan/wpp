import IconButton from '@material-ui/core/IconButton';
import { mdiClose, mdiDrag } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { searchProject } from '../../../../../actions/taskDetail/taskDetailActions';
import SearchInput from '../../../../../components/SearchInput';
import './styles.scss';
import {workTypes} from "../../../../../constants/workTypes";
import '../../ListProjectKanban/ListProjectHeader/styles.scss';

const FilterBox = ({className = '', ...props}) =>
  <div
    className={`view_KanBan_ListProject_Header___filter-box ${className}`}
    {...props}
  />

const Filter = ({className = '', ...props}) =>
  <span
    className={`view_KanBan_ListProject_Header___filter ${className}`}
    {...props}
  />

function ListProjectHeader({ setShow, setProjectFilter, projectFilter }) {
  const { t } = useTranslation();
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
        <abbr title={t('LABEL_CHAT_TASK_DONG')}>
          <IconButton className="listProjectHeader--button" onClick={closeListProject}>
            <Icon path={mdiClose} size={1} className="job-detail-icon" />
          </IconButton>
        </abbr>
      </div>
      <SearchInput
        placeholder={t('LABEL_CHAT_TASK_TIM_DU_AN')}
        onChange={searchListProject}
      />
      <FilterBox>
        <Filter
          className={projectFilter === -1 ? 'view_KanBan_ListProject_Header___text-active' : ''}
          onClick={evt => setProjectFilter(-1)}
        >
          {t("LABEL_CHAT_TASK_TAT_CA")}
        </Filter>
        {[0, 1, 2].map(value => (
          <Filter
            className={projectFilter === value ? 'view_KanBan_ListProject_Header___text-active' : ''}
            key={value}
            onClick={evt => setProjectFilter(value)}
          >
            {t(workTypes[value])}
          </Filter>
        ))}
      </FilterBox>
    </div>
  );
}

export default ListProjectHeader;