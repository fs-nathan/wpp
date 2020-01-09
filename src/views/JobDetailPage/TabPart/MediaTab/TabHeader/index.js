import React, { useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiChevronLeft   } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import { WrapperContext } from '../../../index'
// const Container = styled.div`

//   display: flex;
//   align-items: center;
//   justify-content: space-between; 
//   background-color: #fff;
//   height: 85px;
//   border-bottom: 1px solid rgba(0, 0, 0, .1);
// `;
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

function TabHeader({ setShow }) {
  const value = React.useContext(WrapperContext)
  useEffect(() => {
    value.getImageByTaskId(value.taskId)
    value.getFileByTaskId(value.taskId)
    value.getLinkByTaskId(value.taskId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div className="container-normal-tabheader">
      <ButtonIcon onClick={() => setShow(0)}>
        <Icon path={mdiChevronLeft} size={1}/>
      </ButtonIcon>
      <ColorTypo uppercase bold style={{ fontSize: 17 }}>Tài liệu</ColorTypo>
      <span style={{ width: 30}}></span>
    </div>
  );
}

export default TabHeader;
