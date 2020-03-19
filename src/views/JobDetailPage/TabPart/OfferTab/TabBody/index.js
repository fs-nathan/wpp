import React from 'react';
import styled from 'styled-components';
import {
  ButtonGroup, Collapse,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import ColorTypo from 'components/ColorTypo';
import ColorButton from 'components/ColorButton';
import OfferModal from '../OfferModal';
import { Scrollbars } from 'react-custom-scrollbars';
import ModalDeleteConfirm from '../../ModalDeleteConfirm';
import { DEFAULT_OFFER_ITEM } from 'helpers/jobDetail/arrayHelper'
import { deleteOffer, } from 'actions/taskDetail/taskDetailActions';
import ListOffer from './ListOffer';
import OfferDetail from './OfferDetail';
import ApproveOfferDialog from './ApproveOfferDialog';
import NoDataPlaceHolder from '../../NoDataPlaceHolder';

const Body = styled(Scrollbars)`
  grid-area: body;
  height: 100%;
  
`;

const StyledButtonGroup = styled(ButtonGroup)`
  margin: 8px 0 20px 0;
`;

function TabBody(props) {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const offer = useSelector(state => state.taskDetail.taskOffer.offer);
  const pendingItems = useSelector(state => state.taskDetail.taskOffer.pendingItems);
  const approvedItems = useSelector(state => state.taskDetail.taskOffer.approvedItems);
  const isNoData = (offer.length + pendingItems.length + approvedItems.length) === 0;

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [openApprove, setOpenApprove] = React.useState(false);
  const [openDetail, setOpenDetail] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [isOffer] = React.useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  const [selectedItem, setSelectedItem] = React.useState(DEFAULT_OFFER_ITEM)
  // console.log("selectItem::::", selectedItem.offer_id)
  const handleClickEditItem = item => {
    setSelectedItem({ ...item, offer_id: item.id })
    setOpen(true)
  };
  const [isOpenDelete, setOpenDelete] = React.useState(false);
  const confirmDelete = () => {
    dispatch(deleteOffer({ offer_id: selectedItem.offer_id, taskId }))
  }
  const handleOpenModalDelete = item => {
    setSelectedItem({ ...item, offer_id: item.id })

    setOpenDelete(true);
  };
  const handleCloseModalDelete = () => {
    setOpenDelete(false);
  };

  function onClickDetail(item) {
    setSelectedItem({ ...item, offer_id: item.id })
    setOpenDetail(true)
  }
  const handleClickApprove = item => {
    setSelectedItem({ ...item, offer_id: item.id })
    setOpenApprove(true);
    setOpenDetail(false);
  };

  return (
    <Body autoHide autoHideTimeout={500} autoHideDuration={200}>
      <div className="container-offer-tabbody">
        <StyledButtonGroup fullWidth variant="text" >
          <ColorButton
            onClick={evt => handleChange(evt, 0)}
          >
            {value === 0
              ? <ColorTypo bold>Tất cả({offer.length})</ColorTypo>
              : <ColorTypo color='gray'>Tất cả ({offer.length})</ColorTypo>}
          </ColorButton>
          <ColorButton
            onClick={evt => handleChange(evt, 1)}
          >
            {value === 1
              ? <ColorTypo bold>Đã duyệt ({approvedItems.length})</ColorTypo>
              : <ColorTypo color='gray'>Đã duyệt ({approvedItems.length})</ColorTypo>}
          </ColorButton>
          <ColorButton
            onClick={evt => handleChange(evt, 2)}
          >
            {value === 2
              ? <ColorTypo bold>Chờ duyệt ({pendingItems.length})</ColorTypo>
              : <ColorTypo color='gray'>Chờ duyệt ({pendingItems.length})</ColorTypo>}
          </ColorButton>
        </StyledButtonGroup>
        {
          isNoData ? <NoDataPlaceHolder
            src="/images/no-request.png"
            title="Chưa có đề xuất / phê duyệt nào được tạo! Click + để tạo mới."
          ></NoDataPlaceHolder> :
            <React.Fragment>
              <Collapse in={value === 0} mountOnEnter unmountOnExit>
                <ListOffer
                  handleClickClose={() => handleClickClose()}
                  handleClickOpen={() => handleClickOpen()}
                  handleOpenModalDelete={(data) => handleOpenModalDelete(data)}
                  handleClickEditItem={(data) => handleClickEditItem(data)}
                  {...props}
                  offer={offer}
                  onClickDetail={onClickDetail}
                />
              </Collapse>
              <Collapse in={value === 1} mountOnEnter unmountOnExit>
                <ListOffer
                  handleClickClose={() => handleClickClose()}
                  handleClickOpen={() => handleClickOpen()}
                  handleOpenModalDelete={(data) => handleOpenModalDelete(data)}
                  handleClickEditItem={(data) => handleClickEditItem(data)}
                  {...props}
                  offer={approvedItems}
                  onClickDetail={onClickDetail}
                />
              </Collapse>
              <Collapse in={value === 2} mountOnEnter unmountOnExit>
                <ListOffer
                  handleClickClose={() => handleClickClose()}
                  handleClickOpen={() => handleClickOpen()}
                  handleOpenModalDelete={(data) => handleOpenModalDelete(data)}
                  handleClickEditItem={(data) => handleClickEditItem(data)}
                  {...props}
                  offer={pendingItems}
                  onClickDetail={onClickDetail}
                />
              </Collapse>
            </React.Fragment>
        }
        <OfferModal
          {...props}
          isOpen={open}
          handleClickClose={handleClickClose}
          handleClickOpen={handleClickOpen}
          isOffer={isOffer}
          item={selectedItem}
        />
        <ModalDeleteConfirm
          confirmDelete={confirmDelete}
          isOpen={isOpenDelete}
          handleCloseModalDelete={handleCloseModalDelete}
          item={selectedItem}
          {...props} />
        <OfferDetail
          isOpen={openDetail}
          handleClickClose={() => setOpenDetail(false)}
          handleClickOpen={() => setOpenDetail(true)}
          item={selectedItem}
          handleOpenModalDelete={(data) => handleOpenModalDelete(selectedItem)}
          handleClickEditItem={(data) => handleClickEditItem(selectedItem)}
          handleClickApprove={(data) => handleClickApprove(selectedItem)}
        />
        <ApproveOfferDialog
          isOpen={openApprove}
          handleClickClose={() => setOpenApprove(false)}
          handleClickOpen={() => setOpenApprove(true)}
          item={selectedItem}
          handleClickEditItem={(data) => handleClickEditItem(selectedItem)}
        />
      </div>
    </Body>
  )
}

export default TabBody;
