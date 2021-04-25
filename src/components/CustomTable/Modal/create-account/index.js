import CustomModal from 'components/CustomModal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as images from "assets/index";
import '../../HeaderButtonGroup/style.scss';
const ModalCreateAccount = ({openAddMember,setOpenAddMember,setOpen,setOpenCreateAccount}) => {
    const {t} = useTranslation();
    return(
        <CustomModal
              title={t("DMH.VIEW.DP.RIGHT.UT.ADD_USER")}
              confirmRender={null}
              manualClose={true}
              maxWidth="sm"
              open={openAddMember}
              setOpen={setOpenAddMember}
              className="modal-add-member"
              onCancle={() => setOpenAddMember(false)}
              height={`mini`}
            >
              <div className="modal-add-member_content">
                <div
                  className="modal-add-member_card"
                  onClick={() => {
                    setOpen(true);
                    setOpenAddMember(false);
                  }}
                >
                  <div className="modal-add-member_card-icon">
                    <img src={images.icon_add_member} alt="" />
                  </div>
                  <div className="modal-add-member_card-text">
                    <h4>{t("DMH.VIEW.DP.RIGHT.UT.ADD_USER")}</h4>
                    <p>{t("LABEL_ADD_MEMBER_DESCRIPTION")}</p>
                  </div>
                </div>
                <div
                  className="modal-add-member_card"
                  onClick={() => {
                    setOpenAddMember(false);
                    setOpenCreateAccount(true);
                  }}
                >
                  <div className="modal-add-member_card-icon">
                    <img src={images.icon_create_user} alt="" />
                  </div>
                  <div className="modal-add-member_card-text">
                    <h4>{t("LABEL_CREATE_ACCOUNT_TITLE")}</h4>
                    <p>{t("LABEL_CREATE_ACCOUNT_DESCRIPTION")}</p>
                  </div>
                </div>
              </div>
            </CustomModal>
    )
}

export default ModalCreateAccount;