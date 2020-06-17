import clsx from 'clsx';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import CustomModal from '../../../../../components/CustomModal';
import { OfferPageContext } from '../../../OfferPageContext';
import {
  getDetailOfferModalCancelBtnTitle,
  getDetailOfferModalConfirmBtnTitle,
  getDetailOfferModalTitle
} from '../../../utils/i18nSelectors';
import DetailOffer from '../DetailOfferComponent';
import './styles.scss';

const DetailOfferModal = ({ open, setOpen, loading, ...rest }) => {
  const { setShowDeleteOfferConfirmModal } = useContext(OfferPageContext);
  const { t } = useTranslation()
  const { can_delete } = rest;

  const onConfirm = () => {
    if (can_delete) {
      setShowDeleteOfferConfirmModal(true);
    }
  }

  return (
    <CustomModal
      className={clsx(
        'detailOfferModal-container',
        can_delete ? 'detailOfferModal-confirmBtn--red' : 'detailOfferModal-confirmBtn--black'
      )}
      title={getDetailOfferModalTitle(t)}
      open={open}
      setOpen={setOpen}
      loading={loading}
      confirmRender={() => can_delete ? getDetailOfferModalConfirmBtnTitle(t) : getDetailOfferModalCancelBtnTitle(t)}
      onConfirm={onConfirm}
      cancleRender={() => can_delete && getDetailOfferModalCancelBtnTitle(t)}
      manualClose={true}
      onCancle={() => setOpen(false)}
      fullWidth
      maxWidth='lg'
    >
      <DetailOffer {...rest} />
    </CustomModal>
  )
}

export default DetailOfferModal
