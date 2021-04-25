import CustomModal from 'components/CustomModal';
import React from 'react';
import ReactParserHtml from 'react-html-parser';
import { useTranslation } from 'react-i18next';

const ModalVerifyAccount = ({email,onCancle,visible}) => {
    const {t} = useTranslation();
  return (
    <CustomModal
    onCancle={onCancle}
    open={visible}
    manualClose={true}
    className="modal-verify-account"
    title={t("IDS_WP_VERIFY_ACCOUNT_TITLE_NOTIFY")}
    confirmRender={null}
    cancleRender={()=>(t("IDS_WP_BUTTON_CLOSE"))}
    height="miniWide"
  >
    <div className="modal-verify-account_content">
      <p>
        {t("IDS_WP_VERIFY_ACCOUNT_CONTENT_NOTIFY")}{" "}
        <strong style={{ color: "red" }}>
          {email}
        </strong>
      </p>
      <p>
        {ReactParserHtml(
          t("IDS_WP_VERIFY_ACCOUNT_CONTENT_NOTIFY2")
        )}
      </p>
    </div>
  </CustomModal>
  )
      
}

export default ModalVerifyAccount;