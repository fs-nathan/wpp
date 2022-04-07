import CustomModal from "components/CustomModal";
import { isElement, isNil } from "lodash";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { currentColorSelector } from "views/Chat/selectors";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import "./style.scss";

const colors = [
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
  project_id = null,
  projectColor,
}) {
  const [createNew, setCreateNew] = React.useState(false);
  const [copy, setCopy] = React.useState(false);
  const { t } = useTranslation();
  const { projectId: _projectId } = useParams();
  const [projectId, setProjectId] = React.useState(_projectId);
  const appColor = useSelector(currentColorSelector);

  const [selectedColor, setSelectedColor] = useState(projectColor || colors[0]);

  React.useEffect(() => {
    setProjectId(isNil(project_id) ? _projectId : project_id);
  }, [project_id, _projectId]);

  console.log("open", open);
  return (
    <>
      <CustomModal
        open={open}
        setOpen={setOpen}
        confirmRender={null}
        titleRender={null}
        height="short"
        className={"colorGroupPicker__modal"}
        id={"color-picker-modal"}
        maxWidth={"xs"}
        canConfirm={false}
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
                onClick={() => setSelectedColor(color)}
              >
                {isSelected && <DoneOutlinedIcon />}
              </div>
            );
          })}
        </div>
      </CustomModal>
    </>
  );
}

export default ColorGroupPickerModal;
