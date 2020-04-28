import {
  Avatar,
  Box,
  ButtonBase,
  Divider,
  Typography,
} from "@material-ui/core";
import {
  mdiAt,
  mdiCogs,
  mdiHelpRhombus,
  mdiLifebuoy,
  mdiMapMarkerRadius,
  mdiPhoneInTalk,
  mdiWeb,
} from "@mdi/js";
import Icon from "@mdi/react";
import { Routes } from "constants/routes";
import linkify from "linkifyjs/string";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import GroupDetailContext from "./GroupDetailContext";

function Left() {
  const {
    name,
    code,
    description,
    address,
    website,
    phone,
    email,
    logo,
  } = useContext(GroupDetailContext);
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <Stack large>
      <Stack small style={{ textAlign: "center" }}>
        <Box padding="10px" display="flex" justifyContent="center">
          <Avatar
            style={{ width: "140px", height: "140px" }}
            src={logo}
          ></Avatar>
        </Box>
        <Box style={{ fontSize: "15px" }}>ID:{code}</Box>
        <Typography style={{ fontWeight: "bold" }} variant="h5">
          {name}
        </Typography>
      </Stack>
      <Divider />
      <Box
        dangerouslySetInnerHTML={{
          __html: linkify(description),
        }}
        lineHeight="1.4"
        fontSize="15px"
        whiteSpace="pre-line"
      ></Box>
      <Stack>
        <Box fontSize="15px" fontWeight="bold">
          {t("Liên hệ")}
        </Box>
        <Stack small>
          {[
            [mdiMapMarkerRadius, address],
            [mdiWeb, website],
            [mdiPhoneInTalk, phone],
            [mdiAt, email],
          ].map(([iconPath, text], i) => (
            <Box display="flex" key={i} color="#545454" alignItems="flex-start">
              <Icon
                style={{
                  flexShrink: 0,
                  width: "20px",
                  fill: "currentColor",
                  marginRight: "10px",
                }}
                path={iconPath}
              ></Icon>
              <Box lineHeight="20px" fontSize="15px">
                {text}
              </Box>
            </Box>
          ))}
        </Stack>
      </Stack>
      <Stack>
        <Box fontSize="15px" fontWeight="bold">
          {t("Lối tắt")}
        </Box>
        <Stack small>
          {[
            [mdiCogs, t("Cài đặt nhóm"), Routes.SETTING_GROUP_INFO],
            [mdiHelpRhombus, t("Câu hỏi thường gặp"), Routes.FAQ],
            [mdiLifebuoy, t("Hướng dẫn sử dụng"), Routes.HELP],
          ].map(([iconPath, text, url], i) => (
            <Box display="flex" key={i} color="#545454" alignItems="flex-start">
              <Icon
                style={{
                  width: "20px",
                  flexShrink: 0,
                  fill: "currentColor",
                  marginRight: "10px",
                }}
                path={iconPath}
              ></Icon>
              <ButtonBase
                onClick={() => {
                  history.push(url || "/");
                }}
                lineHeight="20px"
                fontSize="15px"
              >
                {text}
              </ButtonBase>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Left;
