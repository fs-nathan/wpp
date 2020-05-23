import { Button, CircularProgress } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { usePrimarySubmitActionStyles } from "views/HomePage/components/PrimarySubmitAction";
import useWebpush from "webpush/useWebpush";
import "./WebpushButton.css";
import bellOnImage from "./WebpushButton__noti_bell.png";
import bellOffImage from "./WebpushButton__noti_bell_not.png";
export const WebpushButton = () => {
  const {
    isSubscribed,
    handleSubscribe,
    handleUnsubscribe,
    loading,
  } = useWebpush();
  const { t } = useTranslation();
  const classes = usePrimarySubmitActionStyles();
  return (
    <div className="WebpushButton">
      <img alt="icon" src={isSubscribed ? bellOnImage : bellOffImage}></img>
      <div>
        {isSubscribed
          ? t("Đang nhận thông báo trình duyệt")
          : t("Thông báo trình duyệt chưa được bật")}
      </div>
      <span className={classes.wrapper}>
        <Button
          disableElevation
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
          {!isSubscribed ? t("Bật") : t("Tắt")}
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </Button>
      </span>
    </div>
  );
};
