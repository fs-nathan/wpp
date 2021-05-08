import CustomModal from 'components/CustomModal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as images from "assets/index";
import '../../HeaderButtonGroup/style.scss';
import { connect } from 'react-redux';
const ModalCreateAccount = ({colors,openAddMember,setOpenAddMember,setOpen,setOpenCreateAccount}) => {
    const {t} = useTranslation();

    const {color} = colors.find((item) => item.selected === true);
      function hoverCard1(event) {
        const el = event.target;
        const add_member = document.getElementById("add-member");

          el.style.borderColor = color;
          add_member.style.color = color;
      }
     function removeHover1(event){
      const el = event.target;
      el.style.borderColor = '#ccc';
      const add_member = document.getElementById("add-member");
      add_member.style.color = 'unset';
     }
      function hoverCard2(event) {
        const el = event.target;
        const create_account = document.getElementById("create-account");
          el.style.borderColor = color;
          create_account.style.color = color;
      }
      function removeHover2(event){
        const el = event.target;
        el.style.borderColor = '#ccc';
        const create_account = document.getElementById("create-account");
        create_account.style.color = 'unset';
       }
  
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
            >
              <div className="modal-add-member_content">
                <div
                onMouseEnter={(event)=>hoverCard1(event)}
                onMouseLeave={(event)=>removeHover1(event)}
                  className="modal-add-member_card"
                  id="card1"
                  onClick={() => {
                    setOpen(true);
                    setOpenAddMember(false);
                  }}
                >
                  <div className="modal-add-member_card-icon">
                    <img src={images.icon_add_member} alt="" />
                  </div>
                  <div className="modal-add-member_card-text">
                    <h4 id="add-member">{t("DMH.VIEW.DP.RIGHT.UT.ADD_USER")}</h4>
                    <p>{t("LABEL_ADD_MEMBER_DESCRIPTION")}</p>
                  </div>
                </div>
                <div
                  className="modal-add-member_card"
                  onMouseEnter={(event)=>hoverCard2(event)}
                  onMouseLeave={(event) => removeHover2(event)}
                  id="card2"
                  onClick={() => {
                    setOpenAddMember(false);
                    setOpenCreateAccount(true);
                  }}
                >
                  <div className="modal-add-member_card-icon">
                    <img src={images.icon_create_user} alt="" />
                  </div>
                  <div className="modal-add-member_card-text">
                    <h4 id="create-account">{t("LABEL_CREATE_ACCOUNT_TITLE")}</h4>
                    <p>{t("LABEL_CREATE_ACCOUNT_DESCRIPTION")}</p>
                  </div>
                </div>
              </div>
            </CustomModal>
    )
}

const mapStateToProps = (state) => {
  return {
    colors: state.setting.colors
  };
};

export default connect(mapStateToProps) (ModalCreateAccount);