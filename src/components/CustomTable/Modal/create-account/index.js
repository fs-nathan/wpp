import CustomModal from 'components/CustomModal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as images from "assets/index";
import '../../HeaderButtonGroup/style.scss';
import { connect } from 'react-redux';
const ModalCreateAccount = ({colors,openAddMember,setOpenAddMember,setOpen,setOpenCreateAccount}) => {
    const {t} = useTranslation();
    const color = colors.find((item) => item.selected === true);
      var x = document.getElementById("title1");
      var y = document.getElementById("title2");
  
      function hoverCard1() {
          x.style.color = color;
          y.style.color = color;
      }
  
      function hoverCard2() {
          x.style.color = color;
          y.style.color = color;
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
                onMouseLeave={hoverCard1}
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
                    <h4 id="title1">{t("DMH.VIEW.DP.RIGHT.UT.ADD_USER")}</h4>
                    <p>{t("LABEL_ADD_MEMBER_DESCRIPTION")}</p>
                  </div>
                </div>
                <div
                  className="modal-add-member_card"
                  onMouseLeave={hoverCard2}
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
                    <h4 id="title2">{t("LABEL_CREATE_ACCOUNT_TITLE")}</h4>
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