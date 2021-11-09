import { mdiContentCopy, mdiNotePlusOutline } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import { useTranslation } from "react-i18next";
import CustomModal from "../../../../components/CustomModal";
import CopyProjectModal from "../CopyProject";
import CreateNewProjectModal from "../CreateNewProject";
import "./style.scss";

const Container = ({ className = "", ...props }) => (
  <div
    className={`view_ProjectGroup_Create_Project_Modal___container ${className}`}
    {...props}
  />
);

const ButtonCase = ({ className = "", ...props }) => (
  <div className={`${className}`} {...props} />
);

function CreateProjectGroup({
  open,
  setOpen,
  projectGroupId = null,
  work_types = null,
}) {
  const { t } = useTranslation();
  const [createNew, setCreateNew] = React.useState(false);
  const [copy, setCopy] = React.useState(false);

  return (
    <>
      <CustomModal
        title={`${t("IDS_WP_ADD")}`}
        open={open}
        setOpen={setOpen}
        confirmRender={null}
        height="short"
        className="view_ProjectGroup_Create_Project_Modal___modal"
      >
        <Container>
          <ButtonCase
            className={"view_ProjectGroup_Create_Project_Modal___button-new"}
            onClick={(evt) => {
              setCreateNew(true);
              setCopy(false);
              setOpen(false);
            }}
          >
            <div>
              <Icon path={mdiNotePlusOutline} size={2} />
            </div>
            <div>
              <span>{`${t("DMH.VIEW.PGP.MODAL.NEWPG.CREATE.TITLE")}`}</span>
              <span>{t("DMH.VIEW.PGP.MODAL.NEWPG.CREATE.DESC")}</span>
            </div>
          </ButtonCase>
          <ButtonCase
            className={"view_ProjectGroup_Create_Project_Modal___button-copy"}
            onClick={(evt) => {
              setCreateNew(false);
              setCopy(true);
              setOpen(false);
            }}
          >
            <div>
              <Icon path={mdiContentCopy} size={2} />
            </div>
            <div>
              <span>{`${t("DMH.VIEW.PGP.MODAL.NEWPG.COPY.TITLE")}`}</span>
              <span>{t("DMH.VIEW.PGP.MODAL.NEWPG.COPY.DESC")}</span>
            </div>
          </ButtonCase>
        </Container>
      </CustomModal>
      <CreateNewProjectModal
        open={createNew}
        setOpen={setCreateNew}
        projectGroupId={projectGroupId}
        work_types={work_types}
      />
      <CopyProjectModal
        open={copy}
        setOpen={setCopy}
        projectGroupId={projectGroupId}
      />
    </>
  );
}

export default CreateProjectGroup;
