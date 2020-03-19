import React from 'react';
import styled from 'styled-components';
import {
  Button,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import ColorTypo from '../../../../../components/ColorTypo';
import ApproveModal from '../ApproveModal';
import { handleOffer } from '../../../../../actions/taskDetail/taskDetailActions';
import { UserHanderAvatar, StyleContent } from './CustomListItem';
import BadgeOffer from './BadgeOffer';

const StyledButton = styled(Button)`
  box-shadow: none;
  background: none;
  color: #2196F3;
  padding: 3px 9px;
  border : 1px solid #2196F3;
  &:hover {
    box-shadow: none;
  background: #2196F3;
  color: white;
  }
`

const ApprovedBox = (props) => {
  const dispatch = useDispatch();
  const offer = useSelector(state => state.taskDetail.taskOffer.offer);
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);

  // bien của modal phe duyet
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const DENIED_VALUE = {
    offer_id: offer.id,
    content: "Từ chối phê duyệt",
    status: 2
  }

  return (
    <React.Fragment>
      {props.approved && (
        <React.Fragment>
          <div className="approved-container">
            <div className="styled-title-box-ot">
              <UserHanderAvatar src={offer.dataHander.user_hander_avatar} alt='avatar' />
              <div>
                <StyleContent variant='body1' bold>{offer.dataHander.user_hander_name}</StyleContent>
                <ColorTypo variant='caption'>
                  {/* <Badge component='small' color='bluelight' badge size='small' label={label} /> */}
                  {BadgeOffer(offer.status)}
                </ColorTypo>
              </div>
            </div>
            <div className="styled-content-box-ot">
              <ColorTypo variant='caption'>{offer.dataHander.date_hander}</ColorTypo>
              <StyleContent >{offer.dataHander.content_hander}</StyleContent>
            </div>
          </div>
        </React.Fragment>
      )}
      {!props.approved && (
        <React.Fragment>
          <div className="approved-container">
            <div className="styled-title-box-ot">
              <StyledButton variant="contained" size="small" onClick={handleClickOpen}>Phê duyệt</StyledButton>
              <Button variant="outlined" size="small"
                onClick={() => {
                  dispatch(handleOffer({ data: DENIED_VALUE, taskId }))
                }}
              >Từ chối</Button>
              <span />
            </div>
            <ApproveModal {...props} isOpen={open} handleClickClose={handleClickClose} handleClickOpen={handleClickOpen} />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default ApprovedBox