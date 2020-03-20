import React from 'react';
import { useDispatch } from 'react-redux';
import Icon from '@mdi/react';
import { mdiClose, mdiDrag } from '@mdi/js';
import IconButton from '@material-ui/core/IconButton';

import { searchProject } from '../../../../../actions/taskDetail/taskDetailActions';
import SearchInput from '../../../../../components/SearchInput';
import './styles.scss';

function ListProjectHeader({ setShow }) {
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
        <div>DANH SÁCH DỰ ÁN</div>
        <IconButton className="listProjectHeader--button" onClick={closeListProject}>
          <Icon path={mdiClose} size={1} className="job-detail-icon" />
        </IconButton>
      </div>
      <SearchInput
        placeholder="Tìm dự án"
        onChange={searchListProject}
      />
    </div>
  );
}

export default ListProjectHeader;