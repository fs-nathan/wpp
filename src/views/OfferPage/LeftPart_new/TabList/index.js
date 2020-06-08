import React from "react";
import LeftSetting from "../LeftSetting";
import "./style.scss";
const ListPart = ({
  searchPlaceHolder,
  subMenu,
  filter,
  searchInput,
  title,
  listMenu,
  setOpenModalOfferByGroup,
  isOfferGroupManageable
}) => {
  return (
    <LeftSetting
      filter={filter}
      searchPlaceHolder={searchPlaceHolder}
      subMenu={subMenu}
      searchInput={searchInput}
      setOpenModalOfferByGroup={setOpenModalOfferByGroup}
      title={title}
      listMenu={listMenu}
      isOfferGroupManageable={isOfferGroupManageable}
    />
  );
};

export default ListPart;
