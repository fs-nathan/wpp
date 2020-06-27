import { ButtonGroup, Collapse } from '@material-ui/core';
import { deleteOffer } from 'actions/taskDetail/taskDetailActions';
import AlertModal from 'components/AlertModal';
import ColorButton from 'components/ColorButton';
import ColorTypo from 'components/ColorTypo';
import { DEFAULT_OFFER_ITEM } from 'helpers/jobDetail/arrayHelper';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import NoDataPlaceHolder from '../../NoDataPlaceHolder';
import OfferModal from '../OfferModal';
import ApproveOfferDialog from './ApproveOfferDialog';
import ListOffer from './ListOffer';
// import OfferDetail from './OfferDetail';
import DetailOfferModal from 'views/OfferPage/views/DetailOffer/DetailOfferModal';
import { loadDetailOffer } from 'views/OfferPage/redux/actions';
import { getDetailOffer, getDetailOfferLoadingState } from 'views/OfferPage/views/DetailOffer/selector';

const Body = styled(Scrollbars)`
  grid-area: body;
  height: 100%;
  
`;

const StyledButtonGroup = styled(ButtonGroup)`
  margin: 8px 0 20px 0;
`;

function TabBody(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const offer = useSelector(state => state.taskDetail.taskOffer.offer);
  const pendingItems = useSelector(state => state.taskDetail.taskOffer.pendingItems);
  const approvedItems = useSelector(state => state.taskDetail.taskOffer.approvedItems);
  const isNoData = (offer.length + pendingItems.length + approvedItems.length) === 0;
  const detailOffer = useSelector(state => getDetailOffer(state));
  const detailOfferLoading = useSelector(state => getDetailOfferLoadingState(state));

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [openApprove, setOpenApprove] = React.useState(false);
  const [openDetail, setOpenDetail] = React.useState(false);
  const [open, setOpen] = React.useState(false);
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
    dispatch(loadDetailOffer({ id: item.id }))
    setOpenDetail(true)
  }
  const handleClickApprove = item => {
    setSelectedItem({ ...item, offer_id: item.id })
    setOpenApprove(true);
    setOpenDetail(false);
  };

  return (
    <Body
      renderView={props => <div {...props} className="offerBody--container" />}
      autoHide autoHideTimeout={500} autoHideDuration={200}>
      <div className="container-offer-tabbody">
        <StyledButtonGroup fullWidth variant="text" >
          <ColorButton
            onClick={evt => handleChange(evt, 0)}
          >
            {value === 0
              ? <ColorTypo bold>{t('LABEL_CHAT_TASK_TAT_CA_COUNT', { count: offer.length })}</ColorTypo>
              : <ColorTypo color='gray'>{t('LABEL_CHAT_TASK_TAT_CA_COUNT', { count: offer.length })}</ColorTypo>}
          </ColorButton>
          <ColorButton
            onClick={evt => handleChange(evt, 1)}
          >
            {value === 1
              ? <ColorTypo bold>{t('LABEL_CHAT_TASK_DA_DUYET')}{approvedItems.length})</ColorTypo>
              : <ColorTypo color='gray'>{t('LABEL_CHAT_TASK_DA_DUYET')}{approvedItems.length})</ColorTypo>}
          </ColorButton>
          <ColorButton
            onClick={evt => handleChange(evt, 2)}
          >
            {value === 2
              ? <ColorTypo bold>{t('LABEL_CHAT_TASK_CHO_DUYET')}{pendingItems.length})</ColorTypo>
              : <ColorTypo color='gray'>{t('LABEL_CHAT_TASK_CHO_DUYET')}{pendingItems.length})</ColorTypo>}
          </ColorButton>
        </StyledButtonGroup>
        {
          isNoData ? <NoDataPlaceHolder
            src="/images/no-request.png"
            title={t('LABEL_CHAT_TASK_CHUA_CO_DE_XUAT')}
          ></NoDataPlaceHolder> :
            <React.Fragment>
              <Collapse in={value === 0} mountOnEnter unmountOnExit timeout={0}>
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
              <Collapse in={value === 1} mountOnEnter unmountOnExit timeout={0}>
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
              <Collapse in={value === 2} mountOnEnter unmountOnExit timeout={0}>
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
        {
          open && (
            <OfferModal
              {...props}
              isOpen={open}
              setOpen={setOpen}
              isUpdateOffer
              item={selectedItem}
            />
          )
        }
        <AlertModal
          open={isOpenDelete}
          setOpen={setOpenDelete}
          content={t('IDS_WP_ALERT_CONTENT')}
          onConfirm={confirmDelete}
        />
        <DetailOfferModal
          open={openDetail}
          setOpen={setOpenDetail}
          loading={detailOfferLoading}
          {...detailOffer}
          additionQuery={{ task_id: taskId }}
        // {...selectedItem}
        // item={selectedItem}
        // handleOpenModalDelete={(data) => handleOpenModalDelete(selectedItem)}
        // handleClickEditItem={(data) => handleClickEditItem(selectedItem)}
        // handleClickApprove={(data) => handleClickApprove(selectedItem)}
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
