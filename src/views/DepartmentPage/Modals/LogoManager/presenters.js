import { Avatar, ButtonBase } from "@material-ui/core";
import { get } from "lodash";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import AddButton from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/AddButton";
import ListItemLayout from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/ListItemLayout";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import ColorButton from "../../../../components/ColorButton";
import CustomModal from "../../../../components/CustomModal";
import LoadingBox from "../../../../components/LoadingBox";
import "./style.scss";
export const LogoManagerContext = React.createContext({});
const LogoList = ({ className = "", ...props }) => (
  <div
    className={`view_Department_Logo_Modal___logo-list ${className}`}
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
export const LogoMnanagerStateLess = () => {
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
  } = useContext(LogoManagerContext);
  const { t } = useTranslation();
  return (
    <Stack large>
      <Stack small>
        <ListItemLayout
          title={t("Biểu tượng có sẵn")}
          subTitle={t("Lựa chõn biểu tượng có sẵn từ hệ thống")}
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
          title={t("Biểu tượng tải lên")}
          subTitle={t("Lựa chõn biểu tượng có sẵn từ hệ thống")}
        ></ListItemLayout>
        <LogoList cols={8}>
          {icons.createds.map((icon) => (
            <LogoBox
              key={get(icon, "id", "")}
              isSelect={
                isSelect &&
                get(selectedIcon, "id", "x") === get(icon, "id", "y")
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
                    content: "Bạn chắc chắn muốn xóa biểu tượng?",
                    onConfirm: () => handleDeleteIcon(icon),
                  })
                }
              >
                {mutateIcon.loading ? <LoadingBox size={8} /> : "Xóa"}
              </ColorButton>
            </LogoBox>
          ))}
        </LogoList>
      </Stack>
    </Stack>
  );
};
export const UploadButton = () => {
  const { mutateIcon, handleOpenModal, handleCreateIcon } = useContext(
    LogoManagerContext
  );
  const { t } = useTranslation();
  return (
    <>
      {mutateIcon.loading ? (
        <ColorButton variant="text" variantColor="green" size="small">
          <LoadingBox size={16} />
        </ColorButton>
      ) : (
        <label htmlFor="raised-button-file">
          <AddButton onClick={() => {}} label={t("Tải biểu tượng")}></AddButton>
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

export const LogoManagerModalWrapper = ({ children }) => {
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
  } = useContext(LogoManagerContext);
  const { t } = useTranslation();
  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={t("Quản lý biểu tượng")}
      onConfirm={() => handleSelectIcon(selectedIcon)}
      cancleRender={() => (isSelect ? t("Hủy") : t("Thoát"))}
      confirmRender={isSelect ? () => t("Hoàn thành") : null}
      loading={icons.loading}
    >
      {children}
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
}) {
  const [selectedIcon, setSelectedIcon] = React.useState({
    id: get(icons.defaults[0], "id"),
    url_sort: get(icons.defaults[0], "icon"),
    url_full: get(icons.defaults[0], "url_icon"),
  });

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
      }}
    >
      {children}
    </LogoManagerContext.Provider>
  );
}

export default LogoManagerProvider;
