import IconButton from '@material-ui/core/IconButton';
import { mdiClose, mdiDrag } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { searchProject } from '../../../../../actions/taskDetail/taskDetailActions';
import SearchInput from '../../../../../components/SearchInput';
import { actionVisibleDrawerMessage } from "actions/system/system";
import { workTypes } from 'constants/workTypes';
import { get } from 'lodash';
import { connect } from 'react-redux';
import './styles.scss';

const FilterBox = ({ className = '', ...props }) =>
  <div 
    className={`view_KanBan_ListProject_Header___filter-box ${className}`}
    {...props}
  />

const Filter = ({ className = '', ...props }) =>
  <span 
    className={`view_KanBan_ListProject_Header___filter ${className}`}
    {...props}
  />

function ListProjectHeader(props) {
  const { projectFilter, setProjectFilter, profileDetail } = props;
  const bgColor = get(profileDetail, 'group_active.color', '#f2f2f2');
  const dfColor = '#f2f2f2';
  const { t } = useTranslation();
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
      <FilterBox>
        <Filter 
          className={projectFilter === -1 ? 'view_KanBan_ListProject_Header___text-active' : ''}
          style={{
            background: projectFilter === -1 ? bgColor : dfColor,
          }}
          onClick={evt => setProjectFilter(-1)}
        >
          {'Tất cả'}
        </Filter>
        {[0, 1, 2].map(value => (
          <Filter 
            className={projectFilter === value ? 'view_KanBan_ListProject_Header___text-active' : ''}
            key={value}
            style={{
              backgroundColor: projectFilter === value ? bgColor : dfColor,
            }}
            onClick={evt => setProjectFilter(value)}
          >
            {workTypes[value]}
          </Filter>
        ))}
      </FilterBox>
    </div>
  );
}

const mapStateToProps = (state) => ({
  profileDetail: state.system.profile,
});

export default connect(mapStateToProps)(ListProjectHeader);