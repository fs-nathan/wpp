import { TextField } from '@material-ui/core';
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import { action } from "views/OfferPage/contants/attrs";
import { createOfferGroup, updateOfferGroup } from "views/OfferPage/redux/actions";
import CustomModal from '../../../../../components/CustomModal';
import TitleSectionModal from '../../../../../components/TitleSectionModal';
import {
  getCreateModalCancelBtnTitle,
  getCreateModalConfirmBtnTitle,
  getCreateModalTitle, getOfferGroupDescriptionPlaceholder,
  getOfferGroupDescriptionTitle,
  getOfferGroupNamePlaceholder,
  getOfferGroupNameTitle,
  getUpdateModalCancelBtnTitle,
  getUpdateModalConfirmBtnTitle,
  getUpdateModalTitle,
} from './i18nSelectors';

export default function FormDialog({ type, open, setOpen, ...rest }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: rest.name || "", description: rest.description || "" });
  const { name, description } = form
  const { offer_group_id } = rest

  const createGroup = () => {
    if (type === action.CREATE_OFFER) {
      dispatch(createOfferGroup({ name, description }));
    } else if (type === action.UPDATE_OFFER) {
      dispatch(updateOfferGroup({ name, description, offer_group_id }))
    }
  }

  const modalTitle = () => {
    switch(type) {
      case action.CREATE_OFFER:
        return getCreateModalTitle(t);
      case action.UPDATE_OFFER:
        return getUpdateModalTitle(t);
      default:
        return getCreateModalTitle(t);
    }
  };
  const confirmBtnTitle = () => {
    switch(type) {
      case action.CREATE_OFFER:
        return getCreateModalConfirmBtnTitle(t);
      case action.UPDATE_OFFER:
        return getUpdateModalConfirmBtnTitle(t);
      default:
        return getCreateModalConfirmBtnTitle(t);
    }
  };
  const cancelBtnTitle = () => {
    switch(type) {
      case action.CREATE_OFFER:
        return getCreateModalCancelBtnTitle(t);
      case action.UPDATE_OFFER:
        return getUpdateModalCancelBtnTitle(t);
      default:
        return getCreateModalCancelBtnTitle(t);
    }
  };
  return (
    <CustomModal
      title={modalTitle()}
      open={open}
      setOpen={setOpen}
      confirmRender={confirmBtnTitle}
      onConfirm={createGroup}
      canConfirm={name !== "" && description !== ""}
      cancleRender={cancelBtnTitle}
      height="mini"
    >
      <TitleSectionModal label={getOfferGroupNameTitle(t)} isRequired />
      <TextField
        className="offerModal--titleText"
        placeholder={getOfferGroupNamePlaceholder(t)}
        variant="outlined"
        fullWidth
        value={name}
        onChange={e => setForm({ description, name: e.target.value })}
      />
      <TitleSectionModal label={getOfferGroupDescriptionTitle(t)} isRequired />
      <TextField
        className="offerModal--titleText"
        placeholder={getOfferGroupDescriptionPlaceholder(t)}
        variant="outlined"
        fullWidth
        multiline
        rows="7"
        value={description}
        onChange={e => setForm({ name, description: e.target.value })}
      />
    </CustomModal>
  );
}
