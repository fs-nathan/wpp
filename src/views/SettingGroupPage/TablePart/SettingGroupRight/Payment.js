import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import * as icons from '../../../../assets';
import LoadingBox from '../../../../components/LoadingBox';
import './SettingGroupRight.scss';
import {
  actionChangeLoading,
  billService,
  actionGetBill,
  updateBillService
} from '../../../../actions/setting/setting';
import { actionToast } from '../../../../actions/system/system';

const Payment = props => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const handleToast = (type, message) => {
    props.actionToast(type, message);
    setTimeout(() => props.actionToast(null, ''), 2000);
  };
  const handleFetchData = async () => {
    try {
      props.actionChangeLoading(true);
      const { data } = await billService();
      props.actionGetBill(data.bill);
      props.actionChangeLoading(false);
    } catch (err) {
      props.actionChangeLoading(false);
    }
  };
  useEffect(() => {
    handleFetchData().then(r => {});
  }, []);
  const handleEditBill = async e => {
    e.preventDefault();
    if (!editMode) {
      setEditMode(true);
      e.target.company.focus();
      return;
    }
    try {
      const { elements } = e.target;
      const result = {
        company: elements.company.value,
        address_export: elements.address_export.value,
        tax_code: elements.tax_code.value,
        manager: elements.manager.value,
        address_import: elements.address_import.value,
        phone: elements.phone.value,
        email: elements.email.value
      };
      setLoading(true);
      await updateBillService(result);
      handleToast('success', t('IDS_WP_EDIT_INFO_SUCCESS'));
      handleFetchData();
      setEditMode(false);
      setLoading(false);
    } catch (error) {
      handleToast('error', error.message);
      setLoading(false);
    }
  };
  if (props.isLoading) return <LoadingBox />;
  return (
    <div className="payment-container">
      <div className="payment-left">
        <p className="top-header">{t('IDS_WP_ORDER_INFO')}</p>
        <p className="text-payment-header">{t('IDS_WP_ORDER_INFO_DES')}</p>
        <form onSubmit={handleEditBill}>
          <TextField
            id="company"
            label={t('IDS_WP_ORDER_COMPANY_NAME')}
            fullWidth
            margin="normal"
            value={props.bill.company}
            InputLabelProps={{ shrink: true }}
            disabled={!editMode}
            className="style-input-text"
          />
          <TextField
            id="address_export"
            label={t('IDS_WP_ORDER_ADDRESS')}
            fullWidth
            margin="normal"
            value={props.bill.address_export}
            InputLabelProps={{ shrink: true }}
            disabled={!editMode}
            className="style-input-text"
          />
          <TextField
            id="tax_code"
            label={t('IDS_WP_LAW_CODE')}
            fullWidth
            margin="normal"
            value={props.bill.tax_code}
            InputLabelProps={{ shrink: true }}
            disabled={!editMode}
            className="style-input-text"
          />
          <TextField
            id="manager"
            label={t('IDS_WP_LAW_PEOPLE')}
            fullWidth
            margin="normal"
            value={props.bill.manager}
            InputLabelProps={{ shrink: true }}
            disabled={!editMode}
            className="style-input-text"
          />
          <TextField
            id="address_import"
            label={t('IDS_WP_ADDRESS_RECEIPT')}
            fullWidth
            margin="normal"
            value={props.bill.address_import}
            InputLabelProps={{ shrink: true }}
            disabled={!editMode}
            className="style-input-text"
          />
          <TextField
            id="phone"
            label={t('IDS_WP_PHONE_CONTACT')}
            fullWidth
            margin="normal"
            value={props.bill.phone}
            InputLabelProps={{ shrink: true }}
            disabled={!editMode}
            className="style-input-text"
          />
          <TextField
            id="email"
            label={t('IDS_WP_EMAIL_ORDER')}
            fullWidth
            margin="normal"
            value={props.bill.email}
            InputLabelProps={{ shrink: true }}
            disabled={!editMode}
            className="style-input-text"
          />
          <div className="edit-action">
            <Button
              variant="contained"
              className="btn-edit none-boxshadow"
              type="submit"
              disabled={loading}
            >
              {loading && (
                <CircularProgress size={20} className="margin-circular" />
              )}
              {editMode ? t('IDS_WP_SAVE') : t('IDS_WP_EDIT_TEXT')}
            </Button>
            {editMode && (
              <Button
                variant="contained"
                className="btn-edit btn-cancel none-boxshadow"
                onClick={() => {
                  handleFetchData();
                  setEditMode(false);
                }}
              >
                {t('IDS_WP_CANCEL')}
              </Button>
            )}
          </div>
        </form>
      </div>
      {/* <Divider orientation="vertical" className="divider-vertical" /> */}
      <div className="payment-right">
        <div className="payment-right-top">
          <p className="top-header">{t('IDS_WP_PAYMENT_INFO')}</p>
          <p>{t('IDS_WP_PAYMENT_INFO_DES_1')}</p>
          <p>{t('IDS_WP_PAYMENT_INFO_DES_2')}:</p>
          <p className="payment-title">{t('IDS_WP_ACCOUNT_COMPANY')}</p>
          <div className="payment-account">
            <img src={icons.ic_bidv} alt="" />
            <div className="payment-info">
              <h2>{t('IDS_WP_ACCOUNT_BIDV')}</h2>
              <p>{t('IDS_WP_ACCOUNT_OWNER_COMPANY')}</p>
              <p>{t('IDS_WP_ACCOUNT_NUMBER')}: 1001.00000.24275</p>
            </div>
          </div>
          <p className="payment-title">{t('IDS_WP_ACCOUNT_PRIVATE')}</p>
          <div className="payment-account">
            <img src={icons.ic_vcb} alt="" />
            <div className="payment-info">
              <h2>{t('IDS_WP_ACCOUNT_VCB')}</h2>
              <p>{t('IDS_WP_ACCOUNT_OWNER')}</p>
              <p>{t('IDS_WP_ACCOUNT_NUMBER')}: 0611001920071</p>
            </div>
          </div>
          <div className="payment-account">
            <img src={icons.ic_bidv} alt="" />
            <div className="payment-info">
              <h2>{t('IDS_WP_BIDV_ADDRESS')}</h2>
              <p>{t('IDS_WP_ACCOUNT_OWNER')}</p>
              <p>{t('IDS_WP_ACCOUNT_NUMBER')}: 22210001288967</p>
            </div>
          </div>
        </div>
        <div className="payment-right-bottom">
          <h2>{t('IDS_WP_NOTE')}:</h2>
          <p>{t('IDS_WP_NOTE_DES_1')}</p>
          <p className="right-bottom-text">{t('IDS_WP_NOTE_DES_2')}</p>
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    bill: state.setting.bill,
    isLoading: state.setting.isLoading
  }),
  {
    actionGetBill,
    actionChangeLoading,
    actionToast
  }
)(withRouter(Payment));
