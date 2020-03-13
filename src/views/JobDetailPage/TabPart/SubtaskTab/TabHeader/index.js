import React, { useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiPlus } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import { useDispatch, useSelector } from 'react-redux';
import { getSubTask } from '../../../../../actions/taskDetail/taskDetailActions';
import { taskIdSelector } from '../../../selectors';

import '../../HeaderTab/styles.scss';

const ButtonCancel = styled.p`
  background: #edeff0;
  font-size: 13px;
  font-weight: 500;
  margin: 0;
  padding: 12px 8px;
  margin-right: 5px;
  border-radius: 50%;
`

function TabHeader(props) {
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);
  // console.log('header props::', props)
  useEffect(() => {
    dispatch(getSubTask({ taskId }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [isPlus, setOnPlus] = React.useState(true)
  const handleClick = () => {
    setOnPlus(!isPlus)
  }
  return (
    <div  className="headerTab">
      <IconButton className="headerTab--button" onClick={() => props.setShow(0)}>
        <abbr title="Quay lại">
          <Icon path={mdiChevronLeft} size={1} />
        </abbr>
      </IconButton>
      <ColorTypo uppercase bold style={{ fontSize: 17 }}>Công việc con</ColorTypo>
      {isPlus ?
        <IconButton className="headerTab--button" onClick={() => {
          props.onClickPlusIcon()
          handleClick()
        }
        }>
          <abbr title="Thêm">
            <Icon path={mdiPlus} size={1} />
          </abbr>
        </IconButton>
        :
        <ButtonCancel onClick={() => {
          props.onClickPlusIcon()
          handleClick()
        }
        }>Hủy</ButtonCancel>
      }
    </div>
  );
}

export default TabHeader;