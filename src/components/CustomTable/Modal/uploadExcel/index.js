import { mdiUpload } from '@mdi/js';
import CustomModal from 'components/CustomModal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from "@mdi/react";
import '../../HeaderButtonGroup/style.scss';
import { Link } from '@material-ui/core';
import readXlsxFile from 'read-excel-file';
import * as FileSaver from 'file-saver';
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
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = 'data';
    const data_sample = [
      {"TT": 1, "Tài khoản(Email)": "email1@gmail.com", "Tên thành viên": "Nguyễn Văn A"},
      {"TT": 2, "Tài khoản(Email)": "email2@gmail.com", "Tên thành viên": "Nguyễn Văn B"},
      {"TT": 3, "Tài khoản(Email)": "email3@gmail.com", "Tên thành viên": "Nguyễn Văn C"},

    ]
    const exportToCSV = (data_sample, fileName) => {
      const ws = XLSX.utils.json_to_sheet(data_sample);
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    }

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
      <h3 style={{fontSize: '19px'}}>{t("IDS_WP_ACCOUNT_INTERNAL_ENTER_DATA_EXCEL")}</h3>
      <div style={{ lineHeight: "18px", whiteSpace: "break-spaces",marginBottom: '15px' }}>
        {t("IDS_WP_ACCOUNT_INTERNAL_ENTER_DATA_EXCEL_TEXT")}
      </div>
      <div onClick={()=>exportToCSV(data_sample, fileName)} className="modal_upload-excel_downfile">
        {t("IDS_WP_ACCOUNT_INTERNAL_DOWN_FILE_FORM")}
      </div>
      <div
        className="upload-excel"
        style={{ margin: "auto",padding: "18px", width: "300px",borderRadius: "3px", marginTop: "40px",backgroundColor: "#f0f0f0" }}
        onClick={onClickFromComputer}
      >
        <div style={{display: "flex", alignItems: "center"}} className="content-btn-upload-excel">
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
        
      </div>
      {errFile && <div style={{color: 'red', marginTop: '10px'}}>{errFile}</div>}
      {message && <div style={{color: 'red', marginTop: '10px'}}>{message}</div>}
    </div>
  </CustomModal>
  )
}

export default ModalUplaodExcel;