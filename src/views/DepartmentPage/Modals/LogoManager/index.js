import { createIcon } from "actions/icon/createIcon";
import { deleteIcon } from "actions/icon/deleteIcon";
import { listIcon } from "actions/icon/listIcon";
import AlertModal from "components/AlertModal";
import ErrorBox from "components/ErrorBox";
import CropModal from "components/ImageCropper/ImageCropper";
import { get } from "lodash";
import React from "react";
import { connect } from "react-redux";
import LogoManagerPresenter, {
  LogoManagerContext,
  LogoManagerModalWrapper,
  LogoMnanagerStateLess,
  UploadButton,
} from "./presenters";
import { iconsSelector, mutateIconSelector } from "./selectors";

function LogoManager({
  open,
  setOpen,
  icons,
  mutateIcon,
  doCreateIcon,
  doDeleteIcon,
  isSelect = true,
  doSelectIcon = () => null,
  children,
  doListIcon,
  canUpload = false,
  selectedIcon,
  currentGroup,
}) {
  console.log('xxxx', icons)
  const [selectedIconFromOut, setSelectedIconFromOut] = React.useState();
  React.useEffect(() => {
    doListIcon();
    // eslint-disable-next-line
  }, []);
  React.useEffect(() => {
    if (!currentGroup) return;
    const foundedIconDefault = icons.defaults.find(
      (icon) => icon.url_icon === currentGroup.icon
    );
    const foundedIconCreateds = icons.createds.find(
      (icon) => icon.url_full === currentGroup.icon
    );

    console.log("icons.createds", icons.createds);
    console.log("currentGroup.icon", currentGroup.icon);
    if (foundedIconDefault) {
      console.log("go here");
      setSelectedIconFromOut({
        url_full: foundedIconDefault.url_icon,
        url_sort: foundedIconDefault.icon,
      });
    } else if (foundedIconCreateds) {
      setSelectedIconFromOut({
        url_full: foundedIconCreateds.url_full,
        url_sort: foundedIconCreateds.url_sort,
      });
    }
  }, [currentGroup]);

  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({});
  const [openCropper, setOpenCropper] = React.useState(false);
  const [cropperProps, setCropperProps] = React.useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case "ALERT": {
        setOpenAlert(true);
        setAlertProps(props);
        return;
      }
      case "UPLOAD": {
        setOpenCropper(true);
        setCropperProps(props);
        return;
      }
      default:
        return;
    }
  }

  return (
    <>
      <LogoManagerPresenter
        open={open}
        setOpen={setOpen}
        icons={icons}
        mutateIcon={mutateIcon}
        isSelect={isSelect}
        handleCreateIcon={(icon) => doCreateIcon({ icon })}
        handleDeleteIcon={(icon) => doDeleteIcon({ iconId: get(icon, "id") })}
        handleSelectIcon={(icon) => doSelectIcon(icon)}
        handleOpenModal={doOpenModal}
        canUpload={canUpload}
        selectedIconFromOut={selectedIcon || selectedIconFromOut}
      >
        {children}
      </LogoManagerPresenter>
      <AlertModal open={openAlert} setOpen={setOpenAlert} {...alertProps} />
      <CropModal
        open={openCropper}
        setOpen={setOpenCropper}
        cropType="LOGO"
        {...cropperProps}
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    icons: iconsSelector(state),
    mutateIcon: mutateIconSelector(state),
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    doListIcon: (quite) => dispatch(listIcon(quite)),
    doCreateIcon: ({ icon }) => dispatch(createIcon({ icon })),
    doDeleteIcon: ({ iconId }) => dispatch(deleteIcon({ iconId })),
  };
};
export const LogoManagerContainer = connect(
  mapStateToProps,
  mapDispathToProps
)(LogoManager);
const LogoManagerModal = (props) => {
  return (
    <LogoManagerContainer {...props}>
      <LogoManagerModalWrapper>
        <LogoManagerContext.Consumer>
          {({ icons }) => {
            return icons.error !== null ? (
              <ErrorBox />
            ) : (
              <>
                <LogoMnanagerStateLess />
                <UploadButton />
              </>
            );
          }}
        </LogoManagerContext.Consumer>
      </LogoManagerModalWrapper>
    </LogoManagerContainer>
  );
};
export default LogoManagerModal;
