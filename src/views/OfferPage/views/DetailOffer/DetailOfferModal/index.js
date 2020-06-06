import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next'
import CustomModal from '../../../../../components/CustomModal';
import { OfferPageContext } from '../../../OfferPageContext';
import {
  getDetailOfferModalCancelBtnTitle,
  getDetailOfferModalConfirmBtnTitle,
  getDetailOfferModalTitle,
} from '../../../utils/i18nSelectors';
import DetailOffer from '../DetailOfferComponent'
import clsx from 'clsx';
import './styles.scss';

const DetailOfferModal = ({ open, setOpen, loading, ...rest }) => {
  const { setShowDeleteOfferConfirmModal } = useContext(OfferPageContext);
  const { t } = useTranslation()
  const { can_modify } = rest;
  const onConfirm = () => {
    if (can_modify) {
      setShowDeleteOfferConfirmModal(true);
    }
  }
  const onCloseModal = () => {
    // do nothing
  }

  return (
    <CustomModal
      className={clsx(
        'detailOfferModal-container',
        can_modify ? 'detailOfferModal-confirmBtn--red' : 'detailOfferModal-confirmBtn--black'
      )}
      title={getDetailOfferModalTitle(t)}
      open={open}
      setOpen={setOpen}
      loading={loading}
      confirmRender={() => can_modify ? getDetailOfferModalConfirmBtnTitle(t) : getDetailOfferModalCancelBtnTitle(t)}
      onConfirm={onConfirm}
      cancleRender={() => can_modify && getDetailOfferModalCancelBtnTitle(t)}
      onCancle={can_modify && onCloseModal}
      fullWidth
      maxWidth='lg'
    >
      <DetailOffer {...rest} />
    </CustomModal>
  )
}

export default DetailOfferModal
