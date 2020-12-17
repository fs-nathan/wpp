import { IconButton } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import classNames from 'classnames';
import AlertModal from 'components/AlertModal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { action } from 'views/OfferPage/contants/attrs';
import { deleteGroupOffer } from 'views/OfferPage/redux/actions';
import FormDialog from '../modal';
import './style.scss';


const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(1, 2, 1, 2),
  },
  button: {
    color: "#000000",
  }
}));

export default function ExpandPopover({ offer_group_id, name, description, view }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deleteModal, setDeleteModal] = React.useState(false)
  const [openOfferByGroupModal, setOpenOfferByGroupModal] = React.useState(false)
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClose = () => {
    setAnchorEl(null);
  };
  const setOpenDeleteModal = () => {
    setDeleteModal(!deleteModal)
  }
  const handleDeleteGroupOffer = () => {
    dispatch(deleteGroupOffer({ id: offer_group_id }))
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  return (
    <div>
      <IconButton aria-label="delete" variant="contained" className={classes.button} onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <FormDialog
        name={name}
        description={description}
        offer_group_id={offer_group_id}
        type={action.UPDATE_OFFER}
        open={openOfferByGroupModal}
        setOpen={setOpenOfferByGroupModal}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 10,
          horizontal: 'left',
        }}
      >
        {view && <Typography className={classNames(classes.typography, "Offer-group_option")}>{t("VIEW_OFFER_LABLE_VIEW_DETAIL_OFFER")}</Typography>}
        <Typography
          className={classNames(classes.typography, "Offer-group_option")}
          onClick={() => {
            setAnchorEl(null);
            setOpenOfferByGroupModal(true);
          }}>
          {t("IDS_WP_EDIT_TEXT")}
        </Typography>
        {<Typography
          className={classNames(classes.typography, "Offer-group_option")}
          onClick={() => {
            setAnchorEl(null);
            setDeleteModal(true);
          }}>
          {t("IDS_WP_DELETE")}
        </Typography>}
      </Popover>
      <AlertModal
        setOpen={setOpenDeleteModal}
        onConfirm={() => handleDeleteGroupOffer()}
        open={deleteModal}
        content={t("VIEW_OFFER_TEXT_DELETE_GROUP_OFFER_WARNING")}
      />
    </div>
  );
}
