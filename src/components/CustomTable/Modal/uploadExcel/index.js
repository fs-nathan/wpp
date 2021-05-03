import { mdiUpload } from '@mdi/js';
import CustomModal from 'components/CustomModal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from "@mdi/react";
import '../../HeaderButtonGroup/style.scss';
import { Link } from '@material-ui/core';
import readXlsxFile from 'read-excel-file';
import * as XLSX from 'xlsx';
const ModalUplaodExcel = ({
    openUploadExcel,
    setOpenUploadExcel,
    setOpenContinueCreateAccount,
    handlesetFileExcel
}) => {
    const [errFile,setErrFile] = React.useState('');
    const [message,setMessage] = React.useState('');
    const {t} = useTranslation();
    let fileInputRef = React.useRef();
    function onClickFromComputer() {
        document.getElementById("upload_file").value = null;
        fileInputRef.current.click();
      }

    const onChangeFileExcel = (e) => {
        if(e.target.files[0].type === "application/vnd.ms-excel"){
          // setFileExcel(e.target.files[0]);
          var files = e.target.files, f = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;
        let readedData = XLSX.read(data, {type: 'binary'});
        const wsname = readedData.SheetNames[0];
        const ws = readedData.Sheets[wsname];

        /* Convert array to json*/
        const dataParse = XLSX.utils.sheet_to_json(ws, {header:1});
        console.log(dataParse)
        if(JSON.stringify(dataParse[0])=== JSON.stringify(["TT", "Tài khoản (Email)", "Tên thành viên"])){
          if(dataParse.length <=101){
            dataParse.shift();
            handlesetFileExcel(dataParse);
            setOpenContinueCreateAccount(true);
            setOpenUploadExcel(false);
          }  
          else {setMessage(t('IDS_WP_UPLOAD_FILE_EXCEL_ERROR_CAPACITY_FILE'))}
        }
        else {
          setMessage(t('IDS_WP_UPLOAD_FILE_EXCEL_ERROR_SAMPLE_FILE'));
        }
       
    };
    reader.readAsBinaryString(f)
          setErrFile('');
        }
        else setErrFile(t('IDS_WP_CREATE_ACCOUNT_FILE_EXCEL_TYPE'))
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
      <div style={{ lineHeight: "18px", whiteSpace: "break-spaces",marginBottom: '15px' }}>
        {t("IDS_WP_ACCOUNT_INTERNAL_ENTER_DATA_EXCEL_TEXT")}
      </div>
      <Link href="https://drive.google.com/file/d/1ReixkbwdGNrnbFkjI5v05Zsvvl7mdPOp/view?usp=sharing" target="blank" className="modal_upload-excel_downfile">
        {t("IDS_WP_ACCOUNT_INTERNAL_DOWN_FILE_FORM")}
      </Link>
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
          accept=".xlsx, .xls"
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
      {errFile && <div style={{color: 'red', marginTop: '10px'}}>{errFile}</div>}
      {message && <div style={{color: 'red', marginTop: '10px'}}>{message}</div>}
    </div>
  </CustomModal>
  )
}

export default ModalUplaodExcel;