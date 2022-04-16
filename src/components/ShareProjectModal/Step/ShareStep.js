import { Button, ImageList, ImageListItem } from "@mui/material";
import { Box } from "@mui/system";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CustomTextbox from "components/CustomTextbox";
import CustomTextboxSelect from "components/CustomTextboxSelect";
import { useCallback, useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import CustomModal from "components/CustomModal";
import Modal from "@mui/material/Modal";
import { BACKGROUND } from "mocks/background";
import { useDispatch, useSelector } from "react-redux";
import { getTemplateCategory } from "actions/project/getTemplateCategory";
import TitleSectionModal from "components/TitleSectionModal";
import CustomSelect from "components/CustomSelect";

const ShareStep = ({ onNext, setopenModal, openModal, onBack }) => {
  const { t } = useTranslation();
  const [description, setDescription] = useState("");
  const [curTemplateCategory, setCurTemplateCategory] = useState(null);
  const [open, setOpen] = useState(false);
  const [openSelectGroupProjectModal, setOpenSelectGroupProjectModal] =
    useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const categories = useSelector(
    (state) => state.project.getTemplateCategory.data
  );

  const fetchData = useCallback(async () => {
    dispatch(getTemplateCategory());
  }, [dispatch, getTemplateCategory]);

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

  return (
    <>
      <CustomModal
        maxWidth="sm"
        setOpen={setopenModal}
        open={openModal}
        confirmRender={() => "Chia sẻ"}
        cancleRender={() => "Quay lại"}
        manualClose={true}
        onConfirm={() => {
          onNext();
        }}
        onCancle={() => {
          onBack();
        }}
        // canConfirm={false}
        title={t("SHARE_PROJECT_TITLE")}
      >
        <Box className="share-step__container">
          <div className="per-line-step-in-form">
            <CustomTextbox
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
                  console.log(category);
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
              <img src="/images/temp-share.jpeg" alt="Temp" loading="lazy" />
            </div>
            <Button variant="text" onClick={handleOpen}>
              Thay đổi
            </Button>
          </div>
        </Box>
      </CustomModal>
      <Modal keepMounted open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            p: 4,
            bgcolor: "white",
            maxHeight: 500,
            overflowY: "auto",
          }}
        >
          <ImageList
            sx={{ width: "100%", height: "100%", overflowY: "unset" }}
            cols={3}
          >
            {BACKGROUND.map((item) => (
              <ImageListItem
                key={item.img}
                onClick={handleClose}
                sx={{ cursor: "pointer" }}
              >
                <img src={`${item.img}`} alt={item.title} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Modal>
    </>
  );
};

export default ShareStep;
