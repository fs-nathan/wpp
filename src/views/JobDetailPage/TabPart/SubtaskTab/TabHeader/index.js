import React from 'react';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiClose, mdiPlus } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';



const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  height: 85px;
  & > *:first-child {
    margin-right: auto;
    font-size: 16px;
    margin-left: 20px
  }
`;
const ButtonCancel = styled.p`
  background: #edeff0;
  font-size: 15px;
  font-weight: 500;
  margin: 0;
  padding: 12px 8px;
  margin-right: 5spx;
  border-radius: 50%;
`

function TabHeader(props) {
  // console.log('header props::', props)
  const [isPlus, setOnPlus] = React.useState(true)
  const handleClick = () => {
    setOnPlus(!isPlus)
  }
  return (
    <Container>
      <ColorTypo uppercase bold>Công việc con</ColorTypo>
      {isPlus ?
        <IconButton onClick={() => {
          props.onClickPlusIcon()
          handleClick()
        }
        }>
          <Icon path={mdiPlus} size={1} />
        </IconButton>
        :
        <ButtonCancel onClick={() => {
          props.onClickPlusIcon()
          handleClick()
        }
        }>Hủy</ButtonCancel>
      }
      <IconButton onClick={() => props.setShow(0)}>
        <Icon path={mdiClose} size={1} />
      </IconButton>
    </Container>
  );
}

export default TabHeader;