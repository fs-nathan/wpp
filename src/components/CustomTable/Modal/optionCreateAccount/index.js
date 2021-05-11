import CustomModal from "components/CustomModal";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ReactParserHtml from "react-html-parser";
import "../../HeaderButtonGroup/style.scss";
import { connect, useDispatch } from "react-redux";
import Icon from "@mdi/react";
import { mdiCheckDecagram } from "@mdi/js";
import { Button } from "@material-ui/core";
import { actionCheckVerifyAccount } from "actions/user/detailUser";
import { actionToast } from "actions/system/system";
import ModalVerifyAccount from "views/SettingAccountPage/TablePart/SettingAccountRight/Modal/VerifyAccount";

const ModalOptionCreateAccount = ({
  profile,
  openCreateAccount,
  setOpenCreateAccount,
  setOpenContinueCreateAccount,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);
  const handleVerifyAccount = async () => {
    try {
      const { data } = await actionCheckVerifyAccount();
      if (data.state) {
        setVisible(true);
        setOpenCreateAccount(false);
      }
    } catch (error) {
      handleToast("error", t("SNACK_MUTATE_FAIL"));
    }
  };
  const handleToast = async (type, message) => {
    dispatch(actionToast(type, message));
    setTimeout(() => dispatch(actionToast(null, "")), 2000);
  };
  return (
    <>
      <CustomModal
        open={openCreateAccount}
        setOpen={setOpenCreateAccount}
        onCancle={() => setOpenCreateAccount(false)}
        title={t("IDS_WP_ACCOUNT_INTERNAL_CREATE")}
        height={`medium`}
        confirmRender={null}
        className="modal-account-internal"
      >
        <div className="account-internal">
          <div className="account-internal_content">
            <div className="account-internal_content-message">
              <p>{t("IDS_WP_ACCOUNT_INTERNAL_MESSAGE_1")}</p>
              <p style={{ whiteSpace: "break-spaces", marginTop: "20px" }}>
                {t("IDS_WP_ACCOUNT_INTERNAL_MESSAGE_2")}
              </p>
              <p style={{ marginTop: "20px" }}>
                {ReactParserHtml(t("IDS_WP_ACCOUNT_INTERNAL_MESSAGE_3"))}&nbsp;
              </p>
              <div style={{ textAlign: "center", marginTop: "40px" }}>
                <Button
                  onClick={() => {
                    setOpenCreateAccount(false);
                    setOpenContinueCreateAccount(true);
                  }}
                  className="account-internal_btn-create-account"
                  style={{
                    height: "50px",
                    width: "250px",
                    fontSize: "18px",
                  }}
                  variant="contained"
                  color="primary"
                >
                  {t("IDS_WP_ACCOUNT_INTERNAL_CONTINUE")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CustomModal>
      <ModalVerifyAccount
        email={profile.email}
        visible={visible}
        onCancle={() => setVisible(false)}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.system.profile,
  };
};

export default connect(mapStateToProps)(ModalOptionCreateAccount);
