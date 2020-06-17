import { Box } from "@material-ui/core";
import { useTimes } from "components/CustomPopover";
import moment from "moment";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { emptyObject } from "../contants/defaultValue";
import { JobPageContext } from "../JobPageContext";
import { get } from "../utils";
import "./Analytic.css";
import AnalyticButton from "./AnalyticButton";
import PrimaryButton from "./PrimaryButton";
const createAnalyticButtonProps = ({ key, show, count, label, color }) => ({
  key,
  active: show,
  count,
  label,
  color,
  // onClick: () => setstatusFilter(string)
});
export function Analytic({ options = [] }) {
  const { t } = useTranslation();
  const allCount = options.reduce(
    (result = 0, option) => result + option.count || 0,
    0
  );
  const formatDateTemplate = useSelector((state) =>
    get(state, "system.profile.format_date", "DD/MM/YYYY")
  );
  const { timeType, timeRange = emptyObject } = useContext(JobPageContext);
  const { timeStart, timeEnd } = timeRange;
  const times = useTimes();
  return (
    <Box className="comp_Analytic">
      <Box flex="1">
        <PrimaryButton
          count={allCount}
          label={t("Công việc")}
          subLabel={
            timeType === 5
              ? t(times[timeType].title)
              : `${moment(timeStart).format(formatDateTemplate)} - ${moment(
                  timeEnd
                ).format(formatDateTemplate)}`
          }
        />
      </Box>
      {options
        .filter((option) => option.show)
        .map((option, i) => (
          <AnalyticButton
            {...createAnalyticButtonProps(option)}
            circleText={`${Math.floor((option.count * 100) / allCount || 0)}%`}
          />
        ))}
    </Box>
  );
}
