import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardReportContent = ({ title, count = 0 }) => {
  const { t } = useTranslation();
  return (
    <Card style={{ minHeight: 140 }}>
      <StyledContent>
        <Typography variant="h6" component="div" style={{ fontSize: "1rem" }}>
          {title}
        </Typography>

        <div>
          <Typography
            variant="h6"
            component="div"
            style={{ fontSize: "1.5rem" }}
          >
            {count}
          </Typography>
          <StyledLink to="/">{t("LABEL_CHAT_TASK_XEM_CHI_TIET")}</StyledLink>
        </div>
      </StyledContent>
    </Card>
  );
};

const StyledContent = styled(CardContent)`
  flex-direction: column;
  height: 100px;
  display: flex;
  justify-content: space-between;
`;
const StyledLink = styled(Link)`
  font-size: "0.85rem";
  color: "#666!important";
  margin-top: "5px";
  display: "inline-block";
  &:visited {
    color: "#666";
  }
`;

export default CardReportContent;
