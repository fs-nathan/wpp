import { Button, CircularProgress } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { usePrimarySubmitActionStyles } from "views/HomePage/components/PrimarySubmitAction";
import useWebpush from "webpush/useWebpush";
import noti_setting from "../../../../assets/noti_setting.png";
import "./SettingGroupRight.scss";
const WebpushButton = ({ onBack }) => {
  const {
    isSubscribed,
    handleSubscribe,
    handleUnsubscribe,
    loading,
  } = useWebpush();
  const { t } = useTranslation();
  const classes = usePrimarySubmitActionStyles();
  return (
    <div className={classes.wrapper}>
      <Button
        variant="contained"
        onClick={() => {
          !isSubscribed
            ? handleSubscribe()
            : (() => {
                if (window.confirm(t("Do you really want to unsubscribe?"))) {
                  handleUnsubscribe();
                }
              })();
        }}
        color={!isSubscribed ? "primary" : "default"}
      >
        {!isSubscribed ? t("turn on") : t("turn off")}
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};
const Notification = () => {
  const { t } = useTranslation();
  return (
    <div className="payment-container">
      <div className="payment-left notification-content">
        <p className="top-header">{t("IDS_WP_SETTING_NOTI")}</p>
        <p className="text-payment-header">{t("IDS_WP_ON_OFF_NOTI")}</p>
        <WebpushButton />
        <br />
        <img src={noti_setting} alt="" />
        <p className="text-payment-header boild-text">
          {t("IDS_WP_ON_OFF_NOTI_DES")}
        </p>
        <p className="text-payment-header">{t("IDS_WP_ON_OFF_NOTI_STEP_1")}</p>
        <p className="text-payment-header">{t("IDS_WP_ON_OFF_NOTI_STEP_2")}</p>
        <p className="text-payment-header">
          {t("IDS_WP_ON_OFF_NOTI_STEP_2_DES")}
        </p>
      </div>
    </div>
  );
};

export default Notification;
