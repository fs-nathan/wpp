import React, { useEffect } from 'react';
import { IconButton} from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiChevronLeft , mdiPlus } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import RemindModal from '../RemindModal'
import { useDispatch, useSelector } from 'react-redux';
import { taskIdSelector } from '../../../selectors';
import { getRemind } from '../../../../../actions/taskDetail/taskDetailActions';

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
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);
  
  useEffect(() => {
    dispatch(getRemind({ taskId }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  // bien cua modal cong viec con
  const [isOpen, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <div className="container-normal-tabheader">
      <ButtonIcon onClick={() => setShow(0)}>
        <Icon path={mdiChevronLeft } size={1} />
      </ButtonIcon>
      <ColorTypo uppercase bold style={{ fontSize: 17 }}>Nhắc hẹn</ColorTypo>
      <ButtonIcon onClick={handleClickOpen}>
        <Icon path={mdiPlus} size={1} />
      </ButtonIcon>
      {/* modal tao moi cong viec con */}
      <RemindModal isOpen={isOpen} handleClickClose={handleClickClose} isCreate />
    </div>
  );
}

export default TabHeader;
