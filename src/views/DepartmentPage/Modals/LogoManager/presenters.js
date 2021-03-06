import { Avatar, ButtonBase } from "@material-ui/core";
import { get } from "lodash";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import AddButton from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/AddButton";
import ListItemLayout from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/ListItemLayout";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import ColorButton from "../../../../components/ColorButton";
import ColorTypo from "../../../../components/ColorTypo";
import CustomModal from "../../../../components/CustomModal";
import LoadingBox from "../../../../components/LoadingBox";
import "./style.scss";
const LogoManagerContext = React.createContext({});
const LogoList = ({ className = "", tall = false, ...props }) => (
  <div
    className={`view_Department_Logo_Modal___logo-list${
      tall ? "-tall" : ""
    } ${className}`}
    {...props}
  />
);

const LogoBox = ({ className = "", isSelect, ...props }) => (
  <div
    className={`${
      isSelect
        ? "view_Department_Logo_Modal___logo-box-selected"
        : "view_Department_Logo_Modal___logo-box"
    } ${className}`}
    {...props}
  />
);

const LogoMnanagerStateLess = () => {
  const {
    icons,
    mutateIcon,
    isSelect,
    handleDeleteIcon,
    handleOpenModal,
    selectedIcon,
    setSelectedIcon,
  } = useContext(LogoManagerContext);
  const { t } = useTranslation();
  return (
    <Stack large>
      <Stack small>
        <ListItemLayout
          title={t("LABEL_ICON_FROM_SYSTEM")}
          subTitle={t("LABEL_CHOOSE_ICON_FROM_SYSTEM")}
        ></ListItemLayout>
        <LogoList cols={8}>
          {icons.defaults.map((icon) => (
            <LogoBox
              key={get(icon, "url_icon")}
              isSelect={
                isSelect &&
                get(selectedIcon, "url_sort", "x") === get(icon, "icon", "y")
              }
            >
              <ButtonBase
                disabled={!isSelect}
                onClick={() =>
                  isSelect &&
                  setSelectedIcon({
                    id: get(icon, "id"),
                    url_sort: get(icon, "icon"),
                    url_full: get(icon, "url_icon"),
                  })
                }
              >
                <Avatar src={get(icon, "url_icon")} alt="avatar" />
              </ButtonBase>
            </LogoBox>
          ))}
        </LogoList>
      </Stack>
      <Stack small>
        <ListItemLayout
          title={t("LABEL_ICON_FROM_UPLOAD")}
          subTitle={t("LABEL_CHOOSE_ICON_FROM_UPLOAD")}
        ></ListItemLayout>
        <LogoList cols={8}>
          {icons.createds.map((icon) => (
            <LogoBox
              key={get(icon, "id", "")}
              isSelect={
                isSelect &&
                get(selectedIcon, "url_sort", "x") ===
                  get(icon, "url_sort", "y")
              }
            >
              <ButtonBase
                disabled={!isSelect}
                onClick={() => isSelect && setSelectedIcon(icon)}
              >
                <Avatar src={get(icon, "url_full")} alt="avatar" />
              </ButtonBase>
              <ColorButton
                fullWidth
                variant="text"
                size="small"
                variantColor="red"
                onClick={() =>
                  handleOpenModal("ALERT", {
                    content: t("LABEL_CHAT_TASK_BAN_CO_CHAC_MUON_XOA_KHONG"),
                    onConfirm: () => handleDeleteIcon(icon),
                  })
                }
              >
                {mutateIcon.loading ? (
                  <LoadingBox size={8} />
                ) : (
                  t("IDS_WP_DELETE")
                )}
              </ColorButton>
            </LogoBox>
          ))}
        </LogoList>
      </Stack>
    </Stack>
  );
};
const UploadButton = () => {
  const { mutateIcon, handleOpenModal, handleCreateIcon } =
    useContext(LogoManagerContext);
  const { t } = useTranslation();
  return (
    <>
      {mutateIcon.loading ? (
        <ColorButton variant="text" variantColor="green" size="small">
          <LoadingBox size={16} />
        </ColorButton>
      ) : (
        <label htmlFor="raised-button-file">
          <AddButton onClick={() => {}} label={t("IDS_WP_ADD")}></AddButton>
        </label>
      )}
      <input
        hidden
        disabled={mutateIcon.loading}
        accept="image/*"
        id="raised-button-file"
        type="file"
        onChange={(evt) =>
          !mutateIcon.loading &&
          handleOpenModal("UPLOAD", {
            image: evt.target.files[0],
            uploadImage: handleCreateIcon,
          })
        }
      />
    </>
  );
};

const CustomTypo = ({ className = "", ...props }) => (
  <ColorTypo
    className={`view_Department_Logo_Modal___typo ${className}`}
    {...props}
  />
);

