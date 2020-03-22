import { Box } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import "./Analytic.css";
import AnalyticButton from "./AnalyticButton";
import PrimaryButton from "./PrimaryButton";
const createAnalyticButtonProps = ({ key, show, count, label, color }) => ({
  key,
  show,
  active: show,
  count,
  label,
  color
  // onClick: () => setstatusFilter(string)
});
export function Analytic({ options = [] }) {
  const { t } = useTranslation();
  const allCount = options.reduce(
    (result = 0, option) => result + option.count || 0,
    0
  );
  return (
    <Box className="comp_Analytic">
      <Box flex="1">
        <PrimaryButton count={allCount} label={t("Công việc được thực hiện")} />
      </Box>
      {options
        .filter(option => option.show)
        .map((option, i) => (
          <AnalyticButton
            {...createAnalyticButtonProps(option)}
            circleText={`${Math.floor((option.count * 100) / allCount || 0)}%`}
          />
        ))}
    </Box>
  );
}
