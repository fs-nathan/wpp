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
import { styles } from '../DetailOfferComponent/style'
import './styles.scss';

const DetailOfferModal = ({ open, setOpen, loading, ...rest }) => {
  const { setShowDeleteOfferConfirmModal } = useContext(OfferPageContext);
  const { t } = useTranslation()
  const classes = styles()
  const onConfirm = () => {
    setShowDeleteOfferConfirmModal(true);
  }
  const onCloseModal = () => {
    // do nothing
  }

  return (
    <CustomModal
      className="detail-offer-modal"
      title={getDetailOfferModalTitle(t)}
      open={open}
      setOpen={setOpen}
      loading={loading}
      confirmRender={() => getDetailOfferModalConfirmBtnTitle(t)}
      onConfirm={onConfirm}
      cancleRender={() => getDetailOfferModalCancelBtnTitle(t)}
      onCancle={onCloseModal}
      fullWidth
    >
      <DetailOffer {...rest} />
    </CustomModal>
  )
}

export default DetailOfferModal
