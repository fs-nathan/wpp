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
  isOfferGroupManageable,
  draggable = false,
  hasFilterByCategory = false,
  handleFilterByCategory
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
      draggable={draggable}
      hasFilterByCategory={hasFilterByCategory}
      handleFilterByCategory={handleFilterByCategory}
    />
  );
};

export default ListPart;
