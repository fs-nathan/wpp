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
import { useSelector } from "react-redux";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { createMapPropsFromAttrs } from "views/JobPage/utils";
import { categoryAttr } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/contants";
import { categoryListSelector } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux";
import "./SelectCategoryModal.css";
function SelectCategoryModalStateLess({
  categories = emptyArray,
  onItemClick,
  onClose,
}) {
  const { t } = useTranslation();
  return (
    <Dialog
      PaperProps={{ className: "comp_SelectCategoryModal_paper" }}
      onClose={onClose}
      open={true}
    >
      <DialogTitle>{t("Chọn thể loại")}</DialogTitle>
      <List className="comp_SelectCategoryModal_list">
        {categories.map((cate) => {
          const [id, name, logo] = createMapPropsFromAttrs([
            categoryAttr.id,
            categoryAttr.name,
            categoryAttr.logo,
          ])(cate);
          return (
            <ListItem className="comp_SelectCategoryModal_listItem" key={id}>
              <Chip
                onClick={() => {
                  onItemClick(cate);
                }}
                avatar={<Avatar alt={name} src={logo} />}
                label={name}
              />
            </ListItem>
          );
        })}
      </List>
    </Dialog>
  );
}

export default (props) => {
  const categories = useSelector(categoryListSelector);
  return <SelectCategoryModalStateLess categories={categories} {...props} />;
};
