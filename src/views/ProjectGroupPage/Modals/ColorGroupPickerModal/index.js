import { Dialog } from "@material-ui/core";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./style.scss";

export const colors = [
  "#004393",
  "#3682f9",
  "#9fa5c2",
  "#40a86a",
  "#1eb9c8",
  "#696f8d",
  "#a56437",
  "#c99775",
  "#e42a49",
  "#f57740",
  "#ffbd1f",
  "#9e80f6",
  "#a72bc9",
  "#ff7ba9",
  "#d69dce",
  "#434343",
];

function ColorGroupPickerModal({
  open,
  setOpen,
  projectGroup_id = null,
  projectGroupColor,
  handleUpdateProjectGroup,
  setActiveLoading,
  handleSelectColor,
}) {
  const { t } = useTranslation();
  const [projectGroupId, setProjectGroupId] = React.useState(projectGroup_id);

  const [selectedColor, setSelectedColor] = useState(
    projectGroupColor || colors[0]
  );

  useEffect(() => {
    setProjectGroupId(projectGroup_id);
  }, [projectGroup_id]);

  useEffect(() => {
    setSelectedColor(projectGroupColor);
  }, [projectGroupColor]);

  return (
    <>
      <Dialog
        open={open}
        setOpen={setOpen}
        height="short"
        className={"colorGroupPicker__modal"}
        id={"color-picker-modal"}
        maxWidth={"md"}
        onBackdropClick={() => {
          setOpen(false);
        }}
      >
        <h4 className={"colorGroupPicker__modal--title"}>
          {t("DMH.VIEW.PP.MODAL.COLOR_PICKER.TITLE")}
        </h4>
        <div className={`colorGroupPicker__modal--content`}>
          {colors.map((color) => {
            const isSelected = selectedColor === color;

            return (
              <div
                style={{ backgroundColor: color }}
                key={color}
                className={`colorGroupPicker__modal--roundedColor ${
                  isSelected ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedColor(color);
                  handleSelectColor({
                    projectGroupId: projectGroupId,
                    color: color,
                  });
                  setOpen(false);
                }}
              >
                {isSelected && <DoneOutlinedIcon />}
              </div>
            );
          })}
        </div>
      </Dialog>
    </>
  );
}

export default ColorGroupPickerModal;
