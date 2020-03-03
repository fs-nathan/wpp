import React, { useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiChevronLeft , mdiPlus, } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import OfferModal from '../OfferModal'
import { getOffer } from '../../../../../actions/taskDetail/taskDetailActions';
import { useDispatch, useSelector } from 'react-redux';
import { taskIdSelector } from '../../../selectors';

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
     dispatch(getOffer({ taskId }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  return (
    <div className="container-normal-tabheader">
      <ButtonIcon onClick={() => { props.setShow(0) }}>
        <Icon path={mdiChevronLeft } size={1} />
      </ButtonIcon>
      <ColorTypo uppercase bold style={{ fontSize: 17 }}>Đề xuất - Phê duyệt</ColorTypo>
      <ButtonIcon onClick={handleClickOpen} >
        <Icon path={mdiPlus} size={1} />
      </ButtonIcon>
      <OfferModal isOpen={open} handleClickClose={handleClickClose} handleClickOpen={handleClickOpen} {...props} />
    </div>
  );
}

export default TabHeader;
