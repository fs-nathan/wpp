import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { mdiPlus, mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';
import SearchInput from '../../../../components/SearchInput';
import CreateJobModal from './CreateJobModal';
import { WrapperContext } from '../../index'

const Header = styled.div`
  padding: 0 3px 0 15px;
  height: 77px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  & > * {
    display: flex; 
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }
`;

const HeaderBottomBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderText = styled(Typography)`
  width: 315px;
  font-weight: 500;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
// const InputTextJob = styled(TextField)`
//     & > label {
//         font-size: 14px
//     }
//     & > *:last-child {
//         color: red;
//         margin-left: 10px
//     }
// `
const ButtonIcon = styled(IconButton)`
  &:hover {
    background: none;
  }
  & > span > svg {
    &:hover {
      fill: #03b000;
    }
  }
`

function ListHeaderSelect({ setShow }) {
  const value = React.useContext(WrapperContext)
  const openListProject = () => {
    setShow(true)
  }
  const data = value.projectDetail
  return (
    <div onClick={openListProject} style={{ marginTop: 8 }}>
      <HeaderText component={'div'} >{data.name}</HeaderText>
      <ButtonIcon

        style={{
          marginLeft: "10px",
          padding: "7px"
        }}
      >
        <Icon path={mdiChevronDown} size={1.2} />
      </ButtonIcon>
    </div>
  )
}

function ListHeader(props) {
  const value = React.useContext(WrapperContext)
  const [openCreateJobModal, setOpenCreateJobModal] = React.useState(false)
  const searchListTask = (e) => {
    value.searchTask(e.target.value)
  }
  return (
    <div >
      <Header>
        <ListHeaderSelect {...props} />
        <HeaderBottomBox>
          <SearchInput 
            placeholder='Tìm công việc trong dự án...' 
            style={{ height: 'auto' }}
            onChange={e => searchListTask(e)}
            />
          <ButtonIcon
            style={{
              marginLeft: "10px",
              padding: "7px"
            }}
            onClick={() => {
              setOpenCreateJobModal(true)
            }} >
            <Icon path={mdiPlus} size={1.2} />
          </ButtonIcon>
        </HeaderBottomBox>
      </Header>
      <CreateJobModal isOpen={openCreateJobModal} setOpen={setOpenCreateJobModal} />
    </div>
  )
}


export default ListHeader;
