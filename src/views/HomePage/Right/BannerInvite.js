import React from "react";
import url from "socket.io-client/lib/url";
import styled from "styled-components";
import bannerinvite from "assets/home_baner_right1.png";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { viewPermissionsSelector } from "views/ProjectGroupPage/selectors";
import AddUserModal from "views/DepartmentPage/Modals/AddUserModal";
import ModalCreateAccount from "components/CustomTable/Modal/create-account";
import ModalOptionCreateAccount from "components/CustomTable/Modal/optionCreateAccount";
import CreateAccountModal from "views/DepartmentPage/Modals/CreateAccount";
import ModalResultCreateAccount from "components/CustomTable/Modal/result-create-account";
import ModalContinueCreateAccount from "components/CustomTable/Modal/continue-create-account";
import ModalUplaodExcel from "components/CustomTable/Modal/uploadExcel";

const BannerInviteContainer = styled.div`
  width: 100%;
  height: 20vh;
  background-repeat: no-repeat;
  background-position: center center, center top;
  background-size: cover;
  border-radius: 15px;
  background-image: url(${bannerinvite});
  position: relative;
  cursor: pointer;
  p {
    position: absolute;
    top: 4vh;
    left: 2vh;
    color: #fff;
    font-size: 2vh;
    width: 30vh;
    line-height: 20px;
  }
`;

function BannerInvite() {
  const { t } = useTranslation();

  const [openCreateAccount, setOpenCreateAccount] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openAddUSerModal, setOpenAddUserModal] = React.useState(false);
  const [openContinueCreateAccount, setOpenContinueCreateAccount] =
    React.useState(false);
  const [openCreateAccountModal, setOpenCreateAccountModal] =
    React.useState(false);
  const [result, setResult] = React.useState(null);
  const [openResultCreateAccount, setOpenResultCreateAccount] =
    React.useState(false);
  const [fileExcel, setFileExcel] = React.useState("");
  const [openUploadExcel, setOpenUploadExcel] = React.useState(false);
  const handlesetFileExcel = (file) => {
    setFileExcel(file);
  };
  return (
    <>
      <CreateAccountModal
        open={openCreateAccountModal}
        setOpen={setOpenCreateAccountModal}
      />
      <ModalCreateAccount
        setOpenAddMember={setOpenAddUserModal}
        openAddMember={openAddUSerModal}
        setOpen={setOpen}
        setOpenCreateAccount={setOpenCreateAccount}
        setOpenContinueCreateAccount={setOpenContinueCreateAccount}
      />
      <AddUserModal setOpen={setOpen} open={open} />
      <ModalOptionCreateAccount
        openCreateAccount={openCreateAccount}
        setOpenCreateAccount={setOpenCreateAccount}
        setOpenContinueCreateAccount={setOpenContinueCreateAccount}
      />
      <ModalContinueCreateAccount
        fileExcel={fileExcel}
        setResult={setResult}
        setOpenResultCreateAccount={setOpenResultCreateAccount}
        openContinueCreateAccount={openContinueCreateAccount}
        setOpenContinueCreateAccount={setOpenContinueCreateAccount}
        setOpenUploadExcel={setOpenUploadExcel}
      />
      <BannerInviteContainer onClick={() => setOpenAddUserModal(true)}>
        <p
          dangerouslySetInnerHTML={{
            __html:  t("Mời đồng nghiệp tham gia <br>làm việc nhóm"),
          }}
        >
        </p>
      </BannerInviteContainer>
      <ModalResultCreateAccount
        result={result}
        openResultCreateAccount={openResultCreateAccount}
        setOpenResultCreateAccount={setOpenResultCreateAccount}
      />
      <ModalUplaodExcel
        handlesetFileExcel={handlesetFileExcel}
        openUploadExcel={openUploadExcel}
        setOpenUploadExcel={setOpenUploadExcel}
        setOpenContinueCreateAccount={setOpenContinueCreateAccount}
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    viewPermissions: viewPermissionsSelector(state),
  };
};
export default connect(mapStateToProps)(BannerInvite);
