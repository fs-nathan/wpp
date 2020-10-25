import React from "react";
import {Dialog, DialogContent} from '@material-ui/core';
import * as images from "assets";
import {useTranslation} from "react-i18next";
import "./styles.scss";
import {WORKPLACE_TYPES} from "../../../../constants/constants";
import {get, isNil} from "lodash";

function SelectWorkType({
  open, setOpen, handleSelectItem = () => null, selected, projectStatistic
}) {
  const { t } = useTranslation();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOnClick = type => {
    handleSelectItem(type);
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogContent>
        <div className={"select-work-type-modal-container"}>
          <div
            className={`select-work-type-modal-item ${selected === WORKPLACE_TYPES.JOB && "active"}`}
            onClick={() => handleOnClick(WORKPLACE_TYPES.JOB)}
          >
            <img src={images.check_64} alt="" width={35} height={35}/>
            <div className={"select-work-type-modal-item-text"}>
              <div>{t("IDS_WP_JOB")}</div>
              <div>{`${get(projectStatistic, "number_work_type",0)} ${t("IDS_WP_TOPICS")}`}</div>
            </div>
          </div>
          <div
            className={`select-work-type-modal-item ${selected === WORKPLACE_TYPES.PROJECT && "active"}`}
            onClick={() => handleOnClick(WORKPLACE_TYPES.PROJECT)}
          >
            <img src={images.speed_64} alt="" width={35} height={35}/>
            <div className={"select-work-type-modal-item-text"}>
              <div>{t("IDS_WP_PROJECT")}</div>
              <div>{`${get(projectStatistic, "number_project",0)} ${t("IDS_WP_PROJECT")}`}</div>
            </div>
          </div>
          <div
            className={`select-work-type-modal-item ${selected === WORKPLACE_TYPES.PROCESS && "active"}`}
            onClick={() => handleOnClick(WORKPLACE_TYPES.PROCESS)}
          >
            <img src={images.workfollow_64} alt="" width={35} height={35}/>
            <div className={"select-work-type-modal-item-text"}>
              <div>{t("IDS_WP_PROCESS")}</div>
              <div>{`${get(projectStatistic, "number_process",0)} ${t("IDS_WP_PROCESS")}`}</div>
            </div>
          </div>
          <div
            className={"select-work-type-modal-item"}
            onClick={() => handleOnClick()}
            className={`select-work-type-modal-item ${(isNil(selected) || selected === -1) && "active"}`}
          >
            <img src={images.type_all_64} alt="" width={35} height={35}/>
            <div className={"select-work-type-modal-item-text"}>
              <div>{t("IDS_WP_ALL")}</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SelectWorkType;