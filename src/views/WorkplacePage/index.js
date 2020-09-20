import React from "react";
import "./styles.scss";
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import * as images from "assets";
import {invert, get} from "lodash";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import {WORKPLACE_TYPES} from "../../constants/constants";
import Button from "@material-ui/core/Button";
import {getProjectStatistic} from "../../actions/project/getStatistic";
import {connect} from "react-redux";
import {Routes} from "../../constants/routes";

function WorkplacePage({
  profile, getProjectStatistic,
  projectStatistic
}) {
  const {t} = useTranslation();
  const history = useHistory();
  React.useEffect(() => {
    getProjectStatistic();
  }, []);
  const handleClickWorkType = (type) => {
    switch (type) {
      case WORKPLACE_TYPES.JOB:
        history.push(`${Routes.PROJECTS}?workType=${WORKPLACE_TYPES.JOB}`);
        break;
      case WORKPLACE_TYPES.PROJECT:
        history.push(`${Routes.PROJECTS}?workType=${WORKPLACE_TYPES.PROJECT}`);
        break;
      case WORKPLACE_TYPES.PROCESS:
        history.push(`${Routes.PROJECTS}?workType=${WORKPLACE_TYPES.PROCESS}`);
        break;
      default:
        return;
    }
  }

  return (
    <Box className={"workplace-page-container"}>
      <div className={"workplace-page-header"}>
        <Typography component={"h4"} variant={"h3"}>{t("IDS_WP_WORKPLACE_WELLCOME", {user: profile.name})}</Typography>
        <p className={"workplace-page-header-subtitle"}>{t("IDS_WP_WORKPLACE_SLOGAN")}</p>
      </div>
      <div className={"workplace-page-cards"}>
        <div className={"workplace-page-card"} onClick={() => handleClickWorkType(WORKPLACE_TYPES.JOB)}>
          <img className={"workplace-page-card-cover"} src={images.workplace_bg_01}/>
          <div className={"workplace-page-card-content"}>
            <img src={images.check_64} alt=""/>
            <p className={"workplace-page-working-type"}>{`${t(`IDS_WP_${invert(WORKPLACE_TYPES)[0]}`)}`}</p>
            <p className={"workplace-page-working-count"}>{t("IDS_WP_COUNT_WORKPLACE_JOB", {count: get(projectStatistic, "number_work_type", 0)})}</p>
            <p className={"workplace-page-working-des"}>{t("IDS_WP_DES_WORKPLACE_JOB")}</p>
            <Button onClick={() => handleClickWorkType(WORKPLACE_TYPES.JOB)} color="primary">{t("IDS_WP_START_NOW")}</Button>
          </div>
        </div>
        <div className={"workplace-page-card"} onClick={() => handleClickWorkType(WORKPLACE_TYPES.PROJECT)}>
          <img className={"workplace-page-card-cover"} src={images.workplace_bg_02}/>
          <div className={"workplace-page-card-content"}>
            <img src={images.speed_64} alt=""/>
            <p className={"workplace-page-working-type"}>{`${t(`IDS_WP_${invert(WORKPLACE_TYPES)[1]}`)}`}</p>
            <p className={"workplace-page-working-count"}>{t("IDS_WP_COUNT_WORKPLACE_PROJECT", {count: get(projectStatistic, "number_project", 0)})}</p>
            <p className={"workplace-page-working-des"}>{t("IDS_WP_DES_WORKPLACE_PROJECT")}</p>
            <Button onClick={() => handleClickWorkType(WORKPLACE_TYPES.PROJECT)} color="primary">{t("IDS_WP_START_NOW")}</Button>
          </div>
        </div>
        <div className={"workplace-page-card"} onClick={() => handleClickWorkType(WORKPLACE_TYPES.PROCESS)}>
          <img className={"workplace-page-card-cover"} src={images.workplace_bg_03}/>
          <div className={"workplace-page-card-content"}>
            <img src={images.workfollow_64} alt=""/>
            <p className={"workplace-page-working-type"}>{`${t(`IDS_WP_${invert(WORKPLACE_TYPES)[2]}`)}`}</p>
            <p className={"workplace-page-working-count"}>{t("IDS_WP_COUNT_WORKPLACE_PROCESS", {count: get(projectStatistic, "number_process", 0)})}</p>
            <p className={"workplace-page-working-des"}>{t("IDS_WP_DES_WORKPLACE_PROCESS")}</p>
            <Button onClick={() => handleClickWorkType(WORKPLACE_TYPES.PROCESS)} color="primary">{t("IDS_WP_START_NOW")}</Button>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default connect(
  state => ({
    profile: state.system.profile,
    projectStatistic: state.project.getProjectStatistic.data
  }),
  {
    getProjectStatistic
  }
)(WorkplacePage);