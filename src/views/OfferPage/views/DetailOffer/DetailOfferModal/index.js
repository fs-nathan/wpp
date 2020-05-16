import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import CustomModal from '../../../../../components/CustomModal';
import DetailOffer from '../DetailOfferComponent'
import { styles } from '../DetailOfferComponent/style'

const DetailOfferModal = ({ open, setOpen, loading, ...rest }) => {
  const { t } = useTranslation()
  const classes = styles()
  const onCloseModal = () => {

  }
  const onDeleteOffer = () => {

  }

  return (
    <CustomModal
      title={t('DETAIL_OFFER')}
      open={open}
      setOpen={setOpen}
      loading={loading}
      confirmRender={"Xoa De Xuat"}
      onConfirm={onDeleteOffer}
      cancleRender={"Thoat"}
      onCancle={onCloseModal}
      fullWidth
    >
      <DetailOffer {...rest} />
    </CustomModal>
  )
}

export default DetailOfferModal
