import { Avatar, Box, Typography } from "@material-ui/core";
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
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Space } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Space";
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
      <Space height="50px" />
      <Box lineHeight="1.4" fontSize="15px">
        {description}
      </Box>
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
            [mdiCogs, t("Cài đặt nhóm")],
            [mdiHelpRhombus, t("Câu hỏi thường gặp")],
            [mdiLifebuoy, t("HƯớng dẫn sử dụng")],
          ].map(([iconPath, text], i) => (
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
              <Box lineHeight="20px" fontSize="15px">
                {text}
              </Box>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Left;
