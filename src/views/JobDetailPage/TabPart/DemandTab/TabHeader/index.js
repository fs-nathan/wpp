import React, { useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiPlus } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import DemandModal from '../DemandModal'
import { useDispatch, useSelector } from 'react-redux';
import { taskIdSelector } from '../../../selectors';
import { getCommand, createCommand } from '../../../../../actions/taskDetail/taskDetailActions';

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

  useEffect(() => {
    dispatch(getCommand({ task_id: taskId }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [open, setOpen] = React.useState(false)
  // console.log('props nè', props )
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const confirmCreateCommand = ({ content, type }) => {
    dispatch(createCommand({ task_id: taskId, content, type }))
  }
  return (
    <div className="container-normal-tabheader">
      <ButtonIcon
        onClick={() => { props.setShow(0) }}
      >
        <Icon path={mdiChevronLeft} size={1} />
      </ButtonIcon>
      <ColorTypo uppercase bold style={{ fontSize: 17 }}>Chỉ đạo - Quyết định</ColorTypo>
      <ButtonIcon onClick={handleClickOpen}>
        <Icon path={mdiPlus} size={1} />
      </ButtonIcon>
      {/* modal chi dao quyet dinh */}
      <DemandModal
        isOpen={open}
        handleClose={handleClose}
        handleOpen={handleClickOpen}
        confirmCreateCommand={confirmCreateCommand}
        item={{ content: "", type: -1 }}
        {...props}
      />
    </div>
  );
}

export default TabHeader;
