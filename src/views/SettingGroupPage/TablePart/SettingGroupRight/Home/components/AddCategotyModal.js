import { Box } from "@material-ui/core";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import ModalCommon from "views/DocumentPage/TablePart/DocumentComponent/ModalCommon";
import { DialogContent } from "views/DocumentPage/TablePart/DocumentComponent/TableCommon";
import VerticleList from "views/JobPage/components/VerticleList";
import HomeContext from "../HomeContext";
import { CssTextField } from "./CssTextField";

const AddCategotyModal = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <ModalCommon
      title={t("Tạo thể loại")}
      onClose={onClose}
      // loading={loading}
      footerAction={[
        {
          name: t("Hoàn thành")
          // action: handleMove,
          // disabled: isEmpty(folderSelected)
        }
      ]}
    >
      <DialogContent dividers className="dialog-content move-content">
        <Box padding="24px">
          <VerticleList>
            <CssTextField label={t("Tên thể loại")} />
            <CssTextField label={t("Mô tả chi tiết")} />
            <CssTextField label={t("Biểu tượng")}></CssTextField>
          </VerticleList>
        </Box>
      </DialogContent>
    </ModalCommon>
  );
};

export default () => {
  const { setModal } = useContext(HomeContext);
  const onClose = () => setModal(null);
  return <AddCategotyModal onClose={onClose} />;
};