const LogoManagerModalWrapper = ({ children }) => {
  const {
    open,
    setOpen,
    icons,
    mutateIcon,
    isSelect,
    handleCreateIcon,
    handleDeleteIcon,
    handleSelectIcon,
    handleOpenModal,
    selectedIcon,
    setSelectedIcon,
    canUpload,
  } = useContext(LogoManagerContext);
  const { t } = useTranslation();

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={t("DMH.VIEW.DP.MODAL.LOGO.TITLE")}
      onConfirm={() => handleSelectIcon(selectedIcon)}
      cancleRender={() =>
        isSelect
          ? t("DMH.VIEW.DP.MODAL.LOGO.CANCLE")
          : t("DMH.VIEW.DP.MODAL.LOGO.EXIT")
      }
      confirmRender={isSelect ? () => t("DMH.VIEW.DP.MODAL.LOGO.DONE") : null}
      loading={icons.loading}
      actionLoading={mutateIcon.loading}
      height={"mini"}
    >
      <>
        <CustomTypo>{t("DMH.VIEW.DP.MODAL.LOGO.DEFAULT")}</CustomTypo>
        <LogoList>
          {icons.defaults.map((icon) => (
            <LogoBox
              key={get(icon, "url_icon")}
              isSelect={
                isSelect &&
                get(selectedIcon, "url_sort", "x") === get(icon, "icon", "y")
              }
            >
              <ButtonBase
                disabled={!isSelect}
                onClick={() =>
                  isSelect &&
                  setSelectedIcon({
                    id: get(icon, "id"),
                    url_sort: get(icon, "icon"),
                    url_full: get(icon, "url_icon"),
                  })
                }
              >
                <Avatar src={get(icon, "url_icon")} alt="avatar" />
              </ButtonBase>
            </LogoBox>
          ))}
        </LogoList>
        <CustomTypo>{t("DMH.VIEW.DP.MODAL.LOGO.UPLOADED")}</CustomTypo>
        <LogoList tall={true}>
          {icons.createds.map((icon) => (
            <LogoBox
              key={get(icon, "id", "")}
              isSelect={
                isSelect &&
                get(selectedIcon, "url_sort", "x") ===
                  get(icon, "url_sort", "y")
              }
            >
              <ButtonBase
                disabled={!isSelect}
                onClick={() => isSelect && setSelectedIcon(icon)}
              >
                <Avatar src={get(icon, "url_full")} alt="avatar" />
              </ButtonBase>
              {canUpload && (
                <ColorButton
                  fullWidth
                  variant="text"
                  size="small"
                  variantColor="red"
                  onClick={() =>
                    handleOpenModal("ALERT", {
                      content: t("DMH.VIEW.DP.MODAL.LOGO.ALERT"),
                      onConfirm: () => handleDeleteIcon(icon),
                    })
                  }
                >
                  {mutateIcon.loading ? (
                    <LoadingBox size={8} />
                  ) : (
                    t("DMH.VIEW.DP.MODAL.LOGO.DEL")
                  )}
                </ColorButton>
              )}
            </LogoBox>
          ))}
        </LogoList>
        {canUpload && (
          <>
            <input
              disabled={mutateIcon.loading}
              accept="image/*"
              id="raised-button-file"
              type="file"
              onChange={(evt) =>
                !mutateIcon.loading &&
                handleOpenModal("UPLOAD", {
                  image: evt.target.files[0],
                  uploadImage: handleCreateIcon,
                })
              }
            />
            {mutateIcon.loading ? (
              <ColorButton variant="text" variantColor="blue" size="small">
                <LoadingBox size={16} />
              </ColorButton>
            ) : (
              <ColorButton
                variant="text"
                variantColor="blue"
                size="small"
                component="label"
                htmlFor="raised-button-file"
              >
                {t("DMH.VIEW.DP.MODAL.LOGO.UPLOAD")}
              </ColorButton>
            )}
          </>
        )}
      </>
    </CustomModal>
  );
};
function LogoManagerProvider({
  children,
  open,
  setOpen,
  icons,
  mutateIcon,
  isSelect,
  handleCreateIcon,
  handleDeleteIcon,
  handleSelectIcon,
  handleOpenModal,
  canUpload,
  selectedIconFromOut,
}) {
  const [selectedIcon, setSelectedIcon] = React.useState({
    id: get(icons.defaults[0], "id"),
    url_sort: get(icons.defaults[0], "icon"),
    url_full: get(icons.defaults[0], "url_icon"),
  });
  const [defaultIcon, setDefaultIcon] = React.useState({
    id: get(icons.defaults[0], "id"),
    url_sort: get(icons.defaults[0], "icon"),
    url_full: get(icons.defaults[0], "url_icon"),
  });
  React.useEffect(() => {
    if (
      selectedIconFromOut &&
      !!selectedIconFromOut.url_sort &&
      selectedIconFromOut.url_sort !== selectedIcon.url_sort
    ) {
      setSelectedIcon({
        url_sort: selectedIconFromOut.url_sort,
        url_full: selectedIconFromOut.url_full,
      });
    } else {
      if (icons.defaults[0]) {
        setSelectedIcon({
          url_sort: get(icons.defaults[0], "icon"),
          url_full: get(icons.defaults[0], "url_icon"),
        });
      }
    }
  }, [selectedIconFromOut]);

  React.useEffect(() => {
    if (
      !selectedIcon.url_full &&
      !selectedIcon.url_sort &&
      icons.defaults.length > 0
    ) {
      setSelectedIcon({
        url_full: icons.defaults[0].url_icon,
        url_sort: icons.defaults[0].icon,
      });
    }
  }, [icons]);

  return (
    <LogoManagerContext.Provider
      value={{
        open,
        setOpen,
        icons,
        mutateIcon,
        isSelect,
        handleCreateIcon,
        handleDeleteIcon,
        handleSelectIcon,
        handleOpenModal,
        selectedIcon,
        setSelectedIcon,
        canUpload,
        defaultIcon,
      }}
    >
      {children}
    </LogoManagerContext.Provider>
  );
}
export {
  LogoManagerContext,
  LogoManagerModalWrapper,
  LogoMnanagerStateLess,
  UploadButton,
};
export default LogoManagerProvider;
