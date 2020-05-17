import React from 'react'
import { useTranslation } from 'react-i18next'
import CustomModal from '../../../../../components/CustomModal';
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
      title={t('DETAIL_OFFER.TITLE')}
      open={open}
      setOpen={setOpen}
      loading={loading}
      confirmRender={t('DETAIL_OFFER.DELETE_OFFER')}
      onConfirm={onDeleteOffer}
      cancleRender={t('DETAIL_OFFER.ESCAPE')}
      onCancle={onCloseModal}
      fullWidth
    >
      <DetailOffer {...rest} />
    </CustomModal>
  )
}

export default DetailOfferModal
