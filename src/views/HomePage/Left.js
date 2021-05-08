import { Avatar, ButtonBase, Divider } from "@material-ui/core";
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
import { injectClassName } from "views/JobPage/utils";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import GroupDetailContext from "./GroupDetailContext";
import "./Left.css";
const ShortcutGroupTitle = injectClassName("comp_Left__shortcutGroupTitle")();
const ShortcutGroup = ({ children, title }) => {
  return (
    <Stack>
      {title && <ShortcutGroupTitle>{title}</ShortcutGroupTitle>}
      <Stack small>{children}</Stack>
    </Stack>
  );
};
const ShortCut = ({ iconPath, url, text, extra }) => {
  const history = useHistory();
  return (
    <div className="comp_Left__shortcut">
      <Icon className="comp_Left__shortcutIcon" path={iconPath}></Icon>

      {url ? (
        extra ? (
          <a className="comp_Left__shortcutLink" href={url}>
            {text}
          </a>
        ) : (
          <ButtonBase
            onClick={() => {
              history.push(url || "/");
            }}
            className="comp_Left__shortcutLink"
          >
            {text}
          </ButtonBase>
        )
      ) : (
        <div className="comp_Left__shortcutLink">{text}</div>
      )}
    </div>
  );
};
const Left = React.memo(
  ({ name, code, description, address, website, phone, email, logo }) => {
    const { t } = useTranslation();
    const notupdate = t("IDS_LABEL_NOT_UPDATE");
    return (
      <Stack large>
        <Stack className="comp_Left__profile" small>
          <div className="comp_Left__avatar">
            <Avatar src={logo}></Avatar>
          </div>
          <div>ID:{code}</div>
          <div className="comp_Left__name">{name}</div>
        </Stack>
        <Divider />
        <div
          className="comp_Left__description"
          dangerouslySetInnerHTML={{
            __html: linkify(description),
          }}
        ></div>
        <ShortcutGroup title={t("Liên hệ")}>
          {[
            [mdiMapMarkerRadius, address],
            [mdiWeb, website],
            [mdiPhoneInTalk, phone],
            [mdiAt, email],
          ].map(([iconPath, text], i) => (
            <>
            {address && website && phone && email ? <ShortCut key={i} {...{ iconPath, text }} />:<ShortCut key={i} {...{ iconPath, text: notupdate }} />}
            </>
          ))}
        </ShortcutGroup>
        <ShortcutGroup title={t("Lối tắt")}>
          {[
            [mdiCogs, t("Cài đặt nhóm"), Routes.SETTING_GROUP_INFO],
            [
              mdiHelpRhombus,
              t("Câu hỏi thường gặp"),
              "https://support.workplus.vn/hoi-dap/",
              true,
            ],
            [
              mdiLifebuoy,
              t("Hướng dẫn sử dụng"),
              "https://support.workplus.vn/tai-lieu-huong-dan/",
              true,
            ],
          ].map(([iconPath, text, url, extra], i) => (
            <ShortCut key={i} {...{ iconPath, text, url, extra }} />
          ))}
        </ShortcutGroup>
      </Stack>
    );
  }
);

export default () => {
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
  return (
    <Left
      {...{ name, code, description, address, website, phone, email, logo }}
    />
  );
};
