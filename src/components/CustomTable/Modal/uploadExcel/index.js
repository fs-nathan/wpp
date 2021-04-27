import { mdiUpload } from '@mdi/js';
import CustomModal from 'components/CustomModal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from "@mdi/react";
import '../../HeaderButtonGroup/style.scss';
const ModalUplaodExcel = ({
    openUploadExcel,
    setOpenUploadExcel,
    setOpenContinueCreateAccount
}) => {
    const [fileExcel,setFileExcel] = React.useState('');
    const {t} = useTranslation();
    let fileInputRef = React.useRef();
    function onClickFromComputer() {
        document.getElementById("upload_file").value = null;
        fileInputRef.current.click();
      }

    const onChangeFileExcel = (e) => {
        setFileExcel(e.target.files[0]);
    };
  return (
    <CustomModal
    open={openUploadExcel}
    setOpen={setOpenUploadExcel}
    onCancle={() => setOpenUploadExcel(false)}
    title={t("IDS_WP_SIGN_UP")}
    confirmRender={() => (
      <span
        style={{ fontSize: "16px", color: "#54abe8" }}
        onClick={() => {
          setOpenContinueCreateAccount(true);
          setOpenUploadExcel(false);
        }}
      >
        {t("DMH.VIEW.PGP.LEFT.INFO.BACK")}
      </span>
    )}
    className="modal_upload-file_excel"
  >
    <div className="modal_upload-excel">
      <h3>{t("IDS_WP_ACCOUNT_INTERNAL_ENTER_DATA_EXCEL")}</h3>
      <div style={{ lineHeight: "18px", whiteSpace: "break-spaces" }}>
        {t("IDS_WP_ACCOUNT_INTERNAL_ENTER_DATA_EXCEL_TEXT")}
      </div>
      <div className="modal_upload-excel_downfile">
        {t("IDS_WP_ACCOUNT_INTERNAL_DOWN_FILE_FORM")}
      </div>
      <div
        className="upload-excel"
        style={{ margin: "auto", marginTop: "40px" }}
        onClick={onClickFromComputer}
      >
        <input
          className="display-none"
          id="upload_file"
          multiple
          type="file"
          ref={fileInputRef}
          onChange={onChangeFileExcel}
        />
        <Icon
          path={mdiUpload}
          size={1}
          color={"rgba(0, 0, 0, 0.54)"}
        />

        <div>{t("IDS_WP_ACCOUNT_INTERNAL_UPLOAD_EXCEL")}</div>
      </div>
    </div>
  </CustomModal>
  )
}

export default ModalUplaodExcel;