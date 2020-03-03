import React, { useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiChevronLeft , mdiPlus } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import { WrapperContext } from '../../../index'
import { useDispatch, useSelector } from 'react-redux';
import { getSubTask } from '../../../../../actions/taskDetail/taskDetailActions';
import { taskIdSelector } from '../../../selectors';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  height: 85px;
`;
const ButtonCancel = styled.p`
  background: #edeff0;
  font-size: 13px;
  font-weight: 500;
  margin: 0;
  padding: 12px 8px;
  margin-right: 5px;
  border-radius: 50%;
`
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

function TabHeader(props) {
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);
  // console.log('header props::', props)
  useEffect(() => {
    dispatch(getSubTask({ taskId }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const [isPlus, setOnPlus] = React.useState(true)
  const handleClick = () => {
    setOnPlus(!isPlus)
  }
  return (
    <Container>
      <ButtonIcon onClick={() => props.setShow(0)}>
        <Icon path={mdiChevronLeft } size={1} />
      </ButtonIcon>
      <ColorTypo uppercase bold style={{ fontSize: 17 }}>Công việc con</ColorTypo>
      {isPlus ?
        <ButtonIcon onClick={() => {
          props.onClickPlusIcon()
          handleClick()
        }
        }>
          <Icon path={mdiPlus} size={1} />
        </ButtonIcon>
        :
        <ButtonCancel onClick={() => {
          props.onClickPlusIcon()
          handleClick()
        }
        }>Hủy</ButtonCancel>
      }
    </Container>
  );
}

export default TabHeader;