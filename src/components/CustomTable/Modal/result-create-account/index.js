import { mdiDownload } from '@mdi/js';
import CustomModal from 'components/CustomModal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '@mdi/react';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import '../../HeaderButtonGroup/style.scss';
const ModalResultCreateAccount = ({openResultCreateAccount,setOpenResultCreateAccount, result}) => {
    const {t} = useTranslation();
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = 'data';
  
    const exportToCSV = (csvData, fileName) => {
      const ws = XLSX.utils.json_to_sheet(csvData);
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    }
    return (
        <CustomModal
              open={openResultCreateAccount}
              setOpen={setOpenResultCreateAccount}
              onCancle={() => setOpenResultCreateAccount(false)}
              title={t("IDS_WP_SIGN_UP")}
              confirmRender={null}
              cancleRender={()=>(t('DMH.VIEW.DP.LEFT.ADD.LABEL.CLOSE'))}
              className="modal_result-create-account"
            >
              <div className="modal_result-create-account_table">
                <h3>
                  {t("IDS_WP_ACCOUNT_INTERNAL_RESULT_CREATE_ACCOUNT_TITLE")}
                </h3>
                <table style={{ borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th>{t("IDS_WP_ACCOUNT_INTERNAL_TABLE_NO")}</th>
                      <th>{t("IDS_WP_ACCOUNT_INTERNAL_TABLE_ACCOUNT")}</th>
                      <th>{t("IDS_WP_ACCOUNT_INTERNAL_TABLE_NAME_MEMBER")}</th>
                      <th>{t("IDS_WP_ACCOUNT_INTERNAL_TABLE_PART")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result &&
                      result.map((item, index) => (
                        <tr key={`${index}`}>
                          <td
                            style={{ textAlign: "center", padding: "0 10px" }}
                          >
                            {index + 1}
                          </td>
                          <td>{item.email}</td>
                          <td>{item.name}</td>
                          <td>{item.room_name}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="modal_result-create-account_action">
                <div>
                  {t("IDS_WP_ACCOUNT_INTERNAL_RESULT_CREATE_ACCOUNT_CREATED")}{" "}
                  {result?.length}
                  {t(
                    "IDS_WP_ACCOUNT_INTERNAL_RESULT_CREATE_ACCOUNT_CREATED_INTERNAL"
                  )}
                </div>
                <div
                  className="upload-excel"
                  onClick={()=>exportToCSV(result,fileName)}
                >
                  <Icon
                    path={mdiDownload}
                    size={1}
                    color={"rgba(0, 0, 0, 0.54)"}
                  />

                  <div>{t("IDS_WP_ACCOUNT_INTERNAL_RESULT_CREATE_ACCOUNT_DOWNLOAD_LIST")}</div>
                </div>
              </div>
            </CustomModal>
    )
}

export default ModalResultCreateAccount;