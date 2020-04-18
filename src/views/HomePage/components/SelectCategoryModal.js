import {
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  List,
  ListItem,
} from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { createMapPropsFromAttrs } from "views/JobPage/utils";
import { categoryAttr } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/contants";

function SelectCategoryModal({
  categories = emptyArray,
  onItemClick,
  onClose,
}) {
  const { t } = useTranslation();
  return (
    <Dialog onClose={onClose} open={true}>
      <DialogTitle>{t("Chọn thể loại")}</DialogTitle>
      <List>
        {categories.map((cate) => {
          const [id, name, logo] = createMapPropsFromAttrs([
            categoryAttr.id,
            categoryAttr.name,
            categoryAttr.logo,
          ])(cate);
          return (
            <ListItem
              key={id}
              button
              onClick={() => {
                onItemClick(cate);
              }}
            >
              <Chip avatar={<Avatar alt={name} src={logo} />} label={name} />
            </ListItem>
          );
        })}
      </List>
    </Dialog>
  );
}

export default SelectCategoryModal;
