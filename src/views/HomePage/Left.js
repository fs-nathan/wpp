import { Avatar, Box, Divider, Typography } from "@material-ui/core";
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
import linkify from "linkifyjs/string";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import GroupDetailContext from "./GroupDetailContext";
var urlRegex = /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi;
function urlify(text) {
  return text.replace(urlRegex, function (url) {
    return '<a href="' + url.find("http") + '" target="_blank">' + url + "</a>";
  });
  // or alternatively
  // return text.replace(urlRegex, '<a href="$1">$1</a>')
}

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
            [mdiCogs, t("Cài đặt nhóm")],
            [mdiHelpRhombus, t("Câu hỏi thường gặp")],
            [mdiLifebuoy, t("Hướng dẫn sử dụng")],
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
