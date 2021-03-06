import { BACKGROUND } from "mocks/background";
import { Box } from "@mui/system";
import { Button, ImageList, ImageListItem } from "@mui/material";
import { getBanner } from "actions/project/getBanner";
import { getTemplateCategory } from "actions/project/getTemplateCategory";
import { useCallback, useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CustomModal from "components/CustomModal";
import CustomSelect from "components/CustomSelect";
import CustomTextbox from "components/CustomTextbox";
import CustomTextboxSelect from "components/CustomTextboxSelect";
import Modal from "@mui/material/Modal";
import TitleSectionModal from "components/TitleSectionModal";
import { shareProject } from "actions/project/shareProject";
import { parseHTML } from "helpers/utils/parseHTML";

const ShareStep = ({ onNext, setopenModal, openModal, onBack }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const categories = useSelector(
    (state) => state.project.getTemplateCategory.data
  );
  const banners = useSelector((state) => state.project.getBanner.data);
  const {
    project: { id: project_id, name },
  } = useSelector((state) => state.project.detailProject.data);

  const [projectName, setProjectName] = useState(name || "");
  const [description, setDescription] = useState("");
  const [curTemplateCategory, setCurTemplateCategory] = useState(null);
  const [banner, setBanner] = useState(null);
  const [open, setOpen] = useState(false);
  const [openSelectGroupProjectModal, setOpenSelectGroupProjectModal] =
    useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChangeBanner(banner) {
    setBanner(banner);
    handleClose();
  }

  const fetchData = useCallback(async () => {
    await Promise.all[(dispatch(getTemplateCategory()), dispatch(getBanner()))];
  }, [dispatch, getTemplateCategory, getBanner]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const categoryData = useMemo(() => {
    if (categories && categories.length > 0) {
      return categories.map((c) => ({
        label: c.name,
        value: c.id,
      }));
    }
  }, [categories]);

  useEffect(() => {
    if (categoryData && categoryData.length > 0) {
      setCurTemplateCategory(categoryData[0]);
    }
  }, [categoryData]);

  useEffect(() => {
    if (banners && banners.length > 0) {
      setBanner(banners[0]);
    }
  }, [banners]);

  async function onShareProject() {
    try {
      await dispatch(
        shareProject({
          project_id,
          banner: banner.value,
          category_id: curTemplateCategory.value,
          description: parseHTML(description),
          name: projectName,
        })
      );
      onNext();
    } catch (error) {}
  }
  return (
    <>
      <CustomModal
        maxWidth="sm"
        setOpen={setopenModal}
        open={openModal}
        confirmRender={() => t("SHARE.share")}
        cancleRender={() => t("SHARE.Back")}
        manualClose={true}
        onConfirm={onShareProject}
        isDisabled={!Boolean(projectName) || !Boolean(curTemplateCategory)}
        onCancle={() => {
          onBack();
        }}
        // canConfirm={false}
        title={t("SHARE_PROJECT_TITLE")}
      >
        <Box className="share-step__container">
          <CustomTextbox
            value={projectName}
            onChange={(value) => setProjectName(value)}
            label={`${t("PROJECT_NAME")}`}
            fullWidth
            required
            className={
              "view_ProjectGroup_CreateNew_Project_Modal_formItem per-line-step-in-form"
            }
            style={{ fontSize: "16px" }}
          />
          <div className="per-line-step-in-form">
            <CustomTextbox
              isTextarea={true}
              value={description}
              onChange={(value) => setDescription(value)}
              label={`${t("SHARE_STEP_DESCRIPTION_LABEL")}`}
              fullWidth
              multiline
              placeholder={`${t("SHARE_STEP_DESCRIPTION_PLACEHOLDER")}`}
              description={`${t("SHARE_STEP_DESCRIPTION_CONTENT")}`}
            />
          </div>
          <div className="select-customer-from-input per-line-step-in-form">
            <TitleSectionModal
              label={`${t("SHARE_STEP_SELECT_GROUP_LABEL")}`}
              isRequired
            />
            {categories && categories.length > 0 && (
              <CustomSelect
                options={categoryData}
                value={curTemplateCategory}
                onChange={(category) => {
                  setCurTemplateCategory(category);
                }}
              />
            )}
          </div>
          <div className="choose-bg per-line-step-in-form">
            <p className="choose-bg-label">{t("SHARE_STEP_SELECT_BG_LABEL")}</p>
            <div
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: "10px",
              }}
            >
              <img src={banner ? banner.url : ""} alt="Temp" loading="lazy" />
            </div>
            <Button
              variant="text"
              onClick={handleOpen}
              sx={{
                "&:hover": {
                  backgroundColor: "#f3f3f3",
                },
              }}
            >
              {t("SHARE.change")}
            </Button>
          </div>
        </Box>
      </CustomModal>

      <CustomModal
        maxWidth="lg"
        setOpen={setOpen}
        open={open}
        canConfirm={false}
        confirmRender={null}
        cancleRender={null}
        manualClose={true}
        onCancle={() => {
          onBack();
        }}
        title={t("CHOOSE_PROJECT")}
      >
        <Box>
          <ImageList sx={{ width: "100%", height: "100%" }} cols={3}>
            {banners &&
              banners.length > 0 &&
              banners.map((banner) => (
                <ImageListItem
                  key={banner.value}
                  onClick={() => handleChangeBanner(banner)}
                  sx={{ cursor: "pointer" }}
                  className="image-list__items"
                >
                  <img
                    src={`${banner.url}`}
                    alt={banner.value}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
          </ImageList>
        </Box>
      </CustomModal>
    </>
  );
};

export default ShareStep;
