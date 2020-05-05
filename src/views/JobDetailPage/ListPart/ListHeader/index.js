import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { mdiPlus, mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';
import SearchInput from '../../../../components/SearchInput';
import CreateJobModal from './CreateJobModal';
import '../ListPart.scss';
import { useSelector, useDispatch } from 'react-redux';
import { searchTask } from '../../../../actions/taskDetail/taskDetailActions';

const HeaderText = styled(Typography)`
  width: 315px;
  font-weight: 500;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ButtonIcon = styled(IconButton)`
  &:hover {
    background: none;
  }
  & > span > svg {
    &:hover {
      fill: #03b000;
    }
  }
`;

function ListHeaderSelect({ setShow }) {
  const projectDetail = useSelector(state=> state.taskDetail.commonTaskDetail.projectDetail);
  const openListProject = () => {
    setShow(true);
  };

  return (
    <div onClick={openListProject} style={{ marginTop: 8 }}>
      <HeaderText component={'div'}>{projectDetail.name}</HeaderText>
      <ButtonIcon className="dropdown-icon">
        <Icon path={mdiChevronDown} size={1.2} className="job-detail-icon" />
      </ButtonIcon>
    </div>
  );
}

function ListHeader(props) {
  const dispatch = useDispatch();
  const [openCreateJobModal, setOpenCreateJobModal] = React.useState(false);
  const searchListTask = e => {
      dispatch(searchTask(e.target.value));
  };

  return (
    <div>
      <div className="list-header">
        <ListHeaderSelect {...props} />
        <div className="header-bottom-box">
          <SearchInput
            placeholder="Tìm công việc trong dự án..."
            style={{ height: 'auto' }}
            onChange={e => searchListTask(e)}
          />
          <ButtonIcon
            className="dropdown-icon"
            onClick={() => {
              setOpenCreateJobModal(true);
            }}
          >
            <Icon path={mdiPlus} size={1.2} className="job-detail-icon" />
          </ButtonIcon>
        </div>
      </div>
      <CreateJobModal
        isOpen={openCreateJobModal}
        setOpen={setOpenCreateJobModal}
      />
    </div>
  );
}

export default ListHeader;
