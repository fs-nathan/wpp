import React from 'react'
import { useTranslation } from 'react-i18next'
import CustomModal from '../../../../../components/CustomModal';
import {
  getDetailOfferModalCancelBtnTitle,
  getDetailOfferModalConfirmBtnTitle,
  getDetailOfferModalTitle,
} from '../../../utils/i18nSelectors';
import DetailOffer from '../DetailOfferComponent'
import { styles } from '../DetailOfferComponent/style'

const DetailOfferModal = ({ open, setOpen, loading, ...rest }) => {
  const { t } = useTranslation()
  const classes = styles()
  const onCloseModal = () => {
    // do nothing
  }
  const onDeleteOffer = () => {
    // todo: implement on delete offer button click
  }

  return (
    <CustomModal
      title={getDetailOfferModalTitle(t)}
      open={open}
      setOpen={setOpen}
      loading={loading}
      confirmRender={() => getDetailOfferModalConfirmBtnTitle(t)}
      onConfirm={onDeleteOffer}
      cancleRender={() => getDetailOfferModalCancelBtnTitle(t)}
      onCancle={onCloseModal}
      fullWidth
    >
      <DetailOffer {...rest} />
    </CustomModal>
  )
}

export default DetailOfferModal
